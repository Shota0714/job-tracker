import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import axiosInstance from '../utils/axios';
import { useState } from 'react';
import Navbar from '../components/NavBar';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataObj = Object.fromEntries(data);

        try {
            const res = await axiosInstance.post('/auth/login', dataObj);
            setError(false);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError(true);
        };
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }} className='d-flex align-items-center justify-content-center py-5'>
            <Navbar />
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-sm-8 col-md-5 col-lg-4'>
                        <div className="card border-0 shadow-sm p-4 p-md-5 bg-white" style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div className='text-center mb-4'>
                                <Link to='/'>
                                    <img
                                        src={logo}
                                        height='48px'
                                        alt='JobManager Logo'
                                    />
                                </Link>
                                <h1 className='h4 mt-3 mb-1 fw-bold text-dark'>Welcome Back</h1>
                                <p className='text-muted small mb-0'>Log in to manage your job pipeline</p>
                            </div>
                            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                                <div>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control bg-white text-dark shadow-none'
                                        placeholder='Email address'
                                        required
                                        autoFocus
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control bg-white text-dark shadow-none'
                                        placeholder='Password'
                                        required
                                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', borderColor: '#cbd5e1' }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-lg w-100 fw-semibold shadow-sm'
                                        style={{
                                            backgroundColor: '#2563eb',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '0.75rem',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className='text-center mt-4'>
                                <p className='text-muted small mb-0'>
                                    Don't have an account?{' '}
                                    <Link to='/signup' className='text-decoration-none fw-semibold' style={{ color: '#2563eb' }}>
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                            {error && (
                                <div className='mt-3 text-center py-2 px-3 small rounded-3' style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c' }}>
                                    Incorrect email or password.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                ::placeholder {
                    color: #94a3b8;
                    opacity: 1;
                }
                :-ms-input-placeholder {
                    color: #94a3b8;
                }
                ::-ms-input-placeholder {
                    color: #94a3b8;
                }
                .form-control:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
            `}</style>
        </div>
    );
};

export default Login;