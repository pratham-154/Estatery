const express = require('express');
const aboutRouter = express.Router();

const AboutController = require('../../../controller/frontend/AboutController');

aboutRouter.get('/about',AboutController.index);
aboutRouter.get('/about/view/:id',AboutController.view);

module.exports = aboutRouter;