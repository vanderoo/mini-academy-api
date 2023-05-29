'use strict';

const Order = use('App/Models/Order');

class NotificationController {
  async post({ request, response }) {
    try {
      const { order_id, status_code } = request.post();
      const order = await Order.query()
        .where('invoice', order_id)
        .first();

      if (!order) {
        return response.status(404).send({ code: 0, message: 'Terjadi kesalahan | Pembayaran tidak valid' });
      }

      switch (status_code) {
        case '200':
          order.status = 'SUCCESS';
          break;
        case '201':
          order.status = 'PENDING';
          break;
        case '202':
          order.status = 'CANCEL';
          break;
      }

      await order.save();
      return response.status(200).send('Ok');
    } catch (error) {
      return response.status(500).send('Error');
    }
  }
}

module.exports = NotificationController;
