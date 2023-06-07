'use strict'


const Student = use('App/Models/Student');
const Pengajar = use('App/Models/Pengajar');
const Database = use('Database');
const Hash = use('Hash');

class RegisterController {
    async register({ request, response }) {
        try {
            const { nama, email, username, password, conPas, role } = request.all();
            let model;
            let procedure;
            if (role === 'pengajar') {
                model = Pengajar;
                procedure = 'registrasiPg';
            } else if (role === 'pelajar') {
                model = Student;
                procedure = 'registrasiP';
            } else {
                return response.status(400).send({ status: 400, message: 'Role tidak valid' });
            }

            const isUsernameUsedStudent = await Student.findBy('username', username);
            const isEmailUsedStudent = await Student.findBy('email', email);
            const isUsernameUsedPengajar = await Pengajar.findBy('username', username);
            const isEmailUsedPengajar = await Pengajar.findBy('email', email);

            if (password !== conPas) {
                return response.status(400).send({ status: 400, message: 'Password tidak sama' });
            }
            if (isUsernameUsedStudent || isUsernameUsedPengajar) {
                return response.status(400).send({ status: 400, message: 'Username sudah digunakan' });
            }
            if (isEmailUsedStudent || isEmailUsedPengajar) {
                return response.status(400).send({ status: 400, message: 'Email sudah digunakan' });
            }


            const passwordHash = await Hash.make(password);

            const result = await Database.raw(`CALL ${procedure}(?, ?, ?, ?,?)`, [nama, email, username, passwordHash, role]);
            if (result[0].affectedRows === 0) {
                return response.status(500).send({ status: 500, message: 'Registrasi gagal' });
            }

            /* const result = await model.create({
                nama,
                email,
                username,
                password: passwordHash,
                role
            }); 

            if (!result) {
                return response.status(500).send({ status:400,message: 'Registrasi gagal' });
            } */

            return response.status(200).send({ status: 200, message: `Registrasi berhasil sebagai ${role}` });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Server bermasalah' });
        }
    }

}

module.exports = RegisterController;
