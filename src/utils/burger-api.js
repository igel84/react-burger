const NORMA_API = 'https://norma.nomoreparties.space/';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsRequest() {
  return fetch(`${NORMA_API}api/ingredients`)
    .then(checkReponse)
}

export function postOrderRequest(items) {
  return fetch(`${NORMA_API}api/orders`, {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients": items})
    })
    .then(checkReponse)
}