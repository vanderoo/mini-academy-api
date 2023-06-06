'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tugas extends Model {
    static get table(){
        return 'tugas';
    }
    
    static get primaryKey(){
        return 'id_tugas';
    }

    static get createdAtColumn() {
        return false;
    }
    
    static get updatedAtColumn() {
        return false;
    }
}

module.exports = Tugas
