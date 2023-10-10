import React, { FormEventHandler } from 'react'
import { IPageProps, Page } from '../Components/Page'
import { Button, Select, Space } from 'antd'
import notepack from 'notepack.io'
import axios, { AxiosHeaders } from 'axios'
import { ApiClientFactory } from '../Utils/apiClientFactory'
import TopLayout from '../Components/topLayout'
import { Input } from 'antd'

const { TextArea } = Input

export type IDevPageProps = IPageProps & {}

class devPage extends React.PureComponent<IDevPageProps> {
    constructor(props: IDevPageProps) {
        super(props)
    }

    state = {
        text: `{ "login": "admin", "password": "admin"}`,
        endpoint: 'api/auth',
        response: '',
        method: 'post',
    }

    onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget
        const text = textarea.value

        this.setState({ text })
    }

    onInputEndpoint = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget
        const endpoint = input.value

        this.setState({ endpoint })
    }

    onSelect = (value: string) => {
        this.setState({ method: value })
    }

    render() {
        const { title } = this.props
        const { text, endpoint, response, method } = this.state

        const factory = new ApiClientFactory(
            'http://127.0.0.1:3000/',
            new AxiosHeaders(),
        )
        const client = factory.createClient()

        return (
            <>
                <Page title={title} />
                <TopLayout>
                    <TextArea
                        rows={4}
                        placeholder="place json data here"
                        value={text}
                        onInput={this.onInput}
                        style={{ marginBottom: '15px' }}
                    />
                    <Input
                        addonBefore={client.apiBaseUrl}
                        placeholder="place endpoint here"
                        value={endpoint}
                        onInput={this.onInputEndpoint}
                        style={{ marginBottom: '15px' }}
                    />
                    <Space wrap direction={'vertical'}>
                        <Select
                            value={method}
                            style={{ width: 120 }}
                            onChange={this.onSelect}
                            options={[
                                { value: 'post', label: 'post' },
                                { value: 'get', label: 'get' },
                                // { value: 'put', label: 'put' },
                                // { value: 'delete', label: 'delete' },
                            ]}
                        />
                    </Space>
                    <Button
                        onClick={() => {
                            console.log(endpoint)
                            console.log(text)

                            // const data = notepack.encode(text)
                            const data = text

                            console.log(data)

                            switch (method) {
                                case 'get': {
                                    client
                                        .get(endpoint, JSON.parse(text))
                                        .then((r) => {
                                            console.log(r)
                                            // const data = notepack.decode(r)
                                            const data = r
                                            console.log(data)

                                            this.setState({
                                                response: JSON.stringify(data),
                                            })
                                        })
                                    break
                                }
                                case 'post': {
                                    client
                                        .post(endpoint, JSON.parse(text))
                                        .then((r) => {
                                            console.log(r)
                                            // const data = notepack.decode(r)
                                            const data = r
                                            console.log(data)

                                            this.setState({
                                                response: JSON.stringify(data),
                                            })
                                        })
                                    break
                                }
                            }

                            return null
                        }}
                    >
                        Send
                    </Button>
                    <TextArea
                        contentEditable={false}
                        disabled={true}
                        rows={12}
                        placeholder="response data here"
                        value={response}
                        style={{ marginTop: '15px' }}
                    />
                </TopLayout>
            </>
        )
    }
}

export default devPage
