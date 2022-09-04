import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { database,storage } from '../firebase';
import {v4 as uuidv4} from 'uuid';


function UploadFile(props) {
    const [error,setError] = useState('');
    const [loading,setLoading]=useState(false);
    

    const handleChange=async(file)=>{
        if(file=='')
        {
            setError('Please select a file');
            setTimeout(()=>{
                setError('');
            },2000)
            return;
        }
        if(file.size/(1024*1024)>100)
        {
            setError('Please select a file less than 100mbps');
            setTimeout(()=>{
                setError('');
            },2000)
            return;
            
        }
        setLoading(true);
        let uid=uuidv4();
        const uploadTask=storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let tmp=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(tmp);
            }

            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('');
                },2000)
                setLoading(false);
                return;
            }

            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    let obj={
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName:props.user.fullname,
                        uProfile:props.user.profileUrl,
                        userId:props.user.userId,
                        createdAt:database.getTimeStamp()

                    }

                    database.posts.add(obj).then(async(ref)=>{
                        let res=await database.users.doc(props.user.userId).update({
                            postIds:props.user.postIds!=null?[...props.user.postIds,ref.id]:[ref.id]
                        })
                    }).then(()=>{
                        setLoading(false);
                    }).catch((err)=>{
                        setError(err);
                        setTimeout(()=>{
                            setError('');
                        },2000)
                        setLoading(false);
                    })              
                })
            }
    }
  return (
    <div style={{marginTop:'5rem',marginBottom:'0.8rem'}}>
    {
        error!=''?<Alert severity="error">{error}</Alert>
        :<>
        <input type='file' accept='video/*' onChange={(e)=>handleChange(e.target.files[0])}  id='upload-input' style={{display:'none'}}/>
        <label htmlFor='upload-input'>
            <Button
            variant='outlined'
            color='secondary'
            component='span'
            disabled={loading} startIcon={<MovieIcon/>}>
                Upload Video
            </Button>
        </label>
        {loading && <LinearProgress color="secondary"/>}
        </>
    }
    </div>
  )
}

export default UploadFile