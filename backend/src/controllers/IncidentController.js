const connection = require('../../resource/database/connection')

module.exports = {
    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },

    async getAll(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        console.log(count)

        const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp','ongs.city', 'ongs.uf'])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    },

    async getOne(request, response){
        const id = request.params.id;
        console.log(id);
        const incidents = await connection('incidents').select('*').where('id', id);
        return response.json(incidents);
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        console.log(id);
        const incidents = await connection('incidents').where('id',id).select('ong_id').first();

        if (incidents.ong_id != ong_id ){
            return response.status(401).json({error: 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

    async update(request, response) {
        const {title, description, value} = request.body;

        const id = request.params.id;

        const ong_id = request.headers.authorization;

        const [id_resp] = await connection('incidents').update({
            title,
            description,
            value,
            ong_id,
        }).where('id',id);

        return response.json({ id_resp })
    },
}