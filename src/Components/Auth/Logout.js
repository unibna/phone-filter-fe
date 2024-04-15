import { message } from 'antd';

import AuthService from '../../Services/AuthService';


const Logout = () => {
    message.success('Logout success')
    AuthService.logout();
    window.location.href = '/';
    return null;
}


export default Logout;
