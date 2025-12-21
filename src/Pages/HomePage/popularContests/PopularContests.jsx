import { useQuery } from '@tanstack/react-query';
import ContestCard from '../../../components/ContestCard/ContestCard';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Spinner from '../../../components/Spinner/Spinner';

const PopularContests = () => {
    const axiosSecure = useAxiosSecure();
    const{isLoading,data:contests=[]}=useQuery({
        queryKey:["contests"],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/contests/approved?limit=${6}`);
            return res.data;
        }
    })

    if(isLoading){
        return <Spinner/>
    }
    return (
        <div>
            <h3 className='text-4xl font-bold text-primary mt-10 text-center'>Popular contests</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 mx-5 gap-5'>
                {
                    contests.map(contest=><ContestCard key={contest._id} contest={contest}/>)
                }
            </div>
            <div className='mt-10 text-center'>
                <Link to="/all-contests"><button className='btn btn-info text-white px-8 text-base font-bold'>See All</button></Link>
            </div>
        </div>
    );
};

export default PopularContests;