const express = require('express');
const auth = require('../utils/auth')
const {
    create,
    addQuestion,
    takeSurvey,
    answerSurvey,
    viewResults
} = require('../controllers/surveyController');


const router = express.Router();

router.post('/create', auth , create);
router.post('/add/:surveyId', auth , addQuestion);
router.get('/takesurvey/:surveyId', auth , takeSurvey);
router.post('/ans/:surveyId', auth , answerSurvey);
router.get('/viewResults/:surveyId', auth , viewResults);

module.exports = router;