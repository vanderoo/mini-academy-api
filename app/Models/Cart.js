'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {
    static get table() {
        return 'keranjang';
    }
    static get primaryKey() {
        return 'id';
    }

    static get createdAtColumn() {
        return false;
    }

    static get updatedAtColumn() {
        return false;
    }
    kelas() {
        return this.belongsTo('App/Models/Kelas', 'id_kelas', 'id_kelas');
    }
}

module.exports = Cart
