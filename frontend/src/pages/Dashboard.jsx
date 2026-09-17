import DashboardNavbar from '../components/DashboardNavbar';
import DashboardStats from '../components/DashboardStats';
import DashboardLeftsidebar from '../components/DashboardLeftsidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import MobileNavbar from '../components/MobileNavbar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('30');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedJobIds, setSelectedJobIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobRes, userRes] = await Promise.all([
                    axiosInstance.get('/jobs'),
                    axiosInstance('/auth/profile')
                ]);

                setJobs(jobRes.data.jobs || []);
                setUser(userRes.data.user || {});
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    const filteredJobsByPeriod = jobs.filter((job) => {
        const jobDate = new Date(job.createdAt || job.date);

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            return jobDate >= start && jobDate <= end;
        }

        const now = new Date();
        const daysDifference = (now - jobDate) / (1000 * 60 * 60 * 24);

        return daysDifference <= parseInt(selectedPeriod);
    });

    const recentJobs = filteredJobsByPeriod.filter((job) => {
        const term = searchTerm.toLowerCase();
        const company = job.company ? job.company.toLowerCase() : '';
        const position = job.position ? job.position.toLowerCase() : '';
        const matchSearch = company.includes(term) || position.includes(term);

        const status = job.status ? job.status.toLowerCase() : 'pending';
        const matchStatus = statusFilter === 'all' || status === statusFilter;

        return matchSearch && matchStatus;
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-CA', options);
    };

    const getFormattedDateDisplay = () => {
            if (startDate && endDate) {
                return `${startDate.slice(5).replace('-', '.')} - ${endDate.slice(5).replace('-', '.')}`;
            }
            const today = new Date();
            const pastDate = new Date();
            pastDate.setDate(today.getDate() - parseInt(selectedPeriod));

            const formatDateStr = (d) => d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '.');
            return `${formatDateStr(pastDate)} - ${formatDateStr(today)}`;
    };

    const formattedDateDisplay = getFormattedDateDisplay();

    const getStatusBadge = (status) => {
        const s = status ? status.toLowerCase() : 'pending';
        let bg = '#e2e8f0';
        let color = '#475569';

        if (s.includes('interview')) {
            bg = '#dbeafe';
            color = '#1d4ed8';
        } else if (s.includes('declined')) {
            bg = '#fee2e2';
            color = '#b91c1c';
        } else if (s.includes('applied')) {
            bg = '#e0f2fe';
            color = '#0369a1';
        }

        return (
            <span className='badge px-3 py-2 rounded-pill fw-medium' style={{ backgroundColor: bg, color: color, fontSize: '0.75rem' }}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
            </span>
        )
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = recentJobs.map(job => job._id);
            setSelectedJobIds(allIds);
        } else {
            setSelectedJobIds([]);
        };
    };

    const handleSelectRow = (id) => {
        if (selectedJobIds.includes(id)) {
            setSelectedJobIds(selectedJobIds.filter(item => item !== id));
        } else {
            setSelectedJobIds([...selectedJobIds, id]);
        };
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job application?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/jobs/${id}`);
            setJobs(jobs.filter(job => job._id !== id));
            setSelectedJobIds(selectedJobIds.filter(selectedId => selectedId !== id));
            alert('Successfully deleted');
        } catch (err) {
            console.log(err);
        }
    };

    const handleBulkDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedJobIds.length} job applications?`);
        if (!confirmDelete) return;

        try {
            await Promise.all(selectedJobIds.map(id => axiosInstance.delete(`/jobs/${id}`)));

            setJobs(jobs.filter(job => !selectedJobIds.includes(job._id)));
            setSelectedJobIds([]);
            alert('Successfully deleted selected applications');
        } catch (err) {
            console.log(err);
        }
    };

return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', overflowX: 'hidden' }} className='d-flex pb-sm-100'>
            <div className='d-none d-lg-block'>
                <DashboardNavbar />
                <DashboardLeftsidebar />
            </div>
            <MobileNavbar />
            <div className='flex-grow-1 d-flex flex-column w-100' style={{ paddingTop: '5rem', paddingLeft: '0px' }} id='content-container'>
                <style>{`
                    @media (min-width: 992px) {
                        #content-container {
                            padding-left: 280px !important;
                        }
                    }
                `}</style>
                <div className='container-fluid p-3 p-md-4 p-lg-5 mb-4' style={{ maxWidth: '100%' }}>
                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4 gap-3'>
                        <div className='d-flex gap-1 overflow-auto pb-1 pb-md-0 w-100'>
                            {[
                                { label: '3 months', value: '90' },
                                { label: '30 days', value: '30' },
                                { label: '7 days', value: '7' },
                            ].map((period) => (
                                <button
                                    key={period.value}
                                    onClick={() => {
                                        setSelectedPeriod(period.value);
                                        setStartDate('');
                                        setEndDate('');
                                    }}
                                    className={`btn btn-sm px-3 rounded-pill fw-semibold text-nowrap ${selectedPeriod === period.value && !startDate ? 'btn-light border shadow-sm text-dark' : 'text-muted border-0 bg-transparent'}`}
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>
                        <div className='d-flex gap-2 align-items-center justify-content-between justify-content-md-end position-relative w-100 w-md-auto'>
                            <div className='bg-white px-3 py-1 rounded-pill border small text-muted shadow-sm text-nowrap'>
                                {formattedDateDisplay}
                            </div>
                            <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className='btn btn-sm btn-light border rounded-pill px-3 text-muted fw-semibold shadow-sm bg-white text-nowrap'
                            >
                                Filter {statusFilter !== 'all' ? `(${statusFilter})` : ''}
                            </button>
                            {showFilterDropdown && (
                                <div
                                    className='position-absolute bg-white border shadow-lg p-3 rounded-4'
                                    style={{ top: '45px', right: '0', width: '260px', zIndex: 1000 }}
                                >
                                    <h6 className='fw-bold text-dark mb-2' style={{ fontSize: '0.85rem' }}>Filter Status</h6>
                                    <select
                                        className='form-select form-select-sm mb-3 shadow-none'
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value='all'>All Statuses</option>
                                        <option value='applied'>Applied</option>
                                        <option value='interview'>Interview</option>
                                        <option value='pending'>Pending</option>
                                        <option value='declined'>Declined</option>
                                    </select>
                                    <h6 className='fw-bold text-dark mb-2' style={{ fontSize: '0.85rem' }}>Custom Date Range</h6>
                                    <div className='mb-2'>
                                        <label className='text-muted' style={{ fontSize: '0.7rem' }}>Start Date</label>
                                        <input
                                            type='date'
                                            className='form-control form-control-sm shadow-none'
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='text-muted' style={{ fontSize: '0.7rem' }}>End Date</label>
                                        <input
                                            type='date'
                                            className='form-control form-control-sm shadow-none'
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-between gap-2'>
                                        <button
                                            className='btn btn-sm btn-outline-secondary w-100'
                                            onClick={() => {
                                                setStatusFilter('all');
                                                setStartDate('');
                                                setEndDate('');
                                            }}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className='btn btn-sm btn-success w-100 text-white'
                                            onClick={() => setShowFilterDropdown(false)}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <DashboardStats period={selectedPeriod} jobs={filteredJobsByPeriod} />
                    <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3 mt-4'>
                        <h5 className='fw-bold mb-0 text-dark d-flex align-items-center text-nowrap gap-2'>
                            Recent Applications
                            {selectedJobIds.length > 0 && (
                                <span className="badge bg-primary" style={{ fontSize: '0.75rem' }}>
                                    {selectedJobIds.length} selected
                                </span>
                            )}
                        </h5>
                        <div className='d-flex gap-2 align-items-center justify-content-md-end flex-wrap flex-sm-nowrap w-100 w-md-auto'>
                            {selectedJobIds.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className='btn btn-sm btn-danger fw-semibold px-3 py-1 flex-grow-1 flex-sm-grow-0 text-nowrap'
                                >
                                    Delete ({selectedJobIds.length})
                                </button>
                            )}
                            <input
                                type='text'
                                className='form-control form-control-sm bg-white text-dark border shadow-none w-100 w-md-auto'
                                placeholder='Search company or position...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderRadius: '8px', maxWidth: '240px' }}
                            />
                        </div>
                    </div>
                    <div className='card border-0 shadow-sm bg-white overflow-hidden' style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div className='table-responsive' style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            <table className='table align-middle mb-0 text-nowrap' style={{ fontSize: '0.85rem' }}>
                                <thead className='bg-light text-muted border-bottom' style={{ borderColor: '#e2e8f0', fontSize: '0.7rem', letterSpacing: '0.03em' }}>
                                    <tr>
                                        <th className='py-3 px-3' style={{ width: '30px' }}>
                                            <input
                                                type='checkbox'
                                                className='form-check-input shadow-none'
                                                onChange={handleSelectAll}
                                                checked={recentJobs.length > 0 && selectedJobIds.length === recentJobs.length}
                                            />
                                        </th>
                                        <th className='py-3 px-3 fw-semibold'>Company</th>
                                        <th className='py-3 px-3 fw-semibold'>Date applied</th>
                                        <th className='py-3 px-3 fw-semibold'>Status</th>
                                        <th className='py-3 px-3 fw-semibold d-none d-lg-table-cell'>Last update</th>
                                        <th className='py-3 px-3 fw-semibold'>Role</th>
                                        <th className='py-3 px-3 fw-semibold text-end'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentJobs.length === 0 ? (
                                        <tr>
                                            <td colSpan='7' className='text-center py-5 text-muted'>
                                                No job application recorded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentJobs.map((job) => (
                                            <tr key={job._id} className='border-bottom' style={{ borderColor: '#f1f5f9' }}>
                                                <td className='py-3 px-3'>
                                                    <input
                                                        type='checkbox'
                                                        className='form-check-input shadow-none'
                                                        checked={selectedJobIds.includes(job._id)}
                                                        onChange={() => handleSelectRow(job._id)}
                                                    />
                                                </td>
                                                <td className='py-3 px-3 fw-bold text-dark'>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className='rounded bg-light text-secondary d-flex align-items-center justify-content-center fw-bold border flex-shrink-0' style={{ width:'26px', height: '26px', fontSize: '0.7rem' }}>
                                                            {job.company ? job.company.charAt(0).toUpperCase() : 'C'}
                                                        </span>
                                                        <span className="text-truncate" style={{ maxWidth: '100px' }}>{job.company || 'Unknown'}</span>
                                                    </div>
                                                </td>
                                                <td className='py-3 px-3 text-muted'>{formatDate(job.date)}</td>
                                                <td className='py-3 px-3'>{getStatusBadge(job.status)}</td>
                                                <td className='py-3 px-3 text-muted d-none d-lg-table-cell'>{formatDate(job.updatedAt || job.date)}</td>
                                                <td className='py-3 px-3 text-dark text-truncate' style={{ maxWidth: '110px' }}>{job.position}</td>
                                                <td className='py-3 px-3 text-end'>
                                                    <div className="d-flex align-items-center justify-content-end gap-1">
                                                        <button
                                                            onClick={() => navigate(`/jobs/${job._id}/edit`)}
                                                            className='btn btn-sm btn-light border fw-medium px-2 py-1 text-primary shadow-sm'
                                                            style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(job._id)}
                                                            className='btn btn-sm btn-light border fw-medium px-2 py-1 text-danger shadow-sm'
                                                            style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;