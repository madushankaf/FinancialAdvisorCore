const { userController } = require('../controllers');

async function userRoutes(fastify, options) {

  // Define user routes
  fastify.get('/users/get-users', userController.getUsers);
  fastify.post('/users/login', userController.loginUser);
  fastify.post('/users/forgot-password', userController.sendOtp);
  fastify.post('/users/change-password', userController.changePassword);
}

module.exports = userRoutes;
