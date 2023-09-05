import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import {useHistory,Link,useParams,useLocation} from 'react-router-dom';
import axios from 'axios';
import my_table from '../mytable';
const UserPage =()=>{
    const [appStatus,setStatus] = useState('pending');
    const history = useHistory();
    const {id} = useParams();
    const [myRole,setRole] = useState('');
    const [data,setData] = useState({});
    const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const userId = queryParams.get(location.search);
    const handleAccept = async(e,appId)=>{
        try {
            const response = await fetch(`http://localhost:8080/api/application/${appId}/accepted`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                credentials:'include'
             })
             const data = await response.json();
             if (data['status']){
                setStatus('accept')
                history.push('/home');
             }else{
                setStatus('pending')
                alert(data['message'])
             }
        }catch(error){
            console.log(error)
        }
    }
    const handleReject = async(e,appId)=>{
        try {
            const response = await fetch(`http://localhost:8080/api/application/${appId}/rejected`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                credentials:'include'
             })
             const data = await response.json();
             if (data['status']){
                setStatus('reject')
                history.push('/home');
             }else{
                setStatus('pending')
                alert(data['message'])
             }
        }catch(error){
            console.log(error)
        }
    }


    
    const handleLogOut = async(e) =>{
        e.preventDefault();
            try{
             const response = await fetch('http://localhost:8080/logout',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
             })
             const data = await response.json();
             if (data['Log out']){
                Cookies.set('Authorization',"",{path:"/"})
                history.push('/');
             }else{
                console.log(data['message'])
             }
            }catch(error){
                console.log(error)
            }
      }

        useEffect(() => {
    fetch(`http://localhost:8080/api/application/get_all_student_application/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
          if (data['status']){
            setRole("admin");
            setData(data['message'])
          }else{
            setRole("user")
          }
        
      });
  },);

//   const handleOptionChange = (value)=>{
//     // const value = parseInt(e.target.value)
//       setMyOption(value);
      
//   }
//   const handleSaveProgramOption = async(e) =>{
//     e.preventDefault();
//     const hi = {program_id:parseInt(myOption)};
//     try{
//      const response = await fetch('http://localhost:8080/api/application/apply',{
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify(hi),
//         credentials:"include",
//      })
//      console.log(myOption)
//      const data = await response.json();
//      if (data['status']){
//         history.push('/home');
//      }else{
//         console.log(data['message'])
//      }
//     }catch(error){
//         console.log(error)
//     }
// }
//   useEffect(()=>{
//     fetch('http://localhost:8080/api/application/my_application', {
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       })
//         .then((response) => response.json())
//         .then((data) => {
//            if (data['status']){
//             if (data['message'].Program_ID !==''){
//                 setMyOption(data['message'].Program_ID)
//                 setMyrole(data["role"])
//             }
//             setInSavedStatus(true)
//            }else{
//             setInSavedStatus(false)
//            }
//         });
//   }) 
    return ( myRole==="admin"?
  <div>
        <nav className='flex justify-between items-center bg-based p-4'>
          {/* <div ><img src={logo} className='w-14 h-14'></img></div> */}
          <div className='font-poppins text-3xl font-bold text-white'>KIT</div>
          <button onClick={handleLogOut} className='bg-based text-white px-4 py-2 border rounded font-poppin'>Log out</button>
        </nav>

        <body className='pt-10 ' >
            <div class='flex flex-col justify-center items-center font-poppins'>
                <div className='border border-gray p-9 '>
            <h1 className=' text-2xl font-bold '>Student 's Application</h1>
              </div>
              <div>
                <table class='w-full table-auto font-poppins border mt-10'>
                <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Application No </th>
                            <td className='border  p-3 '>{data.ApplicationID}</td>
                        </tr>
                        <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Program </th>
                            <td className='border  p-3 '>{data.Program}</td>
                        </tr>
                        <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>CreatedAt </th>
                            <td className='border  p-3 '>{data.SubmittedAt}</td>
                        </tr>
                        <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Name </th>
                            <td className='border  p-3 '>{data.Name}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Email </th>
                            <td className='border w-[400px]  p-3 '>{data.Email}</td>
                        </tr>
                    
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Phone Number </th>
                            <td className='border w-[400px]  p-3 '>{data.PhoneNumber}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Address </th>
                            <td className='border  p-3 '>{data.Address}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>National_ID </th>
                            <td className='border  p-3 '>{data.National_ID}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Passport No </th>
                            <td className='border  p-3 '>{data.Passport}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>High School </th>
                            <td className='border  p-3 '>{data.HighSchool}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Rank </th>
                            <td className='border  p-3 '>{data.HighSchool_Grade}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Score </th>
                            <td className='border  p-3 '>{data.Grade_Scale}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>English_Qualification</th>
                            <td className='border  p-3 '>{data.English_Qualification}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Transcript/Grade 12 Certificate </th>
                            <td className='border  p-3 '>{data.Transcript}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Identity Document </th>
                            <td className='border  p-3 '>{data.IdentityDoc}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>English Certificate  </th>
                            <td className='border  p-3 '>{data.EnglishCertificate}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>SocialMedia URL</th>
                            <td className='border  p-3 '>{data.SocialMedia_URL}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Telegram URL</th>
                            <td className='border  p-3 '>{data.Telegram_URL}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Status</th>
                            <td className={`border   p-3  ${data.Status==='accepted'?"text-green font-bold":data.Status==='rejected'?"text-based font-bold":"text-black"}` }>{data.Status}</td>
                        </tr>
                </table>
                </div>
          
             
            </div>
            <div className='flex justify-center text-center space-x-7 mt-3'>
                <p className=' border rounded-full p-2'><Link to='/home'>Back</Link></p>
                <button onClick={(e)=>handleReject(e,data.ApplicationID)} className='bg-based text-white border rounded-full p-2'><Link to='/home'>Reject</Link></button>
                <button onClick={(e)=>handleAccept(e,data.ApplicationID)} className='bg-green text-white border rounded-full p-2'>Accept</button>

            </div>
        </body>
        <footer className='bg-based m-4 mt-20'>
        <div className='text-white text-center font-poppins text-l w-full max-w-screen-xl p-4 ' >
        © Kirirom Institute of Technology 
        </div>
        <div className='container pt-9 mb-9 '>
            <div class="mb-9 flex  justify-center">
               <img src={facebook} className='w-6 h-6 mb-9 ml-3 mr-3 '></img>
               <img src={youtube} className='w-6 h-6 ml-3 mr-3 '></img>
               <img src={instagram} className='w-6 h-6 ml-3 mr-3 '></img>
               <img src={telegram} className='w-6 h-6 ml-3 mr-3 '></img>
            </div>

        </div>
      </footer>
        </div>:<div>Unauthorized</div>
      
    )
}
export default UserPage;