'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Silabus extends Model {
    static get table(){
        return 'silabus';
    }

    static get primaryKey() {
        return 'id_silabus';
    }
    
    static get createdAtColumn() {
        return false;
    }
    
    static get updatedAtColumn() {
        return false;
    }
}

module.exports = Silabus
