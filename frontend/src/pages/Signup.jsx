import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import axiosInstance from '../utils/axios';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataObj = Object.fromEntries(data);

        try {
            const res = await axiosInstance.post('/auth/register', dataObj);
            setError(false);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-sm-8 col-md-5 col-lg-4'>
                        <div className="card border-0 shadow-lg p-4 p-md-5" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className='text-center mb-4'>
                                <Link to='/'>
                                    <img
                                        src={logo}
                                        height='56px'
                                        alt='JobManager Logo'
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}
                                    />
                                </Link>
                                <h1 className='h3 mt-3 mb-1 fw-bold text-white'>Create an Account</h1>
                                <p className='text-light opacity-75 small'>Start managing your job applications effortlessly</p>
                            </div>
                            <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        placeholder='Full Name'
                                        maxLength={50}
                                        required
                                        autoFocus
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        placeholder='Email Address'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control bg-dark text-white border-secondary shadow-none'
                                        placeholder='Password (min 6 chars)'
                                        minLength={6}
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-lg w-100 fw-semibold shadow'
                                        style={{
                                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '0.75rem'
                                        }}
                                    >
                                        Sign Up 🚀
                                    </button>
                                </div>
                            </form>
                            <div className='text-center mt-4'>
                                <p className='text-light opacity-75 small mb-0'>
                                    Already have an account?{' '}
                                    <Link to='/login' className='text-decoration-none fw-semibold' style={{ color: '#818cf8' }}>
                                        Log in
                                    </Link>
                                </p>
                            </div>
                            {error && (
                                <div className='mt-3 text-center py-2 px-3 small rounded-3' style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5' }}>
                                    ⚠️ Email already exists or invalid details.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8 !important;
                    opacity: 1 !important;
                }
                :-ms-input-placeholder {
                    color: #94a3b8 !important;
                }
                ::-ms-input-placeholder {
                    color: #94a3b8 !important;
                }
            `}</style>
        </div>
    );
};

export default Signup;