const express = require('express');
const headRouter = express.Router();

const HeadController = require('../../../controller/frontend/BlogHeadController');

headRouter.get('/blog_head',HeadController.index);
headRouter.get('/blog_head/view/:id',HeadController.view);

module.exports = headRouter;