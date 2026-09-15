import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import axiosInstance from '../utils/axios';

const MobileNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const [isOpen, setIsOpen] = useState(false);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className='navbar d-flex d-lg-none fixed-top bg-white border-bottom px-3 justify-content-between align-items-center'
                style={{
                    borderColor: '#e2e8f0',
                    height: '65px',
                    zIndex: 1030
                }}
            >
                <div className='d-flex align-items-center gap-2'>
                    <button
                        className='btn p-0 d-flex align-items-center justify-content-center text-dark shadow-sm position-relative'
                        onClick={() => setIsOpen(true)}
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            width: '42px',
                            height: '42px',
                            transition: 'all 0.2s ease-in-out',
                        }}
                        aria-label='Open Navigation Menu'
                    >
                        <div className="d-flex flex-column justify-content-between" style={{ width: '18px', height: '12px' }}>
                            <span style={{ height: '2px', backgroundColor: '#0f172a', borderRadius: '2px', width: '100%' }}></span>
                            <span style={{ height: '2px', backgroundColor: '#0f172a', borderRadius: '2px', width: '75%' }}></span>
                            <span style={{ height: '2px', backgroundColor: '#0f172a', borderRadius: '2px', width: '100%' }}></span>
                        </div>
                    </button>
                    <a href='/dashboard' className='navbar-brand d-flex align-items-center gap-2 text-decoration-none m-0'>
                        <img
                            src={logo}
                            width='28px'
                            alt='Logo'
                            style={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.3))' }}
                        />
                        <span className='fw-bold fs-5 text-dark' style={{ letterSpacing: '-0.03em' }}>JobTracker</span>
                    </a>
                </div>
                <div className='d-flex align-items-center gap-2'>
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt='Profile'
                            className='rounded-circle object-fit-cover'
                            style={{ width: '32px', height: '32px' }}
                        />
                    ) : (
                        <div
                            className='rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold'
                            style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    )}
                </div>
            </nav>
            <div
                className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`}
                tabIndex='-1'
                style={{ visibility: isOpen ? 'visible' : 'hidden', width: '280px', zIndex: 1050 }}
            >
                <div className='offcanvas-header border-bottom px-4 py-3' style={{ borderColor: '#e2e8f0' }}>
                    <div className='d-flex align-items-center gap-2'>
                        <img src={logo} width='28px' alt='Logo' style={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.3))' }} />
                        <span className='fw-bold fs-5 text-dark' style={{ letterSpacing: '-0.03em' }}>JobTracker</span>
                    </div>
                    <button
                        type='button'
                        className='btn-close shadow-none'
                        onClick={() => setIsOpen(false)}
                        aria-label='Close'
                    ></button>
                </div>
                <div className='offcanvas-body d-flex flex-column p-4'>
                    <div className='mb-4'>
                        <Link
                            to='/jobs/add'
                            onClick={handleLinkClick}
                            className='btn w-100 text-white fw-semibold shadow-sm py-2 d-flex align-items-center justify-content-center gap-2'
                            style={{ backgroundColor: '#10b981', borderRadius: '10px', fontSize: '0.9rem' }}
                        >
                            <span>+</span> Add Job Application
                        </Link>
                    </div>
                    <div className='small text-uppercase text-muted fw-bold mb-3' style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Menu</div>
                    <ul className='nav nav-pills flex-column gap-1 mb-auto'>
                        <li>
                            <Link
                                to='/dashboard'
                                onClick={handleLinkClick}
                                className={`nav-link px-3 py-2 d-flex align-items-center gap-3 ${isActive('/dashboard') ? 'text-dark fw-semibold active' : 'text-muted'}`}
                                style={isActive('/dashboard') ? { backgroundColor: '#f1f5f9', borderRadius: '10px' } : {}}
                            >
                                Applications
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/jobs'
                                onClick={handleLinkClick}
                                className={`nav-link px-3 py-2 d-flex align-items-center gap-3 ${isActive('/jobs') ? 'text-dark fw-semibold active' : 'text-muted'}`}
                                style={isActive('/jobs') ? { backgroundColor: '#f1f5f9', borderRadius: '10px' } : {}}
                            >
                                Job Lists
                            </Link>
                        </li>
                    </ul>
                    <div className='pt-3 border-top mt-auto' style={{ borderColor: '#e2e8f0' }}>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                            <div className='d-flex align-items-center gap-3 overflow-hidden'>
                                {user?.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt='Profile'
                                        className='rounded-circle object-fit-cover flex-shrink-0'
                                        style={{ width: '38px', height: '38px' }}
                                    />
                                ) : (
                                    <div
                                        className='rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0'
                                        style={{ width: '38px', height: '38px', fontSize: '0.85rem' }}
                                    >
                                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                                <div className='overflow-hidden' style={{ minWidth: 0 }}>
                                    <h6 className='mb-0 text-dark fw-semibold text-truncate' style={{ fontSize: '0.85rem' }}>
                                        {user?.name || 'User'}
                                    </h6>
                                    <p className='mb-0 text-muted text-truncate' style={{ fontSize: '0.7rem' }}>
                                        {user?.email || ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            className='btn btn-outline-danger btn-sm w-100 py-2 rounded-pill fw-semibold'
                            style={{ fontSize: '0.85rem' }}
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='modal-backdrop fade show d-lg-none'
                    style={{ zIndex: 1040 }}
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default MobileNavbar;