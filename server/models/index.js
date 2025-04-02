const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = 'mongodb+srv://prayad0620:prathamEstatery@cluster0.f5yuu.mongodb.net/realEstate';
// const connectionString = 'mongodb+srv://globiz:globiz_new@cluster0.lbgxc4q.mongodb.net/rapid';

try
{
    var dbConnection = mongoose.createConnection(connectionString)
    console.log('Connection has been established successfully.');
}
catch(error)
{
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.mongoose = mongoose;
db.dbConnection = dbConnection;

// Entity
db.faqs = require('../entity/Testimonials')(dbConnection, mongoose);
db.cms = require('../entity/Cms')(dbConnection, mongoose);
db.propertyCategory = require('../entity/PropertyCategory')(dbConnection, mongoose);
db.property = require('../entity/Property')(dbConnection , mongoose);
db.about = require('../entity/About')(dbConnection,mongoose);
db.partner = require('../entity/Partners')(dbConnection,mongoose);
db.banner = require('../entity/HomeBanner')(dbConnection,mongoose);
db.feature = require('../entity/HomeFeature')(dbConnection,mongoose);
db.contact = require('../entity/ContactUs')(dbConnection,mongoose);
db.bloghead = require('../entity/BlogHead')(dbConnection,mongoose);
db.user = require('../entity/User')(dbConnection ,mongoose);
db.response = require('../entity/Response')(dbConnection ,mongoose);


module.exports = db;