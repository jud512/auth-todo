import React, { useState, useRef, useEffect } from 'react'
import './todo.css'

type Place = 'otthon' | 'munka' | { custom: string }

const Todo = () => {
    type Todo = Readonly<{
    id: number
    text: string
    done: boolean
    place?: Place
    }>

  //intersection type
type CompletedTodo = Todo & {
    readonly done: true
}

type NonCompletedTodo = Todo & {
    readonly done: false
}

const data: Todo[] = [
    {
      id: 1,
      text: 'Ruhák mosása',
      done: false,
      place: 'otthon'
    },
    {
      id: 2,
      text: 'E-mailt írni a főnöknek',
      done: false,
      place: 'munka'
    },
    {
      id: 3,
      text: 'Edzőterembe menni',
      done: true,
      place: { custom: 'Edzőterem'}
    },
    {
      id: 4,
      text: 'Tejet venni',
      done: true,
      place: { custom: 'Szupermarket'}
    },
    {
      id: 5,
      text: 'Könyvet olvasni',
      done: true,
      
    },
  ]

  const [todos, setTodos]  = useState(data);
  const [input, setInput] = useState("");

  const toggleTodo = (todo: Todo): Todo => {
    return{
      id: todo.id,
      text: todo.text,
      done: !todo.done
    }
  }

  const placeToString = (place: Place):string => {
    if(place === 'otthon'){
      return '🏚️Otthon'
    }
    else if(place ==='munka'){
      return '👷Munka'
    }
    else{
      return '📍' + place.custom
    }
  }

  const refChecked = useRef<HTMLInputElement>(null);

  const completeAll = (todos: readonly Todo[]): CompletedTodo[] => {
    return todos.map(todo => (
      {
        ...todo, 
        done: true
      }
    ))
  }

  const nonCompleteAll = (todos: readonly Todo[]): NonCompletedTodo[] => {
    return todos.map(todo => (
        {
            ...todo,
            done: false
        }
    ))
  }

  const completeOneTask = (todos: Todo[], id:number) => {
    const newTodos = todos.map(todo => (todo.id !== id ? todo : {...todo, done: !todo.done}) )
    setTodos(newTodos)
  }

const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    completeOneTask(todos, Number(e.target.value))
}

const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(refChecked.current){
        if(refChecked.current.checked){
            const newTodos = completeAll(todos);
            setTodos(newTodos);
            
        } else{
            const newTodos = nonCompleteAll(todos);
            setTodos(newTodos);
        }

    }
    
    
    
}

const refInputNewTask =  useRef<HTMLInputElement>(null);


const addNewTask = () => {
    const newTask = {
        id: todos[todos.length-1].id + 1,
        text: input,
        done: false
    }
    setTodos([...todos, newTask]);
}

useEffect(() => {
    if(refInputNewTask.current){
        refInputNewTask.current.value = '';
    }
}, [todos])

// console.log(completeAll(todos));
//   console.log(todos);
//   console.log(input)
console.log(refChecked)


  return (
    <div className='todo'>
        <div className="container">
        <h1>TODO alkalmazás</h1>
        <input ref={refInputNewTask} type="text" className='inputNewTask' id='inputNewTask'  value={input} onChange={(e) => {setInput(e.target.value)}}/>
        <button className='newTask' onClick={addNewTask}>Új feladat</button>
        <div className="itemTodo checkAll">
            <input ref={refChecked} type="checkbox" name="checkedAll" id=""  onChange={handleChangeAll}/>
            <label htmlFor="checkedAll">Összes</label>
        </div>
        
        <form action="" className='form'>
                
            {
                todos.map((item) => (
                  <div className='itemContainer'>
                    <div className='itemTodo' key={item.id}>
                        <input type="checkbox" id={item.id.toString()} name={item.text} value={item.id}  onChange={handleChange} checked={item.done}/>
                        <label>{item.text}</label>
                                            
                    </div>
                   {item.place && <span className='tag'>{item.place && placeToString(item.place)}</span>}
                  </div>  
                ))
            }
           
         </form>
        </div>
    </div>
  )
}

export default Todo