import React  from 'react';
import { useEffect, useState } from 'react';

import { FileSearchOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Flex, Layout, Menu, theme, Row } from 'antd';
import { Outlet } from 'react-router-dom';

import AuthService from '../../Services/AuthService';


const { Header, Content, Sider } = Layout;
const authLayoutStyle = {
  minHeight: 'calc(100vh)',
}
const contentStyle = {
  margin: '24px 16px 0',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 112px)',
}
const menuStyle = {
  minHeight: 'calc(100vh)',
}
const headerLogoStyle = {
  float: 'left',
  width: '64px',
  height: '32px',
  margin: '16px 24px 16px 10px',
}


const items = [
  { 
    path: "/user",
    key: "user",
    icon: React.createElement(UserOutlined),
    label: (
      <a href="/user">Me</a>
    ),
  },
  {
    path: "/file",
    key: "file",
    icon: React.createElement(FileSearchOutlined),
    label: (
      <a href="/file">File</a>
    ),
  }
]

const AuthLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={authLayoutStyle}>
      <Layout>
        
        <Content
          style={contentStyle}
        >
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};


export default AuthLayout;
