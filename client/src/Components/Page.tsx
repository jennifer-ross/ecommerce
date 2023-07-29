import { Helmet } from 'react-helmet-async'
import React, { PropsWithChildren } from 'react'

export type IPageProps = {
    title: string
    description?: string
    ogType?: string
    creator?: string
}

export class Page extends React.PureComponent<PropsWithChildren<IPageProps>> {
    render() {
        const { title, description, ogType, creator, children } = this.props

        return (
            <>
                <Helmet>
                    <title>{`${title}`}</title>
                    <meta property="og:title" content={title} />
                    <meta name="twitter:title" content={title} />
                    {description ? (
                        <>
                            <meta name="description" content={description} />
                            <meta
                                property="og:description"
                                content={description}
                            />
                            <meta
                                name="twitter:description"
                                content={description}
                            />
                        </>
                    ) : null}
                    {ogType ? (
                        <>
                            <meta name="twitter:card" content={ogType} />
                            <meta property="og:type" content={ogType} />
                        </>
                    ) : null}
                    {creator ? (
                        <meta name="twitter:creator" content={creator} />
                    ) : null}
                    {children}
                </Helmet>
            </>
        )
    }
}

export default Page
