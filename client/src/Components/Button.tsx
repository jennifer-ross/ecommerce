import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'
import { IStyledComponentProps } from '../Interfaces/styled'

const BaseStyledButton = styled.button<IStyledComponentProps>`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 700;
    text-transform: unset;
    min-width: 64px;
    padding: 6px 12px;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.font.light};
    background: ${(props) => props.theme.colors.secondary.main};
    transition: 0.3s;

    &:hover,
    &:focus {
        outline: none;
    }

    &:hover {
        background: ${(props) => props.theme.colors.secondary.dark};
    }
`

const OutlineStyledButton = styled(BaseStyledButton)`
    border-width: 0.5px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.secondary.light};
    background: transparent;
    color: ${(props) => props.theme.colors.secondary.main};

    &:hover {
        border-width: 1.5px;
        border-style: solid;
        border-color: ${(props) => props.theme.colors.secondary.main};
        background: ${(props) => props.theme.colors.secondary.lighter};
    }
`

export type IButtonProps = PropsWithChildren & {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    onPress?: () => void
    style: 'Contained' | 'Outlined' | 'Soft' | 'Text'
}

export class Button extends React.PureComponent<IButtonProps> {
    render() {
        const { children, style, onClick } = this.props

        switch (style) {
            case 'Outlined':
                return (
                    <OutlineStyledButton onClick={onClick}>
                        {children}
                    </OutlineStyledButton>
                )
        }

        return <BaseStyledButton onClick={onClick}>{children}</BaseStyledButton>
    }
}
