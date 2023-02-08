const formsModel = require('../models/forms_model')

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


//Add new Response
const createSurvey = async (request, response) => {

    const { userid, title, email, survey } = request.body;

    const existingSurvey = await formsModel.findOne({ userid: userid, title: title })
    if (!existingSurvey) {
        const result = await formsModel.create({
            userid: userid,
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
    else{
        response.status(409).json({"Msg":"You have already Created Survey of same title..."})
    }


}


//Update Survey
const updateSurvey = async (request, response) => {
    const { userid, title, email, survey } = request.body;
    const updatedSurvey = {
        userid: userid,
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



//Delete Survey
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


module.exports = {
    getall, createSurvey, getSurvey, deleteSurvey, updateSurvey
}