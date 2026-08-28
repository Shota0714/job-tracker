const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide correct email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const token = user.createToken();

    res.status(StatusCodes.OK).json({ name: user.name, token });
};

const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = user.createToken();
    res.status(StatusCodes.OK).json({ name: user.name, token });
};

module.exports = { login, register };