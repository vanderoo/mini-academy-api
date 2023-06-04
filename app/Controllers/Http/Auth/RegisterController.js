'use strict'


const Student = use('App/Models/Student');
const Database = use('Database');
const Hash = use('Hash');

class RegisterController {
    async register({ request, response }) {
        const { nama, email, username, password, conPas } = request.all();

        const isUsernameUsed = await Student.findBy('username', username);
        const isEmailUsed = await Student.findBy('email', email);

        if (password !== conPas) {
            return response.status(400).send({ message: 'Password tidak sama' })
        }
        if (isUsernameUsed) {
            return response.status(400).send({ message: 'Username sudah digunakan' });
        }
        if (isEmailUsed) {
            return response.status(400).send({ message: 'Email sudah digunakan' });
        }

        const passwordHash = await Hash.make(password);

        const result = await Database.raw('CALL registrasiP(?, ?, ?, ?)', [nama, email, username, passwordHash]);
        if(result[0].affectedRows === 0){
            return response.status(500).send({ message: 'Registrasi gagal' });
        }

        return response.status(200).send({ message: 'Registrasi berhasil' });
    }
}

module.exports = RegisterController;
