// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { postDetailQuery } from '../../../utils/queries';
import {uuid} from 'uuidv4'

// type Data = {
//   name: string
// }

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
//   res.status(200).json({ name: 'Response Success' })
    if (req.method==='GET'){
        const {id}=req.query; //get if from url
        const query=postDetailQuery(id)
        const data =await client.fetch(query);

        //return data
        res.status(200).json(data[0])

        //add comment by updating post 
    }else if (req.method==='PUT'){
        const {comment,userId}=req.body
        const {id}:any=req.query

        const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
            {  
            comment,
            _key: uuid(),
            postedBy: {_type:'postedBy',_ref:userId},
            },
        ])
        .commit()
        res.status(200).json(data)
    }
}
