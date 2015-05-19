var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');

//HOME PAGE
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz!' , errors: []});
});
//autoload
//router.param('quizId', quizController.load);  
//router.param('commentId', commentController.load);  
//router.param('userId', userController.load); 

router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Datos del autor!' });
});


router.get('/quizes', quizController.index);//
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes?busqueda=:busqueda(\\w)', quizController.index);
router.param('quizId', quizController.load);
router.get('/quizes/new' , sessionController.loginRequired, quizController.new);
router.post('/quizes/create' ,sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy);
router.get('/user',  userController.new);     // formulario sign un
router.post('/user',  userController.create);     // registrar usuario

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// Definición de rutas de sesion
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

module.exports = router;

