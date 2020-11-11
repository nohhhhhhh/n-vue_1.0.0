'use strict'

const model = require('../index')
const com = require('../../assets/js/util/common')
import _ from 'lodash'


export const getItemInfo  = () => {
    console.log("getIOteminro")
    let SQL = model.dbOpen();
    console.log(SQL)
    if (SQL !== null) {
        let query = 'SELECT * FROM COM_ITEM'
        try {
            let row = SQL.exec(query)
            console.log('row::::::::'+ row[0])
            if (row !== undefined && row.length > 0) {
                com.rowsFromSqlDataObject(row[0])
                console.log(com.rowsFromSqlDataObject(row[0]))
                console.log('dd')
            }
        } catch (error) {
            console.log('model.getPeople', error.message)
        } finally {

        }
    }
}
