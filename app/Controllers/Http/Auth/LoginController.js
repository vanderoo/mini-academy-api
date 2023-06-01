'use strict'

const Student = use('App/Models/Student')
const Hash = use('Hash');
const Database = use('Database');

class LoginController {
    async login({ auth, request, response, session }) {
        const { username, password } = request.all();
        
        const result = await Database.raw('CALL loginP(?, @outParam)', [username]);
        const output = await Database.raw('SELECT @outParam AS output');
        const studentExist = output[0][0].output;

        /* const student = await Student.findBy('username', username); */

        if (!!studentExist) {
            const student = await Student.findBy('username', username);
            const isPasswordValid = await Hash.verify(password, student.password);
            if (!isPasswordValid) {
                return response.status(400).send({ message: "Password salah", password: student.password, input: password });
            } 
            const token = await auth.attempt(username, password);
            response.cookie('session_id', session._sessionId, { httpOnly: true });
            return response.status(200).send({ message: "Login berhasil", token: token });
        }
        return response.status(404).send({ message: "Akun tak ada" });
    }

    async logout({ auth, response }) {
        try {
            await auth.logout();
            response.clearCookie('session_id');
            return response.status(200).send({ message: "Logout berhasil" });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ message: "Gagal logout. Silakan coba lagi nanti." });
        }
    }

}

module.exports = LoginController;
