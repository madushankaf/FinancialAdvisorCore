const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');

async function routes(fastify, options) {
    // Register user and dashboard routes
    fastify.register(userRoutes, { prefix: '/api' });
    fastify.register(dashboardRoutes, { prefix: '/api' });
}

module.exports = routes;
