import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import JobCard from '../components/JobCard';

const Dashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const addJob = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const dataObj = Object.fromEntries(data);
        form.reset();

        try {
            const res = await axiosInstance.post('/jobs', dataObj);
            const newJobs = [...jobs, res.data.job];
            setJobs(newJobs);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axiosInstance.get('/jobs');
                setJobs(res.data.jobs);
            } catch (err) {
                console.log(err);
            };
        };

        getJobs();
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className="pb-5">
            {/* Cool Glassmorphic Navbar */}
            <nav className="navbar fixed-top" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className='container py-2'>
                    <a href='#' className='navbar-brand d-flex align-items-center gap-2'>
                        <img src={logo} width='36px' alt='Logo' style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }} />
                        <span className="fw-bold text-white tracking-wide" style={{ letterSpacing: '0.05em' }}>JobTracker</span>
                    </a>
                    <Link to='/' className='btn btn-outline-danger btn-sm px-4 rounded-pill fw-semibold transition-all' onClick={handleLogout}>
                        Log out
                    </Link>
                </div>
            </nav>

            {/* Main Content Container with safe top margin for fixed navbar */}
            <div className='container' style={{ paddingTop: '7rem' }}>
                
                {/* Header & Add Job Card Section */}
                <div className='row justify-content-center mb-5'>
                    <div className='col-md-6 col-lg-4'>
                        <div className="card border-0 shadow-lg p-4" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className="text-center mb-3">
                                <h4 className="fw-bold text-white mb-1">Track New Job</h4>
                                <p className="text-muted small">Enter the company and position to get started</p>
                            </div>
                            <form onSubmit={addJob} className="d-flex flex-column gap-3">
                                <div>
                                    <input
                                        className='form-control bg-dark text-white border-secondary'
                                        type='text'
                                        name='company'
                                        placeholder='Company Name'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        className='form-control bg-dark text-white border-secondary'
                                        type='text'
                                        name='position'
                                        placeholder='Job Position'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary btn-lg w-100 fw-semibold mt-2 shadow' style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none', borderRadius: '10px', padding: '0.75rem' }}>
                                    + Add Job Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Jobs Grid Section */}
                <div className="mb-4 text-center">
                    <h3 className="fw-bold text-white">Your Applications</h3>
                    <p className="text-muted">Manage and track your interview pipeline</p>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center text-muted py-5">
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
        </div>
    );
};

export default Dashboard;