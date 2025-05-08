const express = require('express');
const bannerRouter = express.Router();

const BannerController = require('../../../controller/admin/HomeBannerController');

bannerRouter.get('/admin/banner',BannerController.index);
bannerRouter.post('/admin/banner/add',BannerController.add);
bannerRouter.put('/admin/banner/edit/:id',BannerController.edit);
bannerRouter.get('/admin/banner/remove/:id',BannerController.remove);
bannerRouter.get('/admin/banner/view/:id',BannerController.view);

module.exports = bannerRouter;