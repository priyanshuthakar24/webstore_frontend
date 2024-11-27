import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { message } from 'antd';

const useSignup = () => {
    const nav = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const signupUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/signup`, values, {
                withCredentials: true
            });
            if (response.status === 201) {
                message.success(response.data.message);
                return nav('/auth/verify-email');
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            message.error(error.response.data.message)
        } finally { setLoading(false) }
    }
    return { loading, signupUser, error }

}

export default useSignup