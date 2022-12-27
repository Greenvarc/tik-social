import React,{useState,useEffect} from 'react'
import {GoVerified} from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResult'
import { BASE_URL } from '../../utils'
import { IUser, Video } from '../../types'
import Image from 'next/image'

interface Iprops{
    data:{
        user:IUser,
        userVideos:Video[],
        userLikedVideos:Video[]
    }
}

function ProfilePage({data}:Iprops) {
    const {user,userLikedVideos,userVideos}=data
    const [showUserVideos, setShowUserVideos] = useState(true)
    const [videoList, setVideoList] = useState<Video[]>([])

    const videos=showUserVideos?'border-b-2 border-black':'text-gray-400'
    const liked=!showUserVideos?'border-b-2 border-black':'text-gray-400'

    useEffect(()=>{
        if(showUserVideos){
            setVideoList(userVideos)
        }else{
            setVideoList(userLikedVideos)
        }
    },[showUserVideos,userLikedVideos,userVideos])
  return (
    <div className='w-full'>
        <div className="flex gap-6 md:gap-10 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
                <Image
                src={user.image}
                width={120}
                height={120}
                className='rounded-full'
                alt='user-profile'
                layout='responsive'
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <p
                className='md:text-2xl tracking-wide flex gap-1 items-center text-md font-bold text-primary lowercase'
                >@{user.userName.replaceAll(' ','')}
                <GoVerified className='text-blue-400'/>
                </p>
                <p className='capitalize md:text-xl text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
        </div>
        {/* liked and posts */}
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p 
            onClick={()=>setShowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>Videos</p>
            <p 
            onClick={()=>setShowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>Liked</p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
            {videoList.length >0?(
                videoList.map((post:Video,idx:number)=>(
                    <VideoCard post={post} key={idx} />
                ))
            ):(
                <NoResult text={`No ${showUserVideos ? '':'liked'} videos yet`} />
            )}
        </div>
    </div>
  )
}

export const getServerSideProps=async({
    params:{id}
}:{params:{id:string}})=>{
    const res=await axios.get(`${BASE_URL}/api/profile/${id}`)

    return{
        props:{data:res.data}
    }
}


export default ProfilePage