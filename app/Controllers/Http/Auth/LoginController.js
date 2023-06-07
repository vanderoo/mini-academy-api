'use strict'

const Student = use('App/Models/Student');
const Pengajar = use('App/Models/Pengajar');
const Hash = use('Hash');
const Database = use('Database');

class LoginController {
    async login({ auth, request, response, session }) {
        try {
            const { username, password} = request.all();
            let role;
            const user = await Student.findBy('username', username);
            if(user){
                role = 'pelajar'
            }else{
                const userPg = await Pengajar.findBy('username', username);
                if(userPg){
                    role = 'pengajar'
                }
            }
    
            let Model;
            let authenticator;
            if(role === 'pengajar'){
                Model = Pengajar;
                authenticator = 'sessionPg';
            }else if(role === 'pelajar'){
                Model = Student;
            }else{
                return response.status(400).json({status:400,message: "Role tidak valid"});
            }
            
            /* const result = await Database.raw('CALL loginP(?,?, @outParam)', [username,role]);
            const output = await Database.raw('SELECT @outParam AS output');
            const modelExist = output[0][0].output; */
            const model = await Model.findBy('username', username); 
    
            if (model) {
                //const model = await Model.findBy('username', username);
                const isPasswordValid = await Hash.verify(password, model.password);
                if (!isPasswordValid) {
                    return response.status(400).json({ status:400,message: "Password salah"});
                } 
                const token = await auth.authenticator(authenticator).attempt(username, password);
                response.cookie('session_id', session._sessionId, { httpOnly: false });
                return response.status(200).json({ status:200,message: "Login berhasil", token: token });
            }
            return response.status(404).json({ status:404,message: "Akun tak ada" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({error: error.message});
        }
    }

    async check({ auth, response }) {
        try {
            await auth.check();
            return response.status(200).json({ message: "Logged in" });
        } catch (error) {
            try{
                await auth.authenticator('sessionPg').check();
                return response.status(200).json({ message: "Logged in" });
            }catch{
                return response.status(401).json({ message: "not logged in" });
            }
        }
    }

    async logout({ auth, response }) {
        try {
            await auth.check();
            await auth.logout();
            response.clearCookie('session_id');
            return response.status(200).json({ message: "Logout berhasil" });
        } catch (error) {
            try{
                await auth.authenticator('sessionPg').check();
                await auth.authenticator('sessionPg').logout();
                response.clearCookie('session_id');
                return response.status(200).json({ message: "Logout berhasil" });
            }catch{
                return response.status(500).json({ message: "Gagal logout. Silakan coba lagi nanti." });
            }
        }
    }


}

module.exports = LoginController;
