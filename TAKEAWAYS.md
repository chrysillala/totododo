# Key Takeaways

## React

### React State

3 things to remember to use state correctly:

1. Do Not Modify State Directly

1. State Updates May Be Asynchronous

1. State Updates are Merged

### React Lifecycle

![React Lifecycle Diagram](https://pbs.twimg.com/media/Dc2YU2aWsAAVbmk?format=jpg&name=large "React Lifecycle Diagram")

React lifecycle interactive diagram [here](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

How these lifecycles are implemented in this app are explained on the Data Storage section.

## Data Storage

There are several ways to store todos data. In this app, I implemented 3 different ways to store the data, you can take a look on each branch.

### React State

https://reactjs.org/docs/state-and-lifecycle.html

Using React state to store todo data in a plain Javascript Object.

### Local Storage

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

In this app, we are getting todo data from local storage during mounting using `componentDidMount()`. If we have todo data on local storage then we pass the data to `todos` state, else we put empty empty array as initial `todos` state.

Then, we handle data changes by calling local storage `setItem()`.

### Supabase

https://supabase.io/

Supabase is built on top of Postgres and provides a realtime engine, so that you can listen to changes as they happen. Supabase also provides a RESTful API, which provides everything you need to build a CRUD app. You don't need to fully undestand SQL query as you can modify data from its Table Editor UI.

In this app, we need to fetch the data from API during `componentDidMount()`. Next, we handle data changes using supabase syntax.

## Styled Components

1. Automatic critical CSS
1. Automatic vendor prefixing
1. Can pass props to easily handle UI
1. Define Styled Components outside of the render method

## Best Practices

Here are some best practices that I follow when building this app.
https://www.educative.io/blog/best-practices-react-developer

## What's Next?

- Implement unit test
- Improve some UX, for example when it's almost due date should add better visual information

## References

- https://reactjs.org/docs/react-component.html
- https://twitter.com/dan_abramov/status/981712092611989509
- https://twitter.com/ManuelBieh/status/994618772999884800/photo/1
- https://reactjs.org/docs/state-and-lifecycle.html
- https://styled-components.com/docs/basics#motivation
- https://styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method
