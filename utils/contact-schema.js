import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Il nome deve contenere almeno 2 caratteri.")
    .max(120, "Il nome è troppo lungo."),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Inserisci un numero di telefono valido."),
  email: z
    .string()
    .trim()
    .email("Inserisci un indirizzo email valido.")
    .max(254, "L'indirizzo email è troppo lungo."),
  product: z.string().trim().max(200, "Il prodotto selezionato non è valido.").optional().default(""),
  message: z.string().trim().max(2000, "Il messaggio è troppo lungo.").optional().default(""),
  selectedCodes: z
    .array(z.string().trim().min(1).max(40))
    .max(20, "Hai selezionato troppe varianti.")
    .optional()
    .default([]),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare i termini e le condizioni." }),
  }),
  website: z.string().trim().max(200).optional().default(""),
});
