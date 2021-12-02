import React, { Component } from 'react'

export class AddTodo extends Component {
    // 讓input內容也被state掌控

    state = {
        title : ''
    }

    // the state here in AddTodo.js is in this components(dont need to go up passing props), this is aka component state
    onChange =  (e) => {
        this.setState({[e.target.name] : e.target.value});
        // 在chrome F12的react dev插件可以清楚看到，每次改變輸入state會跟著改變
        // 改使用[e.target.name]可以在有多個input的情況下，靠著state內容與input的name屬性對應來變更state，而不用每一個input都搞一個onchange方法
        // 物件屬性名可以是任何字串，包括空字串。如果屬性名不是有效的 JavaScript 識別字 或數字，則必須將其用引號引起來。無效的屬性名稱也不能作為點 (.) 屬性訪問，但是可以使用類似數組的符號（"[]"）進行訪問和設置。 -MDN
        // 根據上述MDN資料，若要使用的屬性"名稱"(key)為變數，則要用[]框起來!
    }

    onSubmit = (e) => {
        // 
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title : ''});
    }

    render() {
        return (
            <form onSubmit = {this.onSubmit} style = {{display : 'flex'}}>
                <input type = "text" name = "title" placeholder = "Add Todo ..." value = {this.state.title} onChange = {this.onChange} style = {{flex : '10' , padding : '5px'}}></input>
                <input type = "submit" value = "Submit" className="btn" style = {{flex : '1'}}></input>
            </form>
        )
    }
}

export default AddTodo
