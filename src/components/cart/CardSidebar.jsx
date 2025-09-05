import React from "react";
import { useCartDispatch, useCartState } from "./CartProvider";

export default function CartSidebar({ open, onClose }) {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const items = Array.from(state.products.values());
  const total = items.reduce((s, e) => s + e.product.price * e.qty, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[360px] transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      } bg-white shadow-lg`}
    >
      <div className="p-4">
        <button onClick={onClose} className="mb-4 w-10 h-10 round rounded-full cursor-pointer bg-red-400 text-white">X</button>
        <h2 className="text-xl font-bold mb-4">Cart ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">₹{product.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({ type: "UPDATE_QTY", id: product.id, qty: qty - 1 })
                  }
                >
                  -
                </button>
                <span>{qty}</span>
                <button
                  onClick={() =>
                    dispatch({ type: "UPDATE_QTY", id: product.id, qty: qty + 1 })
                  }
                >
                  +
                </button>
                <button
                  onClick={() => dispatch({ type: "REMOVE", id: product.id })}
                  className="text-red-500 "
                >
                  x
                </button>
              </div>
            </div>
          ))
        )}
        <div className="mt-4 font-bold">Total: ₹{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
