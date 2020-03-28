const connection = require('../../resource/database/connection')


module.exports = {

    async login(request, response){
        const {id} = request.body;

        const ong = await connection('ongs').where('id',id).select('name').first();

        if(!ong){
            return response.status(403).json({error: 'Not permitted'});
        } else {
            return response.json(ong)
        }
    }

}