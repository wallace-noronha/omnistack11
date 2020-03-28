const connection = require('../../resource/database/connection')
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    },

    async getAll(request, response){
        const ongs = await connection('ongs').select('*')
        return response.json(ongs);
    },

    async getOne(request, response){
        const id = request.params.id;
        console.log(id);
        const ong = await connection('ongs').select('*').where('id', id);
        return response.json(ong);
    },

    async delete(request, response){
        const id = request.params.id;
        console.log(id);
        await connection('ongs').delete().where('id', id);
        return response.status(204).send();
    },

    async update(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = request.params.id;

        await connection('ongs').update({
            name,
            email,
            whatsapp,
            city,
            uf,
        }).where('id', id);

        return response.json({ id })
    },
}