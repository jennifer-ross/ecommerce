import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import type { MenuProps } from 'antd'
import LoginOutlinedIcon from '../icons/LoginOutlined'
import AppRegistrationOutlinedIcon from '../icons/AppRegistrationOutlined'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const IconStyles: React.CSSProperties = {
    width: '20px',
    height: '20px',
}

// <Item key="1">
//     <Link to="/login">
//     <span> Sign In</span>
// </Link>
// </Item>
// <Menu.Item key="2">
//     <Link to="/signup">
//         <span> Sign In</span>
//     </Link>
// </Menu.Item>

const items: MenuItem[] = [
    getItem(
        <Link to="/signin">
            <LoginOutlinedIcon style={IconStyles} />
            <span>Sign In</span>
        </Link>,
        'signIn',
    ),
    getItem(
        <Link to="/signup">
            <AppRegistrationOutlinedIcon style={IconStyles} />
            <span>Sign Up</span>
        </Link>,
        'signUp',
    ),
]

export class HeadNav extends React.PureComponent {
    render() {
        return (
            <>
                <div className="header-col header-brand">
                    <h5>Dashboard</h5>
                </div>
                <div className="header-col"></div>
                <div className="header-col header-nav">
                    <Menu mode="horizontal" items={items} />
                </div>
            </>
        )
    }
}

export default HeadNav
