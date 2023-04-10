
import  useSWR  from "swr";
import axios from '../helpers/axios.helper'
import { PublicationsResponse } from "../interfaces/publications.interface";



function usePublications(params?: string) {
    const {data, error, isLoading} = useSWR<PublicationsResponse>('/publications')
    return {
        data: data?.results,
        error,
        isLoading
    }
}

function createPublication(data: any) {
    return axios.post('/publications', data)
}


export { usePublications };