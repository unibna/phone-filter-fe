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


const Register = () => {
    const [usernameError, setUsernameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [password2Error, setPassword2Error] = useState(null)
    const [adminKeyError, setAdminKeyError] = useState(null)

    const onFinish = (values) => {
        console.log('Success:', values);
        handleRegister(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleRegister = (values) => {
        AuthService.register(
                values.username,
                values.email,
                values.password,
                values.password2,
                values.admin_key
        ).then(response => {
            message.success('Register success')
            console.log("Response:", response)
            window.location.href = '/auth/login'

        }).catch(error => {
            const errorObjects = error.response.data
            for (const key in errorObjects) {
                switch (key) {
                    case 'username':
                        setUsernameError(errorObjects[key][0])
                        break;
                    case 'email':
                        setEmailError(errorObjects[key][0])
                        break;
                    case 'password':
                        setPasswordError(errorObjects[key][0])
                        break;
                    case 'password2':
                        setPassword2Error(errorObjects[key][0])
                        break;
                    case 'admin_key':
                        setAdminKeyError(errorObjects[key][0])
                        break;
                }
            }
        })
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
                        alt="illustration_register"
                        style={{
                            maxWidth: '68%',
                            maxHeight: '68%',
                            width: 'auto',
                            height: 'auto',
                            margin: 'auto',
                        }}
                        src="/illustration/register.png"
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
                        <h1>Register</h1>
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
                                label="Username"
                                name="username"
                                validateStatus={usernameError ? 'error' : ''}
                                help={usernameError ? usernameError : ''}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
    
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
                                label="Confirmed Password"
                                name="password2"
                                validateStatus={password2Error ? 'error' : ''}
                                help={password2Error ? password2Error : ''}
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
                                label="Admin Key"
                                name="admin_key"
                                validateStatus={adminKeyError ? 'error' : ''}
                                help={adminKeyError ? adminKeyError : ''}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Admin key!',
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
                                    Sign up
                                </Button>
                            </Form.Item>
    
                        </Form>
                    </div>
    
                </Col>
    
            </Row>
    
        </div>
    );
}


export default Register;
