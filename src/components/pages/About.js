import React from 'react'

export default function About() {
    return (
        // React.Fragment is like a ghost element ,it doesnt actually show in the DOM , using it when u dont really need to return a div but still want to code JSX form
        <React.Fragment>
            <h1>About</h1>
            <p>This is the TodoList app v1.0.0. It is part of a React crash course</p>
        </React.Fragment>
    )
}
