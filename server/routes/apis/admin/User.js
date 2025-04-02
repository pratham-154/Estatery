const express =  require('express');
const userRouter = express.Router();

const UserController = require('../../../controller/admin/UserController');

const UserAuth = require('../../../middleware/UserAuth');

userRouter.post('/admin/user/edit', UserAuth,UserController.edit);
userRouter.post('/admin/user/likes', UserAuth,UserController.likes);
userRouter.get('/admin/user/remove/:id',UserController.remove);
userRouter.get('/admin/user/view', UserAuth, UserController.view);
userRouter.post('/admin/user/signUp',UserController.signUp);
userRouter.post('/admin/user/verifyOtp',UserController.verifyOtp);
userRouter.post('/admin/user/resendOtp',UserController.resendOtp);
userRouter.post('/admin/user/login',UserController.login);
userRouter.post('/admin/user/forgetPass',UserController.forgetPass);
userRouter.post('/admin/user/resetPass',UserController.resetPass);
userRouter.post('/admin/user/changePass',UserAuth,UserController.changePass);
userRouter.post('/admin/user/editImage',UserAuth,UserController.editImage);
userRouter.get('/admin/user/checkLogin',UserAuth,UserController.checkLogin);
userRouter.post('/admin/user/logout',UserAuth,UserController.logout);

module.exports = userRouter;