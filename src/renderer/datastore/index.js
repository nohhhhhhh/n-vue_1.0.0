'use strict'
import store from "../store";

const fs = require('fs')
const path = require('path')
const SQL = require('sqlite3').verbose();
const api = require('./api/comMenu')

let databasefile = 'base.db'
let shemafile = 'schema.sql'
let DB = new SQL.Database(path.resolve(__dirname, 'base.db'))

SQL.dbClose = function (databaseHandle) {
}

export const openDB = () => {
    let DB = new SQL.Database(path.resolve(__dirname, 'base.db'))
    return DB;
}

export const initDB  = () => {
    let createDb = function () {
        let query = fs.readFileSync(path.join(__dirname,shemafile), 'utf8')
        let result = openDB().exec(query)
        /*todo: dbclose 추가*/
        if (Object.keys(result).length === 0 && typeof result.constructor === 'function') {
            console.log('Created a new database.')
        } else {
            console.log('model.initDb.createDb failed.')
        }
    }

    createDb()
    api.getMenuList()
}

