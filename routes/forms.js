const express = require('express')
const router = new express.Router();

const { getall, createSurvey,deleteSurvey, getSurvey,updateSurvey } = require('../controllers/forms_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Forms Home page</h1>")
})

router.get('/getall', getall)
router.get('/get/:userid', getSurvey)
router.post('/addsurvey',createSurvey)
router.put("/update/:_id",updateSurvey)
router.delete("/delete/:_id",deleteSurvey)


module.exports = router;
