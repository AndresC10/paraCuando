import useSWR from 'swr';
import axios from '../helpers/axios.helper';
import { PublicationsResponse } from '../interfaces/publications.interface';
import { TagsResponse } from '../interfaces/tags.interface';

function usePublications(params?: string) {
  const { data, error, isLoading, mutate } = useSWR<PublicationsResponse>(
    `/publications/${params}`
  );
  return {
    data: data,
    error,
    isLoading,
    mutate,
  };
}

function createPublication(data: any) {
  return axios.post('/publications', data);
}

function useTags(params?: string) {
  const { data, error, isLoading } = useSWR<TagsResponse>('/tags');
  return {
    data: data,
    error,
    isLoading,
  };
}

export { usePublications, createPublication, useTags };
