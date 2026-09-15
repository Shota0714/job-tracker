import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container text-center'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-md-6 col-lg-5'>
                        <div className="card border-0 shadow-sm p-5 bg-white" style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <h1 className='display-1 fw-bold mb-2' style={{ color: '#10b981' }}>404</h1>
                            <h2 className='h4 fw-bold text-dark mb-3'>Page Not Found</h2>
                            <p className='text-muted small mb-4 lh-lg'>
                                Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                            </p>
                            <Link
                                to='/'
                                className='btn btn-primary btn-lg w-100 fw-semibold shadow-sm text-decoration-none'
                                style={{
                                    backgroundColor: '#2563eb',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '0.75rem',
                                    fontSize: '0.95rem'
                                }}
                            >
                                Go Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;