// 因安裝了 ES7 React....插件，輸入rce按tab可快速產生class


import React, { Component } from 'react'

const btnStyle = {
    background : '#ff0000',
    color : '#fff',
    border : 'none',
    padding : '5px 9px',
    borderRadius : '50%',
    cursor : 'pointer',
    float : 'right'
};

export class TodoItem extends Component {
    getStyle = () => {
        // if(this.props.todo.completed){
        //     return {
        //         textDecoration : 'line-through'
        //     }
        // }
        // else{
        //     return {
        //         textDecoration : 'none'
        //     }
        // }

        // 這裡能用到this是因為使用箭頭函式，自動bind這個函式的enclosing scope
        return{
            background : '#f4f4f4',
            padding : '10px',
            borderButton : '1px #ccc dotted',
            textDecoration : this.props.todo.completed ? 'line-through' : 'none'
        }
    }


    render() {
        // Deconsruct
        const {id , title} = this.props.todo;
        // console.log(typeof(this.props.markCompleted)); // function
        // console.log(typeof(id)); // Number
        return (
            <div style = {this.getStyle()}>
                <p>
                {/* 將input的onChange事件設定為TodoItem屬性之一，並在Todo.js創造，並不是從TodoItem回傳Todos告訴它onChage的內容，不要搞混上下順序 */}
                {/* bind(thisArg,arg1,ag2..) bind方法除了回傳繫結指定物件函式外，後面傳的parameter可以在該函數被invoked(執行)時，自動傳入，在此就是綁定TodoItem，執行時會自動傳入id，但是markComplete是箭頭函式，故bind(..)回傳的新函式this綁定無效，其this依舊指向原函式的enclosing scope，故在此bind內綁定使用null不影響程式*/}
                {/* 在此使用bind是因為 onChange事件要觸發的是函式，而bind回傳的是函式，又可以指定執行時會自動傳入的參數 */}
                {/* call和apply都是直接執行function，不像bind可以回傳一個新的function，不過三者都可以綁定this與傳入執行函式時的參數 */}
                <input type = "checkbox" onChange = {this.props.markCompleted.bind(this,id)}></input>
                {title}
                <button style = {btnStyle} onClick = {this.props.delTodo.bind(null,id)}>x</button>
                </p>
            </div>
        )
    }
}

export default TodoItem
