// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-task-ez87.onrender.com',  // Use the correct URL of your app on Render
});

export const fetchTodos = () => API.get('/api/todos/');
export const createTodo = (newTodo) => API.post('/api/todos/', newTodo);
// ... other API calls
