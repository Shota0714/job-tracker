import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/letter-j.png';

const DashboardNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-md fixed-top" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className='container py-2'>
                <a href='/dashboard' className='navbar-brand d-flex align-items-center gap-2'>
                    <img src={logo} width='36px' alt='Logo' style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }} />
                    <span className="fw-bold text-white tracking-wide" style={{ letterSpacing: '0.05em' }}>JobTracker</span>
                </a>
                <button
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    className='navbar-toggler border-0 shadow-none'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse justify-content-between mt-3 mt-md-0' id='navbarNav'>
                    <ul className="navbar-nav mx-auto gap-md-3">
                        <li className="nav-item">
                            <Link to='/dashboard' className="nav-link text-light fw-semibold">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/jobs' className="nav-link text-light fw-semibold">Job Lists</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/jobs/add' className="nav-link text-light fw-semibold">Add Job</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button className='btn btn-outline-danger btn-sm px-4 rounded-pill fw-semibold transition-all w-100 w-md-auto' onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;