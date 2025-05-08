const express = require('express');
const propertyRouter = express.Router();

const PropertyController = require('../../../controller/frontend/PropertyController');
const UserAuth = require('../../../middleware/UserAuth');

propertyRouter.get('/property',PropertyController.index);
propertyRouter.get('/property/list',UserAuth,PropertyController.property);
propertyRouter.post('/property/add',UserAuth,PropertyController.add);
propertyRouter.post('/property/edit',UserAuth,PropertyController.edit);
propertyRouter.get('/property/remove/:id',UserAuth,PropertyController.remove);
propertyRouter.get('/property/view/:slug',UserAuth,PropertyController.view);
propertyRouter.get('/property/random',PropertyController.random);
propertyRouter.get('/property/likedProperty',UserAuth,PropertyController.likedProperty);
propertyRouter.get('/property/locationProperty',UserAuth,PropertyController.locationProperty);

module.exports = propertyRouter;