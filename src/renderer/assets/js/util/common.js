'use strict'

/* DATA PARSING */
export const rowsFromSqlDataObject = (object) => {
    let data = {}
    let i = 0
    let j = 0
    for (let valueArray of object.values) {
        data[i] = {}
        j = 0
        for (let column of object.columns) {
            Object.assign(data[i], {[column]: valueArray[j]})
            j++
        }
        i++
    }
    return
}
