import React,{useState} from 'react';
function Pagination({currentPage,totalPage,onPageChange}){
    const pageRange =3;
    const startPage = Math.max(1,currentPage-pageRange);
    const endPage = Math.min(totalPage,currentPage+pageRange);

    const pages =[];
    for (let i=startPage;i<=endPage;i++){
        pages.push(i);
    }
    return (
        <nav>
            <ul className='pagination '>
                 {
                    currentPage>1 && (
                        <span className='page-item  border border-based bg-based rounded text-white m-2'>
                               <button className='page-link'onClick={()=>onPageChange(currentPage-1)}>Previous</button>
                        </span>
                    )
                 }
                 {
                    pages.map(page => (
                        <span>
                            <button className='page-link w-5 border border-based bg-based rounded text-white m-2' onClick={()=>onPageChange(page)}>{page}</button>
                        </span>
                    ))
                 }
                 {
                    currentPage<totalPage &&(
                        <span className='page-item'>
                        <button className='page-link  border border-based bg-based rounded text-white m-2'onClick={()=>onPageChange(currentPage+1)}>Next</button>
                 </span>
             
                    )
                 }
            </ul>
        </nav>
    )
}
export default Pagination;