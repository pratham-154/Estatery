const express = require('express');
const responseRouter = express.Router();

const ResponseController = require('../../../controller/admin/ResponseController');


responseRouter.get('/admin/response',ResponseController.index);
responseRouter.post('/admin/response/add',ResponseController.add);
responseRouter.put('/admin/response/edit/:id',ResponseController.edit);
responseRouter.get('/admin/response/remove/:id',ResponseController.remove);
responseRouter.get('/admin/response/view/:id',ResponseController.view);

module.exports = responseRouter;