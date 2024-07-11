const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    lc_handle : {
        type : String,
    },
    cf_handle : {
        type : String,
    },
    submission_date : {
        type : Array,
        default : []
    },
    last_lc_updated:{
        type : Date,
    },
    last_cf_updated  : {
        type : Date,
    }
})

const UserModel = mongoose.model("UserModel",UserSchema);

module.exports = UserModel;