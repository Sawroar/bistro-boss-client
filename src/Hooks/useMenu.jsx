import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic"

const useMenu=()=>{
    const axioxPublic=useAxiosPublic()
const {data:menu=[],isPending:loading,refetch}=useQuery({
    queryKey:['menu'],
    queryFn:async()=>{
const res= await axioxPublic.get('/menu')
return res.data
    }
})
return [menu,loading,refetch]
}
export default useMenu