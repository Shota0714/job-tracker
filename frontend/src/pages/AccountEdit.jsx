import DashboardNavbar from '../components/DashboardNavbar';
import DashboardLeftsidebar from '../components/DashboardLeftsidebar';
import MobileNavbar from '../components/MobileNavbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const AccountEdit = () => {
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

    const handleProfileChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value} );
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value} );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (password.newPassword || password.currentPassword || password.confirmPassword) {
            if (password.newPassword !== password.confirmPassword) {
                setMessage({ type: 'danger', text: 'New password do not match' });
                return;
            }
            if (password.newPassword.length < 6) {
                setMessage({ type: 'danger', text: 'Password must be at least 6 characters long' });
                return;
            }
            if (!password.currentPassword) {
                setMessage({ type: 'danger', text: 'Please enter your current password' });
                return;
            }
        }

        setLoading(true);

        try {
            await axiosInstance.put('/auth/profile', {
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            });

            if (password.newPassword) {
                await axiosInstance.put('/auth/change-password', {
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword
                });
            }

            setMessage({ type: 'success', text: 'Account updated successfully' });
            setTimeout(() => {
                navigate('/account');
            }, 1500);
        } catch (err) {
            console.log(err);
            setMessage({
                type: 'danger',
                text: err.response?.data?.msg || 'Failed to update account. Please try again.' });
        } finally {
            setLoading(false);
        };
    };

    const handleDeleteAccount = async () => {
        try {
            await axiosInstance.delete('/auth/profile');
            localStorage.removeItem('token');
            navigate('/signup');
        } catch (err) {
            console.log(err);
            setMessage({
                type: 'danger',
                text: err.response?.data?.msg || 'Failed to delete account. Please try again.'
            });
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', overflowX: 'hidden' }} className='d-flex'>
            <div className='d-none d-lg-block'>
                <DashboardNavbar />
                <DashboardLeftsidebar />
            </div>
            <MobileNavbar />
            <div className='flex-grow-1 d-flex flex-column w-100' style={{ paddingTop: '5rem', paddingLeft: '0px' }} id="content-container">
                <style>{`
                    @media (min-width: 992px) {
                        #content-container {
                            padding-left: 280px !important;
                        }
                    }
                    .account-card {
                        border-radius: 16px;
                        border: 1px solid #e2e8f0;
                    }
                    .settings-section {
                        border-bottom: 1px solid #f1f5f9;
                        padding-bottom: 1.25rem;
                        margin-bottom: 1.25rem;
                    }
                    .settings-section:last-child {
                        border-bottom: none;
                        padding-bottom: 0;
                        margin-bottom: 0;
                    }
                `}</style>
                <div className='container-fluid p-3 p-md-4 p-lg-5' style={{ maxWidth: '100%' }}>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-8 col-lg-6'>
                            <div className='card border-0 shadow-sm p-4 p-md-4 bg-white account-card'>
                                <div className='d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom'>
                                    <div className='d-flex align-items-center gap-3'>
                                        <div
                                            className='position-relative'
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => document.getElementById('profileImageInput').click()}
                                        >
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt='Profile'
                                                    className='rounded-circle object-fit-cover flex-shrink-0 shadow-sm'
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            ) : (
                                                <div
                                                    className='rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0 border'
                                                    style={{ width: '50px', height: '50px', fontSize: '1.1rem', borderColor: '#e2e8f0' }}
                                                >
                                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                            )}
                                            <div className='position-absolute bottom-0 end-0 bg-dark text-white rounded-circle d-flex align-items-center justify-content-center' style={{ width: '18px', height: '18px', fontSize: '10px' }}>
                                                +
                                            </div>
                                        </div>
                                        <input
                                            type='file'
                                            id='profileImageInput'
                                            style={{ display: 'none' }}
                                            accept='image/*'
                                            onChange={handleImageChange}
                                        />
                                        <div>
                                            <h5 className='fw-bold text-dark mb-0'>{user?.name || 'Loading...'}</h5>
                                            <span className='text-muted small'>{user?.email || '...'}</span>
                                        </div>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => navigate('/account')}
                                        className='btn btn-sm btn-light border text-dark fw-medium shadow-sm px-3'
                                        style={{ borderRadius: '8px', fontSize: '0.8rem' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {message.text && (
                                    <div className={`alert alert-{message.type} py-2 small mb-4`} role='alert' style={{ borderRadius: '10px' }}>
                                        {message.text}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className='d-flex flex-column'>
                                    <div className='settings-section'>
                                        <label className='text-muted small d-block mb-1'>Full Name</label>
                                        <input
                                            type='text'
                                            className='form-control shadow-none fw-semibold text-dark'
                                            name='name'
                                            value={user.name}
                                            onChange={handleProfileChange}
                                            required
                                            style={{ borderRadius: '8px', borderColor: '#cbd5e1', padding: '0.5rem 0.75rem', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                    <div className='settings-section'>
                                        <label className='text-muted small d-block mb-1'>Email Address</label>
                                        <input
                                            type='email'
                                            className='form-control shadow-none fw-semibold text-dark'
                                            name='email'
                                            value={user.email}
                                            onChange={handleProfileChange}
                                            required
                                            style={{ borderRadius: '8px', borderColor: '#cbd5e1', padding: '0.5rem 0.75rem', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                    <div className='settings-section'>
                                        <span
                                            className='text-muted small d-block mb-2 fw-bold text-uppercase'
                                            style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                                        >
                                            Change Password (Optional)
                                        </span>
                                        <div className='d-flex flex-column gap-2'>
                                            <div>
                                                <label className='form-label text-muted small mb-1' style={{ fontSize: '0.8rem' }}>Current Password</label>
                                                <input
                                                    type='password'
                                                    className='form-control shadow-none'
                                                    name='currentPassword'
                                                    value={password.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder='Required if changing password'
                                                    style={{ borderRadius: '8px', borderColor: '#cbd5e1', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div>
                                                <label className='form-label text-muted small mb-1' style={{ fontSize: '0.8rem' }}>New Password</label>
                                                <input
                                                    type='password'
                                                    className='form-control shadow-none'
                                                    name='newPassword'
                                                    value={password.newPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder='Leave blank to keep current'
                                                    style={{ borderRadius: '8px', borderColor: '#cbd5e1', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                            <div>
                                                <label className='form-label text-muted small mb-1' style={{ fontSize: '0.8rem' }}>Confirm New Password</label>
                                                <input
                                                    type='password'
                                                    className='form-control shadow-none'
                                                    name='confirmPassword'
                                                    value={password.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder='Confirm new password'
                                                    style={{ borderRadius: '8px', borderColor: '#cbd5e1', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <button
                                            type='submit'
                                            className='btn btn-dark w-100 fw-medium shadow-sm py-2'
                                            disabled={loading}
                                            style={{ borderRadius: '8px', backgroundColor: '#0f172a', fontSize: '0.9rem' }}
                                        >
                                            {loading ? 'Saving Changes...' : 'Save Changes'}
                                        </button>
                                    </div>
                                    <div className='settings-section mt-3 pt-4 border-top'>
                                        {!showDeleteConfirm ? (
                                            <button
                                                type='button'
                                                onClick={() => setShowDeleteConfirm(true)}
                                                className='btn btn-outline-danger w-100 fw-medium shadow-sm py-2'
                                                style={{ borderRadius: '8px', fontSize: '0.9rem' }}
                                            >
                                                Delete Account
                                            </button>
                                        ) : (
                                            <div className='p-3 bg-llight border border-danger rounded-3'>
                                                <p className='small text-dark fw-semibold mb-2'>Are you sure you want to delete your account? This action cannot be undone and all your job data will be lost.</p>
                                                <div className='d-flex gap-2'>
                                                    <button
                                                        type='button'
                                                        onClick={handleDeleteAccount}
                                                        className='btn btn-danger btn-sm w-50 fw-medium'
                                                        style={{ borderRadius: '6px' }}
                                                    >
                                                        Yes, delete
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() => setShowDeleteConfirm(false)}
                                                        className='btn btn-secondary btn-sm w-50 fw-medium'
                                                        style={{ borderRadius: '6px' }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountEdit;