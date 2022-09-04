import React,{useState,useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Posts.css';
import { database } from '../firebase';

function Like2({userData,postData}) {
    const [like,setLike]=useState(null);
    useEffect(()=>{
        let check=postData.likes.includes(userData.userId)?true:false;
        setLike(check);
    },[postData])

    const handleClick=()=>{
        console.log('dsfds');
        if(like==true)
        {
            console.log('scddsfds');
            let narr=postData.likes.filter((el)=>el!=userData.userId);
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
        else{
            console.log('dsfdscdss');
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
                like==true?<FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} className='like' onClick={handleClick}/>:<FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} className='unlike' onClick={handleClick}/>
            }
            </>
            :<></>
        }
    </div>
  )
}

export default Like2