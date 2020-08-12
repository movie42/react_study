# Study react basic

intro: This document just record my React review.

lecture : nomadcoder [https://nomadcoders.co/]

basic document [https://ko.reactjs.org/docs/getting-started.html]

## SETTINGS

1. What is this?

   It just make movie_app. At the same time, I study React Js.

2. Review setting

1) install npx react-create-app (name)
2) create git repository

3. How can I start react app
   open terminal and "yarn start"

## COMPONENT AND JSX

4. How does React work?
   ReactDOM make viture DOM inside index.html.

5. what is component?
   It is function return HTML.

   > JSX : I need react write like html to use component. other words it just JS + HTML

6. How do I make and use Component
   Create JavaScript file.
   And write on top line I should write 'import React from "react"'
   React understand JSX that read 'import React from "react"' on JS File.
   Component name of first letter should write UpperCase.
   If you want use your component, you must export your Component.

   > Caution : React application just RENDER ONLY ONE COMPONENT.

7. I Can send information other component.
   I can create property from father component and send to child component.

   > Warning : Each child in a list should have a unique "key" prop.
   > How Can I Fix it? It jUst add key prop inside each Component.

8. Check PropTypes
   Why need I this?
   link : [https://ko.reactjs.org/docs/typechecking-with-proptypes.html]

   I need install npm install prop-types.

   Check PropTypes is check what I wrote props right or worng.

## STATE

1. Basic THeory : When State create writing dynamic data.
   link : [https://ko.reactjs.org/docs/lifting-state-up.html#gatsby-focus-wrapper]

2. class
   It is javascript theory...
   link : [https://ko.javascript.info/class]

   so, I can made class react component
   React component automatically is going to work render method

   > so Why need I class react component? Because, I NEED STATE.

3. State is Object.

4. I can't mutate state directly.
   I can use this.setState({})
   link : [https://ko.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly]

5. Component Life cycle
   mounting
   link : [https://ko.reactjs.org/docs/react-component.html#mounting]

   updating
   link : [https://ko.reactjs.org/docs/react-component.html#updating]

   unmounting
   link : [https://ko.reactjs.org/docs/react-component.html#unmounting]

6. Conclusion of life cycle.
   If I need change data, like API, I fetch data in ComponentDidMount() because ComponentDidMount excution after render.
