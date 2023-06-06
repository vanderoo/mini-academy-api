'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pengajar extends Model {
    static get table() {
        return 'pengajar';
    }

    static get primaryKey() {
        return 'id_pengajar';
    }

    static get createdAtColumn() {
        return false;
    }

    static get updatedAtColumn() {
        return false;
    }

    courses() {
        return this.hasMany('App/Models/Course', 'id_pengajar', 'id_pengajar');
    }

}

module.exports = Pengajar
