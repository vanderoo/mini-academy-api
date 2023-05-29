'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    static get table() {
        return 'orders';
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
      
}

module.exports = Order
