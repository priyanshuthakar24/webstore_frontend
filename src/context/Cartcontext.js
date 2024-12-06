import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";

import { message } from "antd";


const Cartcontext = createContext();


export const CartcontextProvider = ({ children }) => {

    const [cartcount, setcartcount] = useState(0);
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    // ! Fetch the cart detail 
    const fetchCart = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/cart`,
                {
                    withCredentials: true,
                }
            );
            if (response) {
                setCart(response.data);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }, [])

    // ! Add the product to cart 
    const addToCart = async (_id, quantity, size) => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/cart/add`,
                { productId: _id, quantity, size },
                { withCredentials: true }
            );
            if (res) {
                message.success("product Added to cart");
                setcartcount((preCount) => preCount + quantity)
            }
        } catch (error) {
            message.info(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    // ! Remove the product from the cart
    const removeFromCart = async (ID, quantity, size) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API}/api/cart/remove`, {
                data: {
                    productId: ID,
                    size: size
                }, withCredentials: true
            });
            if (res) {
                message.success(res.data.message);
                setcartcount((preCount) => preCount - quantity)
                fetchCart();
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return <Cartcontext.Provider value={{ addToCart, cartcount, setcartcount, removeFromCart, cart, setCart, fetchCart, isLoading }}>
        {children}
    </Cartcontext.Provider>
}

export const useCartcontext = () => useContext(Cartcontext)
