import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { useEffect, useState } from 'react';
import logo from '../assets/letter-j.png';

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
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-sm-8 col-md-5 col-lg-4'>
                        <div className="card border-0 shadow-lg p-4 p-md-5" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className='text-center mb-4'>
                                <Link to='/dashboard'>
                                    <img
                                        src={logo}
                                        height='56px'
                                        alt='JobManager Logo'
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
                                    />
                                </Link>
                                <h1 className='h3 mt-3 mb-1 fw-bold text-white'>Edit Application</h1>
                                <p className='text-light opacity-75 small'>Update your tracking details</p>
                            </div>
                            <form onSubmit={editJob} className="d-flex flex-column gap-3">
                                <div>
                                    <label className='form-label text-light small mb-1'>Company</label>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='company'
                                        defaultValue={job.company}
                                        key={job.company}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-light small mb-1'>Position</label>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='position'
                                        defaultValue={job.position}
                                        key={job.position}
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
                                        defaultValue={job.date}
                                        key={job.date}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', colorScheme: 'dark' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-light small mb-1'>Status</label>
                                    <select
                                        name='status'
                                        className='form-select bg-dark text-white border-secondary shadow-none'
                                        defaultValue={job.status || 'pending'}
                                        key={job.status}
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    >
                                        <option value='pending'>Pending</option>
                                        <option value='interview'>Interview</option>
                                        <option value='declined'>Declined</option>
                                    </select>
                                </div>
                                <div className='mt-3 d-flex flex-column gap-2'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-lg w-100 fw-semibold shadow'
                                        style={{
                                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '0.75rem'
                                        }}
                                    >
                                        Save Changes 💾
                                    </button>
                                    <button
                                        type='button'
                                        onClick={deleteJob}
                                        className='btn btn-outline-danger btn-lg w-100 fw-semibold shadow-none'
                                        style={{
                                            borderRadius: '10px',
                                            padding: '0.75rem',
                                            borderColor: 'rgba(239, 68, 68, 0.4)'
                                        }}
                                    >
                                        Delete Application 🗑️
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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

export default UpdateJob;