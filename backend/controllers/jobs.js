const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const { userId } = req.user;
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    const job = await Job.find({ createdBy: userId, _id: jobId });

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    const { userId } = req.user;
    req.body.createdBy = userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    const job = await Job.findOneAndUpdate(
        { createdBy: userId, _id: jobId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const { userId } = req.user;
    const { id: jobId } = req.params;

    const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });

    if (!job) {
        throw new NotFoundError('Job not found');
    }

    res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };