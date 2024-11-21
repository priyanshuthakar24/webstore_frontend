import { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import { message } from 'antd';


const Wishlistcontext = createContext();

export const WishlistcontextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistarray, setWishlistarray] = useState();
    const addToWishlist = async (productId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/wishlist/add`, {
                productId,
            }, { withCredentials: true });
            if (response) {
                setWishlistarray(response.data.wishlist);
                message.success(response.data.message)
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/wishlist/remove`, {
                productId
            }, { withCredentials: true });
            if (response) {
                setWishlistarray(response.data.wishlist);
                setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
                message.success(response.data.message)
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };
    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/wishlist/all`, { withCredentials: true });
            if (response) {
                setWishlist(response.data.wishlist);
                setWishlistarray(response.data.wishlist?.map((item) => item._id))
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };
    useEffect(() => {
        fetchWishlist()
    }, [setWishlist])
    return (<Wishlistcontext.Provider value={{ addToWishlist, wishlist, fetchWishlist, removeFromWishlist, wishlistarray, setWishlistarray }} >{children}</Wishlistcontext.Provider>)
}

export const useWishlist = () => useContext(Wishlistcontext);