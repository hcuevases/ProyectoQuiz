var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz!' });
});

router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Datos del autor!' });
});


router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes?busqueda=:busqueda(\\w)', quizController.index);
router.param('quizId', quizController.load);

module.exports = router;
