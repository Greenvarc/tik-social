import React,{useEffect,useState} from 'react'
import {GoVerified} from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResult'
import { BASE_URL } from '../../utils'
import { IUser, Video } from '../../types'
import Image from 'next/image'
import useAuthStore from '../../store/authStore'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Search({videos}:{videos:Video[]}) {

  const [isAccount, setisAccount] = useState(false)
  const router=useRouter()
  const {searchTerm}:any=router.query // to get url query
  const {allUsers}=useAuthStore()

  const accounts=isAccount?'border-b-2 border-black':'text-gray-400'
  const isVideos=!isAccount?'border-b-2 border-black':'text-gray-400'

  const searchedAccounts=allUsers.filter((user:IUser)=>user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w h-full'>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p 
            onClick={()=>setisAccount(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}>Accounts</p>
            <p 
            onClick={()=>setisAccount(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}>Videos</p>
        </div>
        {isAccount?(
          <div className='md:mt-16'>
           {
            searchedAccounts.length > 0 ? (
              searchedAccounts.map((user:IUser,index:number)=>(
                 
                <Link key={index}
                    href={`/profile/${user._id}`}
                    >
                    <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                        <div >
                            <Image
                            src={user.image}
                            width={50}
                            height={50}
                            className='rounded-full'
                            alt='user-profile'
                            />
                        </div>

                        <div className="">
                            <p
                            className='flex gap-1 items-center text-md font-bold text-primary lowercase'
                            >@{user.userName.replaceAll(' ','')}
                            <GoVerified className='text-blue-400'/>
                            </p>
                            <p className='capitalize text-gray-400 text-xs'>
                            {user.userName}
                            </p>
                        </div>
                    </div>
                    </Link>

              ))
            ):(
              <NoResult text={`No Account result for ${searchTerm}`}/>
            )
           }
          </div>
        ):(
          <div className='md:mt16 flex flex-wrap gap-6 md:justify-start'>
            {videos?.length ? (
              videos.map((video:Video,idx)=>(
                <VideoCard post={video} key={idx}/>
              ))
            ):(
              <NoResult text={`No video result for ${searchTerm}`}/>
            )}
          </div>
        )}
    </div>
  )
}

export const getServerSideProps=async({
    params:{searchTerm}
}:{params:{searchTerm:string}})=>{
    const res=await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return{
        props:{videos:res.data}
    }
}

export default Search