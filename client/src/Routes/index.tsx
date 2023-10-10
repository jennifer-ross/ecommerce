import IndexPage from '../Pages/indexPage'
import DevPage from '../Pages/devPage'
import { IRoute } from '../Interfaces/route'
import LoginPage from '../Pages/loginPage'

export const routes: Array<IRoute> = [
    {
        path: '/',
        element: <IndexPage title={'Main Page'} />,
    },
    {
        path: '/dev',
        element: <DevPage title={'Dev Page'} />,
    },
    {
        path: '/signin',
        element: <LoginPage title={'Sign In'} />,
    },
]
