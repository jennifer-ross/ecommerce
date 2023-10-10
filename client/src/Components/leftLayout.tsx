import React, { PropsWithChildren } from 'react'
import { Layout, Menu, Row } from 'antd'

const { Header, Footer, Content, Sider } = Layout

const layoutStyle: React.CSSProperties = {
    height: '100%',
}

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
}

const contentStyle: React.CSSProperties = {
    margin: '24px 16px 0',
}

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
}

export class LeftLayout extends React.PureComponent<PropsWithChildren> {
    render() {
        const { children } = this.props

        return (
            <Layout className="layout" style={layoutStyle}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken)
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type)
                    }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}
                        items={[]}
                    />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={contentStyle}>
                        <Row className={'site-layout-content'}>{children}</Row>
                    </Content>
                    <Footer style={footerStyle}>Copyright ©2023</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default LeftLayout
