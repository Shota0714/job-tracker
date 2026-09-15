import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import DashboardNavbar from '../components/DashboardNavbar';
import JobCard from '../components/JobCard';
import DashboradLeftsidebar from '../components/DashboardLeftsidebar';
import MobileNavbar from '../components/MobileNavbar';

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
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', overflowX: 'hidden' }} className="d-flex">
            <div className="d-none d-lg-block">
                <DashboardNavbar />
                <DashboradLeftsidebar />
            </div>
            <MobileNavbar />
            <div className='flex-grow-1 d-flex flex-column w-100' style={{ paddingTop: '5rem', paddingLeft: '0px' }} id="content-container">
                <style>{`
                    @media (min-width: 992px) {
                        #content-container {
                            padding-left: 280px !important;
                        }
                    }
                    @media (max-width: 991.98px) {
                        #content-container {
                            padding-top: 5rem !important;
                        }
                    }
                    ::placeholder {
                        color: #94a3b8 !important;
                        opacity: 1 !important;
                    }
                `}</style>
                <div className='container-fluid p-3 p-md-4 p-lg-5' style={{ maxWidth: '100%' }}>
                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4 gap-3'>
                        <div className='d-flex gap-2 align-items-center flex-wrap flex-sm-nowrap w-100 w-md-auto'>
                            <input
                                type='text'
                                className='form-control form-control-sm bg-white text-dark border shadow-none flex-grow-1'
                                placeholder='Search company or position...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderRadius: '8px', minWidth: '220px', padding: '0.5rem 0.75rem' }}
                            />
                        </div>
                    </div>
                    {filteredJobs.length === 0 ? (
                        <div className="card border-0 shadow-sm bg-white text-center py-5 text-muted" style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            {jobs.length === 0 ? (
                                <>
                                    <p className="fs-6 mb-3">No jobs tracked yet. Add your first one to get started!</p>
                                    <Link to='/jobs/add' className='btn btn-sm text-white px-4 rounded-pill shadow-sm' style={{ backgroundColor: '#10b981' }}>
                                        Add Job
                                    </Link>
                                </>
                            ) : (
                                <p className="fs-6 mb-0">No applications match your search query "{searchTerm}".</p>
                            )}
                        </div>
                    ) : (
                        <div className='row g-3 justify-content-center justify-content-md-start'>
                            {filteredJobs.map((job) => (
                                <div className='col-12 col-md-6 col-xl-4 d-flex justify-content-center justify-content-md-start' key={job._id}>
                                    <JobCard job={job} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobList;