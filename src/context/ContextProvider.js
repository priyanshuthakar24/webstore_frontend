import { createContext, useContext, useState } from "react";
import axios from "axios";

import { message } from "antd";


const StateContext = createContext();

const initalState = {
    chat: false,
    cart: false,
    notification: false,

}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [user, setuser] = useState(false);
    const [isClicked, setisClicked] = useState(initalState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [page, setPage] = useState(1);
    const [productDetail, setProductDetail] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const handleClick = (clicked) => {
        setisClicked({ ...isClicked, [clicked]: true });
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false)
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false)
    };
    // ! Fetch the product detail
    const fetchproductdetail = async (id) => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/api/user/productdetail`,
                {
                    params: { id },
                }
            );
            if (res) {
                setProductDetail(res.data);
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const addNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initalState, setisClicked, setActiveMenu, setMode, setColor, themeSettings, setThemeSettings, user, setuser, page, setPage, fetchproductdetail, productDetail, setProductDetail, notifications, addNotification, clearNotifications }}
    >{children}</StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);