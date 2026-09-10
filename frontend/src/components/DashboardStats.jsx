import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

const DashboardStats = () => {
    const [stats, setStats] = useState({ total: 0, interview: 0, pending: 0, declined: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosInstance.get('/jobs');
                const jobs = res.data.jobs;
                const total = jobs.length;
                const interview = jobs.filter(j => j.status === 'interview').length;
                const pending = jobs.filter(j => j.status === 'pending').length;
                const declined = jobs.filter(j => j.status === 'declined').length;

                setStats({ total, interview, pending, declined });
            } catch (err) {
                console.log(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="row g-4 mb-5 justify-content-center">
            <div className="col-12 col-sm-6 col-md-3">
                <div className="card border-0 shadow-lg p-4 text-center" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <h6 className="text-light opacity-75 small mb-2">Total Applications</h6>
                    <h2 className="display-5 fw-bold text-white mb-0">{stats.total}</h2>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="card border-0 shadow-lg p-4 text-center" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <h6 className="small mb-2" style={{ color: '#60a5fa' }}>Interviews</h6>
                    <h2 className="display-5 fw-bold text-white mb-0">{stats.interview}</h2>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="card border-0 shadow-lg p-4 text-center" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <h6 className="small mb-2" style={{ color: '#fbbf24' }}>Pending</h6>
                    <h2 className="display-5 fw-bold text-white mb-0">{stats.pending}</h2>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
                <div className="card border-0 shadow-lg p-4 text-center" style={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <h6 className="small mb-2" style={{ color: '#fca5a5' }}>Declined</h6>
                    <h2 className="display-5 fw-bold text-white mb-0">{stats.declined}</h2>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;