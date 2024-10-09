import { useState } from "react"


const Filter = () => {
    const [value, setValue] = useState([])

    const arr = [
        {
            name:"vinoth",
            age:"24",
            id:"chennai"
        },
        {
            name:"vinoth",
            age:"24",
            id:"coimbatore"
        },
        {
            name:"vinoth",
            age:"24",
            id:"madurai"
        },
        {
            name:"vinoth",
            age:"24",
            id:"chennai"
        },
    ]

    const handleOnClick = () =>{
        const data = arr.filter(item=>item.id==="chennai")
        setValue(data)
        
    }
  return (
    <div>
        {
            value.map((item,index)=>(
                <p key={index}><span>{item.name}</span></p>
            ))
        }
        
      <button onClick={handleOnClick}>click</button>
    </div>
  )
}

export default Filter
