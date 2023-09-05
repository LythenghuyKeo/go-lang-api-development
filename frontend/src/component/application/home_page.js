import React, { useState, useEffect } from 'react';
import logo from '../../asset/Kitlogo.png';
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import Cookies from 'js-cookie';
import AdminPage from './adminpage';
import {useHistory,Link} from 'react-router-dom';
const ApplicationForm = () => {
  var isDone=true;
  //const [isDone,setIsDone]=useState(false);
  const history = useHistory();
  const [myRole,setMyrole] = useState('');
  // const [programOptions, setProgramOptions] = useState([]);
  // const [currentStep, setCurrentStep] = useState(1);
  // const [completedStep, setCompletedStep] = useState(false);
  // const [selectedProgram, setSelectedProgram] = useState(0);
  // const [color,setColor]=useState('gray')
  // const [programSelectionStatus,setProgramSelectionStatus] = useState(false);
  // const [personalInfoStatus,setpersonalInfoStatus] = useState(false);
  // const [documentStatus,setDocumentStatus] = useState(false);
  const [applicationContents, setApplicationContents]= useState([
    {id:1,name:'Program Selection',status:false,path:'programselection'},
    {id:2,name:'Personal Information',status:false,path:'personalinformation'},
    {id:3,name:'Document ',status:false,path:'document'}

  ])

  useEffect(()=>{
    fetch('http://localhost:8080/api/application/my_application', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data['role']==='admin'){
           setMyrole("admin")
          }else if (data['role']==='user'){
           if (data['status']){
              const updatedData =[...applicationContents];
               updatedData[0]={...updatedData[0],status:true}
               setApplicationContents(updatedData);
               setMyrole("user")
           
           }else{
    
           
            setMyrole("user")
           }}
        });
  }) 
  useEffect(()=>{
    fetch('http://localhost:8080/api/personal_info/view', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
           if (data['status']){
            const updatedData =[...applicationContents];
            updatedData[1]={...updatedData[1],status:true}
            setApplicationContents(updatedData);
            setMyrole("user")
           }else{
          
            setMyrole("user")
           }
        });
  })

//   const handleProgram = async(value)=>{

//         try{
//          const response = await fetch('http://localhost:8080/api/application/apply',{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({"program_id":value}),
//             credentials: 'include',
//          })
//          const data = await response.json();
//          if (data['status']){
//             alert('Successfully Finish Step 1');
         
            
//          }else{
//             alert(data['message']);
//             console.log(data['message'])
//          }
//         }catch(error){
//             alert("error");
            
//         }
//   }

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

 
//   const handleStepClicked = (value) => {
//     setCurrentStep(value)
//   };
  

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/application/my_application', {
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProgramOptions(data['message']);
  //     });
  // }, []);

  return (myRole==='admin'?<AdminPage/>:
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
      
      <div className='flex justify-center items-center '>
      <table className='w-3/5 table-auto font-poppins border mt-10'>
        <thead>
          <tr className='bg-lightred'>
            <th className='border px-4 py-2'>No</th>
            <th className='border px-4 py-2'>Application</th>
            <th className='border px-4 py-2'>Status</th>
   
          </tr>
        </thead>
        <tbody>
          {
            applicationContents.map((content)=>(
              <tr key={content.id} className>
                <td className='text-center border px-4 py-2'>
                  {content.id}
                </td>
                <td className='text-center border px-4 py-2 hover:text-darkgreen'> 
                  <Link to={content.path}>{content.name}</Link>
                </td>
                <td  className={`text-center border px-4 py-2 `}>
    
                <p  className={`text-center border px-4 py-2 ${content.status?'bg-green':'bg-based'} text-white rounded-xl`}>{content.status?'submitted':'not yet'}</p>
                </td >
    
              </tr>
            ))
          }


        </tbody>

      </table>
   
      </div>
      <div className='flex flex-col justify-center items-center mt-10 '>
        {/* <button class='border rounded-full bg-based text-white font-extrabold p-4'>
          Submit
        </button> */}
        <div>{isDone?(<p class='font-bold font-poppin'>Click here to see your status :<Link to='/mystatus' className='text-based' >My Status</Link></p>):(<p class=' font-bold font-poppin'>Click here to see your status : My Status</p>)}</div>
      </div>

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
   
  );
};

export default ApplicationForm;