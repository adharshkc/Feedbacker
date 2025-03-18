/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useFeedbackStore } from "../zustand/FeedbackStore"
import { fetchFeedbacks } from "../services/appApi";




const getFeedbacks = async ()=>{
    const response = await fetchFeedbacks()
    return response.data.result
}

export const useFeedback = ()=>{
    const {setFeedbacks} = useFeedbackStore();

    return useQuery({
        queryKey: ["feedbacks"],
        queryFn: getFeedbacks,
        onSuccess: (data:any)=>{
            setFeedbacks(data)
        }
    }as UseQueryOptions<any, Error, any, string[]>)
}