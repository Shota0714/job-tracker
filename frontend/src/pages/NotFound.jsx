import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-center container mt-5'>
            <h1>Page Not Found</h1>
            <Link to='/'>Go back home</Link>
        </div>
    );
};

export default NotFound;