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
    pengajar() {
        return this.belongsTo('App/Models/Pengajar', 'id_pengajar', 'id_pengajar');
    }
    carts() {
        return this.hasMany('App/Models/Cart', 'id_kelas', 'id_kelas');
    }
}

module.exports = Kelas
