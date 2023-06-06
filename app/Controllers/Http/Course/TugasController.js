'use strict'
const Tugas = use('App/Models/Tugas');

class TugasController {
    async index({ params, response }) {
        const courseID = params.id;
        try {
            const tugas = await Tugas.query()
                .select('tugas.*')
                .where('id_kelas', courseID)
                .fetch();

            if(!tugas){
                return response.status(404).json({message: 'Data tidak ditemukan'});
            }

            return response.status(200).json(tugas);

        } catch (error) {
            return response.status(500).json({error: 'Server bermasalah'})
        }


    }
}

module.exports = TugasController
