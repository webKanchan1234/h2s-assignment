import React, { createContext, useContext, useReducer } from "react";


const CartStateContext = createContext()
const CartCreateDispatchContext = createContext()


const cartReducer = (state, action) => {

    switch (action.type) {
        case "ADD": {
            const { product } = action
            const exist = state.products.get(product.id)
            const qty = exist ? exist.qty + 1 : 1
            const newProd = new Map(state.products)
            newProd.set(product.id, { product, qty })
            return { ...state, products: newProd }
        }
        case "UPDATE_QTY": {
            const { id, qty } = action;
            const newProd = new Map(state.products);
            if (qty <= 0) newProd.delete(id);
            else {
                const entry = newProd.get(id);
                if (entry) newProd.set(id, { ...entry, qty });
            }
            return { ...state, products: newProd }; // ✅ FIXED
        }
        case "REMOVE": {
            const newProd = new Map(state.products);
            newProd.delete(action.id);
            return { ...state, products: newProd }; // ✅ FIXED
        }
        default:
            return state
    }
}




const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, { products: new Map() })

    return (
        <CartStateContext.Provider value={state}>
            <CartCreateDispatchContext.Provider value={dispatch}>
                {children}
            </CartCreateDispatchContext.Provider>
        </CartStateContext.Provider>
    )

}

export default CartProvider


export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartCreateDispatchContext);
