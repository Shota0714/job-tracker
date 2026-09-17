import DashboardNavbar from '../components/DashboardNavbar';
import DashboardLeftsidebar from '../components/DashboardLeftsidebar';
import MobileNavbar from '../components/MobileNavbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const Account = () => {
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/auth/profile');
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', overflowX: 'hidden' }} className='d-flex'>
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
                    .account-card {
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                    }
                    .settings-section {
                        border-bottom: 1px solid #f1f5f9;
                        padding-bottom: 1.25rem;
                        margin-bottom: 1.25rem;
                    }
                    .settings-section:last-child {
                        border-bottom: none;
                        padding-bottom: 0;
                        margin-bottom: 0;
                    }
                `}</style>
                <div className='container-fluid p-3 p-md-4 p-lg-5' style={{ maxWidth: '100%' }}>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-8 col-lg-6'>
                            <div className='card border-0 shadow-sm p-4 p-md-4 bg-white account-card'>
                                <div className='d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom'>
                                    <div className='d-flex align-items-center gap-3'>
                                        {user?.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt='Profile'
                                                className='rounded-circle object-fit-cover flex-shrink-0 shadow-sm'
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        ) : (
                                            <div
                                                className='rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0 border'
                                                style={{ width: '50px', height: '50px', fontSize: '1.1rem', borderColor: '#e2e8f0' }}
                                            >
                                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                        <div>
                                            <h5 className='fw-bold text-dark mb-0'>{user?.name || 'Loading...'}</h5>
                                            <span className='text-muted small'>{user?.email || '...'}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/account/edit')}
                                        className='btn btn-sm btn-light border text-dark fw-medium shadow-sm px-3'
                                        style={{ borderRadius: '8px', fontSize: '0.85rem' }}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                                <div className='d-flex flex-column gap-3'>
                                    <div className='settings-section'>
                                        <span className='text-muted small d-block mb-1'>Full Name</span>
                                        <h6 className='fw-semibold text-dark mb-0'>{user.name || 'Loading...'}</h6>
                                    </div>
                                    <div className='settings-section'>
                                        <span className='text-muted small d-block mb-1'>Email Address</span>
                                        <h6 className='fw-semibold text-dark mb-0'>{user.email || 'Loading...'}</h6>
                                    </div>
                                    <div className='settings-section'>
                                        <span className='text-muted small d-block mb-1'>Password</span>
                                        <h6 className='fw-semibold text-dark mb-0' style={{ letterSpacing: '3px' }}>••••••••••••</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;