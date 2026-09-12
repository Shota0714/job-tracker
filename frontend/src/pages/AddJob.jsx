import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import DashboardNavbar from '../components/DashboardNavbar';

const AddJob = () => {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const addJob = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataObj = Object.fromEntries(data);

        try {
            await axiosInstance.post('/jobs', dataObj);
            navigate('/jobs');
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className="pb-5">
            <DashboardNavbar />
            <div className='container' style={{ paddingTop: '8rem' }}>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-lg-5'>
                        <div className="card border-0 shadow-lg p-4 p-md-5" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-white mb-1">Track New Job</h2>
                                <p className="text-light opacity-75 small">Enter the company and position to get started</p>
                            </div>
                            <form onSubmit={addJob} className="d-flex flex-column gap-3">
                                <div>
                                    <label className='form-label text-light small mb-1'>Company Name</label>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='company'
                                        placeholder='e.g. Google'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <label className='form-label text-light small mb-1'>Job Position</label>
                                    <input
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        type='text'
                                        name='position'
                                        placeholder='e.g. Frontend Developer'
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
                                <button type='submit' className='btn btn-primary btn-lg w-100 fw-semibold mt-3 shadow' style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', border: 'none', borderRadius: '10px', padding: '0.75rem' }}>
                                    Save Application
                                </button>
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

export default AddJob;