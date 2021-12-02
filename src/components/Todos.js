import React from 'react';
import TodoItem from './TodoItem';
// import fetch from 'node-fetch';

// function App() {
//   return (
//     <div className="App">
//       <h1>App</h1>
//     </div>
//   );
// }

// async function fetchTodo(){
//   const data = await fetch('http://localhost:3000/posts/1');
//   const todo = await data.json();
//   console.log(todo);
// }

// async function postTodo(todos){

// }

class Todos extends React.Component{

  
  // 因Oncheck之後要改變state，故再需要往上一層，所以在App.js創造markCompleted
  // 回傳帶有很多個<TodoItem>的陣列
  render(){
    return this.props.todos.map(todo => (
        <TodoItem todo = {todo} key = {todo.id} markCompleted = {this.props.markCompleted} delTodo = {this.props.delTodo}/>
    ));
  }
}

export default Todos;
