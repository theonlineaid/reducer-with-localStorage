// reducer.js
export const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const updatedTodos = [...state.todos, { text: action.payload, completed: false }];
            updateLocalStorage(updatedTodos);
            return {
                ...state,
                todos: updatedTodos,
            };
        case 'TOGGLE_TODO':
            const toggledTodos = state.todos.map((todo, index) =>
                index === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
            updateLocalStorage(toggledTodos);
            return {
                ...state,
                todos: toggledTodos,
            };
        case 'DELETE_TODO':
            const filteredTodos = state.todos.filter((_, index) => index !== action.payload);
            updateLocalStorage(filteredTodos);
            return {
                ...state,
                todos: filteredTodos,
            };
        default:
            return state;
    }
};

const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
