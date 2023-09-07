import {useHistory,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'

const Document = ()=>{
    const history = useHistory();
    const [isSaved,setInSavedStatus] = useState(false)
    const [grade12_certificate,setGrade12Ceterficate]= useState("")
    const [english_certificate,setEnglishCertificate]=useState("")
    const [identity_doc,setIdentityDoc]=useState("")
    const [data,setData]=useState({});

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
      useEffect(()=>{
        fetch('http://localhost:8080/api/document/view', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((data) => {
               if (data['status']){
                setData(data['message'])
                setInSavedStatus(true)
               }else{
                setInSavedStatus(false)
               }
            });
      })
      const handleSubmit= async(e)=>{
       e.preventDefault()
        try {
            const response = await fetch('http://localhost:8080/api/document/upload',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify({
                    transcript:grade12_certificate,
                    englishcertificate:english_certificate,
                    identitydoc:identity_doc,
                }) 
            });
            const data = await response.json();

            if (data['status']){
                history.push("/home");
            }else{
                alert(data['message'])
            }
          
            
        }catch(e){
            alert(e.message)
        }
      }
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
   
        {isSaved?   <body className='pt-10 ' >
            <div class='flex flex-col justify-center items-center font-poppins'>
                <div className='border border-gray p-9 '>
            <h1 className=' text-2xl font-bold '>Student 's Document</h1>
              </div>
              <div>
                <table class='w-full table-auto font-poppins border mt-10'>
               
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Grade 12 Certificate </th>
                            <td className='border w-[400px]  p-3 '>{data.Transcript}</td>
                        </tr>
                    
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Identity Document</th>
                            <td className='border w-[400px]  p-3 '>{data.IdentityDoc}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>English Certificate </th>
                            <td className='border  p-3 '>{data.EnglishCertificate}</td>
                        </tr>
                        </table></div></div>  <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>


            </div></body>:(<body>
        <div className='flex justify-center font-poppins'>
            <div className='border border-2 border-gray p-9 mt-10'>
                <h1 className='text-2xl font-extrabold'>Upload the document :</h1>
                <p className='font-bold text-gray mt-3'>Please scan and upload below document:</p>
                <form>
                <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>Grade 12 Certificate</label>
                    <input value={grade12_certificate} onChange={(e)=>setGrade12Ceterficate(e.target.value)} type='text' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>                 
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>Identity Document</label>
                    <input value={identity_doc} onChange={(e)=>setIdentityDoc(e.target.value)}  type='text' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-[500px] '>
                    <label className='block mb-1 text-bgray font-bold'>English Certificate *</label>
                    <input value={english_certificate} onChange={(e)=>setEnglishCertificate(e.target.value)}  type='text' class='bg-based text-white'  required className='border p-2 rounded-xl border-gray w-full'></input>
                </div>                   
                   </div>
                </form>
            </div>


            </div>
            <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>
                <button onClick={handleSubmit}  className='bg-green text-white border rounded-full p-2'>Save</button>

            </div>
    </body>)
}
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