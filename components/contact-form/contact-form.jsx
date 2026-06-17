"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./contact-form.module.css";
import { contactSchema } from "@/utils/contact-schema";

import Input from "../input/input";
import Select from "../select/select";
import Checkbox from "../checkbox/checkbox";
import Loader from "../loader/loader";

export default function ContactForm({ productOptions }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      product: "",
      message: "",
      selectedCodes: [],
      privacy: false,
      website: "",
    },
  });

  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState(null);

  const selectedProduct = productOptions.find(
    (product) => product.name === watch("product")
  );
  const selectedProductCodes = selectedProduct?.articles || [];

  const onSubmit = async (data) => {
    setSuccess(null);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          responseData.message || "Errore nell'invio del form."
        );
      }

      setSuccess(responseData.message || "Messaggio inviato correttamente.");
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      setServerError(error.message || "Errore nell'invio del form.");
    }
  };

  return (
    <form className={styles.contactsForm} onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <p role="alert" className={styles.errorBanner}>
          {serverError}
        </p>
      )}
      {success && (
        <p role="alert" className={styles.success}>
          {success}
        </p>
      )}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Sito web</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <div>
        <Input
          label="Nome e cognome"
          type="text"
          id="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          {...register("name")}
          error={errors.name?.message}
        />
        {errors.name && (
          <p id="name-error" className={styles.error}>
            {errors.name.message}
          </p>
        )}
      </div>
      <div className={styles.flexGroup}>
        <div>
          <Input
            label="Telefono"
            type="tel"
            id="phone"
            required
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
            {...register("phone")}
            error={errors.phone?.message}
          />
          {errors.phone && (
            <p id="phone-error" className={styles.error}>
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            id="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            {...register("email")}
            error={errors.email?.message}
          />
          {errors.email && (
            <p id="email-error" className={styles.error}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <Select
        label="Sei interessato a qualche prodotto in particolare?"
        id="product"
        {...register("product")}
        options={productOptions}
      />
      {selectedProductCodes.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend>Seleziona la variante di tuo interesse:</legend>
          {selectedProductCodes.map((article) => (
            <Checkbox
              key={article.code}
              id={article.code}
              label={`${article.code} - ${article.description}`}
              value={article.code}
              checked={watch("selectedCodes").includes(article.code)}
              onChange={(e) => {
                const newCodes = e.target.checked
                  ? [...watch("selectedCodes"), article.code]
                  : watch("selectedCodes").filter((c) => c !== article.code);
                setValue("selectedCodes", newCodes, { shouldValidate: true });
              }}
            />
          ))}
          {errors.selectedCodes && (
            <p className={styles.error}>{errors.selectedCodes.message}</p>
          )}
        </fieldset>
      )}
      <div>
        <Input
          label="Note aggiuntive"
          textarea
          id="message"
          {...register("message")}
        />
      </div>
      <div>
        <Checkbox
          label="Ho letto e accetto i termini e le condizioni"
          id="privacy"
          required
          {...register("privacy")}
          error={errors.privacy?.message}
          aria-invalid={!!errors.privacy}
          aria-describedby="privacy-error"
        />
        {errors.privacy && (
          <p id="privacy-error" className={styles.error}>
            {errors.privacy.message}
          </p>
        )}
      </div>
      <button type="submit">{isSubmitting ? <Loader /> : "Invia"}</button>
    </form>
  );
}
