'use strict'
const Cart = use("App/Models/Cart");
const Student = use("App/Models/Student");

class CartController {
    async index({auth, response}){
        try {
            const user = await Student.findBy('username', auth.user.username);
            const id_pelajar = user.id_pelajar;
            
            const cart = await Cart.query()
            .with('kelas')
            .with('kelas.pengajar')
            .where('id_pelajar', id_pelajar)
            .fetch();

            if(!cart){
                return response.status(404).json({messge: 'Data tidak ditemukan'});
            }

            return response.status(200).json(cart);
        } catch (error) {
            console.error(error);
            return response.status(500).json({error: 'Server bermasalah'});
        }
    }
    async delete({params, response }) {
        try {
          const cart = await Cart.find(params.id);
    
          if (!cart) {
            return response.status(404).json({ message: 'Data tidak ditemukan' });
          }
    
          await cart.delete();
    
          return response.status(200).json({ message: 'Data berhasil dihapus' });
        } catch (error) {
          console.error(error);
          return response.status(500).json({ error: 'Server bermasalah' });
        }
    }

    async addCart({auth, params, response}){
        
        try {
            const id_kelas = params.id;
    
            const id_pelajar = auth.user.id_pelajar;
            const cart = new Cart();
            cart.id_kelas = id_kelas;
            cart.id_pelajar = id_pelajar; 
            await cart.save();

            return response.status(200).json({message:  'Data berhasil disimpan'});

        } catch (error) {
            return response.status(500).json({error: 'Server bermasalah'});
        }

    }

}

module.exports = CartController
