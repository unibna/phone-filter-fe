import React from 'react';
import { useState } from 'react';

import {
    Button,
    Col,
    Form,
    Input,
    Row,
    message,
} from 'antd';

import AuthService from '../../Services/AuthService';


const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const onFinish = (values) => {
        console.log('Success:', values);
        handleLogin(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleLogin = async (values) => {
        await AuthService.login(
                values.email,
                values.password,
        ).then(response => {
            message.success('Login successfully');
            console.log("isLoggedIn:", isLoggedIn)
            setIsLoggedIn(true)
            localStorage.setItem("authToken", JSON.stringify(response.data));
            window.location.href = '/';
        }).catch(error => {
            const errorObjects = error.response.data
            for (const key in errorObjects) {
                switch (key) {
                    case 'email':
                        setEmailError(errorObjects[key][0])
                        break;
                    case 'password':
                        setPasswordError(errorObjects[key][0])
                        break;
                }
            }
        })

        if (isLoggedIn) {
            // await AuthService.me()
        }
    }

    return (
        <div>
            <Row
                justify="center"
                style={{
                    display: "flex",
                }}
            >
                <Col
                    span={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <img
                        alt="illustration_login"
                        style={{
                            maxWidth: '68%',
                            maxHeight: '68%',
                            width: 'auto',
                            height: 'auto',
                            margin: 'auto',
                        }}
                        src="/illustration/login.png"
                    />
                </Col>
    
                <Col
                    span={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            marginTop: '10%',
                        }}
                    >
                        <h1>Login</h1>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            labelAlign="left"
                            wrapperCol={{
                                span: 24,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                validateStatus={emailError ? 'error' : ''}
                                help={emailError ? emailError : ''}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Invalid email!',
                                    },
                                ]}
    
                            >
                                <Input />
                            </Form.Item>
    
                            <Form.Item
                                label="Password"
                                name="password"
                                validateStatus={passwordError ? 'error' : ''}
                                help={passwordError ? passwordError : ''}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
    
                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Form.Item>
    
                        </Form>
                    </div>
    
                </Col>
    
            </Row>
    
        </div>
    );
}


export default Login;
