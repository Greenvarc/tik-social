import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any,addUser:any) => {
  //decode data
  const decoded:{
    name:string,
    picture:string,
    family_name:string,
    given_name:string,
    sub:string,
  }=jwt_decode(response.credential);

  const {name,picture,sub,given_name,family_name}=decoded

  //sanity user obj
  const user={
    _id:sub,
    _type:'user',
    userName:name||family_name+' '+given_name,
    image:picture
  }

  addUser(user)

  await axios.post(`${BASE_URL}/api/auth`,user)
};