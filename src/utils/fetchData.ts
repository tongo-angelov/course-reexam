import { User } from "../context/types";

const baseUrl = "http://192.168.168.12:3000";
const cartEndpoint = "/api/users/cart";
const allProductsEndpoint = "/api/products/all";

export const fetchAllProducts = async () => {
  return fetch(`${baseUrl}${allProductsEndpoint}`)
    .then((res) => res.json())
    .then((data) => data.data);
};

// TODO: handle wrong username
export const getUserCart = async (user: User) => {
  return fetch(`${baseUrl}${cartEndpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: user.username + "-" + user.password,
    },
  }).then((res) => res.json());
};

/**
 * @description A post request, that will update the whole user cart
 * @param cart Array from product ids
 * @example
 * const cartItems = ["8c9b4d7c", "8c9b4d7c", "9b1a16d0", "adc7d16e"]
 * await updateUserCart(cartItems);
 * @todo No try/catch logic has been implemented. Add one, if needed.
 */
export const updateUserCart = async (user: User, cart: string[]) => {
  return fetch(`${baseUrl}${cartEndpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: user.username + "-" + user.password,
    },
    body: JSON.stringify({ cart }),
  }).then((res) => res.json());
};
