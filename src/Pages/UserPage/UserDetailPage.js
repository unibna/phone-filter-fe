import { React, useEffect } from 'react';

import AuthService from '../../Services/AuthService';
import UserDetail from '../../Components/User/UserDetail'


const UserDetailPage = () => {
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            window.location.href = "/auth";
        }
    })

    return (
        <div>
            <UserDetail />
        </div>
    )
}

export default UserDetailPage;