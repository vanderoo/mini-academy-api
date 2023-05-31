'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    static get table() {
        return 'pelajar'
    }

    static get primaryKey() {
        return 'id_pelajar';
    }



}

module.exports = Student
