import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardLeftsidebar from '../components/DashboardLeftsidebar';
import MobileNavbar from '../components/MobileNavbar';

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
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} className='pb-5'>
            <div className='d-none d-lg-block'>
                <DashboardNavbar />
                <DashboardLeftsidebar />
            </div>
            <MobileNavbar />
            <div className='flex-grow-1 d-flex flex-column w-100' style={{ paddingTop: '5rem', paddingLeft: '0px' }} id='content-container'>
                <style>{`
                    @media (min-width: 992px) {
                        #content-container {
                            padding-left: 280px !important;
                        }
                    }
                `}</style>
                <div className='container-fluid p-3 p-md-4 p-lg-5 mb-4' style={{ maxWidth: '100%' }}>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-lg-5'>
                            <div className="card border-0 shadow-sm p-4 p-md-5 bg-white" style={{ borderRadius: '16px', border: '1px solid #e2e8f0 !important' }}>
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.5rem' }}>Track New Job</h2>
                                    <p className="text-muted small mb-0">Enter the company and position to get started</p>
                                </div>
                                <form onSubmit={addJob} className="d-flex flex-column gap-3">
                                    <div>
                                        <label className='form-label text-dark small fw-medium mb-1'>Company Name</label>
                                        <input
                                            className='form-control bg-white text-dark shadow-none'
                                            type='text'
                                            name='company'
                                            placeholder='e.g. Google'
                                            required
                                            style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                        />
                                    </div>
                                    <div>
                                        <label className='form-label text-dark small fw-medium mb-1'>Job Position</label>
                                        <input
                                            className='form-control bg-white text-dark shadow-none'
                                            type='text'
                                            name='position'
                                            placeholder='e.g. Frontend Developer'
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
                                            defaultValue={today}
                                            required
                                            style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                        />
                                    </div>
                                    <button type='submit' className='btn btn-primary btn-lg w-100 fw-semibold mt-3 shadow-sm' style={{ backgroundColor: '#2563eb', border: 'none', borderRadius: '10px', padding: '0.75rem', fontSize: '0.95rem' }}>
                                        Save Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8 !important;
                    opacity: 1 !important;
                }
                .form-control:focus {
                    border-color: #2563eb !important;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
                }
            `}</style>
        </div>
    );
};

export default AddJob;