const propertyModel = require('../../models/apis/admin/Property');
const userModel = require('../../models/apis/admin/Property');
const { validatorMake } = require('../../helper/General');
const { default: mongoose } = require('mongoose');
const { removeImage } = require('../../helper/FileSystem');

const index = async (req, res) => {
    let { search, created_on, status, created_by, location, priceRange, placeType, maxSize, minSize, availability } = req.query
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
                    'availability': search
                },
                {
                    'bedrooms': search
                },
                {
                    'bathrooms': search
                },
                {
                    'floors': search
                },
                {
                    'address': search
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

    if (location) {
        address = new RegExp(location, 'i');
        where = {
            ...where,
            $or: [
                { "address": address },
                { "city": address },
            ]
        }
    }

    if (availability) {

        availability = new RegExp(availability, 'i');
        where = {
            ...where,
            "availability": availability
        }

    }

    if (priceRange && Array.isArray(priceRange)) {
        if (priceRange[0] && priceRange[1]) {
            where = {
                ...where,
                price: {
                    $gte: priceRange[0],
                    $lte: priceRange[1]
                }
            }
        }
    }

    if (placeType && Array.isArray(placeType)) {
        placeType = placeType.map(id => new mongoose.Types.ObjectId(id));
        where = {
            ...where,
            "cat_id": { $in: placeType }
        }
    }

    if (maxSize && minSize) {
        where = {
            ...where,
            area: { $gte: parseInt(minSize), $lte: parseInt(maxSize) }
        }
    } else if (minSize) {
        where = {
            ...where,
            area: { $gte: parseInt(minSize) }
        }
    } else if (maxSize) {
        where = {
            ...where,
            area: { $lte: parseInt(maxSize) }
        }
    }
    let select = {};

    let joins = [
        {
            path: 'cat_id',
            select: "_id title"
        },
        {
            path: 'user_id',
            select: '_id first_name'
        }
    ]

    let { listing, totalCount, totalPages } = await propertyModel.getListing(req, select, where, joins);

    if (listing) {
        res.send({
            'status': true,
            'message': 'Data Fetch Successfully',
            'data': listing,
            "totalCount": totalCount,
            "totalPages": totalPages
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

const property = async (req, res) => {
    let { id } = req.userId;

    let where;
    if (id) {
        where = { 'user_id': id };
    }

    let select = {};

    let joins = [
        {
            path: 'cat_id',
            select: "_id title"
        },
    ]

    let { listing, totalCount, totalPages } = await propertyModel.getListing(req, select, where, joins);

    if (listing) {
        res.send({
            'status': true,
            'message': 'Data Fetch Successfully',
            'data': listing,
            "totalCount": totalCount,
            "totalPages": totalPages
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

const random = async (req, res) => {
    let { search, created_on, status, created_by, location, priceRange, placeType, maxSize, minSize } = req.query
    let where = { 'deleted_at': { $eq: null } };

    if (search) {
        search = new RegExp(search, 'i')
        where = {
            ...where,
            $or: [
                {
                    "type": search
                },
                {
                    "description": search
                },
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


    if (location) {
        address = new RegExp(location, 'i');
        where = {
            ...where,
            $or: [
                {
                    "address": address
                }
            ]
        }
    }

    if (priceRange && Array.isArray(priceRange.split(','))) {
        priceRange = priceRange.split(',');

        let priceFilter = {};

        if (priceRange[0] && priceRange[0] !== '') {
            priceFilter.$gte = parseFloat(priceRange[0]);
        }

        if (priceRange[1] && priceRange[1] !== '') {
            priceFilter.$lte = parseFloat(priceRange[1]);
        }

        if (Object.keys(priceFilter).length > 0) {
            where.price = priceFilter;
        }
    }


    if (placeType) {
        where = {
            ...where,
            $or: [
                {
                    "type": type
                }
            ]
        }
    }
    if (maxSize && minSize) {
        where.area = { $gte: minSize, $lte: maxSize };
    } else if (minSize) {
        where.area = { $gte: minSize };
    } else if (maxSize) {
        where.area = { $lte: maxSize };
    }

    let select = {
        '_id': 1,
        "type": 1,
        "role": 1,
        'address': 1,
        'description': 1,
        'availability': 1,
        'bedrooms': 1,
        'bathrooms': 1,
        'floors': 1,
        'address': 1,
        'price': 1,
        "city": 1,
        'contact_name': 1,
        'contact_number': 1,
        "cat_id": 1,
        "price": 1,
        'area': 1,
        'slug': 1,
        "image": 1,
        "user_id": 1,
        "created_at": 1
    };
    let joins = [
        {
            path: 'cat_id',
            select: "_id title"
        }
    ]

    let {listing ,totalCount} = await propertyModel.getRandom(req, select, where, joins);
    if (listing) {
        res.send({
            'status': true,
            'message': 'Data Fetch Successfully',
            'random': listing,
            'totalCount':totalCount
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

const likedProperty = async (req, res) => {

    let { id } = req.userId;
    let userData = await userModel.getRow({ "_id": id });

    let where = {
        "slug": { $in: userData.liked },
    }

    let select = {};

    let { listing, totalCount, totalPages } = await propertyModel.getListing(req, select, where);

    if (listing) {
        res.send({
            'status': true,
            'message': 'Data Fetch Successfully',
            'data': listing,
            "totalCount": totalCount,
            "totalPages": totalPages
        })
    }

    else {
        res.send({
            'status': true,
            'message': 'No data found',
            'data': []
        })
    }

}

const locationProperty = async (req, res) => {
    let joins = [
        {
            path: 'cat_id',
            select: "_id title"
        },
        {
            path: 'user_id',
            select: '_id first_name'
        }
    ]
    // let select = {
    //     '_id': 1,
    //     "type": 1,
    //     "role": 1,
    //     'address': 1,
    //     'description': 1,
    //     'availability': 1,
    //     'bedrooms': 1,
    //     'bathrooms': 1,
    //     'floors': 1,
    //     'address': 1,
    //     'price': 1,
    //     "city": 1,
    //     'contact_name': 1,
    //     'contact_number': 1,
    //     "cat_id": 1,
    //     "price": 1,
    //     'area': 1,
    //     'slug': 1,
    //     "image": 1,
    //     "user_id": 1,
    //     "created_at": 1
    // };
    // if (userData.city && userData.state) {
    //     where = {
    //         'city': { $ne: userData.city },
    //         'state': { $ne: userData.state }
    //     }
    // }
    // else if(userData.city){
    //     where = {
    //         'city': {$ne: userData.city}
    //     }
    // }
    // else if(userData.state){
    //     where = {
    //         'state':{$ne : userData.state}
    //     }
    // }

    let cityData = await propertyModel.getListingByfield(req,joins);
    // let stateData = await propertyModel.getListing(req, {}, { "address": userData.state }, joins);
    // // let random = await propertyModel.getRandom(req, select,where,joins);

    if (cityData && cityData.length > 0){
        res.send({
            'status':true,
            'message':'Data Fetched Successfully ',
            'data':cityData
        })
    }
    else{
        res.send({
            "status":false,
            'message':"Please Complete Profile Setup.",
            'data':[]
        })
    }
}

const add = async (req, res) => {
    let { id } = req.userId;
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "type": 'required',
            "role": 'required',
            "availability": 'required',
            "bedrooms": 'required',
            "bathrooms": 'required',
            "floors": 'required',
            "description": 'required',
            "city": 'required',
            "address": 'required',
            "price": 'required',
            "area": 'required',
            "contact_name": 'required',
            "contact_number": 'required',
            "email": 'required',
            "image": 'required',
            "cat_id": 'required'
        }
    );

    if (!validatorRules.fails()) {
        data.user_id = id;
        let resp = await propertyModel.create(data);
        if (resp) {
            res.send({
                'status': true,
                'message': 'Property Added.',
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
    let { _id } = req.body;
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "type": 'required',
            "role": 'required',
            "availability": 'required',
            "bedrooms": 'required',
            "bathrooms": 'required',
            "floors": 'required',
            "description": 'required',
            "city": 'required',
            "address": 'required',
            "price": 'required',
            "area": 'required',
            "contact_name": 'required',
            "contact_number": 'required',
            "email": 'required',
            "image": 'required',
            "cat_id": 'required'
        }
    );

    if (!validatorRules.fails()) {
        let resp = await propertyModel.modify(_id, data);
        if (resp) {
            res.send({
                'status': true,
                'message': 'Property Updated Successfully.',
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
    let userData = await propertyModel.getRow({ "_id": id });

    await removeImage(userData.image);
    let resp = await propertyModel.remove(id);
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
    let { slug } = req.params;
    let where = { 'slug': slug };

    let joins = [
        {
            path: 'cat_id',
            select: "_id title"
        },
        {
            path: 'user_id',
            select: "_id first_name"
        }
    ]

    let resp = await propertyModel.getRow(where, [], joins);

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
                await propertyModel.modifyAll(ids, {
                    'status': 1
                });
                message = ids.length + ' records has been published.';
                break;
            case 'inactive':
                await propertyModel.modifyAll(ids, {
                    'status': 0
                });
                message = ids.length + ' records has been unpublished.';
                break;
            case 'delete':
                await propertyModel.removeAll(ids);
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

module.exports = {
    index,
    add,
    edit,
    remove,
    view,
    bulkAction,
    random,
    property,
    likedProperty,
    locationProperty
};