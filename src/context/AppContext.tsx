import { createContext, useEffect, useState } from "react";

import useStorage from "../utils/useStorage";
import { Filter, Product, User } from "./types";
import {
  fetchAllProducts,
  getUserCart,
  updateUserCart,
} from "../utils/fetchData";

export type ContextType = {
  login: (username: string, password: string) => void;
  isAuth: boolean;
  allProducts: Product[];
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  purgeFromCart: (id: string) => void;
  filterProducts: (filter: Filter) => void;
  brands: string[];
  types: string[];
};

export const AppContext = createContext<ContextType>({
  login: (username: string, password: string) => {},
  isAuth: false,
  allProducts: [],
  cart: [],
  addToCart: (id: string) => {},
  removeFromCart: (id: string) => {},
  purgeFromCart: (id: string) => {},
  filterProducts: (filter: Filter) => {},
  brands: [],
  types: [],
});

type AppContextProviderProps = {
  children: JSX.Element;
};

// DEBUG
const userId = "antonangelov1234";
const password = "test5";

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useStorage<User | null>("user", {
    username: userId,
    password,
  });
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    fetchAllProducts().then((products) => {
      setAllProducts(products);
      setFiltered(products);
    });
  }, []);

  useEffect(() => {
    const _types = new Set<string>();
    const _brands = new Set<string>();
    allProducts.forEach((item) => {
      _types.add(item.type);
      _brands.add(item.brand);
    });
    setTypes([..._types]);
    setBrands([..._brands]);
  }, [allProducts]);

  useEffect(() => {
    if (user) getCart();
  }, [user]);

  const getCart = async () => {
    if (user) {
      getUserCart(user)
        .then((res) => {
          setCart(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          console.log("Something went wrong: ", err);
          setIsAuth(false);
        });
    }
  };

  const login = (user: string, pass: string) => {
    if (user && pass) {
      setUser({
        username: user,
        password: pass,
      });
    }
  };

  const updateCart = async (data: string[]) => {
    const res = await updateUserCart(user!, data);
    if (res.data) setCart(res.data);
    else console.log("Something went wrong: ", res);
  };

  const addToCart = (id: string) => {
    if (!user) return;
    updateCart([...cart, id]);
  };

  const removeFromCart = (id: string) => {
    if (!user) return;

    const index = cart.findIndex((item) => item === id);
    if (index === -1) return;

    const data = [...cart];
    data.splice(index, 1);
    updateCart(data);
  };

  const purgeFromCart = (id: string) => {
    if (!user) return;

    const data = cart.filter((product) => product !== id);
    updateCart(data);
  };

  const filterProducts = (filter: Filter) => {
    setFiltered(
      allProducts.filter((product) => {
        return (
          (filter.brand !== "" ? filter.brand === product.brand : true) &&
          (filter.type !== "" ? filter.type === product.type : true) &&
          (filter.discounted !== null
            ? filter.discounted === !!product.discount
            : true)
        );
      })
    );
  };

  const context = {
    login,
    isAuth,
    allProducts: filtered,
    cart,
    addToCart,
    removeFromCart,
    purgeFromCart,
    filterProducts,
    types,
    brands,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
