
import { Link, useLoaderData } from 'react-router-dom';
import SingleTypePackage from './SingleTypePackage';

const TypePackages = () => {

    const types = useLoaderData();
    // console.log(types);

    return (
        <div>
            <div className="gap-8 gap-y-5 grid sm:grid-cols-1 lg:grid-cols-3 px-12 py-24">
                {
                    types?.slice(0, 3).map(spot => <SingleTypePackage
                        key={spot._id}
                        spot={spot}
                    ></SingleTypePackage>)
                }
            </div>
            <div className="border-3 ml-[50%] pb-10">
                <Link to='/allpackages'><button className="mx-auto btn btn-outline">All Packages</button></Link>
            </div>
        </div>
    );
};

export default TypePackages;