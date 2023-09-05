import {useHistory,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'

const PersonalInfoAdd = ()=>{
    const history = useHistory();
    const [isSaved,setInSavedStatus] = useState(false)
    const [PhoneNumber,setPhoneNumber] = useState("")
    const [Email,setEmail]=useState("");
    const [Address,setAddress]=useState("");
    const [IdentityId,setIdentity]=useState("")
    const [HighSchoolName,setHighSchoolName]=useState("")
    const [HighSchoolGrade,setHighSchoolGrade]=useState("")
    const [grade_scale,setGradeScale]=useState(0)
    const [english_qualification,setEnglishQualification]=useState("")
    const [Telegramurl,setTelegramurl]=useState("")
    const [SocialURL,setSocialURL]=useState("")
    const [data,setData] = useState({});

    const handleSubmit = async(e)=>{
      try{
        const response = await fetch('http://localhost:8080/api/personal_info/upload',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           credentials:'include',
           body:
          JSON.stringify({
              email:Email,
              address:Address,
              phonenumber:"PhoneNumber",
              national_id:IdentityId,
              highschool:HighSchoolName,
              highschool_grade:HighSchoolGrade,
              grade_scale:parseFloat(grade_scale),
              english_qualification:english_qualification,
              socialmedia_url:SocialURL,
              telegram_url:Telegramurl
          
          
           })
        })
        const data = await response.json();
        if (data['status']){
           history.push('/home');
        }else{
           console.log(data['message'])
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
      useEffect(()=>{
        fetch('http://localhost:8080/api/personal_info/view', {
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
        {isSaved?<body className='pt-10 ' >
            <div class='flex flex-col justify-center items-center font-poppins'>
                <div className='border border-gray p-9 '>
            <h1 className=' text-2xl font-bold '>Student 's Application</h1>
              </div>
              <div>
                <table class='w-full table-auto font-poppins border mt-10'>
               
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
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>SocialMedia URL</th>
                            <td className='border  p-3 '>{data.SocialMedia_URL}</td>
                        </tr>
                        <tr>
                        <th className='border border-black bg-based text-white  text-center p-3 text-left'>Telegram URL</th>
                            <td className='border  p-3 '>{data.Telegram_URL}</td>
                        </tr>
                        
                </table>
                </div>
          
             
            </div>
          
        </body>:
        <div className='flex justify-center font-poppins'>
            <div className='border border-2 border-gray p-9 mt-10'>
                <h1 className='text-2xl font-extrabold'>Personal Data</h1>
                <p className='font-bold text-gray mt-3'>Please fill your personal information carefully :</p>
                <form>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'>Name :</label>
                    <input type='text' className='border w-80 p-2 rounded-xl border-gray'></input>
                    </div>
                    <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'>Email :</label>
                    <input value={Email} onChange={(e) => setEmail(e.target.value)}  type='email' required className='border w-80 p-2 rounded-xl border-gray'></input>
                    </div>
                     </div>
                     <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'>Date of Birth</label>
                    <input type='date' required className='border w-80 p-2 rounded-xl border-gray'></input>
                    </div>
                    <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'>National ID Card/Passport No</label>
                    <input value={IdentityId} onChange={(e)=>setIdentity(e.target.value)} type='text' required className='border w-80 p-2 rounded-xl border-gray'></input>
                    </div>
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>Address</label>
                    <input value={Address} onChange={(e)=>setAddress(e.target.value)} type='text' required className='border p-2 rounded-xl border-gray w-full'></input>
                    </div>
                    
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm '>
                    <label className='block mb-1 text-bgray font-bold'>High School</label>
                    <input value={HighSchoolName} onChange={(e)=>setHighSchoolName(e.target.value)} type='text' required className='border p-2 rounded-xl border-gray w-80'></input>
                    </div>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>Score</label>
                    <input value={grade_scale} onChange={(e)=>setGradeScale(e.target.value)} type='number' required className='border p-2 rounded-xl border-gray w-60'></input>
                    </div>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>Rank</label>
                    {/* <input type='text' required className='border p-2 rounded-xl border-gray w-40'></input> */}
                    <select value={HighSchoolGrade} onChange={(e)=>setHighSchoolGrade(e.target.value)} required className='border p-2 rounded-xl border-gray w-20'>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                    </div>
                    
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>English Qualification</label>
                    <select value={english_qualification} onChange={(e)=>setEnglishQualification(e.target.value)} className='border p-2 rounded-xl border-gray w-40'>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="TOEIC">TOEIC</option>
                        <option value="LEVEL 12">Level 12</option>
                        <option value="Else">Else</option>
                    </select>
                    </div>
                    <div className='text-sm w-120'>
                    <label className='block mb-1 text-bgray font-bold'>Telegram url</label>
                    <input value={Telegramurl} onChange={(e)=>setTelegramurl(e.target.value)} type='text' required className='border p-2 rounded-xl border-gray w-[490px]'></input>
                    </div>
                    </div>
                    <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>Social media url :</label>
                    <input value={SocialURL} onChange={(e)=>setSocialURL(e.target.value)} type='text' required className='border p-2 rounded-xl border-gray w-full'></input>
                    </div>
                
                    
                    
                   </div>
                   <div className='flex justify-center space-x-4 mt-5 '>
                    <div className='text-sm w-full'>
                    <label className='block mb-1 text-bgray font-bold'>Tell us why do you want to pursue this degree?</label>
                    <input type='text' required className='border p-2 rounded-xl border-gray w-full'></input>
                    </div>
                    
                    
                   </div>
                </form>
            </div>


            </div>}
            <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>
                {isSaved?<div></div>:(<button onClick={(e)=>{handleSubmit(e)}} className='bg-green text-white border rounded-full p-2'>Submit</button>)} 

            

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
export default PersonalInfoAdd;