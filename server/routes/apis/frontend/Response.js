const express = require('express');
const responseRouter = express.Router();

const ResponseController = require('../../../controller/frontend/ResponseController');
const UserAuth = require('../../../middleware/UserAuth');


responseRouter.get('/response',UserAuth,ResponseController.index);
responseRouter.post('/response/add/:slug',UserAuth,ResponseController.add);
responseRouter.post('/response/edit/:id',ResponseController.edit);
responseRouter.get('/response/remove/:id',ResponseController.remove);
responseRouter.get('/response/view/:id',ResponseController.view);

module.exports = responseRouter;