const roleAuthenticate = async (request, reply) => {
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
        return reply.status(401).send({ message: 'No token provided!' });
    }

    try {
        const decoded = jwt.verify(token, Constants.JWT_SECRET);
        request.user = decoded; // Attach the user data to the request object
    } catch (err) {
        return reply.status(403).send({ message: 'Failed to authenticate token.' });
    }
};

module.exports = {roleAuthenticate}