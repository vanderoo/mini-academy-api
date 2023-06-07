'use strict'

const CoreApi = require("../Midtrans/CoreApi");
const BankTransfer = require("./BankTransfer");
const Pendaftaran = use("App/Models/Pendaftaran");
const Pembayaran = use("App/Models/Pembayaran");
const Student = use("App/Models/Student");
const Database = use('Database');



class IndexController {
    async bankTransfer({ auth, request, response }) {
        const user = await Student.findBy('username', auth.user.username);
        const {body} = request;
        let data;
        const customer = {
            first_name: user.nama,
            last_name: '',
            email: user.email,
        }
        console.log(body);
        console.log(body.items);
        console.log(body.channel);
        console.log(customer);
        let bankTransfer = new BankTransfer(body.items, customer);
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
        console.log(data)
        //return data;
        //return CoreApi.charge(data);

        const result = await CoreApi.charge(data);

        if (!result) {
            return response.status(500).json({ message: 'Pesanan gagal dibuat, coba lagi nanti' });
        }

        const trx = await Database.beginTransaction();
        try {
            const dataPembayaran = {
                order_id: result.order_id,
                total: result.gross_amount,
                status: result.transaction_status
            }

            const pembayaran = await Pembayaran.create(dataPembayaran,trx);

            const idPelajar = await auth.user.id_pelajar;
            for (const item of body.items) {
                const dataPendaftaran = {
                    tanggal: result.transaction_time,
                    id_pelajar: idPelajar,
                    id_kelas: item.id,
                    id_pembayaran: pembayaran.id_pembayaran
                }
                const pendaftaran = await Pendaftaran.create(dataPendaftaran,trx);
            }

            if (result.status_code !== '201') {
                await trx.rollback();
                return response.status(500).json({ message: 'Gagal membuat pesanan, coba lagi nanti' });
            }

            await trx.commit();

            return response.status(201).json(result);

            //return result;

        } catch (error) {
            await trx.rollback();
            //console.log("Error: ", error);
            return response.status(500).json({ message: "Terjadi kesalahan" });
        }
    }
}

module.exports = IndexController
