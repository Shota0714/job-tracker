import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
        const s = status ? status.toLowerCase() : 'pending';
        let bg = 'rgba(100, 116, 139, 0.2)';
        let color = '#cbd5e1';

        if (s.includes('interview')) {
            bg = 'rgba(59, 130, 246, 0.2)';
            color = '#60a5fa';
        } else if (s.includes('offer')) {
            bg = 'rgba(34, 197, 94, 0.2)';
            color = '#4ade80';
        } else if (s.includes('reject') || s.includes('declined')) {
            bg = 'rgba(239, 68, 68, 0.2)';
            color = '#fca5a5';
        }

        return (
            <span className='badge px-3 py-2 rounded-pill fw-semibold' style={{ backgroundColor: bg, color: color, fontSize: '0.75rem' }}>
                {job.status || 'Pending'}
            </span>
        );
    };

    return (
        <div
            className='card border-0 shadow-lg p-4 text-start position-relative transition-all'
            style={{
                width: '300px',
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#f8fafc'
            }}
        >
            <div className='d-flex justify-content-between align-items-start mb-3'>
                <div>
                    <h5 className='fw-bold text-white mb-1 text-truncate' style={{ maxWidth: '200px' }} title={job.company}>
                        {job.company}
                    </h5>
                    <p className='text-light opacity-75 small mb-0 text-truncate' style={{ maxWidth: '200px' }} title={job.position}>
                        {job.position}
                    </p>
                </div>
            </div>
            <div className='mb-4'>
                <div className='d-flex align-items-center gap-2'>
                    <span className='text-light opacity-75 small' style={{ fontSize: '0.8rem' }}>Status:</span>
                    {getStatusBadge(job.status)}
                </div>
            </div>
            <button
                onClick={() => navigate(`/jobs/${job._id}/edit`)}
                className='btn btn-sm w-100 fw-semibold text-white shadow-sm'
                style={{
                    backgroundColor: '#334155',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.5rem'
                }}
            >
                Edit Application ✏️
            </button>
        </div>
    );
};

export default JobCard;