import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { useEffect, useState } from 'react';
import logo from '../assets/letter-j.png';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardLeftsidebar from '../components/DashboardLeftsidebar';
import MobileNavbar from '../components/MobileNavbar';

const UpdateJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState({ company: '', position: '', status: 'pending', date: '' });
    const navigate = useNavigate();

    const editJob = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataObj = Object.fromEntries(data);

        try {
            await axiosInstance.patch(`/jobs/${id}`, dataObj);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        };
    };

    const deleteJob = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job application?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/jobs/${id}`);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const getJob = async () => {
            try {
                const res = await axiosInstance.get(`/jobs/${id}`);
                const fetchedJob = res.data.job[0] || { company: '', position: '', status: 'pending', date: '' };

                if (fetchedJob.date) {
                    fetchedJob.date = fetchedJob.date.split('T')[0];
                }
                setJob(fetchedJob);
            } catch (err) {
                console.log(err);
            };
        };

        getJob();
    }, [id]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className="d-none d-lg-block">
                <DashboardNavbar />
                <DashboardLeftsidebar />
            </div>
            <MobileNavbar />
            <div className='container' style={{ paddingTop: '3rem' }}>
                <div className='row justify-content-center'>
                    <div className='col-11 col-sm-8 col-md-6 col-lg-5'>
                        <div className="card border-0 shadow-sm p-4 p-md-5 bg-white" style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div className='text-center mb-4'>
                                <Link to='/dashboard'>
                                    <img
                                        src={logo}
                                        height='48px'
                                        alt='JobManager Logo'
                                    />
                                </Link>
                                <h1 className='h4 mt-3 mb-1 fw-bold text-dark'>Edit Application</h1>
                                <p className='text-muted small mb-0'>Update your tracking details</p>
                            </div>
                            <form onSubmit={editJob} className="d-flex flex-column gap-3">
                                <div>
                                    <label className='form-label text-dark small fw-medium mb-1'>Company</label>
                                    <input
                                        className='form-control bg-white text-dark shadow-none'
                                        type='text'
                                        name='company'
                                        defaultValue={job.company}
                                        key={job.company}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-dark small fw-medium mb-1'>Position</label>
                                    <input
                                        className='form-control bg-white text-dark shadow-none'
                                        type='text'
                                        name='position'
                                        defaultValue={job.position}
                                        key={job.position}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-dark small fw-medium mb-1'>Application Date</label>
                                    <input
                                        className='form-control bg-white text-dark shadow-none'
                                        type='date'
                                        name='date'
                                        defaultValue={job.date}
                                        key={job.date}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-dark small fw-medium mb-1'>Status</label>
                                    <select
                                        name='status'
                                        className='form-select bg-white text-dark shadow-none'
                                        defaultValue={job.status || 'pending'}
                                        key={job.status}
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    >
                                        <option value='pending'>Pending</option>
                                        <option value='interview'>Interview</option>
                                        <option value='declined'>Declined</option>
                                    </select>
                                </div>
                                <div className='mt-3 d-flex flex-column gap-2'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-lg w-100 fw-semibold shadow-sm'
                                        style={{
                                            backgroundColor: '#2563eb',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '0.75rem',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type='button'
                                        onClick={deleteJob}
                                        className='btn btn-outline-danger btn-lg w-100 fw-semibold shadow-none'
                                        style={{
                                            borderRadius: '10px',
                                            padding: '0.75rem',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        Delete Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8;
                    opacity: 1;
                }
                .form-control:focus, .form-select:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
            `}</style>
        </div>
    );
};

export default UpdateJob;