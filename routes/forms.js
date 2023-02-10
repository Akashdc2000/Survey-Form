const express = require('express')
const router = new express.Router();

const { getall, createSurvey, deleteSurvey, getSurvey, updateSurvey, getIndivisualSurvey,getSurveyID } = require('../controllers/forms_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Forms Home page</h1>")
})

router.get('/getall', getall)
router.get('/get/:userid', getSurvey)       //To get all Survey created by given userid
router.get('/:_id', getIndivisualSurvey)    //To get Indivisual Survey
router.post('/addsurvey', createSurvey)
router.put("/update/:_id", updateSurvey)
router.delete("/delete/:_id", deleteSurvey)

router.post('/get',getSurveyID)


module.exports = router;
