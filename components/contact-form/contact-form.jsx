"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import styles from "./contact-form.module.css";
import { products } from "@/utils/products";

import Input from "../input/input";
import Select from "../select/select";
import Checkbox from "../checkbox/checkbox";
import Loader from "../loader/loader";

const schema = z.object({
  name: z
    .string()
    .nonempty("Il campo nome è obbligatorio.")
    .min(2, "Il nome deve contenere almeno 2 caratteri."),
  phone: z
    .string()
    .nonempty("Il campo telefono è obbligatorio.")
    .regex(/^\d{10,15}$/, "Inserisci un numero di telefono valido."),
  email: z
    .string()
    .nonempty("Il campo email è obbligatorio")
    .email("Inserisci un indirizzo email valido."),
  product: z.string().optional(),
  message: z.string().optional(),
  selectedCodes: z
    .array(z.string()).optional(),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare i termini e le condizioni." }),
  }),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      product: "",
      message: "",
      selectedCodes: [],
      privacy: false,
    },
  });

  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState(null);

  const selectedProduct = products.find((p) => p.name === watch("product"));
  const selectedProductCodes = selectedProduct?.informations.articles || [];

  const onSubmit = async (data) => {
    setSuccess(null);
    setServerError(null);

    console.log(data);

    try {
      const response = await axios.post("/api/contact", data);
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Errore nell'invio del form."
      );
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
        options={products}
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
                setValue("selectedCodes", newCodes);
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

/* "use client";

import { useRef, useState } from "react";
import axios from "axios";

import styles from "./contact-form.module.css";

import { products } from "@/lib/products";

import Input from "../input/input";
import Select from "../select/select";
import Checkbox from "../checkbox/checkbox";
import Loader from "../loader/loader";

export default function ContactForm() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const productRef = useRef();
  const privacyRef = useRef();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedProductCodes, setSelectedProductCodes] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);

  function validateForm() {
    const newErrors = {};

    if (nameRef.current.value.trim() === "") {
      newErrors.name = "Il campo nome è obbligatorio.";
    }

    if (!phoneRef.current.value.trim()) {
      newErrors.phone = "Il numero di telefono è obbligatorio.";
    } else if (!/^\d{10,15}$/.test(phoneRef.current.value.trim())) {
      newErrors.phone = "Inserisci un numero di telefono valido.";
    }

    if (selectedProductCodes.length > 0 && selectedCodes.length === 0) {
      newErrors.product = "Devi selezionare almeno un codice prodotto.";
    }

    if (!privacyRef.current.checked) {
      newErrors.privacy = "Devi acccettare i termini e le condizioni.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const product = productRef.current.value;
    const message = messageRef.current.value;
    const privacy = privacyRef.current.checked;

    try {
      const response = await axios.post("/api/contact", {
        name,
        phone,
        product,
        message,
        selectedCodes,
        privacy,
      });
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      const newErrors = {};
      newErrors.errorSubmit = error.response.data.message;
      setError(newErrors);
    }

    setLoading(false);
  }

  function handleProductChange(event) {
    const productName = event.target.value;

    const selectedProduct = products.find(
      (product) => product.name === productName
    );

    if (selectedProduct) {
      setSelectedProductCodes(selectedProduct.informations.articles || []);
    } else {
      setSelectedProductCodes([]);
    }
  }

  function handleCheckboxChange(event) {
    const code = event.target.value;

    setSelectedCodes((prev) =>
      event.target.checked ? [...prev, code] : prev.filter((c) => c !== code)
    );

    setError({ ...error, product: null });
  }

  return (
    <form className={styles.contactsForm} onSubmit={handleSubmit}>
      {error?.errorSubmit && (
        <p className={styles.errorBanner}>{error.errorSubmit}</p>
      )}
      {success && <p className={styles.success}>{success}</p>}

      <div>
        <Input
          label="Nome"
          type="text"
          id="name"
          name="name"
          required
          error={!!error?.name}
          ref={nameRef}
          onFocus={() => setError({ ...error, name: null })}
        />
        {error?.name && <p className={styles.error}>{error.name}</p>}
      </div>

      <div>
        <Input
          label="Telefono"
          type="tel"
          id="phone"
          name="phone"
          required
          error={!!error?.phone}
          ref={phoneRef}
          onFocus={() => setError({ ...error, phone: null })}
        />
        {error?.phone && <p className={styles.error}>{error.phone}</p>}
      </div>

      <Select
        label="Sei interessato a qualche prodotto in particolare?"
        id="product"
        name="product"
        ref={productRef}
        options={products}
        onChange={handleProductChange}
      />

      {selectedProductCodes.length > 0 && (
        <div>
          <p>Seleziona la variante di tuo interesse:</p>
          {selectedProductCodes.map((article) => (
            <Checkbox
              key={article.code}
              id={article.code}
              name={article.code}
              label={`${article.code} - ${article.description}`}
              value={article.code}
              onChange={handleCheckboxChange}
            />
          ))}
          {error?.product && <p className={styles.error}>{error.product}</p>}
        </div>
      )}
      <Input label="Note aggiuntive" textarea id="message" ref={messageRef} />
      <div>
        <Checkbox
          label="Ho letto e accetto i termini e le condizioni"
          id="privacy"
          name="privacy"
          required
          ref={privacyRef}
          onChange={() => setError({ ...error, privacy: null })}
        />
        {error?.privacy && <p className={styles.error}>{error.privacy}</p>}
      </div>

      <button type="submit">{loading ? <Loader /> : "Invia"}</button>
    </form>
  );
} */
