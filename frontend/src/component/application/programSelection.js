import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';
import {useHistory,Link} from 'react-router-dom';
const ProgramSelection =()=>{
    const [myOption,setMyOption] = useState(0);
    const [isSaved,setInSavedStatus]=useState(false);
    const [lastSelectedOption,setLastSelectedOption] = useState(0);
    const [programOptions,setProgramOptions]= useState([]);
    const [myRole,setMyrole] = useState('');
    const history = useHistory();
    console.log(isSaved)
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
    fetch('http://localhost:8080/api/program/available_program', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setProgramOptions(data['message']);
        
      });
  }, []);

  const handleOptionChange = (value)=>{
    // const value = parseInt(e.target.value)
      setMyOption(value);
      
  }
  const handleSaveProgramOption = async(e) =>{
    e.preventDefault();
    const hi = {program_id:parseInt(myOption)};
    try{
     const response = await fetch('http://localhost:8080/api/application/apply',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(hi),
        credentials:"include",
     })
     console.log(myOption)
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
  useEffect(()=>{
    fetch('http://localhost:8080/api/application/my_application', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
           if (data['status']){
            if (data['message'].Program_ID !==''){
              setLastSelectedOption(data['message'].Program_ID)
                setMyrole(data["role"])
            }
            setInSavedStatus(true)
           }else{
            setInSavedStatus(false)
           }
        });
  }) 
    return (
       myRole=="admin"?<div>Unauthorized</div>: <div>
        <nav className='flex justify-between items-center bg-based p-4'>
          {/* <div ><img src={logo} className='w-14 h-14'></img></div> */}
          <div className='font-poppins text-3xl font-bold text-white'>KIT</div>
          <button onClick={handleLogOut} className='bg-based text-white px-4 py-2 border rounded font-poppin'>Log out</button>
        </nav>
        <header className='underline text-center font-bold text-3xl font-poppins mt-10'>
          <h1>ACADEMIC YEAR 2023-2024</h1>
          <h2 className='mt-10'>Application Form</h2>
        </header>
        <body className='pt-20' >
            <div class='flex flex-col justify-center items-center font-poppins'>
                <div className='border border-gray p-9 '>
            <h1 className=' text-2xl font-bold '>Our Program</h1>
              <p className='font-bold text-gray mt-3'>Please choose the program that you want to apply:</p>
                {programOptions.map((options)=>(
                    <div key={options.Id}>
                        <div className='mt-3 mr-3'>
                            {isSaved?<input onChange={(e)=>{handleOptionChange(e.target.value)}} checked={lastSelectedOption===options.Id} disabled={isSaved} type='radio' value={options.Id} name='program' className='form-radio text-based'></input>:<input onChange={(e)=>{handleOptionChange(e.target.value)}}type='radio' value={options.Id} name='program' className='form-radio text-based'></input>}
                            <label className='ml-2'>{options.Program_name}</label>
                            </div>
                        </div>
                ))}
            </div>

            </div>
            <div className='flex justify-center text-center space-x-7 mt-3'>
                <button className='bg-based text-white border rounded-full p-2'><Link to='/home'>Back</Link></button>
               {isSaved?<div></div>:(<button onClick={(e)=>{handleSaveProgramOption(e)}} className='bg-green text-white border rounded-full p-2'>Submit</button>)} 

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
export default ProgramSelection;