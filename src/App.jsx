// App.js
import React, { useReducer, useState } from 'react';
import './App.css';
import { initialState, reducer } from './reducer';

const App = () => {
  const [text, setText] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  const handleToggle = (index) => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_TODO', payload: index });
  };

  return (
    <div className="App">
      <h3>Todo App with React Hooks</h3>
      <form onSubmit={handleSubmit} className="text_beetween_and_center_align" style={{ gap: '8px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Todo"
        />
        <button type="submit">Add</button>
      </form>

      <div>
        {state.todos.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Todo empty !!</p>
        ) : (
          <ul>
            {state.todos.map((todo, index) => (
              <li key={index} style={{ listStyle: 'none', background: '#f5f5f5', marginBottom: '8px' }} className="text_beetween_and_center_align border5px">
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
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
