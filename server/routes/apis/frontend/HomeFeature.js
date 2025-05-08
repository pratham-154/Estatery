const express = require('express');
const featureRouter = express.Router();

const HomeFeatureController = require('../../../controller/frontend/HomeFeatureController');

featureRouter.get('/feature',HomeFeatureController.index);
featureRouter.get('/feature/view/:id',HomeFeatureController.view);

module.exports = featureRouter;