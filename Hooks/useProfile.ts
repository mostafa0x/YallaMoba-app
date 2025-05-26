// hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from 'config';
import axiosClient from 'lib/api/axiosClient';

async function fetchProfile(uid: string, headers: any) {
  const res = await axiosClient.get(`/profiles/${uid}`);
  return res.data;
}

export default function useProfile(uid: string, headers: any) {
  return useQuery({
    queryKey: ['profile', uid],
    queryFn: () => fetchProfile(uid, headers),
    enabled: !!uid,
  });
}
