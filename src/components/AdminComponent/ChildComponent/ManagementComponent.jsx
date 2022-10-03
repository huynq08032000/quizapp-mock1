import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import '../css/index.css';
import MenuItem from "./MenuItem";

const { Content, Footer, Sider } = Layout;
const ManagementComponent = ({ component }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
        >
            <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            >
                <MenuItem title='Question' href='/admin/questions' />
                <MenuItem title='User' href='/admin/users' />
            </Sider>
            <Layout className="site-layout" style={{ paddingTop: "10px" }}>
                <Content
                    style={{
                        margin: "0 16px"
                    }}
                >
                    {component}
                </Content>
                <Footer
                    style={{
                        textAlign: "center"
                    }}
                >
                    Nguyen Quang Huy - HuyNQ129
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ManagementComponent