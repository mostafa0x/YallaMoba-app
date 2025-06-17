import { useQuery } from '@tanstack/react-query';
import axiosClient from 'lib/api/axiosClient';

async function fetchHome(page: number) {
  const res = await axiosClient.get(`/posts/home?page=${page}`);

  return res.data;
}

export default function useHome(page: number) {
  return useQuery({
    queryKey: ['home'],
    queryFn: () => fetchHome(page),
    // enabled: false,
  });
}
