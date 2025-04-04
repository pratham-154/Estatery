const express = require('express');
const cmsRouter = express.Router();

const CmsController = require('../../../controller/admin/CmsController');

cmsRouter.get('/admin/cms',CmsController.index);
cmsRouter.post('/admin/cms/add',CmsController.add);
cmsRouter.put('/admin/cms/edit/:id',CmsController.edit);
cmsRouter.get('/admin/cms/remove/:id',CmsController.remove);
cmsRouter.get('/admin/cms/view/:id',CmsController.view);

module.exports = cmsRouter;