let app = {}
let remote = require('electron').remote
let path = require('path')
if (remote) {
    app = remote.app
} else {
    app = require('electron').app
}

export default {
    dbConnct: {
        sqlite: {
            host: '',
            user: '',
            password: '',
            database: ''
        }
    },
    dbPath: {
        sqlite:""
    },
    userDataPath: app.getPath('userData'),
    os: '',
    isEnviromentReady: false,
    isNedbReady: false,
    mainWindowHandle: 0,
    maxNum: 1000000,
    indexPath: '',
    accessToken: ''
}
