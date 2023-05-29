'use strict'

const CoreApi = require("../Midtrans/CoreApi");
const BankTransfer = require("./BankTransfer");
const Order = use("App/Models/Order");


class IndexController {
    async bankTransfer({request,response}){
        let data;
        try {
            let body = request.body;

            let bankTransfer = new BankTransfer(body.items, body.customer);
            switch (body.channel) {
                case "BCA":
                    data = bankTransfer.bca();
                    break;
                case "BNI":
                    data = bankTransfer.bni();
                    break;
                case "PERMATA":
                    data = bankTransfer.permata();
                    break;
            }
            //return data;
            //return CoreApi.charge(data);
    
            const result = await CoreApi.charge(data);
    
            // Simpan data detail transaksi ke dalam tabel order
            if(result && result.status_code === '201'){
                try {
                    const orderData = {
                      invoice: result.order_id,
                      status: result.transaction_status
                      // ... tambahkan kolom-kolom lain yang perlu disimpan
                    };
                    const order = await Order.create(orderData);
                    console.log("sukses");
                    response.status(201).json(result);
                  } catch (error) {
                    response.status(500).json({ status_code:500,error: 'Terjadi kesalahan saat menyimpan data pesanan' });
                  }
            }else{
                response.status(500).json({status_code:500,error: 'Pesanan gagal dibuat'});
            }
    
            //return result;
        } catch (error) {
            console.log("Error: K")
        }
        
    }
}

module.exports = IndexController
