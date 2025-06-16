import { useQuery } from '@tanstack/react-query';
import axiosClient from 'lib/api/axiosClient';

async function fetchReels(page: number, type: string) {
  const res = await axiosClient.get(`/posts/${type}?page=${page}`);
  return res.data;
}

export default function useReels(page: number, type: string) {
  return useQuery({
    queryKey: ['Reels'],
    queryFn: () => fetchReels(page, type),
    // enabled: false,
  });
}
