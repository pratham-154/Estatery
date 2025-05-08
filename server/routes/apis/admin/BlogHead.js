const express = require('express');
const headRouter = express.Router();

const HeadController = require('../../../controller/admin/BlogHeadController');

headRouter.get('/admin/blog_head',HeadController.index);
headRouter.post('/admin/blog_head/add',HeadController.add);
headRouter.put('/admin/blog_head/edit/:id',HeadController.edit);
headRouter.get('/admin/blog_head/remove/:id',HeadController.remove);
headRouter.get('/admin/blog_head/view/:id',HeadController.view);

module.exports = headRouter;