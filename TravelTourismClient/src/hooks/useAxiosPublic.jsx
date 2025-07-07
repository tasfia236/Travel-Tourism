import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://travel-tourism-seven.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;