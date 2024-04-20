import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";


function RoadMapForm()
{
    const [FormData,SetForm] = useState({exp:'',goal:'',age:0,days:0,course:''});

   async function HandleSubmit(e)
    {
        e.preventDefault();
        const resp = await axios.post("http://localhost:3001/getroadmap",FormData);
    }
    return(<>
    
    <form>
        <input type="text" name="exp" placeholder="How much you know about programming?" onChange={(e)=>{SetForm({...FormData,exp:e.target.value})}} />
        <input type="text" placeholder="Enter your goal" name="goal" onChange={(e)=>{ SetForm({...FormData,goal:e.target.value})}}/>
        <input type="number" placeholder="Enter your age" name="age" onChange={(e)=>{ SetForm({...FormData,age:e.target.value})}}/>
        <input type="number" placeholder="How many days do you have?" name="days" onChange={(e)=>{ SetForm({...FormData,days:e.target.value})}}/>
        <input type="text" placeholder="Enter Programming language name" name="course" onChange={(e)=>{ SetForm({...FormData,course:e.target.value})}}/>

        <button onClick={HandleSubmit}>Submit</button>
    </form>
    </>)
}

export default RoadMapForm;