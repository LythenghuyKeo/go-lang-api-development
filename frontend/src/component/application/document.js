import {useHistory,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import {CalendarIcon} from '@heroicons/react/solid'
const Document = ()=>{
    const history = useHistory();
    const [isSaved,setInSavedStatus] = useState(false)


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
    //   useEffect(()=>{
    //     fetch('http://localhost:8080/api/personal_info/view', {
    //         headers: { 'Content-Type': 'application/json' },
    //         credentials: 'include',
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //            if (data['status']){
        
    //             setInSavedStatus(true)
    //            }else{
    //             setInSavedStatus(false)
    //            }
    //         });
    //   })
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
    <body>
        {isSaved?<div>Exist in DB</div>:
        <div className='flex justify-center font-poppins'>
            <div className='border border-2 border-gray p-9 mt-10'>
                <h1 className='text-2xl font-extrabold'>Upload the document :</h1>
                <p className='font-bold text-gray mt-3'>Please scan and upload below document:</p>
                <form>
                <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>Grade 12 Certificate</label>
                    <input type='file' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>
                <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'></label>
                    <button className='border w-20 p-2 rounded-xl border-gray mt-6'>View</button>
                </div>
                
                    
                  
              
                     
                    
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>Identity Document</label>
                    <input type='file' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>
                <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'></label>
                    <button className='border w-20 p-2 rounded-xl border-gray mt-6'>View</button>
                </div>
                
                    
                  
              
                     
                    
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>English Certificate *</label>
                    <input type='file' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>
                <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'></label>
                    <button className='border w-20 p-2 rounded-xl border-gray mt-6'>View</button>
                </div>
                
                    
                  
              
                     
                    
                    
                   </div>
                </form>
            </div>


            </div>}
            <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>
                <button  className='bg-green text-white border rounded-full p-2'>Save</button>

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
    </div>

  )
}
export default Document;