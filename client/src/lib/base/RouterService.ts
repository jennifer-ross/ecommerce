import { makeAutoObservable } from 'mobx'
import { routes as defaultRoutes } from '../../Routes'
import { createBrowserRouter } from 'react-router-dom'

import { Action, Location, To } from 'history'

const browserHistory = createBrowserRouter(defaultRoutes, {
    future: { v7_normalizeFormMethod: true },
})

export class RouterService {
    previousPath = '/'

    router

    location: Location = browserHistory.state.location
    action: Action = browserHistory.state.historyAction

    constructor() {
        makeAutoObservable(this)
        this.router = browserHistory
    }

    updateState() {
        const { location, historyAction } = browserHistory.state
        this.previousPath = this.location?.pathname || '/'
        this.location = location
        this.action = historyAction
    }

    createHref(location: Location) {
        const result = browserHistory.createHref(location)
        this.updateState()
        return result
    }

    push(to: To, state?: any) {
        const result = browserHistory.navigate(to, { state, replace: false })
        this.updateState()
        return result
    }

    replace(to: To, state?: any) {
        const result = browserHistory.navigate(to, { state, replace: true })
        this.updateState()
        return result
    }

    go(delta: number) {
        const result = browserHistory.navigate(delta)
        this.updateState()
        return result
    }

    back() {
        const result = browserHistory.navigate(-1)
        this.updateState()
        return result
    }

    forward() {
        const result = browserHistory.navigate(1)
        this.updateState()
        return result
    }

    // listen(listener: Listener): () => void

    // block(blocker: Blocker) {
    //     const result = browserHistory.state.blockers.set(blocker.name, blocker)
    //     this.updateState()
    //     return result
    // }
}

export default RouterService
