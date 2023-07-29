import React from 'react'
import { IPageProps, Page } from '../Components/Page'
import { Button } from '../Components/Button'
import notepack from 'notepack.io'
import axios from 'axios'

export type IDevPageProps = IPageProps & {}

class devPage extends React.PureComponent<IDevPageProps> {
    render() {
        const { title } = this.props

        return (
            <>
                <Page title={title} />
                <Button
                    style={'Outlined'}
                    onClick={() => {
                        const data = notepack.encode({
                            login: 'admin',
                            password: 'admin',
                        })

                        axios
                            .post('http://127.0.0.1:3000/api/auth', data)
                            .then((r) => {
                                console.log(r)
                            })

                        console.log(data)
                        return null
                    }}
                >
                    Text
                </Button>
            </>
        )
    }
}

export default devPage
