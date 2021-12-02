import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo';
// import { v4 as uuidv4 } from 'uuid';
import About from './components/pages/About'
import axios from 'axios';

// function App() {
//   return (
//     <div className="App">
//       <h1>App</h1>
//     </div>
//   );
// }

class App extends React.Component{
  
  // 建立todos會有的state，這種會傳來傳去的state又稱 App level state ，與redux , context等不同管理工具有關
  state = {
    todos : [
      // {
      //   id : uuidv4(),
      //   title : 'Take out the trash',
      //   completed : false
      // },
      // {
      //   id : uuidv4(),
      //   title : 'Dinner with mylove',
      //   completed : false
      // },
      // {
      //   id : uuidv4(),
      //   title : 'Meeting with boss',
      //   completed : false
      // }
    ]
  }

  // 當一個 component 的 instance 被建立且加入 DOM 中時，其生命週期將會依照下列的順序呼叫這些方法 1.constructor() 2.static getDerivedStateFromProps() 3.render() 4.componentDidMount() ； 當 prop 或 state 有變化時，就會產生更新。當一個 component 被重新 render 時，其生命週期將會依照下列的順序呼叫這些方法： 1.static getDerivedStateFromProps() 2.shouldComponentUpdate() 3.render() 4.getSnapshotBeforeUpdate() 5.componentDidUpdate() ； 可見componentDidMount將會是最後呼叫的方法
  
  componentDidMount(){
    // 此範例中使用的式axios API，而不是平常使用的fetch API ，範例get的URL是作者是先放在網頁上的(jsonplaceholder)
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => {
      console.log(res.data);
      this.setState({todos : res.data});
    })
  }

  // Onchange method (Toggle Complete)
  markCompleted = (id) =>{
    console.log("markCompleted",id);
    // 因state是物件，要用{}包起來
    // Q:為什麼這裡的this不是應該綁到TodoItem嗎?
    // A:箭頭函式的this為enclosing scope且優先序為最高(箭頭函式不能被new，接著 優先高於 bind() ,高於call()/apply , 高於隱含繫結)
    this.setState({todos : this.state.todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })})
    
  }

  // Delete Todo
  delTodo = (id) =>{
    // console.log(id);
    // 用delete刪除資料，且delete之後，伺服器將會回傳promise物件回來
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>{
      // 並沒有實際用到delete後伺服器回傳的promise
      console.log("delete specific data",res);
      this.setState({todos : this.state.todos.filter(todo => {
        return todo.id !== id;
      })});
    })
    
  }

  // addTodo
  addTodo = (title) =>{
    // console.log(title);
    // const newTodo = {
    //   id : uuidv4(),
    //   title : title,
    //   completed : false
    // };

    // 用post更新後端資料，且post之後，伺服器將會回傳promise物件回來，裡面包含剛剛post的資料，注意，此範例並不會真的去GET剛剛POST給伺服器後，伺服器改變的資料，而是利用伺服器回傳POST資料的動作，改變本地資料，這只是模擬實際情況
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      // 這裡沒設定id是因為伺服器會將新的資料自動新增id(伺服器原本提供200個todo，但是範例只拿10個，如果POST新的，其id會是201..and so on)
      title : title,
      completed : false
    }).then(res =>{
      this.setState({todos : [...this.state.todos,res.data]})
    })

    // this.setState({todos : [...this.state.todos , newTodo]})

  }

  render(){
    return(
      // 使用Router來創造不同頁面
      <Router>
        <div className = "App">
          <div className = "container">
            <Header />
            {/* <Route> JSX標籤的props中，path代表對應location，"/"則代表首頁，而path會將前面loaction的內容一併顯示在後面location 例:/about會顯示path="/"和path="/about"的內容，要解決此問題必須對<Route>新增exact屬性；render 需傳入一個function，此function需return要顯示的內容(如果用箭頭函式，箭頭後面如果是用{}表示式記得要用return，若不是用{}則可以省略return) */}
            <Route exact path="/" render = {() => {
              return(
              <React.Fragment>
                <AddTodo addTodo = {this.addTodo}/>
                {/* 將state.todo作為props傳給Todo */}
                <Todos todos = {this.state.todos} markCompleted = {this.markCompleted} delTodo  = {this.delTodo}/>
              </React.Fragment>
              )
            }} />
            {/* 如果此Route內只有一個JSX標籤，就可以直接用component指向那個標籤 */}
            <Route path="/about" component={About} />            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
