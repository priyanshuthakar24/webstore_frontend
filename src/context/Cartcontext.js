import { message } from "antd";
import axios from "axios";
import { createContext, useContext, useState } from "react";


const Cartcontext = createContext();


export const CartcontextProvider = ({ children }) => {


    const [cartcount, setcartcount] = useState(0);
    const [cart, setCart] = useState(null);

    const [isLoading, setIsLoading] = useState(false)

    const fetchCart = async () => {
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
    };
    const addToCart = async (_id, quantity) => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/cart/add`,
                { productId: _id, quantity },
                { withCredentials: true }
            );
            if (res) {
                message.success("product Added to cart");
                setcartcount((preCount) => preCount + quantity)
            }
        } catch (error) {
            message.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    const removeFromCart = async (ID, quantity) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API}/api/cart/remove/${ID}`,
                { withCredentials: true }
            );
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
