import * as process from 'process'
import * as path from 'path'

export default () => ({
    CLIENT_BUILD_PATH: path.join(process.cwd(), 'client'),
})
