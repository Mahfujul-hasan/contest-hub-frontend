import { useQuery } from '@tanstack/react-query';
import ContestCard from '../../../components/ContestCard/ContestCard';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Spinner from '../../../components/Spinner/Spinner';
import { IoIosArrowRoundForward, IoMdArrowForward } from 'react-icons/io';
import ContestCardSkeleton from '../../../components/Skeleton/CardSkeleton';

const PopularContests = () => {
    const axiosSecure = useAxiosSecure();
    const{isLoading,data:contests=[]}=useQuery({
        queryKey:["contests"],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/contests/approved?limit=${8}`);
            return res.data;
        }
    })

    if(isLoading){
        return <ContestCardSkeleton/>
    }
    return (
        <div>
            <h3 className='text-3xl text-primary font-semibold text-center mb-10'>Popular contests</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4'>
                {
                    contests.map(contest=><ContestCard key={contest._id} contest={contest}/>)
                }
            </div>
            <div className='mt-10 text-center'>
                <Link to="/all-contests"><button className='btn btn-primary text-white px-8 text-base font-bold'>See All <IoMdArrowForward /></button></Link>
            </div>
        </div>
    );
};

export default PopularContests;