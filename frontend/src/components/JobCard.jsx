import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
        const s = status ? status.toLowerCase() : 'pending';
        let bg = '#e2e8f0';
        let color = '#475569';

        if (s.includes('interview')) {
            bg = '#dbeafe';
            color = '#1d4ed8';
        } else if (s.includes('offer')) {
            bg = '#dcfce7';
            color = '#15803d';
        } else if (s.includes('reject') || s.includes('declined')) {
            bg = '#fee2e2';
            color = '#b91c1c';
        } else if (s.includes('applied')) {
            bg = '#e0f2fe';
            color = '#0369a1';
        }

        return (
            <span className='badge px-3 py-2 rounded-pill fw-medium' style={{ backgroundColor: bg, color: color, fontSize: '0.75rem' }}>
                {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'Pending'}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    return (
        <div
            className='card border-0 p-4 text-start position-relative job-card bg-white shadow-sm'
            style={{
                width: '300px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
            }}
            onClick={() => navigate(`/jobs/${job._id}/edit`)}
        >
            <style>{`
                .job-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
                    border-color: #cbd5e1 !important;
                }
                .job-card:hover .edit-btn {
                    background-color: #f1f5f9;
                    color: #0f172a;
                }
            `}</style>
            <div className='d-flex align-items-center gap-2 mb-3'>
                <span
                    className='rounded bg-light text-secondary d-flex align-items-center justify-content-center fw-bold border flex-shrink-0'
                    style={{ width: '32px', height: '32px', fontSize: '0.8rem', borderColor: '#e2e8f0' }}
                >
                    {job.company ? job.company.charAt(0).toUpperCase() : 'C'}
                </span>
                <div className="overflow-hidden">
                    <h5 className='fw-bold text-dark mb-0 text-truncate' style={{ fontSize: '0.95rem' }} title={job.company}>
                        {job.company || 'Unknown'}
                    </h5>
                    <p className='text-muted small mb-0 text-truncate' style={{ fontSize: '0.8rem' }} title={job.position}>
                        {job.position || 'No Position'}
                    </p>
                </div>
            </div>
            <hr style={{ borderColor: '#f1f5f9', margin: '0.75rem 0' }} />
            <div className='mb-3 d-flex flex-column gap-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <span className='text-muted small' style={{ fontSize: '0.8rem' }}>Status</span>
                    {getStatusBadge(job.status)}
                </div>
                <div className='d-flex align-items-center justify-content-between py-1'>
                    <span className='text-muted small' style={{ fontSize: '0.8rem' }}>Applied Date</span>
                    <span className='text-dark small fw-medium' style={{ fontSize: '0.8rem' }}>{formatDate(job.date)}</span>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/jobs/${job._id}/edit`);
                }}
                className='btn btn-sm w-100 fw-medium shadow-sm edit-btn'
                style={{
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.45rem',
                    fontSize: '0.8rem'
                }}
            >
                Edit Application
            </button>
        </div>
    );
};

export default JobCard;