import React from 'react'
import {Link} from 'react-router-dom'

const headerStyle = {
    background : '#333',
    color : '#fff',
    textAlign : 'center',
    padding : '10px'
};

const linkStyle = {
    color : '#fff',
    textDecoration : 'none'
}

// 因安裝了 ES7 React....插件，輸入rcf按tab可快速產生function，但這是沒有render()的，只當做一個單純的元素，而且這不是HOOK

// 如果有使用到<Router>，超連結就不會用<a>而是用link

function Header(){
    return(
        <header style = {headerStyle}>
            <h1>TodoList</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
        </header>
    )
}

export default Header;