import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://travel-tourism-server-six.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;