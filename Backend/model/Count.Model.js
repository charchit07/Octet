
const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    active_job:{
        type:Number
    },
    new_application:{
        type:Number
    },
    candidate_reviewed:{
        type:Number
    },
    shortlisted:{
        type:Number
    },
},{
    versionKey:false
})

const CountModel=mongoose.model("count",userSchema)

module.exports = {
    CountModel
  };