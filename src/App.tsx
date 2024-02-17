import React,{useState} from 'react';
import './App.css';
import InputFiled from './components/InputFiled';
import { Task } from './model';
import TaskList from './components/TaskList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
// let name:string
// let age:number

// let hobbies: string[]

// // Tuple
// let role:[number,string]
// role= [ 5,'bi']


// // Object

// // This is not good pratice 
// // let person: Object

// // Interface basic

// // Custom types
// type Person = {
//   name: String,
//   age?: number
//   // ? -> means optional
// }

// let person: Person = {
//   name:"nishant",
//   age:21
// }

// let lotsOfPeople: Person[]


// // When we want to assign 2 types to single variable

// // Use union 
// let weight:number | string

// weight = 68
// weight = "sixty eight"


// // Functions

// function printname(name: string){
//   console.log(name)
// }
// // printname(1)
// printname("Nishant")

// // Define return type of fucntion

// let display: (name:string) =>  void

// // display("nishant")
 

const App: React.FC = () => {
  const [task,setTask] = useState<string>("  ")

  const [tasks, setTasks] = useState<Task[]>([])

  const [completedTasks, setCompletedTasks] = useState<Task[]>([])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(task){
      setTasks([...tasks, {id : Date.now(), task , isDone:false}])
      setTask("")
    }
  }

  const onDragEnd = (result:DropResult) => {
    const {source,destination} = result
    console.log(result)

    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, 
      icomplete = tasks,
      complete = completedTasks

    if(source.droppableId === 'taskList'){
      add = icomplete[source.index]
      icomplete.splice(source.index,1)
    }else{
      add = complete[source.index]
      complete.splice(source.index,1)
    }

    if(destination.droppableId === 'taskList'){
      icomplete.splice(destination.index,0,add)
    }else{
      complete.splice(destination.index,0,add)
    } 

    setCompletedTasks(complete)
    setTasks(icomplete)
  }
 

  console.log(tasks)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div>
      <span className=' flex justify-center font-extrabold text-2xl'>Taskify</span>
      <InputFiled task = {task} setTask = {setTask} handleSubmit = {handleSubmit} />
      <TaskList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
    </div>
    </DragDropContext>
  );
}

export default App;
