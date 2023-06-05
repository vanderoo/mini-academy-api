'use strict';

const Pembayaran = use('App/Models/Pembayaran');

class NotificationController {
  async post({ request, response }) {
    try {
      const { order_id, status_code } = request.post();
      const pembayaran = await Pembayaran.query()
        .where('order_id', order_id)
        .first();

      if (!pembayaran) {
        return response.status(404).send({ code: 0, message: 'Terjadi kesalahan | Pembayaran tidak valid' });
      }

      switch (status_code) {
        case '200':
          pembayaran.status = 'SUCCESS';
          break;
        case '201':
          pembayaran.status = 'PENDING';
          break;
        case '202':
          pembayaran.status = 'CANCEL';
          break;
      }

      await pembayaran.save();
      return response.status(200).send('Ok');
    } catch (error) {
      return response.status(500).send('Error');
    }
  }
}

module.exports = NotificationController;
