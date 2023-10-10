import React, { PropsWithChildren } from 'react'
import { Layout, Menu, Row } from 'antd'

const { Header, Footer, Content } = Layout

const layoutStyle: React.CSSProperties = {
    height: '100%',
}

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
}

const contentStyle: React.CSSProperties = {
    padding: '0 50px',
    margin: '16px 0',
}

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
}

export class TopLayout extends React.PureComponent<PropsWithChildren> {
    render() {
        const { children } = this.props

        return (
            <Layout className="layout" style={layoutStyle}>
                <Header style={headerStyle}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={[]}
                    />
                </Header>
                <Content style={contentStyle}>
                    <Row className={'site-layout-content'}>{children}</Row>
                </Content>
                <Footer style={footerStyle}>Copyright ©2023</Footer>
            </Layout>
        )
    }
}

export default TopLayout
