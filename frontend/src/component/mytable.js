const my_table=({title,data})=>{
    return (
        <tr>
        <th className='border border-black bg-based text-white  text-center p-3 text-left'>{title} </th>
            <td className='border  p-3 '>{data}</td>
        </tr>
    )
}
export default my_table;