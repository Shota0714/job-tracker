import { useNavigate } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

const DashboardNavbar = () => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav
            className='navbar navbar-expand-md fixed-top bg-white border-bottom'
            style={{
                borderColor: '#e2e8f0',
                height: '70px'
            }}
        >
           <div className='container-fluid px-4 d-flex justify-content-between align-items-center'>
                <a href='/dashboard' className='navbar-brand d-flex align-items-center gap-2 text-decoration-none'>
                    <img
                        src={logo}
                        width='32px'
                        alt='Logo'
                        atyle={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.3))' }}
                    />
                    <span className='fw-bold fs-4 text-dark' style={{ letterSpacing: '-0.03em' }}>JobTracker</span>
                </a>
                <div className='d-flex align-items-center gap-3'>
                    <div className='d-none d-sm-flex align-items-center gap-2 text-end'>
                        {user.profileImage && (
                            <img
                                src={user.profileImage}
                                alt='Profile Image'
                                className='rounded-circle object-fit-cover'
                                style={{ width: '32px', height: '32px' }}
                            />
                        )}
                        <div>
                            <h6 className='mb-0 text-dark fw-semibold' style={{ fontSize: '0.85rem' }}>
                                {user.name || 'User'}
                            </h6>
                            <p className='mb-0 text-muted' style={{ fontSize: '0.75rem' }}>
                                {user.email || ''}
                            </p>
                        </div>
                    </div>
                    <button
                        className='btn btn-outline-danger btn-sm px-3 py-1.5 rounded-pill fw-semibold'
                        style={{ fontSize: '0.85rem' }}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
           </div>
        </nav>
    );
};

export default DashboardNavbar;