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
    async myCourseIndex({ response }) {
        try {
            const courses = await Course.query()
                .select('kelas.*')
                .innerJoin('pendaftaran', 'kelas.id_kelas', 'pendaftaran.id_kelas')
                .innerJoin('pembayaran', 'pendaftaran.id_pembayaran', 'pembayaran.id_pembayaran')
                .where('pendaftaran.id_pelajar', 4)
                .where('pembayaran.status', 'SUCCESS')
                .fetch();


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
