import { Link } from 'react-router-dom';
import logo from '../assets/letter-j.png';

const NavBar = () => {
    return (
        <nav
            className='navbar navbar-expand-md navbar-dark fixed-top'
            style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <div className='container py-2'>
                <a href='#' className='navbar-brand d-flex align-items-center gap-2'>
                    <img
                        src={logo}
                        width='36px'
                        alt='logo'
                        style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
                    />
                    <span className="fw-bold text-white" style={{ letterSpacing: '0.05em' }}>JobManager</span>
                </a>
                <button
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    className='navbar-toggler border-0 shadow-none'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse justify-content-md-end gap-md-3 mt-3 mt-md-0' id='navbarNav'>
                    <Link
                        to='/signup'
                        className='btn btn-primary btn-sm px-4 py-2 fw-semibold d-block d-md-inline-block mb-2 mb-md-0 shadow'
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            border: 'none',
                            borderRadius: '8px'
                        }}
                    >
                        Sign up
                    </Link>
                    <Link
                        to='/login'
                        className='btn btn-outline-light btn-sm px-4 py-2 fw-semibold d-block d-md-inline-block'
                        style={{
                            borderRadius: '8px',
                            borderColor: 'rgba(255, 255, 255, 0.2)'
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