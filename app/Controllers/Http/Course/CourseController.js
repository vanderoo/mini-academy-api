'use strict'

const Course = use('App/Models/Kelas')
const Student = use('App/Models/Student')
const Pendaftaran = use('App/Models/Pendaftaran')
const Pembayaran = use('App/Models/Pembayaran')

class CourseController {
    async courseIndex({ response }) {
        try {
            const courses = await Course.all();
            return response.json(courses);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Server bermasalah' });
        }
    }

    async randIndex({response}){
        try {
            const randCourse = await Course.query()
            .with('pengajar')
            .orderByRaw('RAND()')
            .first();

            return response.status(200).json(randCourse);

        } catch (error) {
            console.log(error.message);
            return response.status(500).json({error: 'Server bermasalah'});
        }
    }

    async courseShow({params, response}){
        const courseID = params.id;
        try {
            const course = await Course.query()
            .select('kelas.*')
            .where('id_kelas', courseID)
            .first();

            if(!course){
                return response.status(404).json({message: "Kelas tidak ditemukan"});
            }

            return response.status(200).json(course);

        } catch (error) {
            return response.status(500).json({message: "Server bermasalah"})
        }
    }

    async myCourseIndex({ response }) {
        try {
            const courses = await Course.query()
                .select('kelas.*')
                .innerJoin('pendaftaran', 'kelas.id_kelas', 'pendaftaran.id_kelas')
                .innerJoin('pembayaran', 'pendaftaran.id_pembayaran', 'pembayaran.id_pembayaran')
                .where('pendaftaran.id_pelajar', 6)
                .where('pembayaran.status', 'SUCCESS')
                .fetch();
            
            if(!courses){
                return response.status(404).json({message: "Data tidak ditemukan"});
            }

            return response.json(courses);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Server bermasalah' });
        }
    }
    async waitingPaymentIndex({ response }) {
        try {
            const courses = await Course.query()
                .select('kelas.*')
                .innerJoin('pendaftaran', 'kelas.id_kelas', 'pendaftaran.id_kelas')
                .innerJoin('pembayaran', 'pendaftaran.id_pembayaran', 'pembayaran.id_pembayaran')
                .where('pendaftaran.id_pelajar', 4)
                .whereNot('pembayaran.status', 'SUCCESS')
                .fetch();

            return response.json(courses);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Server bermasalah' });
        }
    }
    async notRegisteredIndex({ response }) {
        try {
            const registeredCourses = await Pendaftaran.query()
                .where('id_pelajar', 4)
                .pluck('id_kelas');

            const notRegisteredCourses = await Course.query()
                .whereNotIn('id_kelas', registeredCourses)
                .fetch();

            return response.json(notRegisteredCourses);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Server bermasalah' });
        }
    }
}

module.exports = CourseController
