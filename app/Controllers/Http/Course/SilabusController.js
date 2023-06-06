'use strict'
const Silabus = use('App/Models/Silabus')

class SilabusController {
    async index({params,response}){
        const courseID = params.id;
        try {
            const silabus = await Silabus.query()
            .select('silabus.*')
            .where('id_kelas', courseID)
            .fetch();

            if(!silabus){
                return response.status(404).json({message: "Data tidak ditemukan"});
            }
    
            return response.status(200).json(silabus);
        } catch (error) {
            return response.status(500).json({ error: "Server bermasalah" });
        }
    }
}

module.exports = SilabusController
