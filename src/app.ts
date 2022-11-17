import express from 'express';
import { ITodo } from './types/generalType';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
const app = express();

app.use(morgan('dev'));

let todos: ITodo[] = [];

app.use(express.json());

app.get('/todo', (req, res) => {
  return res.json(todos);
});

app.post('/todo', (req, res) => {
  const newTodo = req.body as ITodo;
  newTodo.id = uuidv4();
  todos.push(newTodo);
  return res.json({
    message: 'Todo added !',
  });
});

app.put('/todo/:id', (req, res) => {
  const updatedTodo = req.body as ITodo;
  const { id } = req.params;

  const updatedTodoList = todos.filter((todo) => {
    return todo.id !== id;
  });

  updatedTodoList.push(updatedTodo);

  todos = updatedTodoList;

  return res.json({
    message: 'Todo updated !',
  });
});

app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;

  const newTodoList = todos.filter((todo) => {
    return todo.id !== id;
  });

  todos = newTodoList;

  return res.json({
    message: 'Todo deleted !',
  });
});

app.listen(5000, () => {
  console.log('Server is running in port ' + 5000);
});
