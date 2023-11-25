import { NOT_EKLE_API, NOT_SIL_API, GET_INITIAL_NOTS } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: localStorageStateOku(s10chLocalStorageKey) || [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
  // notlar: [
  //   {
  //     id: "75g1IyB8JLehAr0Lr5v3p",
  //     date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
  //     body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
  //   },
  // ],
};

export const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE_API:
      localStorageStateYaz(s10chLocalStorageKey, [
        ...state.notlar,
        action.payload,
      ]);
      return {
        ...state,
        notlar: [...state.notlar, action.payload],
      };

    case NOT_SIL_API:
      const updateNotes = localStorageStateOku(s10chLocalStorageKey).filter(
        (item) => item.id !== action.payload
      );
      localStorageStateYaz(s10chLocalStorageKey, updateNotes);

      return {
        ...state,
        notlar: state.notlar.filter((item) => item.id !== action.payload),
      };

    case GET_INITIAL_NOTS:
      const initial = baslangicNotlariniGetir(s10chLocalStorageKey);
      console.log(initial);
      return {
        ...state,
        notlar: initial ? initial.notlar : state.notlar,
      };

    default:
      return state;
  }
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}
