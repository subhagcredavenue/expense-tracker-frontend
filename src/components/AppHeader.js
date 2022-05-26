import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Avatar,
  Row,
  Col,
  Dropdown,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getSession } from "../utility";
import logo from '../icon.webp'
import { sendTransactionHistory } from "../API";
const { Header, Content, Footer } = Layout;

const AppHeader = ({ children, logout }) => {
  const menu = (
    <Menu
      items={[
        {
          onClick: () => sendTransactionHistory(),
          
          label: "Email transactions",
          key: "1",
        },
        
        {
          onClick: () => logout(),
          danger: true,
          label: "Log out",
          key: "2",
        },
      ]}
    />
  );

  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <Row >
          <Col  flex="auto" style={{ textAlign: "left" }}>
            <div className="logo"><img src={logo} width="70"/>Expense Tracker</div>
          </Col> 
          <Col  flex="120px" style={{width:"100px"}}>
            <Dropdown overlay={menu} trigger={["hover"]}>
              <Space className="white">
                {getSession().name}
                <DownOutlined />
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 16,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Credavenue ©2022
      </Footer>
    </Layout>
  );
};

export default AppHeader;
