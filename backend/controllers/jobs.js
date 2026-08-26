const { BadRequestError } = require('../errors');

const getAllJobs = (req, res) => {
    res.send('All Jobs');
};

const getJob = (req, res) => {
    const { id } = req.params;
    if (id == '123') {
        throw new BadRequestError('ID can not be 123');
    }
    res.send('Single Job');
};

const createJob = (req, res) => {
    res.send('Create Job');
};

const updateJob = (req, res) => {
    res.send('Update Job');
};

const deleteJob = (req, res) => {
    res.send('Delete Job');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };