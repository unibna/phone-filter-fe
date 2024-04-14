import { useState } from 'react';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

import AuthService from '../../Services/AuthService';


const AuthPage = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            {currentUser ? <LoginPage /> : <RegisterPage />}
        </div>
    );
};

export default AuthPage;
