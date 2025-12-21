import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const { data: userRole="user", isLoading:roleLoading } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });
    return {userRole,roleLoading};
};

export default useRole;