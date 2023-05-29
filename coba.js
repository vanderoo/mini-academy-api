// Import Axios
const axios = require('axios');

// Definisikan URL endpoint API
const API_URL = 'http://127.0.0.1:3333/va/charge';

// Fungsi untuk mengirim permintaan ke API IndexController
async function performBankTransfer(channel, items) {
  try {
    // Data yang akan dikirim dalam permintaan
    const requestData = {
      "channel": channel,
      "items": items
    };

    // Kirim permintaan POST ke API IndexController
    const response = await axios.post(API_URL, requestData);

    // Tangani respons dari server sesuai kebutuhan Anda
    console.log(response.data);
    console.log(response.customer);
    // Lakukan tindakan lain sesuai kebutuhan

  } catch (error) {
    // Tangani kesalahan jika terjadi
    console.error(error);
    // Lakukan penanganan kesalahan lainnya sesuai kebutuhan
  }
}

// Contoh penggunaan performBankTransfer
const channel = 'PERMATA';
const items = [
    { 
        "id": 1, 
        "price": 300000,
        "quantity": 2 ,
        "name": 'Ayam gugu' 
    }
];

performBankTransfer(channel, items);
console.log("res");