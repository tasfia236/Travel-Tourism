
import { useQuery } from "@tanstack/react-query";
import SinglePackage from "./SinglePackage";
import { Link } from "react-router-dom";
const Packages = () => {
    const { isPending, isError, error, data: spots } = useQuery({
        queryKey: ['spots'],
        queryFn: async () => {
            const res = await fetch('https://travel-tourism-seven.vercel.app/spots');
            return res.json();
        }
    })
    // console.log(spots);


    if (isPending) {
        return <span className="text-primary loading loading-spinner"></span>
    }

    if (isError) {
        return <p>{error.message}</p>
    }


    return (
        <div className="flex flex-col justify-center items-around p-4 md:p-8 lg:p-12">
            <div className="content-center gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    spots?.slice(0, 3).map(spot => <SinglePackage
                        key={spot._id}
                        spot={spot}
                    ></SinglePackage>)
                }
            </div>
            <div className="border-3 pt-5 text-center">
                <Link to='/allpackages'><button className="mx-auto btn btn-outline">All Packages</button></Link>
            </div>
        </div>

    );
};

export default Packages;