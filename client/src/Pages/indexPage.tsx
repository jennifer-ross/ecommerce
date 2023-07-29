import React from 'react'
import { IPageProps, Page } from '../Components/Page'
import { Button } from '../Components/Button'

export type IIndexPageProps = IPageProps & {}

class indexPage extends React.PureComponent<IIndexPageProps> {
    render() {
        const { title } = this.props

        return (
            <>
                <Page title={title} />
                <Button style={'Outlined'}>Text</Button>
            </>
        )
    }
}

export default indexPage
