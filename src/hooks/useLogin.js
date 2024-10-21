import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../context/Authcontext";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, values, {
                withCredentials: true
            })
            if (res.status === 200) {
                message.success(res.data.message);
                login(res.data.user);
                return nav('/');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            message.error(error.response.data.message);
        } finally { setLoading(false) }
    };
    return { loading, error, loginUser };
}

export default useLogin;