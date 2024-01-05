
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    posted:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    applied:{
        type:Number,
        required:true
    },
    jobViews:{
        type:Number,
        required:true
    },
    daysLeft:{
        type:Number,
        required:true
    },
    premium:{
        type:Boolean,
        required:true
    },
    dateFormat:{
    type:Date,
    required:true
},
},{
    versionKey:false
})

const JobModel=mongoose.model("job",userSchema)

module.exports = {
    JobModel
  };