import React from 'react'
import { IPageProps, Page } from '../Components/Page'
import { Link } from 'react-router-dom'
import {
    Layout,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch,
    Space,
} from 'antd'
import { HeadNav } from '../Components/layout/HeadNav'
import LoginBg from '../assets/login-bg-2.svg'

const { Title } = Typography
const { Header, Footer, Content } = Layout

export type ILoginPageProps = IPageProps & {}

class LoginPage extends React.PureComponent<ILoginPageProps> {
    render() {
        const { title } = this.props

        return (
            <>
                <Page title={title} />
                <Layout className="layout-default layout-signin">
                    <Header>
                        <HeadNav />
                    </Header>
                    <Content className="signin">
                        <Row gutter={[24, 0]} justify="space-around">
                            <Col
                                xs={{ span: 24, offset: 0 }}
                                lg={{ span: 6, offset: 2 }}
                                md={{ span: 12 }}
                            >
                                <Title className="mb-15">Sign In</Title>
                                <Title
                                    className="font-regular text-muted"
                                    level={5}
                                >
                                    Enter your email and password to sign in
                                </Title>
                                <Form layout="vertical" className="row-col">
                                    <Form.Item
                                        className="username"
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item
                                        className="username"
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Password" />
                                    </Form.Item>

                                    <Form.Item
                                        name="remember"
                                        className="aligin-center"
                                        valuePropName="checked"
                                    >
                                        <div>
                                            <Switch defaultChecked />
                                            Remember me
                                        </div>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: '100%' }}
                                        >
                                            SIGN IN
                                        </Button>
                                    </Form.Item>
                                    <p className="font-semibold text-muted">
                                        Don't have an account?&nbsp;
                                        <Link
                                            to="/sign-up"
                                            className="text-dark font-bold"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                </Form>
                            </Col>
                            <Col
                                className="sign-img"
                                style={{ padding: 12 }}
                                xs={{ span: 24 }}
                                lg={{ span: 12 }}
                                md={{ span: 12 }}
                            >
                                <img
                                    src={LoginBg}
                                    draggable={false}
                                    alt="Login background image"
                                />
                            </Col>
                        </Row>
                    </Content>
                    <Footer>
                        <p className="copyright">
                            Copyright © {new Date().getFullYear()} by Jennifer
                            Ross
                        </p>
                    </Footer>
                </Layout>
            </>
        )
    }
}

export default LoginPage
