
import { Link } from 'react-router-dom';

const SingleTypePackage = ({ spot }) => {
    const { _id, spot_image, tour_type, trip_title, price} = spot;

    return (
        <div className="bg-base-100 shadow-xl w-80 card">
            <figure className="px-5 pt-6">
                <img src={spot_image} alt="Spot" className="rounded-xl w-[310px] h-[200px]" />
            </figure >
            <div className="items-center text-center card-body">
                <h2 className="card-title">{trip_title}</h2>
                <p>{tour_type}</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <Link to={`/details/${_id}`}><button className="btn btn-primary">View Package</button></Link>
                </div>
            </div>
        </div >
    );
};

export default SingleTypePackage;
