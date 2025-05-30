import { useQuery } from '@tanstack/react-query';
import callToast from 'components/toast';
import axiosClient from 'lib/api/axiosClient';
import { ChangeCommentsCurrentPost } from 'lib/Store/slices/ProfileSlice';
import React from 'react';
import { CommentFace } from 'types/interfaces/store/ProfileFace';

async function handleGetComments(postID: number, dispatch: any) {
  console.log(postID);

  try {
    const res = await axiosClient.get(`/posts/${postID}/comments/`);
    console.log(res.data);
    dispatch(ChangeCommentsCurrentPost(res.data));
    return res.data;
  } catch (err: any) {
    console.log(err);
    callToast({ type: 'error', text1: 'Yalla Moba', text2: err.message ?? 'Error Comments !' });
  }
}

export default function useGetComments(postID: number, dispatch: any) {
  return useQuery<CommentFace[]>({
    queryKey: ['comments', postID],
    queryFn: () => handleGetComments(postID, dispatch),
    enabled: false,
  });
}
