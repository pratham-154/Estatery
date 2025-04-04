const express = require('express');
const cmsRouter = express.Router();

const CmsController = require('../../../controller/frontend/CmsController');

cmsRouter.get('/cms',CmsController.index);
cmsRouter.get('/cms/view/:id',CmsController.view);

module.exports = cmsRouter;