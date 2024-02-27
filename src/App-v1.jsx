// App.js
import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const updatedTodos = [...state.todos, { text: action.payload, completed: false }];
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };
    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(toggledTodos));
      return {
        ...state,
        todos: toggledTodos,
      };
    case 'DELETE_TODO':
      const filteredTodos = state.todos.filter((_, index) => index !== action.payload);
      localStorage.setItem('todos', JSON.stringify(filteredTodos));
      return {
        ...state,
        todos: filteredTodos,
      };
    default:
      return state;
  }
};

const App = () => {
  const [text, setText] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() === '') return;
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  const handleToggle = index => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  };

  const handleDelete = index => {
    dispatch({ type: 'DELETE_TODO', payload: index });
  };

  return (
    <div className="App">
      <h1>Todo App with React Hooks</h1>
      <form onSubmit={handleSubmit} className='text_beetween_and_center_align' style={{gap: '8px'}}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add Todo"
        />
        <button type="submit">Add</button>
      </form>


      <div>
        {Object.keys(state.todos).length === 0 ? (
          <p style={{ textAlign: 'center'}}>Todo empty !!</p>
        ) : (<ul>
          {state.todos.map((todo, index) => (
            <li key={index} style={{ listStyle: 'none', background: '#f5f5f5'}} className='text_beetween_and_center_align border5px'>
            <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 'bold', letterSpacing: '3px', textTransform: 'capitalize' }}>
                {todo.text}
              </span>
            </div>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>)}
      </div>


    </div>
  );
};

export default App;
