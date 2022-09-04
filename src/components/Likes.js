import React,{useState,useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Posts.css';
import { database } from '../firebase';

function Likes({userData,postData}) {
    const [like,setLike]=useState(null);
    useEffect(()=>{
        let check=postData.likes.includes(userData.userId)?true:false;
        setLike(check);
    },[postData])

    const handleClick=()=>{
        if(like==true)
        {
            let narr=postData.likes.filter((el)=>el!=userData.userId);
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
        else{
            let narr=[...postData.likes,userData.userId];
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
       
    }

  return (
    <div>
        {
            like!=null?
            <>
            {
                like==true?<FavoriteIcon className='icon-styling like' onClick={handleClick}/>:<FavoriteIcon className='icon-styling unlike' onClick={handleClick}/>
            }
            </>
            :<></>
        }
    </div>
  )
}

export default Likes