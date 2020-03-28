const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

//Routes to LOGIN
routes.post('/login', SessionController.login)


//Routes to ONGS
routes.get('/ongs', OngController.getAll);
routes.get('/ongs/:id', OngController.getOne);
routes.post('/ongs', OngController.create);
routes.put('/ongs/:id', OngController.update);
routes.delete('/ongs/:id', OngController.delete);

//Routes to INCIDENTS
routes.get('/incidents', IncidentController.getAll);
routes.get('/incidents/:id', IncidentController.getOne);
routes.post('/incidents', IncidentController.create);
routes.put('/incidents/:id', IncidentController.update);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;