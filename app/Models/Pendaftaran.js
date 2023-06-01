'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pendaftaran extends Model {
    static get table() {
        return 'pendaftaran';
    }

    static get primaryKey() {
        return 'id_pendaftaran';
    }

    static get createdAtColumn() {
        return false;
    }
    
    static get updatedAtColumn() {
        return false;
    }
}

module.exports = Pendaftaran
