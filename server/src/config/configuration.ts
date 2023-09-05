import * as process from 'process'
import * as path from 'path'
import * as fs from 'fs'

export default () => ({
    CLIENT_BUILD_PATH: path.join(process.cwd(), 'client'),
    JWT_SECRET: fs.readFileSync(
        path.join(process.cwd(), 'src/jwtRS256.key'),
        'utf8',
    ),
    JWT_REFRESH_SECRET: fs.readFileSync(
        path.join(process.cwd(), 'src/jwtRS256.key'),
        'utf8',
    ),
    JWT_EXPIRES: '60s',
    SITE_URL: 'my.site.com',
})
