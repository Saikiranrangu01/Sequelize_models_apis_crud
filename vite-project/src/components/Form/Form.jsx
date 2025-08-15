import React, {useState, useRef } from 'react'
import  axios from 'axios'  

const Form = () => {
    const url = "http://localhost:5000";
    const fileInputRef = useRef(null);

    const [data, setData] = useState({
        userName: "",
        email: "", 
        image: null,
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "image"){
            setData(data=>({...data,[name]: event.target.files[0]}));
        }
        else{
            setData(data=>({...data,[name]: value}));
        }
    }



    const onSubmitHandler = async (event)=>{
        const now = new Date().toISOString(); //current date and time in utc format
        event.preventDefault();
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        formData.append("image",data.image);
        formData.append("createdAt", now);
        formData.append("updatedAt", now);

        const response = await axios.post(`${url}/api/users/add`,formData);
        if (response.data.success){
            console.log("User added successfully:", response.data.data);
            alert("User added successfully");
            setData({
                userName:"",
                email:"",
                image:""
            })
        }
        else{
            console.error("Error submitting form:", response.data.message);
        }
    }

  return (
    <form action={`${url}/api/users/add`} encType='multipart/form-data'  onSubmit={onSubmitHandler}>
        <div>
            <div>
                <input type = "text" name="userName" value={data.userName} onChange={onChangeHandler} placeholder='userName'/>
                <input type = "email" name="email" value={data.email} onChange={onChangeHandler} placeholder='email'/>
            </div>

            <div>
                <label htmlFor="image">Upload Image</label>
                <input type = "file" name="image" onChange={onChangeHandler} ref = {fileInputRef} />
                
            </div>    
        </div>
        <button type="submit">ADD</button>
        
        
    </form>

  )
}

export default Form