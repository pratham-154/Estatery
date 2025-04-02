const express =  require('express');
const userRouter = express.Router();

const UserController = require('../../../controller/frontend/UserController');
const UserAuth = require('../../../middleware/UserAuth');

userRouter.post('/user/edit', UserAuth,UserController.edit);
userRouter.post('/user/likes', UserAuth,UserController.likes);
userRouter.get('/user/remove/:id',UserController.remove);
userRouter.get('/user/view', UserAuth, UserController.view);
userRouter.post('/user/signUp',UserController.signUp);
userRouter.post('/user/verifyOtp',UserController.verifyOtp);
userRouter.post('/user/resendOtp',UserController.resendOtp);
userRouter.post('/user/login',UserController.login);
userRouter.post('/user/forgetPass',UserController.forgetPass);
userRouter.post('/user/resetPass',UserController.resetPass);
userRouter.post('/user/changePass',UserAuth,UserController.changePass);
userRouter.post('/user/editImage',UserAuth,UserController.editImage);
userRouter.get('/user/checkLogin',UserAuth,UserController.checkLogin);
userRouter.post('/user/logout',UserAuth,UserController.logout);

module.exports = userRouter;