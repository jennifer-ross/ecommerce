import { makeAutoObservable } from 'mobx'

import { createLsManager } from '../../utils/createLsManager'

const storageManager = createLsManager('SESSION_ID')

export class SessionService {
    sessionId = storageManager.getValue()

    constructor() {
        makeAutoObservable(this)
    }

    dispose = () => {
        storageManager.setValue('')
        this.sessionId = ''
    }

    setSessionId = (sessionId: string, keep = true) => {
        if (keep) {
            storageManager.setValue(sessionId)
        }
        this.sessionId = sessionId
    }
}

export default SessionService
