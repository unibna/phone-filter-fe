import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Descriptions, message } from 'antd';

import AuthService from '../../Services/AuthService';


const API_URL = process.env.REACT_APP_API_URL;

const getUserInfoItem = (key, label, children) => {
    return {
        key: key,
        label: label,
        children: children,
    }
    
}

const UserDetail = () => {
    const [token, setToken] = useState(AuthService.getToken());
    const [userDetailItems, setUserDetailItems] = useState([]);

    const handleGetUserDetail = async () => {
        try {
            const response = await axios.get(
                API_URL + '/user/me', 
                {
                    headers: {
                        'Authorization': `Bearer ${token.access}`
                    },
                }
            )
            
            if (response.status === 200) {
                const { username, email, first_name, last_name } = response.data;
                setUserDetailItems([
                    getUserInfoItem('username', 'Username', username),
                    getUserInfoItem('email', 'Email', email),
                    getUserInfoItem('first_name', 'First Name', first_name),
                    getUserInfoItem('last_name', 'Last Name', last_name),
                ])
            }

        } catch (error) {
            message.error(error);
        }
    };

    const getUserDetail = () => {
        handleGetUserDetail()
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    return (
        <div>
            <Descriptions 
                title="User Detail" 
                column={2}
                items={userDetailItems} 
            />
        </div>
    )
}


export default UserDetail;
