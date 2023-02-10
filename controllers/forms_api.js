const formsModel = require('../models/forms_model')
const userModel = require('../models/users_model')

//Get All Survey
const getall = async (request, response) => {
    try {
        const result = await formsModel.find({});
        if (result.length <= 0)
            response.status(404).json({ "msg": "No Survey Found..." })
        else
            response.status(200).json({
                "msg": `Total ${result.length} Survey`,
                "Survey": result
            })
    } catch (error) {
        response.send(error)
    }
}

//Get Response By a Title/Name
const getSurvey = async (request, response) => {
    try {
        const userid = request.params.userid;
        const result = await formsModel.find({ userid: userid });
        if (result.length <= 0)
            response.status(404).json({ "msg": "No Survey Found..." })
        else
            response.status(200).json({
                "msg": `Total ${result.length} Survey`,
                "Survey": result
            })
    } catch (error) {
        response.send(error)
    }
}


//Get Single Survey of a User
const getIndivisualSurvey = async (request, response) => {
    try {
        const survey_id = request.params._id;
        const result = await formsModel.findOne({ _id: survey_id });
        if (result.length <= 0)
            response.status(404).json({ "msg": "No Survey Found..." })
        else
            response.status(200).json(result)
    } catch (error) {
        response.send(error)
    }
}

//Add new Response
const createSurvey = async (request, response) => {

    const { title, email, survey } = request.body;

    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        response.status(409).json({ "Msg": "You are not Authorized User" })
    }
    else {
        const existingSurvey = await formsModel.findOne({ userid: existingUser._id, title: title })
        if (!existingSurvey) {
            const result = await formsModel.create({
                userid: existingUser._id,
                title: title,
                email: email,
                survey: survey
            })
            result.save((error, doc) => {
                if (error)
                    response.send(error);
                else
                    response.status(200).json({
                        "msg": `Survey Created...`,
                        "Response": doc
                    })
            })
        }
        else {
            response.status(409).json({ "Msg": "You have already Created Survey of same title..." })
        }

    }


}


//Update Survey
const updateSurvey = async (request, response) => {
    const { title, email, survey } = request.body;
    const updatedSurvey = {
        title: title,
        email: email,
        survey: survey
    }
    const id = request.params._id
    try {
        formsModel.findByIdAndUpdate(id, updatedSurvey, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ "msg": "Survey Not Present in Database...." })
            else
                response.status(200).json({
                    "msg": `Following Survey Updated Succesfully...`,
                    "User": updatedSurvey
                })
        });

    } catch (error) {
        response.status(404).json({ "msg": "Survey Not Present in Database...." })
    }

}



//Delete Survey by Survey_id(_id)
const deleteSurvey = async (request, response) => {

    const id = request.params._id;
    try {
        formsModel.findByIdAndDelete(id, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ "msg": "Survey Not Present in Database...." })
            else
                response.status(200).json({
                    "msg": `Following Survey Deleted Succesfully...`,
                    "Survey": doc
                })
        });

    } catch (error) {
        response.status(404).json({ "msg": "Survey Not Present in Database...." })
    }
}


//Get Survey ID
const getSurveyID = async (request, response) => {
    try {
        const {title,email} = request.body;
        const result = await formsModel.findOne({ title:title,email:email });
        if (result.length <= 0)
            response.status(404).json({ "msg": "No Survey Found..." })
        else
            response.status(200).json({"survey_id":result._id})
    } catch (error) {
        response.send(error)
    }
}

module.exports = {
    getall, createSurvey, getSurvey, deleteSurvey, updateSurvey, getIndivisualSurvey,getSurveyID
}