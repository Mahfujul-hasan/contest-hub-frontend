import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ContestCard from '../../../components/ContestCard/ContestCard';
import { Link } from 'react-router';

const PopularContests = () => {
    const{isLoading,data:contests}=useQuery({
        queryKey:["contests"],
        queryFn:async()=>{
            const res= await axios.get("/contest.json");
            return res.data
        }
    })

    if(isLoading){
        return <p>loading....</p>
    }
    console.log(contests);
    return (
        <div>
            <h3 className='text-4xl font-bold text-primary mt-10 text-center'>Popular contests</h3>
            <div className='grid grid-cols-3 mt-5 gap-5'>
                {
                    contests.map(contest=><ContestCard contest={contest}/>)
                }
            </div>
            <div className='mt-10 text-center'>
                <Link to="/all-contests"><button className='btn btn-info text-white px-8 text-base font-bold'>See All</button></Link>
            </div>
        </div>
    );
};

export default PopularContests;