import { useQuery } from '@tanstack/react-query';
import axiosClient from 'lib/api/axiosClient';

async function fetchReels(page: number) {
  const res = await axiosClient.get(`/posts/home?page=${page}`);
  return res.data;
}

export default function useReels(page: number) {
  return useQuery({
    queryKey: ['Reels'],
    queryFn: () => fetchReels(page),
    // enabled: false,
  });
}
