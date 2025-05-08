const express = require('express');
const featureRouter = express.Router();

const HomeFeatureController = require('../../../controller/admin/HomeFeatureController');

featureRouter.get('/admin/feature',HomeFeatureController.index);
featureRouter.post('/admin/feature/add',HomeFeatureController.add);
featureRouter.put('/admin/feature/edit/:id',HomeFeatureController.edit);
featureRouter.get('/admin/feature/remove/:id',HomeFeatureController.remove);
featureRouter.get('/admin/feature/view/:id',HomeFeatureController.view);

module.exports = featureRouter;