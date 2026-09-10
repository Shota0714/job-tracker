import { Link } from 'react-router-dom';
import board from '../assets/Whiteboard.png';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className='d-flex align-items-center justify-content-center py-5'>
            <div className='container'>
                <div className='row align-items-center justify-content-center g-5'>
                    <div className='col-12 col-md-6 text-center'>
                        <img
                            className='w-100 img-fluid'
                            src={board}
                            alt='Job Manager Whiteboard'
                            style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.4))', borderRadius: '12px' }}
                        />
                    </div>
                    <div className='col-12 col-md-5'>
                        <h1 className='display-4 fw-bold text-white mb-3 tracking-tight'>
                            JOB <span style={{ color: '#6366f1' }}>MANAGER</span>
                        </h1>
                        <p className='text-secondary fs-6 lh-lg mb-4'>
                            Take control of your work day with Job Manager — the simplest way to organize, track, and prioritize your jobs. Whether you're managing freelance gigs, client tasks, or team projects, our intuitive dashboard helps you stay focused and never miss a deadline. Add, update, and complete jobs with ease — all in one place.
                        </p>
                        <Link
                            to='/signup'
                            className='btn btn-lg w-100 fw-semibold text-white shadow'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0.85rem 1.5rem'
                            }}
                        >
                            Get Started 🚀
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;