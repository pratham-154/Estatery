const {contact}   = require('../../index');
const {foreach, makeSlug} = require('../../../helper/General');

const create = async (data) => {
    try
    {
        let row = new contact();
        row.created_at = new Date();
        foreach(data,(key,value)=>{
            row[key] = value
        })

        row.created_by = null;

        let resp = await row.save();
        
        if(resp)
        {
            if(resp.title)
            {
                let slug = makeSlug(resp.title);
                const count = await getCounts({'title':resp.title});
                if(count > 1)
                {
                    slug = slug+'-'+(count);
                }
                resp.slug = slug;
                resp.save();
            }
            return resp;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        return false;
    }    
}

const getCounts = async (where = {}) => {
    try
    {
        let record = await contact.countDocuments(where).exec();
        return record;
    }
    catch(error)
    {
        return false;
    }
}

module.exports = { 
    create,
    getCounts
};