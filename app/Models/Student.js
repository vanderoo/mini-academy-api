'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Student extends Model {
    static get table() {
        return 'pelajar';
    }

    static get primaryKey() {
        return 'id_pelajar';
    }
    
    static get createdAtColumn() {
        return false;
    }

    static get updatedAtColumn() {
        return false;
    }

}

module.exports = Student
