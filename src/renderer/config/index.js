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
        mySql: {
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
    mac: '',
    os: '',
    macIndex: 0,
    isEnviromentReady: false,
    isNedbReady: false,
    mainWindowHandle: 0,
    maxNum: 1000000,
    indexPath: '',
    accessToken: ''
}
