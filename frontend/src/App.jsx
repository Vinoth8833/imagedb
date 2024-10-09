import axios from 'axios'
import {createRef, useEffect, useState,} from 'react'
import Filter from './filter'




const App = () => {

  
  const image_upload = createRef()
  const [value, setValue] = useState([])


const handleOnClick = async(e) =>{
  e.preventDefault()
  const formData = new FormData();
  formData.set("image",image_upload.current.files[0])

  try {
    const sendImage = await axios.post("http://localhost:3000/upload",formData,{
      headers:{
      "Content-Type":"multipart/form-data"
    }})
    console.log(sendImage)
  } catch (error) {
    console.log(error)
  }
}

const getMethod = async()=>{
  try {
    const get = await axios.get('http://localhost:3000/')
    setValue(get.data)
  } catch (error) {
    console.log(error)
  }
}
console.log(value)

useEffect(()=>{
   getMethod()
},[])
const handleOnDelete =async(id) =>{

   try {
    const response = await axios.delete(`http://localhost:3000/delete/${id}`)
    console.log(response.data)
    getMethod()
   } catch (error) {
    console.log(error)
   }
}
console.log
  return (
    <div>
      <form onSubmit={handleOnClick} >
        <input type="file"  ref={image_upload}/>
        <button type='submit'>submit</button>

      </form>
      
         {
          value && value.length > 0 ? value.map((item,index) =>(<div key={index}>
              <img src={`http://localhost:3000/${item.image}`} alt="" width="400px" />
              <button onClick={()=>handleOnDelete(item._id)}>delete</button>
          </div>)) : <p>no data </p>
          
         } 
      <Filter/>
    </div>
  )
}

export default App
