'use strict'

const fs = require('fs')
const path = require('path')
const SQL = require('sqlite3').verbose();
let DB
let databasefile = 'base.db'
let shemafile = 'schema.sql'
const api = require('./api/comItem')

export const dbOpen = () => {
    try {
        console.log(databasefile);
        console.log(__dirname);
        if (!DB || !DB.open) {
            DB = new SQL.Database(path.resolve(__dirname, databasefile), SQL.OPEN_READWRITE, (err) => {
                console.log("sqliteConnection")
                if (err) {
                    console.log("sqliteConnection error: " + err.message);
                } else {
                    console.log("sqliteConnection Success");
                }
            });
        }
        return DB
    } catch (error) {
        console.log("Can't open database file.", error.message)
        return null
    }
}
SQL.dbClose = function (databaseHandle) {
    try {
        let data = databaseHandle.export()
        let buffer = Buffer.alloc(data.length, data)
        fs.writeFileSync(databasefile, buffer)
        databaseHandle.close()
        return true
    } catch (error) {
        console.log("Can't close database file.", error)
        return null
    }
}
export const initDB  = () => {
    console.log('ddd')
    dbOpen()


    let createDb = function (dbPath) {
        let query = fs.readFileSync(path.join(__dirname,shemafile), 'utf8')
        let result = DB.exec(query)
        /*todo: dbclose 추가*/
        if (Object.keys(result).length === 0 && typeof result.constructor === 'function') {
            console.log('Created a new database.')
        } else {
            console.log('model.initDb.createDb failed.')
        }
    }

    console.log(DB)
    createDb()
    let query = 'SELECT count(*) as `count` FROM sqlite_master'
    let row = DB.exec(query)
  //  let tableCount = parseInt(row[0].values)
    console.log("dddd")
    console.log(row)
    if (row === 0) {
        console.log('The file is an empty SQLite3 database.')
        createDb()
    } else {
        console.log('The database has', row, 'tables.')
    }

    api.getItemInfo();
}
/*export const connSqlite = () => {
    if (!DB || !DB.open) {
        DB = new SQL.Database(path.resolve(__dirname, 'base.db'), sqlite3.OPEN_READWRITE, (err) => {
            console.log("sqliteConnection")
            if (err) {
                console.log("sqliteConnection error: "+err.message);
            } else {
                console.log("sqliteConnection Success");
            }
        });
    }
    return DB
}*/

/*export const initDB = () => {
    return new Promise((resolve, reject) => {
        let DB = connSqlite()
        DB.serialize(() => {
            DB.run('CREATE TABLE IF not exists COM_MENU (MENU_ID	TEXT NOT NULL,
                MENU_NM	TEXT NOT NULL,
                PARENT_MENU_ID	TEXT,
                MENU_LEVEL	INTEGER,
                MENU_URL	TEXT,
                SEQ	INTEGER,
                DESCRIPTION	TEXT,
                CREATE_USER_ID	TEXT,
                CREATE_DT	TEXT,
                UPDATE_USER_ID	TEXT,
                UPDATE_DT	TEXT
        )')
            DB.run('CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))')
            resolve()
        })
    })
}*/
