import React, { useState , useRef, useEffect} from "react";
import { Task } from "../model";
import { AiFillDelete, AiFillEdit} from "react-icons/ai" 
import { MdDone } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd";


interface Props{
    index:number
    task:Task,
    tasks:Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    
}

const SingleTask: React.FC<Props> =  ({index,task,tasks,setTasks}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [edittask,setEdittask] = useState<string>(task.task)

    const handleDone = (id:number) => {
        setTasks(tasks.map((task)=> (
            task.id === id?{...task,isDone:!task.isDone}:task
        )))
    }

    const handleDelete = (id:number) => {
        setTasks(tasks.filter((task)=>(
            task.id !== id
        )))
    }

    const handleEdit = (e: React.FormEvent,id:number) => {
        e.preventDefault()

        setTasks(tasks.map((task)=>(
            task.id === id?{...task,task:edittask}:task
        )))

        setEdit(false);
    }

    const editref = useRef<HTMLInputElement>(null)
    
    useEffect(()=>{
        editref.current?.focus()
    },[edit])

     
    return (<Draggable draggableId={task.id.toString()} index={index}>
        { (provided) => (
                    <form className=" flex px-5 py-2 my-3 gap-5 bg-amber-300 " 
                          onSubmit={(e)=>{handleEdit(e,task.id)}}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                    {
                        edit? (
                            <input
                                ref={editref}
                                value={edittask}
                                onChange={(e)=>setEdittask(e.target.value)}/>
                        ):(
                            
                                task.isDone ? (
                                    <s>{task.task}</s>
                                )
                                :(
                                    <span>{task.task}</span>
                                )
                            
                        )
                    }
            
                    
                    <div className=" flex gap-1">
                        <span
                            onClick={() => {
                                if(!edit && !task.isDone){
                                    setEdit(!edit)
                                }}
                            }><AiFillEdit/>
                        </span>
                        <span
                            onClick={()=>{handleDelete(task.id)}}><AiFillDelete/>
                        </span>
                        <span
                            onClick={()=>handleDone(task.id)}><MdDone/>
                        </span>
                    </div>
                </form>
        )}

    </Draggable>)
    
}

export default SingleTask