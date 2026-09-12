import DashboardNavbar from '../components/DashboardNavbar';
import DashboardStats from '../components/DashboardStats';

const Dashboard = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }} className="pb-5">
            <DashboardNavbar />

            <div className='container' style={{ paddingTop: '8rem' }}>
                <div className="mb-4 text-center">
                    <h1 className="fw-bold text-white">Welcome Back!</h1>
                    <p className="text-light opacity-75">Here is an overview of your job hunting pipeline.</p>
                </div>

                <DashboardStats />
            </div>
        </div>
    );
};

export default Dashboard;