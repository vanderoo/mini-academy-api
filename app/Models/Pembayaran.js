'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pembayaran extends Model {
    static get table(){
        return 'pembayaran';
    }
    static get primaryKey(){
        return  'id_pembayaran'
    }
}

module.exports = Pembayaran
