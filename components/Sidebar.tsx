import Link from 'next/link'
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import {AiFillHome,AiOutlineMenu} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover'
import Footer from './Footer'
import SuggestedAccounts from './SuggestedAccounts'

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const userProfile=false 

    const normalLink='flex justify-center hover:bg-primary p-3 xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded'
  return (
    <div>
      <div
        onClick={()=>setShowSidebar((prev)=>!prev)}
       className='block xl:hidden m-2 ml-4 mt-3 text-xl'>
        {showSidebar ? <ImCancelCircle/>:<AiOutlineMenu/>}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
            <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                <Link href='/'>
                    <div className={normalLink}>
                        <p className='text-2xl mr-2'><AiFillHome/></p>
                        <span className='text-xl hidden xl:block'>For you</span>
                    </div>
                </Link>
            </div>
                {/* {!userProfile && (
                    <div className='px-2 py-4 hidden xl:block'>
                        <p className='text-gray-400'>Login to like and comment on Videos </p>
                        <div className='pr-4'>
                            <GoogleLogin
                                clientId=''
                                onSuccess={()=>{}}
                                onFailure={()=>{}}
                                cookiePolicy='single_host_origin'
                                render={(renderprops)=>(
                                    <button 
                                    className='bg-white text-lg text-[#f51997] border-[1px] border-[#f51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#f51997] cursor-pointer'
                                    onClick={renderprops.onClick}
                                    disabled={renderprops.disabled}
                                    >
                                        Log in
                                    </button>
                                )}
                             />
                        </div>
                    </div>
                )} */}
            <Discover />
            <SuggestedAccounts/>
            <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
