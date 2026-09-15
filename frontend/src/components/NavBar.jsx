import { Link } from 'react-router-dom';
import logo from '../assets/letter-j.png';

const NavBar = () => {
    return (
        <nav
            className='navbar navbar-expand-md navbar-light fixed-top'
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #e2e8f0'
            }}
        >
            <div className='container py-2'>
                <Link to='/' className='navbar-brand d-flex align-items-center gap-2'>
                    <img
                        src={logo}
                        width='32px'
                        alt='Logo'
                        atyle={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.3))' }}
                    />
                    <span className='fw-bold fs-4 text-dark' style={{ letterSpacing: '-0.03em' }}>JobTracker</span>
                </Link>
                <button
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    className='navbar-toggler border-0 shadow-none'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse justify-content-md-end gap-md-2 mt-3 mt-md-0' id='navbarNav'>
                    <Link
                        to='/signup'
                        className='btn btn-primary btn-sm px-4 py-2 fw-semibold d-block d-md-inline-block mb-2 mb-md-0 shadow-sm'
                        style={{
                            backgroundColor: '#2563eb',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                    >
                        Sign up
                    </Link>
                    <Link
                        to='/login'
                        className='btn btn-outline-secondary btn-sm px-4 py-2 fw-semibold d-block d-md-inline-block'
                        style={{
                            borderRadius: '8px',
                            borderColor: '#cbd5e1',
                            color: '#475569'
                        }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;