const express = require('express');
const aboutRouter = express.Router();

const AboutController = require('../../../controller/admin/AboutController');

aboutRouter.get('/admin/about',AboutController.index);
aboutRouter.post('/admin/about/add',AboutController.add);
aboutRouter.put('/admin/about/edit/:id',AboutController.edit);
aboutRouter.get('/admin/about/remove/:id',AboutController.remove);
aboutRouter.get('/admin/about/view/:id',AboutController.view);

module.exports = aboutRouter;