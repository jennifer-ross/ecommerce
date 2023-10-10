import React from 'react'
import { CustomIconComponentProps } from '@ant-design/icons/es/components/Icon'
import Icon from '@ant-design/icons'

const LoginOutlinedSvg = () => (
    <svg
        className=""
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="LoginOutlinedIcon"
    >
        <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"></path>
    </svg>
)

const LoginOutlinedIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={LoginOutlinedSvg} {...props} />
)

export default LoginOutlinedIcon
