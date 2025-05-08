const express = require('express');
const propertyRouter = express.Router();

const PropertyController = require('../../../controller/admin/PropertyController');
const UserAuth = require('../../../middleware/UserAuth')

propertyRouter.get('/admin/property',PropertyController.index);
propertyRouter.get('/admin/property/list',UserAuth,PropertyController.property);
propertyRouter.post('/admin/property/add',UserAuth,PropertyController.add);
propertyRouter.post('/admin/property/edit',UserAuth,PropertyController.edit);
propertyRouter.get('/admin/property/remove/:id',UserAuth,PropertyController.remove);
propertyRouter.get('/admin/property/view/:slug',UserAuth,PropertyController.view);
propertyRouter.get('/admin/property/random',PropertyController.random);
propertyRouter.get('/admin/property/likedProperty',UserAuth,PropertyController.likedProperty);
propertyRouter.get('/admin/property/locationProperty',UserAuth,PropertyController.locationProperty);

module.exports = propertyRouter;