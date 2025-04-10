import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  AppBar,
  Toolbar,
  Container,
  CssBaseline,
  Typography
} from '@mui/material';
import { Brightness4, Brightness7, Delete } from '@mui/icons-material';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const { darkMode, toggleDarkMode, colors } = useTheme();

  // Define the API URL (can be updated based on the environment)
  const apiUrl = 'https://todo-task-ez87.onrender.com/api/todos/';

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(apiUrl); // Use apiUrl here
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  // Add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(apiUrl, {
        title: newTodo,
        completed: false
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${apiUrl}${id}/`); // Use apiUrl here as well
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Toggle completion status
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await axios.patch(`${apiUrl}${id}/`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Filter todos based on status
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div style={{
      background: colors.background,
      minHeight: '100vh',
      color: colors.text,
      transition: 'all 0.3s ease-in-out'
    }}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: darkMode ? colors.paper : 'primary.main' }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={toggleDarkMode}
            sx={{ color: colors.text, mr: 2 }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button 
            sx={{ 
              color: colors.text,
              fontWeight: filter === 'all' ? 'bold' : 'normal'
            }} 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            sx={{ 
              color: colors.text,
              fontWeight: filter === 'completed' ? 'bold' : 'normal'
            }} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            sx={{ 
              color: colors.text,
              fontWeight: filter === 'pending' ? 'bold' : 'normal'
            }} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: colors.text }}>
          Todo List
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <TextField
            fullWidth
            label="New Todo"
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            sx={{
              '& .MuiInputBase-root': { color: colors.text },
              '& .MuiInputLabel-root': { color: colors.text },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.text }
              }
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: colors.primary,
              '&:hover': { bgcolor: darkMode ? '#64b5f6' : '#1565c0' }
            }}
          >
            Add Todo
          </Button>
        </form>

        <List sx={{ 
          bgcolor: colors.paper,
          borderRadius: 2,
          boxShadow: 1,
          p: 0
        }}>
          {filteredTodos.map((todo) => (
            <ListItem 
              key={todo.id}
              divider
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => deleteTodo(todo.id)}
                  sx={{ color: colors.text }}
                >
                  <Delete />
                </IconButton>
              }
              sx={{
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                sx={{ 
                  color: colors.primary,
                  '&.Mui-checked': { color: colors.primary }
                }}
              />
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : colors.text
                }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}
