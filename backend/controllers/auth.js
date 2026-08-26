const login = (req, res) => {
    res.send('Login Route');
};

const register = (req, res) => {
    res.send('Register Route');
};

module.exports = { login, register };