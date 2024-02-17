import React from "react";
import { Task } from "../model";
import SingleTask from "./SingleTask";
import { Droppable } from "react-beautiful-dnd";

interface Props{
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    completedTasks:Task[]
    setCompletedTasks:React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskList: React.FC<Props> = ({tasks,setTasks,completedTasks,setCompletedTasks}) => {
    return  <div className="flex justify-evenly">

        <Droppable droppableId='taskList'>
        {
            (provided,snapshot) => (
                <div className= {` w-1/2 text-center mx-3 p-3 rounded-sm  bg-red-400`} ref = {provided.innerRef} {...provided.droppableProps}>
                    <span className=" text-white w-auto px-3 py-2 my-5 rounded-sm">Tasks</span>
                        {tasks.map((task,index)=>(
                        <SingleTask 
                        index={index}
                        task={task} 
                        tasks={tasks}
                        setTasks = {setTasks}
                        />
                        ))} 
                    {provided.placeholder}
                </div>
            )
        }

        </Droppable>
       
       <Droppable droppableId="completedTasks">
            { (provided) => (
                <div className="w-1/2 text-center mx-3 p-3 rounded-sm bg-green-400" ref={provided.innerRef} {...provided.droppableProps } >
                    <span className=" text-white w-auto px-3 py-2 rounded-sm">Completed Tasks</span>
                    {completedTasks.map((task,index)=>(
                        <SingleTask 
                        index={index}
                        task={task} 
                        tasks={completedTasks}
                        setTasks = {setCompletedTasks}
                        />
                        ))} 
                    {provided.placeholder}
                </div>
            )}
       </Droppable>

        

    </div>
}

export default TaskList