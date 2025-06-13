import tensionatore from "@/assets/tensionatore.webp";
import tensionatore2 from "@/assets/tensionatore-2.webp";
import collareQuadratoTesta from "@/assets/collare-quadrato-testa.webp";
import collareQuadratoTesta2 from "@/assets/collare-quadrato-testa-2.webp";
import collareRotondoTesta from "@/assets/collare-rotondo-testa.webp";
import collareRotondoTesta2 from "@/assets/collare-rotondo-testa-2.webp";
import collareRotondoDoppio from "@/assets/collare-rotondo-doppio.webp";
import collareRotondoDoppio2 from "@/assets/collare-rotondo-doppio-2.webp";
import collareRotondoSingolo from "@/assets/collare-rotondo-singolo.webp";
import collareRotondoSingolo2 from "@/assets/collare-rotondo-singolo-2.webp";
import collareQuadratoDoppio from "@/assets/collare-quadrato-doppio.webp";
import collareQuadratoDoppio2 from "@/assets/collare-quadrato-doppio-2.webp";
import collareQuadratoSingolo from "@/assets/collare-quadrato-singolo.webp";
import collareQuadratoSingolo2 from "@/assets/collare-quadrato-singolo-2.webp";
import cavallottoSezioneQuadrata from "@/assets/cavallotto-sezione-quadrata.webp";
import cavallottoSezioneQuadrata2 from "@/assets/cavallotto-sezione-quadrata-2.webp";
import cavallottoSezioneRotonda from "@/assets/cavallotto-sezione-rotonda.webp";
import cavallottoSezioneRotonda2 from "@/assets/cavallotto-sezione-rotonda-2.webp";
import cavallottoPortatuboTesta from "@/assets/cavallotto-portatubo.webp";
import cavallottoPortatuboTesta2 from "@/assets/cavallotto-portatubo-2.webp";
import collareDoppioCatena from "@/assets/collare-doppio-catena-spalliera.webp";
import collareDoppioCatena2 from "@/assets/collare-doppio-catena-spalliera-2.webp";
import collareDoppioCatena3 from "@/assets/collare-doppio-catena-spalliera-3.webp";
import collareRettCorpoUnico from "@/assets/collare-rettangolare-corpo-unico.webp";
import collareRettCorpoUnico2 from "@/assets/collare-rettangolare-corpo-unico-2.webp";
import collareRettTestataFreccia from "@/assets/collare-rettangolare-testata-freccia.webp";
import collareRettTestataFreccia2 from "@/assets/collare-rettangolare-testata-freccia-2.webp";
import collareRotondoTestataFreccia from "@/assets/collare-rotondo-testata-freccia.webp";
import collareRotondoTestataFreccia2 from "@/assets/collare-rotondo-testata-freccia-2.webp";
import piastraPortaTuboCorpoUnicoV from "@/assets/piastra-portatubo-corpo-unico-a-v.webp";
import piastraPortaTuboCorpoUnicoV2 from "@/assets/piastra-portatubo-corpo-unico-a-v-2.webp";
import collarePortaTuboTestata2Dim from "@/assets/collare-portatubo-testata-2-dim.webp";
import collarePortaTuboTestata2Dim2 from "@/assets/collare-portatubo-testata-2-dim-2.webp";
import piastraPortaTuboADueCorpiV from "@/assets/piastra-portatubo-due-corpi-v.webp";
import piastraPortaTuboADueCorpiV2 from "@/assets/piastra-portatubo-due-corpi-v-2.webp";
import cavallottoPortatuboTuboTestata from "@/assets/cavallotto-portatubo-tubo-testata.webp";
import cavallottoPortatuboTuboTestata2 from "@/assets/cavallotto-portatubo-tubo-testata-2.webp";
import collareRettangolareTestataSpallieraCantinelleFili from "@/assets/collare-rettangolare-spalliera-aggancio-cantinelle-o-fili-corpo-unico.webp";
import collareRettangolarePassaggioFiloAnello from "@/assets/collare-rettangolare-passaggio-filo-anello.webp";
import collareRettangolarePassaggioFiloAnello2 from "@/assets/collare-rettangolare-passaggio-filo-anello-2.webp";

export const products = [
  // ACCESSORI DI TESTATA
  {
    name: "Piastre porta tubo a due corpi a V",
    slug: "piastre-portatubo-due-corpi-v",
    categorySlug: "accessori-di-testata",
    description:
      "Piastre PORTA TUBO A DUE CORPI A V, completo di barre filettate e bulloni da M10 - piastre asolate in lamiera S235 30/10",
    informations: {
      articles: [
        {
          code: "450",
          description:
            "Piastre PORTA TUBO A DUE CORPI A V M10 - piastre con bulloneria inclusa (bulloni M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [piastraPortaTuboADueCorpiV, piastraPortaTuboADueCorpiV2],
  },
  {
    name: "Piastra porta tubo corpo unico a V",
    slug: "piastra-portatubo-corpo-unico-v",
    categorySlug: "accessori-di-testata",
    description:
      "Piastra PORTA TUBO CORPO UNICO A V - completo di barre filettate e bulloni da M10 – piastra asolata in lamiera S235 30/10",
    informations: {
      articles: [
        {
          code: "460",
          description:
            "Piastra PORTA TUBO CORPO UNICO A V M10 - piastra con bulloneria inclusa (bulloni M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [piastraPortaTuboCorpoUnicoV, piastraPortaTuboCorpoUnicoV2],
  },
  {
    name: "Cavallotto ferma tubo/tubo",
    slug: "cavallotto-portatubo-testa-tubo-tubo",
    categorySlug: "accessori-di-testata",
    description:
      "Cavallotto per collegamento tra TUBO e TUBO di TESTA, con barra filettata M8 con piastrina 2,5x2mm*",
    informations: {
      articles: [
        {
          code: "411",
          description:
            "Cavallotto PORTA TUBO-TUBO TESTATA M8 - piastra con bulloneria inclusa (bullone M8)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [cavallottoPortatuboTuboTestata, cavallottoPortatuboTuboTestata2],
  },
  {
    name: "Cavallotto porta tubo di testa - palo/tubo",
    slug: "cavallotto-portatubo-testa-palo-tubo",
    categorySlug: "accessori-di-testata",
    description:
      "Cavallotto per collegamento tra PALO e TUBO di TESTA, con barra filettata M10 con piastra 30x10mm*",
    informations: {
      articles: [
        {
          code: "408",
          description:
            "Cavallotto PORTA TUBO TESTATA M8 - piastra con bulloneria inclusa",
        },
        {
          code: "410",
          description:
            "Cavallotto PORTA TUBO TESTATA M10 - piastra con bulloneria inclusa (bullone M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [cavallottoPortatuboTesta, cavallottoPortatuboTesta2],
  },
  {
    name: "Collare porta tubo testata da 2''",
    slug: "collare-portatubo-testata-2",
    categorySlug: "accessori-di-testata",
    description:
      "Collare PORTA TUBO TESTATA DA 2'' FISSAGGIO CANTINELLA / longherone, in lamiera S235 2x2,5mm",
    informations: {
      articles: [
        {
          code: "412",
          description:
            "Collare PORTA TUBO TESTATA da 2'' FISSAGGIO CANTINELLA - con bulloneria inclusa (bullone M8)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collarePortaTuboTestata2Dim, collarePortaTuboTestata2Dim2],
  },
  // COLLARI DI TESTATA
  {
    name: "Collare quadrato di testa",
    slug: "collare-quadrato-testa",
    categorySlug: "collari-di-testata",
    description:
      "Collare quadrato in lamiera S235 3x2,5mm* per collegamento a palo di testa a sezione quadrata",
    informations: {
      articles: [
        {
          code: "103-7",
          description:
            "Collare rettangolare di TESTATA-ANCORAGGIO - palo 7x7 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "103-8",
          description:
            "Collare rettangolare di TESTATA-ANCORAGGIO - palo 8x8 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "103-9",
          description:
            "Collare rettangolare di TESTATA-ANCORAGGIO - palo 9x9 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "103-15",
          description:
            "Collare rettangolare di TESTATA-ANCORAGGIO per palo (su richiesta) con bulloneria inclusa (bullone M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareQuadratoTesta, collareQuadratoTesta2],
  },
  {
    name: "Collare rotondo di testa",
    slug: "collare-rotondo-testa",
    categorySlug: "collari-di-testata",
    category: "Collari di testata-ancoraggio",
    description:
      "Collare rotondo in lamiera S235 2x2,5mm* per collegamento a palo di testa a sezione rotonda",
    informations: {
      articles: [
        {
          code: "203-7",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo Ø 70 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "203-8",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo Ø 80 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "203-9",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo Ø 90 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "203-10",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo Ø 100 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "203-12",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo Ø 120 con bulloneria inclusa (bullone M10)",
        },
        {
          code: "203-15",
          description:
            "Collare rotondo di TESTATA-ANCORAGGIO per palo (su richiesta) con bulloneria inclusa (bullone M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRotondoTesta, collareRotondoTesta2],
  },
  {
    name: "Collare doppio con catena per sistema a spalliera",
    slug: "collare-doppio-catena-spalliera",
    categorySlug: "accessori-speciali",
    description:
      "Collare con catena di testa doppio, per tensionamento filo di ferro per sistema a spalliera, in lamiera S235 2x2,5*",
    informations: {
      articles: [
        {
          code: "120-7",
          description:
            "Collare rettangolare di testata per spalliera AGGANCIO CATENELLE o FILI - palo 7x7 con bulloneria inclusa",
        },
        {
          code: "120-8",
          description:
            "Collare rettangolare di testata per spalliera AGGANCIO CATENELLE o FILI - palo 8x8 con bulloneria inclusa",
        },
        {
          code: "120-9",
          description:
            "Collare rettangolare di testata per spalliera AGGANCIO CATENELLE o FILI - palo 9x9 con bulloneria inclusa",
        },
        {
          code: "120-15",
          description:
            "Collare rettangolare di testata per spalliera AGGANCIO CATENELLE o FILI - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareDoppioCatena, collareDoppioCatena2, collareDoppioCatena3],
  },
  {
    name: "Collare rettangolare di testata-freccia",
    slug: "collare-rettangolare-testata-freccia",
    categorySlug: "collari-di-testata",
    description:
      "Collare ancoraggio TESTATA-FRECCIA, sezione rettangolare in lamiera S235 3x2.5mm",
    informations: {
      articles: [
        {
          code: "204-9-7",
          description:
            "Collare rettangolare di TESTATA-FRECCIA - palo 7x7-9x9 con bulloneria inclusa (bullone M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRettTestataFreccia, collareRettTestataFreccia2],
  },
  {
    name: "Collare rotondo di testata-freccia",
    slug: "collare-rotondo-testata-freccia",
    categorySlug: "collari-di-testata",
    description:
      "Collare ancoraggio TESTATA-FRECCIA, sezione rotonda in lamiera S235 3x2.5mm",
    informations: {
      articles: [
        {
          code: "205-9-7",
          description:
            "Collare rotondo di TESTATA-FRECCIA - palo Ø90-Ø70 con bulloneria inclusa (bullone M10)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRotondoTestataFreccia, collareRotondoTestataFreccia2],
  },
  // COLLARI INTERMEDI
  {
    name: "Collare quadrato doppio",
    slug: "collare-quadrato-doppio",
    categorySlug: "collari-intermedi",
    description:
      "Collare in lamiera S235 2x2,5mm* di sostegno DOPPIO per traversine",
    informations: {
      articles: [
        {
          code: "102-7",
          description:
            "Collare rettangolare, per DOPPIA CANTINELLA - palo 7x7 con bulloneria inclusa",
        },
        {
          code: "102-8",
          description:
            "Collare rettangolare, per DOPPIA CANTINELLA - palo 8x8 con bulloneria inclusa",
        },
        {
          code: "102-9",
          description:
            "Collare rettangolare, per DOPPIA CANTINELLA - palo 9x9 con bulloneria inclusa",
        },
        {
          code: "102-15",
          description:
            "Collare rettangolare, per DOPPIA CANTINELLA - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareQuadratoDoppio, collareQuadratoDoppio2],
  },
  {
    name: "Collare rotondo doppio",
    slug: "collare-rotondo-doppio",
    categorySlug: "collari-intermedi",
    description:
      "Collare in lamiera S235 2x2,5mm* di sostegno DOPPIO per traversine",
    informations: {
      articles: [
        {
          code: "202-6",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 60 con bulloneria inclusa",
        },
        {
          code: "202-7",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 70 con bulloneria inclusa",
        },
        {
          code: "202-8",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 80 con bulloneria inclusa",
        },
        {
          code: "202-9",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 90 con bulloneria inclusa",
        },
        {
          code: "202-10",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 100 con bulloneria inclusa",
        },
        {
          code: "202-12",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo Ø 120 con bulloneria inclusa",
        },
        {
          code: "202-15",
          description:
            "Collare rotondo, per DOPPIA CANTINELLA - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRotondoDoppio, collareRotondoDoppio2],
  },
  {
    name: "Collare quadrato singolo",
    slug: "collare-quadrato-singolo",
    categorySlug: "collari-intermedi",
    description:
      "Collare in lamiera S235 2x2,5mm* di sostegno SINGOLO per traversine, composto da 2 pezzi",
    informations: {
      articles: [
        {
          code: "101-7",
          description:
            "Collare rettangolare, per SINGOLA CANTINELLA - per palo 7x7 con bulloneria inclusa",
        },
        {
          code: "101-8",
          description:
            "Collare rettangolare, per SINGOLA CANTINELLA - per palo 8x8 con bulloneria inclusa",
        },
        {
          code: "101-9",
          description:
            "Collare rettangolare, per SINGOLA CANTINELLA - per palo 9x9 con bulloneria inclusa",
        },
        {
          code: "101-15",
          description:
            "Collare rettangolare, per SINGOLA CANTINELLA - per palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareQuadratoSingolo, collareQuadratoSingolo2],
  },
  {
    name: "Collare rotondo singolo",
    slug: "collare-rotondo-singolo",
    categorySlug: "collari-intermedi",
    description:
      "Collare in lamiera S235 2x2,5mm* di sostegno SINGOLO per traversine",
    informations: {
      articles: [
        {
          code: "201-6",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 60 con bulloneria inclusa",
        },
        {
          code: "201-7",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 70 con bulloneria inclusa",
        },
        {
          code: "201-8",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 80 con bulloneria inclusa",
        },
        {
          code: "201-9",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 90 con bulloneria inclusa",
        },
        {
          code: "201-10",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 100 con bulloneria inclusa",
        },
        {
          code: "201-12",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo Ø 120 con bulloneria inclusa",
        },
        {
          code: "201-15",
          description:
            "Collare rotondo, per SINGOLA CANTINELLA - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRotondoSingolo, collareRotondoSingolo2],
  },
  {
    name: "Collare rettangolare a corpo unico",
    slug: "collare-rettangolare-corpo-unico",
    categorySlug: "collari-intermedi",
    description:
      "Collare in lamiera S235 2x2,5mm* di sostegno singolo per traversine, corpo unico a C",
    informations: {
      articles: [
        {
          code: "110-7",
          description:
            "Collare rettangolare a corpo unico, per SINGOLA CANTINELLA - palo 7x7 con bulloneria inclusa",
        },
        {
          code: "110-8",
          description:
            "Collare rettangolare a corpo unico, per SINGOLA CANTINELLA - palo 8x8 con bulloneria inclusa",
        },
        {
          code: "110-15",
          description:
            "Collare rettangolare a corpo unico, per SINGOLA CANTINELLA - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRettCorpoUnico, collareRettCorpoUnico2],
  },
  // CAVALLOTTI
  {
    name: "Cavallotto a sezione quadrata M8-M6",
    slug: "cavallotto-sezione-quadrata",
    categorySlug: "cavallotti",
    description:
      "Cavallotto ferma traversina a sezione quadrata, in trafilato filettato con piastrina 25x10mm*",
    informations: {
      articles: [
        {
          code: "501-70",
          description:
            "Cavallotto rettangolare SOSTEGNO CANTINELLA-CANTINELLA passo M8 - da mm 70x90 completo di bulloneria (bullone M8)",
        },
        {
          code: "501-80",
          description:
            "Cavallotto rettangolare SOSTEGNO CANTINELLA-CANTINELLA passo M8 - da mm 80x90 completo di bulloneria (bullone M8)",
        },
        {
          code: "503-105",
          description:
            "Cavallotto rettangolare SOSTEGNO CANTINELLA-PALO passo M8 - da mm 105x125 completo di bulloneria (bullone M8)",
        },
        {
          code: "601-70",
          description:
            "Cavallotto rettangolare SOSTEGNO CANTINELLA-CANTINELLA passo M6 - da mm 70x90 completo di bulloneria (bullone M6)",
        },
        {
          code: "601-80",
          description:
            "Cavallotto rettangolare SOSTEGNO CANTINELLA-CANTINELLA passo M6 - da mm 80x90 completo di bulloneria (bullone M6)",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [cavallottoSezioneQuadrata, cavallottoSezioneQuadrata2],
  },
  {
    name: "Cavallotto a sezione rotonda M8-M6",
    slug: "cavallotto-sezione-rotonda",
    categorySlug: "cavallotti",
    description:
      "Cavallotto ferma traversina a sezione rotonda, in trafilato filettato con piastrina 25x10mm*",
    informations: {
      articles: [
        {
          code: "504-105",
          description:
            "Cavallotto rotondo SOSTEGNO CANTINELLA-PALO passo M8 - da mm 105x125 completo di bulloneria (bullone M8)",
        },
        {
          code: "601-105",
          description:
            "Cavallotto rotondo SOSTEGNO CANTINELLA-PALO passo M6 - da mm 105x125 completo di bulloneria (bullone M6)",
        }
      ],
    },
    lastModified: "2025-06-12",
    images: [cavallottoSezioneRotonda, cavallottoSezioneRotonda2],
  },
  // TENDITORI
  {
    name: "Tensionatore",
    slug: "tensionatore",
    description:
      "Tensionatore in trafilato di acciaio per tensionamento filo in ferro",
    categorySlug: "tenditori",
    informations: {
      articles: [
        {
          code: "308",
          description: "TENDITORE T Ø 8 - per fili di ferro",
        },
        {
          code: "310",
          description: "TENDITORE T Ø 10 - per fili di ferro",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [tensionatore, tensionatore2],
  },
  // ACCESSORI SPECIALI
  {
    name: "Collare rettangolare di testata per spalliera aggancio catenelle o fili a corpo unico",
    slug: "cavallotto-rettangolare-testata-spalliera",
    categorySlug: "accessori-speciali",
    description:
      "Collare con catene di testa a corpo unico a C, per tensionamento filo di ferro per sistema a spalliera, in lamiera S235 2x2,5mm",
    informations: {
      articles: [
        {
          code: "221-15",
          description:
            "Collare rettangolare di testata per spalliera AGGANCIO CANTINELLE o FILI A CORPO UNICO - palo (su richiesta) con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [collareRettangolareTestataSpallieraCantinelleFili],
  },
  {
    name: "Collare rettangolare passaggio filo con anello di ancoraggio",
    slug: "collare-rettangolare-passaggio-filo-anello-ancoraggio",
    categorySlug: "accessori-speciali",
    description:
      "Collare in lamiera S235 2x2,5mm* con anello di passaggio filo",
    informations: {
      articles: [
        {
          code: "300-15",
          description:
            "Collare rettangolare per PASSAGGIO FILO CON ANELLO DI ANCORAGGIO - con bulloneria inclusa",
        },
      ],
    },
    lastModified: "2025-06-12",
    images: [
      collareRettangolarePassaggioFiloAnello,
      collareRettangolarePassaggioFiloAnello2,
    ],
  },
];
