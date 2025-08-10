import { useState,useEffect,useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import "./App.css"
import { ToastContainer, toast,Bounce } from 'react-toastify';


function App () {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editID, seteditID] = useState(null)
  const [editText, seteditText] = useState("") 
  const [finisedTodo, setfinisedTodo] = useState(true)
  const firstrender = useRef(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
  
    try {
      if (todoString) {
        const savedTodos = JSON.parse(todoString);
        if (Array.isArray(savedTodos)) {
          setTodos(savedTodos);
          console.log("Loaded from localStorage:");
        } else {
          console.warn("Invalid todos data in localStorage:");
        }
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if(firstrender.current){
      firstrender.current=false
      return
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Saved to localStorage:");

  }, [todos]);

  useEffect(() => {
  console.log("Updated todos:");
}, [todos]);

  // const saveit=(e)=>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  // }

  const handleAdd=()=>{ 
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]); // this ensures you're working with the latest state
    setTodo(""); 
    toast('📃 Task Added', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
    
    // saveit()
  }
  const handleEdit=(id,text)=>{
    seteditID(id)
    seteditText(text)
    // let edit=todos.filter(item=>
    //   item.id===id
    // )
    // setTodo(edit[0].todo)
    // saveit()
  }

  // const handleSave = () => {
  //   setTodos(prev => 
  //     prev.map(item =>
  //       item.id === editID ? { ...item, todo: editText } : item
  //     )
  //   );
  //   seteditID(null);
  //   seteditText("");
  //   saveit()
  // };
  
  const handleSave=()=>{
    let editted=todos.map(item=>
       item.id===editID?{...item,todo:editText}:item
    )
    setTodos(editted)
    seteditID(null)
    seteditText("")
    // saveit()
  }

  // const handleDelete = (id) => {
  //   setTodos(prev => prev.filter(item => item.id !== id));
  //   saveit()
  // };
  
  const handleDelete=(id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    // saveit()
  }
  const onlyLeft= () => { 
    setfinisedTodo(!finisedTodo)
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id==id
    })
    let newTodos=[...todos]
    newTodos[index].isComplete=!newTodos[index].isComplete
    setTodos(newTodos)
    
  
    // saveit() 
  }

  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <div className="md:container mx-auto p-5 my-4 rounded-2xl bg-violet-300 min-h-[80vh] md:w-1/2 bg-" >
        <div className="addTodo">
          <h2 className="text-lg font-bold !text-blue-950 mb-3">Add Todo</h2>

          <input type="text" onChange={handleChange}  value={todo} placeholder='What you wanna do' className="w-full max-w-md px-4 py-2 mb-4 rounded bg-violet-700 text-white placeholder-white border border-white focus:outline-none focus:ring-2 focus:ring-yellow-300"/>

          <button className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-950 text-sm disabled:bg-red-700 bg-red" onClick={handleAdd} disabled={todo.length<2}>Add</button>

      </div>
      <input type="checkbox" onChange={onlyLeft} checked={finisedTodo} name="" id="finish" />
      <label className='mx-2' htmlFor="finish">Show Finished</label> 
      <div>
      <h2 className="text-lg font-bold !text-blue-950 mb-3">Your Todo</h2>
      <div className="todos"> 
        {todos.length==0 && <div className='text-white '>THERE IS NO THING TO DO MAN !!!</div> }

         {todos.map(item=>{
        return (finisedTodo || !item.isComplete) && <div key={item.id} className="todo flex justify-between">
          <input type="checkbox" name={item.id} onChange={handleCheckbox}  checked={item.isComplete} id="" />

          {editID===item.id?
          (<input type="text" onChange={ (e)=> seteditText(e.target.value)}  value={editText}  className="w-full max-w-md px-4 py-2 mb-4 rounded bg-violet-700 text-white placeholder-white border border-white focus:outline-none focus:ring-2 focus:ring-yellow-300"/>):
          (<div className={`text-white ${item.isComplete?"line-through":""}`}>{item.todo}</div>)
          }
          <div className="buttons">
            {editID===item.id?(
              <button className="bg-green-900 text-white px-3 py-1 m-2 rounded hover:bg-green-950 text-sm" onClick={()=>handleSave()}>Save</button>
            ):
            (<button className="bg-green-900 text-white px-3 py-1 m-2 rounded hover:bg-green-950 text-sm" onClick={()=>handleEdit(item.id,item.todo)}>Edit</button>)
            }
            <button className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-950 text-sm" onClick={()=>handleDelete(item.id)}>Delete</button>
          <div className="test bg-red"></div>
          </div >
        </div>
      })}
      </div>
      </div>

    </div>
    </>
  )

}

export default App