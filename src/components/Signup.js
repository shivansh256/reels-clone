import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './Signup.css';
import insta from '../Assets/Instagram_logo.svg.png';
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link,Navigate,useNavigate} from 'react-router-dom';
import {useState,useEffect,useContext} from 'react';
import { AuthContext } from '../Context/AuthContext';
import {database, storage} from '../firebase';


export default function Signup() {
    const useStyles=createUseStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },

        text2:{
            height:'6vh',
            marginTop:'2%'
        }
    })
    const classes=useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState('');
    const navigate=useNavigate();

    const {signup}=useContext(AuthContext)
 
    
    const handleClick=async()=>{
        if(file=='')
        {
            setError("Please first upload the image");
            setTimeout(()=>{
                setError('');
            },2000)
            return;
        }

        try{
            setError('');
            setLoading(true);
            let userObj=await signup(email,password);
            let uid=userObj.user.uid;
            const uploadTask=storage.ref(`/users/${uid}/Profileimage`).put(file);
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
                    console.log(url)
                    database.users.doc(uid).set({
                        email:email,
                        fullname:name,
                        userId:uid,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate("/", { replace: true });
            }
        }
        catch(err){
            setError('Fill details correctly');
            setTimeout(()=>{
                setError('');
            },2000)
            return;
        }
    }
  return (
    <div className="signupWrapper">
        <div className='signupCard'>
            <Card variant="outlined">
                <div className='insta-logo'>
                    <img src={insta}></img>
                </div>
                    <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Sign up to see photos and videos from you friends
                    </Typography>
                    {error!='' && <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth="true" margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth="true" margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth="true" margin="dense" size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <Button color="secondary" variant='outlined' fullWidth={true} margin="dense" startIcon={<CloudUploadIcon/>} component="label">
                    Upload Profile image
                    <input type="file" accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])} />
                    </Button>
                    </CardContent>
                <CardActions>
                    <Button color="primary"  fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                    Sign Up
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        By Signing up, you agreee our Terms,Conditions and Cookies policy.
                    </Typography>
                </CardContent>
           </Card>
           <Card variant='outlined' className={classes.text2}>
           <CardContent>
                    <Typography className={classes.text1} variant="subtitle1">
                        Having an account ? <Link to="/Login" style={{textDecoration:"none"}}>Login</Link>
                    </Typography>
                </CardContent>
           </Card>
        </div>
    </div>
    
  );
}