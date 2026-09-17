import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const DashboardLeftsidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get('/auth/profile');
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            };
        };
        fetchUser();
    }, []);

    return (
        <div
            className='d-none d-lg-flex flex-column flex-shrink-0 p-4 border-end bg-white'
            style={{
                width: '280px',
                minHeight: '100vh',
                borderColor: '#e2e8f0',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 100
            }}
        >
            <div className="d-flex align-items-center gap-2 mb-4 px-2">
                <img src={logo} width='32px' alt='Logo' style={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.3))' }} />
                <span className="fw-bold fs-4" style={{ letterSpacing: '-0.03em', color: '#0f172a' }}>JobTracker</span>
            </div>
            <div className='mt-200 mb-4 px-2 pt-2'>
                <Link
                    to='/jobs/add'
                    className='btn w-100 text-white fw-semifold shadow-sm py-2 d-flex align-items-center justify-content-center gap-2'
                    style={{ backgroundColor: '#10b981', borderRadius: '10px', fontSize: '0.9rem' }}
                >
                    <span>+</span> Add Job Application
                </Link>
            </div>
            <div className='small text-uppercase text-muted fw-fold px-2 mb-3' style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Menu</div>
            <ul className='nav nav-pills flex-column gap-1 mb-auto'>
                <li>
                    <Link
                        to='/dashboard'
                        className={`nav-link px-3 py-2 d-flex align-items-center gap-3 ${isActive('/dashboard') ? 'text-dark fw-semibold active' : 'text-muted'}`}
                        style={isActive('/dashboard') ? { backgroundColor: '#f1f5f9', borderRadius: '10px'} : {}}
                    >
                        Applications
                    </Link>
                </li>
                <li>
                    <Link
                        to='/jobs'
                        className={`nav-link px-3 py-2 d-flex align-items-center gap-3 ${isActive('/jobs') ? 'text-dark fw-semibold active' : 'text-muted'}`}
                        style={isActive('/jobs') ? { backgroundColor: '#f1f5f9', borderRadius: '10px'} : {}}
                    >
                        Job Lists
                    </Link>
                </li>
                <li>
                    <Link
                        to='/account'
                        className={`nav-link px-3 py-2 d-flex align-items-center gap-3 ${isActive('/account') ? 'text-dark fw-semibold active' : 'text-muted'}`}
                        style={isActive('/account') ? { backgroundColor: '#f1f5f9', borderRadius: '10px'} : {}}
                    >
                        Account
                    </Link>
                </li>
            </ul>
            <div className="pt-3 border-top mt-auto" style={{ borderColor: '#e2e8f0' }}>
                <div className="d-flex align-items-center gap-3 px-2 py-2">
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="rounded-circle object-fit-cover flex-shrink-0"
                            style={{ width: '40px', height: '40px' }}
                        />
                    ) : (
                        <div
                            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                            style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    )}
                    <div className="overflow-hidden" style={{ minWidth: 0 }}>
                        <h6 className="mb-0 text-dark fw-semibold text-truncate" style={{ fontSize: '0.9rem' }}>
                            {user?.name || 'User'}
                        </h6>
                        <p className="mb-0 text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                            {user?.email || ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLeftsidebar;