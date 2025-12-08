import axios from 'axios';
import React from 'react';

const PopularContests = () => {
    axios.get('/public/contest.json')
    .then(res=>{
        console.log(res);
    })

    return (
        <div>
            
        </div>
    );
};

export default PopularContests;