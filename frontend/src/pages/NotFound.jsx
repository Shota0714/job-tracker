import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container text-center'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-md-6 col-lg-5'>
                        <div className="card border-0 shadow-lg p-5" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <h1 className='display-1 fw-bold text-white mb-2' style={{ color: '#6366f1' }}>404</h1>
                            <h2 className='h4 fw-bold text-white mb-3'>Page Not Found</h2>
                            <p className='text-light opacity-75 small mb-4 lh-lg'>
                                Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                            </p>
                            <Link
                                to='/'
                                className='btn btn-primary btn-lg w-100 fw-semibold shadow text-decoration-none'
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '0.75rem'
                                }}
                            >
                                Go Back Home 🏠
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;