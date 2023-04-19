import useSWR from 'swr';
import { PublicationsTypesResponse } from '../interfaces/publications-types.interface';

function usePublicationsTypes(params?: string) {
  const { data, error, isLoading } = useSWR<PublicationsTypesResponse>(
    '/publications-types'
  );
  return {
    data: data,
    error,
    isLoading,
  };
}

function usePublicationsTypeById(id?: string) {
  const { data, error, isLoading } = useSWR<PublicationsTypesResponse>(
    `/publications-types/${id}`
  );
  return {
    data: data,
    error,
    isLoading,
  };
}

export { usePublicationsTypes, usePublicationsTypeById };
