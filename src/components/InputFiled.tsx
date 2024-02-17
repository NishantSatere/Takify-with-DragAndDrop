import React , {useState} from "react";

interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
}

const InputFiled: React.FC<Props> = ({task, setTask, handleSubmit}) => {

    
    return <form className=" flex justify-center gap-5 m-5" onSubmit={handleSubmit}> 
        
        <input className=" rounded-2xl  bg-slate-100 px-5" placeholder="Enter task" 
                value={task} 
                onChange={(e)=>setTask(e.target.value)}/>
        <button className=" bg-blue-200 rounded-2xl px-5" type="submit">Add</button>
    </form>
} 


export default InputFiled