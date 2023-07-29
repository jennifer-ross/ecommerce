import IndexPage from '../Pages/indexPage'
import DevPage from '../Pages/devPage'

export const routes = [
    {
        path: '/',
        element: <IndexPage title={'Main Page'} />,
    },
    {
        path: '/dev',
        element: <DevPage title={'Dev Page'} />,
    },
]
