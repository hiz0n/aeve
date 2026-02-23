import { useState, createContext, useContext } from "react";
// createContext :: 전역상태(공용저장소)를 만드는 훅
// aaa.Provider : 값을 저장, useContext(aaa) 값을 꺼냄
import type { ReactNode } from "react";
import type { Product } from "../types/products";
import type { Cart } from "../types/cart";

export interface CartcontextValue {
  cart: Cart;
  add: (p: Product, qty?: number) => void; // 상품 추가
  inc: (id: number) => void; // 1씩 증가
  dec: (id: number) => void; // 1씩 감소
  remove: (id: number) => void; // 상품 삭제
  clear: () => void; // 장바구니 비우기
  totalCount: number;
  totalPrice: number;
}

const CartCtx = createContext<CartcontextValue | null>(null);

const CartContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);

  const add = (p: Product, qty: number = 1) => {
    setCart((item) => {
      const found = item.find((kk) => kk.product.id === p.id);
      if (found) {
        return item.map((bb) =>
          bb.product.id == p.id ? { ...bb, qty: bb.qty + Math.max(1, qty) } : bb,
        );
      }
      return [...item, { product: p, qty: Math.max(1, qty) }];
    });
  };

  const inc = (id: number) => {
    setCart((item) => item.map((kk) => (kk.product.id === id ? { ...kk, qty: kk.qty + 1 } : kk)));
  };

  const dec = (id: number) => {
    setCart((item) => item.map((kk) => (kk.product.id === id ? { ...kk, qty: kk.qty - 1 } : kk)));
  };

  const remove = (id: number) => {
    setCart((item) => item.filter((kk) => kk.product.id !== id));
  };

  const clear = () => setCart([]);

  let totalCount = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalCount += item.qty;
    totalPrice += item.qty * item.product.price;
  });

  const value: CartcontextValue = {
    cart,
    add,
    inc,
    dec,
    remove,
    clear,
    totalCount,
    totalPrice,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
};

export default CartContext;

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("공용 변수의 값을 받지 못했습니다");
  return ctx;
};
