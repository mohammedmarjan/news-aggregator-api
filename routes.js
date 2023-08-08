const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const NewsController = require('./controllers/NewsController');
const AuthMiddleware = require('./middleware/AuthMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(AuthMiddleware.authenticate); // Requires authentication for the following routes

router.get('/preferences', UserController.getPreferences);
router.put('/preferences', UserController.updatePreferences);
router.get('/news', NewsController.getNews);

router.post('/news/:id/read', NewsController.markAsRead);
router.post('/news/:id/favorite', NewsController.markAsFavorite);
router.get('/news/read', NewsController.getReadNews);
router.get('/news/favorites', NewsController.getFavoriteNews);
router.get('/news/search/:keyword', NewsController.searchNewsByKeyword);

module.exports = router;
