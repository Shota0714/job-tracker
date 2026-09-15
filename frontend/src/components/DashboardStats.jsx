const DashboardStats = ({ jobs = [], period = '30' }) => {
    const total = jobs.length;
    const interview = jobs.filter(j => (j.status || '').toLowerCase() === 'interview').length;
    const pending = jobs.filter(j => (j.status || '').toLowerCase() === 'pending').length;
    const declined = jobs.filter(j => (j.status || '').toLowerCase() === 'declined').length;

    const now = new Date();
    const periodDays = parseInt(period);

    const startOfCurrentPeriod = new Date(now);
    startOfCurrentPeriod.setHours(0, 0, 0, 0);
    startOfCurrentPeriod.setDate(now.getDate() - periodDays);

    const startOfPreviousPeriod = new Date(startOfCurrentPeriod);
    startOfPreviousPeriod.setDate(startOfPreviousPeriod.getDate() - periodDays);

    const currentPeriodJobs = jobs.filter(j => {
        const jobDate = new Date(j.createdAt || j.date);
        return jobDate >= startOfCurrentPeriod;
    }).length;

    const previousPeriodJobs = jobs.filter(j => {
        const jobDate = new Date(j.createdAt || j.date);
        return jobDate >= startOfPreviousPeriod && jobDate < startOfCurrentPeriod;
    }).length;

    let trendText = '0%';
    let isPositive = true;

    if (previousPeriodJobs === 0) {
        trendText = currentPeriodJobs > 0 ? `+${currentPeriodJobs}` : '0%';
        isPositive = true;
    } else {
        const percentChange = Math.round(((currentPeriodJobs - previousPeriodJobs) / previousPeriodJobs) * 100);
        trendText = `${percentChange >= 0 ? '+' : ''}${percentChange}%`;
        isPositive = percentChange >= 0;
    };

    const statCards = [
        {
            title: 'APPLICATIONS',
            count: total,
            badge: trendText,
            badgeClass: isPositive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
        },
        {
            title: 'AWATING RESPONSE',
            count: pending,
            badge: pending > 0 ? 'Action required' : 'None',
            badgeClass: pending > 0 ? 'bg-danger-subtle text-danger' :'bg-success-subtle text-success'
        },
        {
            title: 'REJECTIONS',
            count: declined,
            badge: `${declined} total`,
            badgeClass: 'bg-secondary-subtle text-secondary'
        },
        {
            title: 'INTERVIEWS',
            count: interview,
            badge: interview > 0 ? 'Active' : 'None',
            badgeClass: interview > 0 ? 'bg-primary-subtle text-primary' : 'bg-light text-muted'
        },
    ];

    return (
        <div className='row g-4 mb-5'>
            {statCards.map((card, index) => (
                <div key={index} className='col-12 col-sm-6 col-xl-3'>
                    <div
                        className='card border-0 shadow-sm p-4 bg-white'
                        style={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}
                    >
                        <span
                            className='text-muted small fw-bold mb-2 d-block'
                            style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}
                        >
                            {card.title}
                        </span>
                        <div className='d-flex align-items-baseline justify-content-between'>
                            <h2 className='display-6 fw-bold mb-0 text-dark'>{card.count}</h2>
                            <span
                                className={`badge fw-bold px-2 py-1 rounded ${card.badgeClass}`}
                                style={{ fontSize: '0.7rem' }}
                            >
                                {card.badge}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;