'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kelas extends Model {
    static get table(){
        return 'kelas';
    }
    static get primaryKey() {
        return 'id_kelas';
    }
    static get createdAtColumn() {
        return false;
    }
    
    static get updatedAtColumn() {
        return false;
    }
}

module.exports = Kelas
