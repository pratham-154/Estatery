const userModel = require("../../models/apis/frontend/User");
const { validatorMake, getRandomNumber, getHash, sendMail, _datetime, Compare, _moment, encrypt } = require('../../helper/General');
const { removeImage } = require("../../helper/FileSystem");


const index = async (req, res) => {
    let { search, created_on, status, created_by } = req.query
    let where = { 'deleted_at': { $eq: null } };

    if (search) {
        search = new RegExp(search, 'i')
        where = {
            ...where,
            $or: [
                {
                    "title": search
                },
                {
                    "description": search
                },
                {
                    'role': search
                }
            ]
        }
    }

    if (created_on && Array.isArray(created_on)) {
        let dateFilter = {};

        if (created_on[0] && created_on[0] !== '') {
            dateFilter.$gte = new Date(created_on[0]);
        }

        if (created_on[1] && created_on[1] !== '') {
            dateFilter.$lte = new Date(created_on[1]);
        }

        if (Object.keys(dateFilter).length > 0) {
            where.created_at = dateFilter;
        }
    }

    if (created_by && Array.isArray(created_by) && created_by.length > 0) {
        where = {
            ...where,
            'created_by': {
                $in: created_by
            }
        };
    }

    if (status) {
        where.status = status;
    }

    let select = {
        '_id': 1,
        'title': 1,
        'description': 1,
        'role': 1,
        "avatar": 1
    };

    let data = await userModel.getListing(req, select, where);
    //let data = await userModel.getAll(where, select);
    if (data) {
        res.send({
            'status': true,
            'message': 'Data Fetch Successfully',
            'data': data
        })
    }
    else {
        res.send({
            'status': true,
            'message': 'No data found',
            'data': []
        })
    }
};
const add = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "title": "required",
            "description": "required"
        }
    );

    if (!validatorRules.fails()) {
        //data.created_by = await adminModel.getLoginId(req);
        data.created_by = 'User'
        let resp = await userModel.create(data);
        if (resp) {
            res.send({
                'status': true,
                'message': 'Record has been saved successfully.',
                'data': resp
            })
        }
        else {
            res.send({
                'status': false,
                'message': 'Something went wrong. Please try again later.',
                'data': []
            })
        }
    }
    else {
        res.send({
            'status': false,
            'message': validatorRules.errors
        });
    }
};
const edit = async (req, res) => {
    let { id } = req.userId;
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "first_name": 'required',
            "last_name": 'required',
            "city": 'required',
            "state": 'required',
            "email": 'required',
            "address": 'required',
            "phone_number": 'required'
        }
    );

    if (!validatorRules.fails()) {
        data.updated_at = _datetime();
        let resp = await userModel.modify(id, data);
        if (resp) {
            res.send({
                'status': true,
                'message': 'Record has been saved successfully.',
                'data': resp
            })
        }
        else {
            res.send({
                'status': false,
                'message': 'Something went wrong. Please try again later.',
                'data': []
            })
        }
    }
    else {
        res.send({
            'status': false,
            'message': validatorRules.errors
        });
    }
};

const likes = async (req, res) => {
    let { id } = req.userId;
    let data = req.body;
    
    let resp = await userModel.modify(id, data);
    
    if (resp) {
        res.send({
            'status': true,
            'message': 'Liked Properties Updated',
            'data': resp
        })
    }
    else {
        res.send({
            'status': false,
            'message': 'Something went wrong. Please try again later.',
            'data': []
        })
    }
};

const editImage = async (req, res) => {
    let { id } = req.userId;
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "image": "required"
        }
    );

    if (!validatorRules.fails()) {
        let userData = await userModel.getRow({ "_id": id });
        await removeImage(userData.image);
        let resp = await userModel.modify(id, data);
        if (resp) {
            res.send({
                'status': true,
                'message': 'Image Updated.',
                'data': resp
            })
        }
        else {
            res.send({
                'status': false,
                'message': 'Something went wrong. Please try again later.',
                'data': []
            })
        }
    }
    else {
        res.send({
            'status': false,
            'message': validatorRules.errors
        });
    }
};

const remove = async (req, res) => {
    let { id } = req.params;

    let resp = await userModel.remove(id);

    if (resp) {
        res.send({
            'status': true,
            'message': 'Record has been deleted successfully',
            'data': resp,
        })
    }
    else {
        res.send({
            'status': false,
            'message': 'Something went wrong. Please try again later.',
            'data': []
        })
    }
};

const view = async (req, res) => {
    let { id } = req.userId;
    let resp = await userModel.get(id);

    if (resp) {
        res.send({
            'status': true,
            'message': 'Record has been fetched successfully.',
            'data': resp,
        })
    }
    else {
        res.send({
            'status': true,
            'message': 'Not able to find any record. Please try again later.',
            'data': []
        })
    }
};

const bulkAction = async (req, res) => {
    let { type } = req.params
    let { ids } = req.body
    if (ids && ids.length > 0 && type) {
        switch (type) {
            case 'active':
                await userModel.modifyAll(ids, {
                    'status': 1
                });
                message = ids.length + ' records has been published.';
                break;
            case 'inactive':
                await userModel.modifyAll(ids, {
                    'status': 0
                });
                message = ids.length + ' records has been unpublished.';
                break;
            case 'delete':
                await userModel.removeAll(ids);
                message = ids.length + ' records has been deleted.';
                break;
        }

        res.send({
            'status': true,
            'message': message
        });
    }
    else {
        res.send({
            'status': false,
            'message': 'Please select atleast one record.'
        });
    }
};
const signUp = async (req, res) => {
    let { data } = req.body

    let validatorRules = await validatorMake(data, {
        first_name: "required",
        last_name: "required",
        email: "required|email",
        password: "required|confirmed",
        password_confirmation: "required"
    })

    let passes = async () => {
        data.email_verified = null;
        data.otp = getRandomNumber(6);
        data.token = getHash(64);
        let exist = await userModel.getRow({ email: data.email });
        if (exist) {
            res.send({
                status: false,
                message: "Email exists. Please Login",
                data: exist
            })
        }
        else {
            let resp = await userModel.create(data);
            if (resp) {
                sendMail(data.email,  "One Time Password", `<h1>${data.otp}</h1>`);
                res.send({
                    status: true,
                    message: "OTP sent to your Email",
                    data: resp,
                });
            } else {
                res.send({
                    status: false,
                    message: "Registration Failed, Try again",
                    data: [],
                });
            }
        }
    }
    let fails = () => {
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    };
    validatorRules.checkAsync(passes, fails);
};
const verifyOtp = async (req, res) => {
    let data = req.body
    let validatorRules = await validatorMake(data, {
        otp: "required",
        token: "required"
    })
    if (!validatorRules.fails()) {
        let resp = await userModel.getRow({
            token: data.token
        })
        if (resp) {
            if (resp.otp == data.otp) {
                let update = {
                    email_verified: 1,
                    otp: null,
                    email_verified_at: _datetime(),
                };
                let response = await userModel.modify(resp._id, update);
                if (response) {
                    sendMail(
                        resp.email,
                        "verification complete",
                        `<h1>Verification Complete</h1>`
                    );
                    res.send({
                        status: true,
                        message: "Verified Successfully!",
                        data: response,
                    });
                }
                else {
                    res.send({
                        status: false,
                        message: "Verification Failed!",
                        data: [],
                    });
                }
            }
            else {
                res.send({
                    status: false,
                    message: "Otp mismatched",
                    data: []
                })
            }
        }
        else {
            res.send({
                status: false,
                message: 'Register Again',
                data: []
            })
        }

    }
    else {
        res.send({
            status: false,
            message: 'validation Failed',
            data: []
        })
    }
};
const resendOtp = async (req, res) => {
    let data = req.body
    let validatorRules = await validatorMake(data, {
        token: "required"
    })
    if (!validatorRules.fails()) {
        let resp = await userModel.getRow({
            token: data.token
        })
        if (resp) {
            if (!resp.otp) {
                let update = { otp: getRandomNumber(6) }
                let response = await userModel.modify(resp._id, update);
                sendMail(resp.email, "One Time Password", `<h1>${response.otp}</h1>`);
                res.send({
                    status: true,
                    message: "OTP has been sent to your Email",
                    data: response,
                    type: 'NOT_VERIFIED'
                });
            }
            else {
                sendMail(resp.email, "One Time Password", `<h1>${resp.otp}</h1>`);
                res.send({
                    status: true,
                    message: "Please verify your email",
                    data: response,
                    type: 'NOT_VERIFIED'
                });
            }
        }
        else {
            res.send({
                status: false,
                message: "Register Again",
                data: []
            })
        }
    }
    else {
        res.send({
            status: false,
            message: 'Validation Failed',
            data: []
        })
    }
};
const login = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        "email": "required",
        "password": "required"
    })
    if (!validatorRules.fails()) {
        let response = await userModel.getRow({ email: data.email });
        if (response) {
            if (response.email_verified) {
                if (Compare(data.password, response.password)) {
                    let update = {
                        login_token: getHash(64),
                        last_login_at: _datetime(),
                        token_expiry_at: _moment().add('1', "day")
                    }
                    let userUpdate = await userModel.modify(response._id, update);
                    if (userUpdate) {
                        res.send({
                            status: true,
                            data: userUpdate,
                            message: "Login Successfull"
                        })
                    }
                    else {
                        res.send({
                            status: false,
                            data: [],
                            meassage: "Unable to Login .Try Again"
                        })
                    }
                }
                else {
                    res.send({
                        status: false,
                        data: [],
                        meassage: "Wrong Password"
                    })
                }
            }
            else {
                let userUpdate;
                if (!response.otp) {
                    update = {
                        opt: getRandomNumber(6)
                    };
                    userUpdate = await userModel.modify(response._id, update);
                    //redirect to otp page and resend otp
                }
                sendMail(data.email,"One Time Password", `<h1>${userUpdate.otp ? userUpdate.otp : response.opt}</h1>`);
                res.send({
                    status: true,
                    message: "Please verify you email",
                    data: response,
                    type: 'NOT_VERIFIED'
                });
            }

        }
        else {
            res.send({
                status: false,
                data: [],
                meassage: "Email not found. Please SignUp"
            })
        }
    }
    else {
        res.send({
            meassage: "validation Failed",
            data: [],
            status: false
        })
    }
}
const forgetPass = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        "email": "required|email"
    })
    if (!validatorRules.fails()) {
        let resp = await userModel.getRow({ email: data.email })
        if (resp) {
            let update = {
                token: getHash(64),
                otp: getRandomNumber(6),
            }
            let response = await userModel.modify(resp._id, update);
            if (response) {
                sendMail(resp.email, "One Time Password", `<h1>${response.otp}</h1>`);
                res.send({
                    message: "Otp has been sent",
                    data: response,
                    status: true
                })
            }
            else {
                res.send({
                    status: false,
                    message: "Failed to sent Otp , Try Again",
                    data: []
                })
            }
        }
        else {
            res.send({
                message: "Email not found",
                status: false,
                data: []
            })
        }
    }
    else {
        res.send({
            message: "Wrong Email Format",
            status: false,
            data: []
        })
    }
}
const resetPass = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        "token": "required",
        "password": "required|confirmed",
        "password_confirmation": "required"
    })
    if (!validatorRules.fails()) {
        let resp = await userModel.getRow({ "token": data.token });
        if (resp) {
            let update = {
                password: data.password,
                token: null
            }
            let response = await userModel.modify(resp._id, update)
            if (response) {
                sendMail(response.email,"Password updated",`<h1>Your Password was updated on ${_datetime()}</h1>`);
                res.send({
                    message: "Password Updated",
                    status: true,
                    data: response
                })
            }
            else {
                res.send({
                    message: "Error in updating Password .Try Again",
                    status: false,
                    data: response
                })
            }
        }
        else {
            res.send({
                status: false,
                data: [],
                message: "Error Occured. Fill Email again"
            })
        }
    }
    else {
        res.send({
            message: "Validation Error",
            data: [],
            status: false
        })
    }
}
const changePass = async (req, res) => {
    let { id } = req.userId;
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        "old_password": "required",
        "password": "required",
        "password_confirmation": "required|same:password"
    })
    if (!validatorRules.fails()) {
        let userData = await userModel.getRow({ "_id": id });
        if (Compare(data.old_password, userData.password)) {
            let update = {
                password: data.password
            }
            let response = await userModel.modify(userData._id, update)
            if (response) {
                sendMail(userData.email,"Password updated",`<h1>Your Password was updated on ${_datetime()}</h1>`);
                res.send({
                    status: true,
                    message: "Password Updated",
                    data: response
                })
            }
            else {
                res.send({
                    status: false,
                    message: "Failed to change password",
                    data: []
                })
            }
        }
        else {
            res.send({
                status: false,
                message: "Wrong Password",
                data: []
            })
        }
    }
    else {
        res.send({
            status: false,
            message: "Validation Error",
            data: []
        })
    }
}
const checkLogin =async(req,res)=>{
    let {id} = req.userId;

    if(id){
        res.send({
            status:true,
        })
    }

    else{
        res.send({
            status:false,
            message:"Login Session Expired. Please Login"
        })
    }

}
const logout = async(req,res)=>{
    let {id} = req.userId;
    if(id){
        let userData = await userModel.getRow({"_id":id})
        if(userData){
            let update = {
                login_token:null,
                token_expiry_at:null
            }
            let resp = await userModel.modify(id,update);
            if(resp){
                res.send({
                    status:true,
                    message:"Logged Out"
                })
            }
            else{
                res.send({
                    status:false,
                    message:'Action Falied , Please try again'
                })
            }
        }
        else{
            res.send({
                status:false,
                message:'User not Found.Please SignUp'
            })
        }
    } 
    else{
        res.send({
            status:false,
            message:'Login session expired. Please Login'
        })
    }
}

module.exports = {
    index,
    add,
    edit,
    editImage,
    remove,
    view,
    bulkAction,
    signUp,
    verifyOtp,
    resendOtp,
    login,
    forgetPass,
    resetPass,
    changePass,
    likes,
    checkLogin,
    logout
};