const { property } = require('../../index');
const { foreach, makeSlug } = require('../../../helper/General');

const getListing = async (req, select = {}, where = {}, joins = []) => {
    try {
        let { sort, direction, limit, offset, page } = req.query;

        direction = direction && direction == 'asc' ? -1 : 1;
        sortField = sort ? sort : 'created_at';
        limit = limit ? parseInt(limit) : 9;
        offset = page > 1 ? ((page - 1) * limit) : 0;
        orderBy = { [sortField]: direction }

        let listing = await property.find(where, select, { skip: offset })
            .populate(joins)
            .sort(orderBy)
            .limit(limit)
            .exec();

        let totalCount = await property.countDocuments(where);
        let totalPages = Math.ceil(totalCount / limit)
        return (listing, totalCount, totalPages);
    }
    catch (error) {
        return false;
    }
}
const getListingByfield = async (req,joins = []) => {
    try {
        let pipeline = [
            // {
            //     $match: { 'city': { $ne: userCity } } // Exclude the current user's city from results (optional)
            // },
            {
                $group: {
                    _id: `$city`,
                    count: { $sum: 1 } // Count the number of properties in each city
                }
            },
            {
                $sort: { count: -1 } // Sort cities by property count in descending order
            },
            {
                $limit:4
            }
        ];

        let cityCount = await property.aggregate(pipeline);

        return cityCount;

    } catch (error) {
        console.error('Error fetching city count:', error);
        return false;
    }
};

const getRandom = async (req, select = {}, where = {}, joins = []) => {
    let { size } = req.query
    try {
        let pipeline = [
            {
                $match: where // Match the conditions
            },
            {
                $sample: { size: size ? parseInt(size) : 3 } // Randomly sample 3 documents
            },
            {
                $lookup: { // Join with categories if needed
                    from: 'categories', // Replace with your category collection name
                    localField: 'cat_id',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $project: select // Select only the fields needed
            }
        ];

        // Execute aggregation
        let listing = await property.aggregate(pipeline).exec();
        let totalCount = await property.countDocuments(where);
        return {listing,totalCount};
    } catch (error) {
        console.error("Error fetching listings:", error);
        return false;
    }
};

const getAll = async (where = {}, select = {}, joins = [], orderBy = { 'title': 1 }, limit = 10) => {
    try {
        let query = property.find(where, select);

        if (joins.length > 0) {
            query = query.populate(joins)
        }

        query = query.sort(orderBy).limit(limit);

        let listing = await query;

        return listing;

    } catch (error) {
        return false;
    }
}

const get = async (id, select = [], joins = []) => {
    try {
        let record = property.findById(id, select);

        if (joins.length > 0) {
            record = record.populate(joins);
        }

        record = await record.exec();

        return record;
    }
    catch (error) {
        return false;
    }
}

const getRow = async (where, select = []) => {
    try {
        let record = await property.findOne(where, select);
        return record;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}

const create = async (data) => {
    try {
        let row = new property();
        row.created_at = new Date();
        foreach(data, (key, value) => {
            row[key] = value
        })

        row.created_by = null;

        let resp = await row.save();

        if (resp) {
            if (resp.address) {
                let slug = makeSlug(resp.contact_name);
                const count = await getCounts({ 'address': resp.address });
                if (count > 1) {
                    slug = slug + '-' + (count);
                }
                resp.slug = slug;
                resp.save();
            }
            return resp;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

const modify = async (id, data) => {
    try {
        data.updated_at = new Date();
        let resp = await property.updateOne(
            {
                "_id": id
            },
            data
        ).exec();
        if (resp) {
            let updated = await get(id);
            return updated;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return false;
    }
}

const modifyAll = async (ids, data) => {
    try {
        let resp = await blogs.updateMany(
            {
                '_id': {
                    $in: ids
                }
            },
            data
        );

        if (resp) {
            return resp;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

const remove = async (id) => {
    try {
        let getRecord = await get(id);
        if (getRecord) {
            let record = await property.deleteOne({
                '_id': id
            }).exec();

            return record;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

const removeAll = async (ids) => {
    try {
        let record = await blogs.deleteMany(
            {
                '_id': {
                    $in: ids
                }
            }
        );
        return record;
    }
    catch (error) {
        return error;
    }
}

const getCounts = async (where = {}) => {
    try {
        let record = await property.countDocuments(where).exec();
        return record;
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    getListing,
    getAll,
    get,
    getRow,
    create,
    modify,
    modifyAll,
    remove,
    removeAll,
    getCounts,
    getRandom,
    getListingByfield
};