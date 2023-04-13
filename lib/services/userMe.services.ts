import useSWR from 'swr';
import { UserMeResponse } from '../interfaces/userMe.interface';

function useUserMe() {
  const { data, error, isLoading, mutate } = useSWR<UserMeResponse>('/auth/me');

  return {
    data: data?.results,
    error,
    isLoading,
    mutate,
  };
}

export { useUserMe };
