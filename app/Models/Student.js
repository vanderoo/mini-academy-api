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

    static boot(){
        super.boot();

        this.addHook('beforeSave', async (studentInstance) => {
            if(studentInstance.dirty.password){
                studentInstance.password = await Hash.make(studentInstance.password);
            }
        });
    }



}

module.exports = Student
