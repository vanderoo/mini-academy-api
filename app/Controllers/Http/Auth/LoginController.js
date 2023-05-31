'use strict'

const Student = use('App/Models/Student')

class LoginController {
    async login({ auth, request, response, session }) {
        const { username, password } = request.all();
        
        const student = await Student.findBy('username', username);
        if (student) {
            if (password != student.password) {
                return response.status(401).send({ message: "Password salah", password: student.password, input: password });
            }
            const token = await auth.login(student);
            response.cookie('session_id', session._sessionId, { httpOnly: true });
            return response.status(200).send({ message: "Login berhasil", token: token.id_pelajar });
        }
        return response.status(404).send({ message: "Akun tak ada" });
    }
}

module.exports = LoginController;
