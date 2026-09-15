import { Link } from 'react-router-dom';
import board from '../assets/Whiteboard.png';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container'>
                <div className='row align-items-center justify-content-center g-5'>
                    <div className='col-12 col-md-6 text-center'>
                        <img
                            className='w-100 img-fluid'
                            src={board}
                            alt='Job Manager Whiteboard'
                            style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08))', borderRadius: '12px' }}
                        />
                    </div>
                    <div className='col-12 col-md-5'>
                        <h1 className='display-4 fw-bold text-dark mb-3 tracking-tight'>
                            JOB <span style={{ color: '#10b981' }}>TRACKER</span>
                        </h1>
                        <p className='text-muted fs-6 lh-lg mb-4'>
                            Master your workday with Job Manager. The all-in-one platform designed to keep your tasks organized, your priorities clear, and your deadlines on track—no matter what you're working on.
                        </p>
                        <Link
                            to='/signup'
                            className='btn btn-lg w-100 fw-semibold text-white shadow-sm'
                            style={{
                                backgroundColor: '#2563eb',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0.85rem 1.5rem',
                                fontSize: '1rem'
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;