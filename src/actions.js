import axios from "axios";

export const NOT_EKLE_API = "NOT_EKLE_API";
export const NOT_SIL_API = "NOT_SIL_API";
export const GET_INITIAL_NOTS = "GET_INITIAL_NOTS";

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: NOT_EKLE_API, payload: res.data.json });
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: NOT_SIL_API, payload: id });
      }
    })
    .catch((error) => console.log(error));
};
