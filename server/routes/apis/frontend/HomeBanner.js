const express = require('express');
const bannerRouter = express.Router();

const BannerController = require('../../../controller/frontend/HomeBannerController');

bannerRouter.get('/banner',BannerController.index);
bannerRouter.get('/banner/view/:id',BannerController.view);

module.exports = bannerRouter;