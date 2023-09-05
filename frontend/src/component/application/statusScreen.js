import { useState ,useEffect} from "react"
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import Cookies from 'js-cookie';

import {useHistory,Link,useParams,useLocation} from 'react-router-dom';
const StatusScreen =()=>{
    const history=useHistory();
        const [myUser,setMyUser]=useState({});
        const [myApplication,setMyApplication] = useState({});
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
            fetch('http://localhost:8080/api/application/my_application', {
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            })
              .then((response) => response.json())
              .then((data) => {
                if (data['status']){
                    setMyApplication(data["message"]);
                    setMyUser(data['User'])
                }
                else{
                    alert(data['message'])
                }
                
              });
          });
       console.log(myApplication);
    return (
        <div>
        <nav className='flex justify-between items-center bg-based p-4'>
          {/* <div ><img src={logo} className='w-14 h-14'></img></div> */}
          <div className='font-poppins text-3xl font-bold text-white'>KIT</div>
          <button onClick={handleLogOut} className='bg-based text-white px-4 py-2 border rounded font-poppin'>Log out</button>
        </nav>
        <header className='underline text-center font-bold text-3xl font-poppins mt-10'>
          <h1>ACADEMIC YEAR 2023-2024</h1>
          <h2 className='mt-10'>Application Form</h2>
        </header>
        <body className='pt-10 ' >
            <div class='flex flex-col justify-center items-center font-poppins'>
                <div className='border border-gray p-9 '>
            <h1 className=' text-2xl font-bold '>Student 's Application</h1>
              </div>
              <div>
                <table class='w-full table-auto font-poppins border mt-10'>
                <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Application No </th>
                            <td className='border  p-3 '>{myApplication.Application_ID}</td>
                        </tr>
                        <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Program </th>
                            <td className='border  p-3 '>{myApplication.Program_Name}</td> 
                        </tr>
                        {/* <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>CreatedAt </th>
                            <td className='border  p-3 '>{myApplication.SubmittedAt}</td>
                        </tr> */}
                        <tr>
                            <th className=' border border-black bg-based text-white  text-center p-3 text-left'>Name </th>
                            <td className='border  p-3 '>{myApplication.Name}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Email </th>
                            <td className='border w-[400px]  p-3 '>{myApplication.Email}</td>
                        </tr>
       
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Status</th>
                            <td className={`border   p-3  ${myApplication.Status==='accepted'?"text-green font-bold":myApplication.Status==='rejected'?"text-based font-bold":"text-black"}` }>{myApplication.Status}</td>
                        </tr>
                </table>
                </div>
                <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>
               

            </div>
             
            </div>
        
        </body>
        <footer className='bg-based m-4'>
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
        </div>
  
    )
}
export default StatusScreen;