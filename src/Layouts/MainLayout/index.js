import React from 'react';
import { useEffect, useState } from 'react';

import { FileSearchOutlined, UserOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, Flex, Layout, Menu, theme, Row } from 'antd';
import { Outlet } from 'react-router-dom';

import AuthService from '../../Services/AuthService';


const { Header, Content, Sider } = Layout;
const mainLayoutStyle = {
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
const items = [
  {
    label: 'User',
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        path: '/user/detail',
        label: (
          <a href="/user/detail">Me</a>
        ),
        key: 'user-register',
      },
      {
        path: '/auth/register',
        label: (
          <a href="/auth/register">Register</a>
        ),
        key: 'auth-register',
      },
      {
        path: '/auth/logout',
        label: (
          <a href="/auth/logout">Logout</a>
        ),
        key: 'auth-logout',
      },
    ],
  },
  {
    label: 'File',
    key: 'file',
    icon: <FileSearchOutlined />,
    children: [
      {
        path: '/files',
        label: (
          <a href="/files">File Listing</a>
        ),
        key: 'files',
      },
      {
        path: '/files/upload',
        label: (
          <a href="/files/upload">File Uploading</a>
        ),
        key: 'files-upload',
      },
    ],
  }
]

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={mainLayoutStyle}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        backgroundColor={colorBgContainer}
      >
        <div className="demo-logo-vertical" />
        <Menu 
          theme="light" 
          style={menuStyle} 
          mode="inline" 
          defaultSelectedKeys={['files-upload']} 
          selectedKeys={[window.location.pathname.split('/')[1]]}
          items={items} 
        />
      </Sider>

      <Layout>

        <Header
          wrap={true}
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row justify="end">
            <Col span={4} justify="end" style={{

            }}>
              <div style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -20%)', 
              }}>
                <Flex gap="middle" align="end" vertical>
                  <h2>DataValidator</h2>
                </Flex>
              </div>
            </Col>
          </Row>
        </Header>

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


export default MainLayout;
