import  useSWR  from "swr";
import axios from '../helpers/axios.helper'

function usePublications(params?: string) {
    const {data, error, isLoading} = useSWR('/publications')
    return {
        data,
        error,
        isLoading
    }
}

function createPublication(data: any) {
    return axios.post('/publications', data)
}


export { usePublications};