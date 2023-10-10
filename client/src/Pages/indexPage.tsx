import React from 'react'
import { IPageProps, Page } from '../Components/Page'
import { Button } from 'antd'
import TopLayout from '../Components/topLayout'

export type IIndexPageProps = IPageProps & {}

class indexPage extends React.PureComponent<IIndexPageProps> {
    render() {
        const { title } = this.props

        return (
            <>
                <Page title={title} />
                <TopLayout>
                    <Button>Text</Button>
                </TopLayout>
            </>
        )
    }
}

export default indexPage
