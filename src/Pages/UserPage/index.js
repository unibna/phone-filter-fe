import { React, useEffect } from 'react';

import AuthService from '../../Services/AuthService';


const UserPage = () => {
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
          window.location.href = "/auth";
        }
      })

    return (
        <div>
            <h1>User Page</h1>
        </div>
    )
}

export default UserPage;