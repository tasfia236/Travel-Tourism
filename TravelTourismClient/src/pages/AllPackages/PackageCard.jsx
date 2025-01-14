import redHeart from '../../assets/icons/red_hearts.png';
import heartOutline from '../../assets/icons/heart_outline.png';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PackageCard = ({ spot, refetch }) => {
    const { _id, spot_image, tour_type, trip_title, price, wishlist, wish_email = [] } = spot;
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const wishlistChange = id => {
        const isAlreadyInWishlist = wish_email.includes(user.email);
        const newWishValue = isAlreadyInWishlist ? 0 : 1;

        axiosPublic.patch(`/wishspots/${id}`, {
            wish: newWishValue,
            wish_email: user.email
        })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: 'Success',
                    text: isAlreadyInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="bg-base-100 shadow-xl w-80 card">
            <figure className="px-5 pt-6">
                <img src={spot_image} alt="Spot" className="rounded-xl w-[310px] h-[200px]" />
                <div className='absolute flex gap-2 -mt-36 -ml-60 px-2 py-1 text-white'>
                    <button onClick={() => wishlistChange(_id)}>
                        <img src={wish_email.includes(user?.email) ? redHeart : heartOutline} className='w-6 h-6' alt="" />
                    </button>
                </div>
            </figure >
            <div className="items-center text-center card-body">
                <h2 className="card-title">{trip_title}</h2>
                <p>{tour_type}</p>
                <p>Price: {price}</p>
                <div className="card-actions">
                    <Link to={`/details/${_id}`}><button className="btn btn-primary btn-sm">View Package</button></Link>
                </div>
            </div>
        </div >
    );
};

export default PackageCard;
