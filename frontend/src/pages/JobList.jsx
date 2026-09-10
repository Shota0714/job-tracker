import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import DashboardNavbar from '../components/DashboardNavbar';
import JobCard from '../components/JobCard';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const today = new Date().toISOString().split('T')[0];

    const addJob = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const dataObj = Object.fromEntries(data);
        form.reset();

        try {
            const res = await axiosInstance.post('/jobs', dataObj);
            setJobs([...jobs, res.data.job]);
        } catch (err) {
            console.log(err);
        }
    };

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

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className="pb-5">
            <DashboardNavbar />
            <div className='container' style={{ paddingTop: '8rem' }}>
                <div className='row justify-content-center mb-5'>
                    <div className='col-md-6 col-lg-5'>
                        <div className="card border-0 shadow-lg p-4" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className="text-center mb-3">
                                <h4 className="fw-bold text-white mb-1">Track New Job</h4>
                                <p className="text-light opacity-75 small">Add a new position to your list</p>
                            </div>
                            <form onSubmit={addJob} className="d-flex flex-column gap-3">
                                <div>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='company'
                                        placeholder='Company Name'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='position'
                                        placeholder='Job Position'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-light small mb-1'>Application Date</label>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='date'
                                        name='date'
                                        defaultValue={today}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', colorScheme: 'dark' }}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary btn-lg w-100 fw-semibold mt-2 shadow' style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none', borderRadius: '10px', padding: '0.75rem' }}>
                                    + Add Job Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <h3 className="fw-bold text-white">Your Applications</h3>
                    <p className="text-light opacity-75">Manage and track your interview pipeline</p>
                </div>
                {jobs.length === 0 ? (
                    <div className="text-center text-light opacity-75 py-5">
                        <p className="fs-5">No jobs tracked yet. Add your first one above! 🚀</p>
                    </div>
                ) : (
                    <div className='container d-flex gap-4 flex-wrap justify-content-center'>
                        {jobs.map((job) => (
                            <JobCard job={job} key={job._id} />
                        ))}
                    </div>
                )}
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8 !important;
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
};

export default JobList;