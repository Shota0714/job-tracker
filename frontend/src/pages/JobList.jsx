import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import DashboardNavbar from '../components/DashboardNavbar';
import JobCard from '../components/JobCard';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axiosInstance.get('/jobs');
                setJobs(res.data.jobs);
            } catch (err) {
                console.log(err);
            }
        };
        getJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const term = searchTerm.toLowerCase();
        const company = job.company ? job.company.toLowerCase() : '';
        const position = job.position ? job.position.toLowerCase() : '';
        return company.includes(term) || position.includes(term);
    });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className="pb-5">
            <DashboardNavbar />
            <div className='container' style={{ paddingTop: '8rem' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <h2 className="fw-bold text-white mb-1">Your Applications</h2>
                        <p className="text-light opacity-75 mb-0">Manage and track your interview pipeline</p>
                    </div>
                    <Link
                        to='/jobs/add'
                        className='btn btn-primary fw-semibold shadow'
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none', borderRadius: '10px', padding: '0.5rem 1.25rem' }}
                    >
                        + Add New Job
                    </Link>
                </div>
                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary shadow-none text-center"
                                placeholder="🔍 Search by company or position..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ padding: '0.75rem 1rem', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                </div>
                {filteredJobs.length === 0 ? (
                    <div className="text-center text-light opacity-75 py-5">
                        {jobs.length === 0 ? (
                            <>
                                <p className="fs-5 mb-3">No jobs tracked yet. Add your first one to get started!</p>
                                <Link to='/jobs/add' className='btn btn-outline-light btn-sm px-4 rounded-pill'>
                                    Add Job
                                </Link>
                            </>
                        ) : (
                            <p className="fs-5 mb-3">No applications match your search query "{searchTerm}".</p>
                        )}
                    </div>
                ) : (
                    <div className='d-flex gap-4 flex-wrap justify-content-center'>
                        {filteredJobs.map((job) => (
                            <JobCard job={job} key={job._id} />
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8 !important;
                    opacity: 1 !important;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default JobList;