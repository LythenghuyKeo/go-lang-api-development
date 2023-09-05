import React, { useState, useEffect } from 'react';
import logo from '../../asset/Kitlogo.png';
import facebook from '../../asset/facebook.png'
import instagram from '../../asset/instagram.png'
import telegram from '../../asset/telegram.png'
import youtube from '../../asset/youtube.png'
import Cookies from 'js-cookie';

import {useHistory,Link} from 'react-router-dom';
import Pagination from '../Pagination/pagination';
const AdminPage =()=>{

    const handlePageChange = newPage =>{
        setCurrentPage(newPage)
    }

    const history = useHistory();
    const [studentStatus,setStudentStatus]=useState([]);
    const itemPerPage =5;
    const [currentPage,setCurrentPage]=useState(1);
    const totalPage = Math.ceil(studentStatus.length/itemPerPage);
    const startIndex = (currentPage-1) * itemPerPage;
    const endIndex =Math.min(startIndex + itemPerPage-1,studentStatus.length)
    const displayedData = studentStatus.slice(startIndex,endIndex+1)
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
        fetch('http://localhost:8080/api/application/view_application', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
            .then((response) => response.json())
            .then((data) => {
               if (data['status']){
                setStudentStatus(data['message'])
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
      
      <div className='flex p-4'>
      <table className='w-full table-auto font-poppins border mt-10'>
        <thead>
          <tr className='bg-lightred'>
            <th className='border px-4 py-2'>No</th>
            <th className='border px-4 py-2'>Date</th>
            <th className='border px-4 py-2'>Applicant Name</th>
            <th className='border px-4 py-2'>Applicant Email</th>
            <th className='border px-4 py-2'>Program</th>
            <th className='border px-4 py-2'>Status</th>
            <th className='border px-4 py-2'>View</th>
   
          </tr>
        </thead>
        <tbody>
            {
            displayedData.map((student)=>(
                <tr key={student.Id}>
                    <td className='text-center border px-4 py-2'>{student.Id}</td>
<td className=' border px-4 py-2'> <p className='text-'>{student.SubmittedAt}</p></td>
<td className='text-center border px-4 py-2'> {student.User.Name}</td>
<td className='text-center border px-4 py-2'> {student.User.Email}</td>
<td className='text-center border px-4 py-2'> {student.Program.Program_name}</td>
<td className={`text-center border px-4 py-2  ${student.Status==='accepted'?"text-green font-bold":student.Status==='rejected'?"text-based font-bold":"text-black"}`}> {student.Status}</td>
<td className='text-center border px-4 py-2'><Link to={`/user/${student.User.Id}`}>View</Link></td>
                </tr>
            ))}
          
        </tbody>

      </table>
        
      </div>
      <span className='flex pagination justify-center  mt-10 '>
          <span><Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange}/></span>
      </span>
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
export default AdminPage;