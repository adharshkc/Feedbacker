/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useFeedbackStore } from "../zustand/FeedbackStore"
import { feedbackSubmit, fetchFeedbacks } from "../services/appApi";
import { useUserStore } from "../zustand/useUserStore";




const getFeedbacks = async (userId:string|undefined)=>{
    
    const response = await fetchFeedbacks(userId)
    console.log(response.data.feedbacks)
    return response.data.feedbacks
}

const submitFeedbacks = async(formDatas: {name:string, email:string, message:string}) =>{
    const response = await feedbackSubmit(formDatas)
    return response.data;
}

export const useFeedback = ()=>{
    const {setFeedbacks} = useFeedbackStore();
    const user = useUserStore((state) => state.user);
    
    return useQuery({
        queryKey: ["feedbacks"],
        queryFn: ()=>getFeedbacks(user?.id),
        onSuccess: (data:any)=>{
            setFeedbacks(data)
        }
    }as UseQueryOptions<any, Error, any, string[]>)
}

export const useSubmitFeedback = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:submitFeedbacks,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
        }
    })
}

