---
title: "First Steps with React"
date: "2020-05-07"
---

### React Basics

#### React.Component

##### use State, props and contructor

#### Funcional Components

### React Route and Routing

### Styled Component

Styled Components allow you to write plain CSS in your components without worrying about class name collisions. It helps to write CSS that's scoped to a single component and does not leak to any other element in the page.

#### Installation

```npm install --save styled-components```

#### Example

create file example: my-component.styles.jsx
```
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;
```

Use it
```
import React from 'react';
import { Container, NameContainer } from './my-component.styles';

const MyComponent = ({ item }) =>  {
const { name } = item;
return (
    <Container>
      <NameContainer>{name}</NameContainer>
    </Container>
)};

export default MyComponent;
``` 

#### <a href="https://styled-components.com/docs/basics" target="_blank">Oficial website</a>


### Redux

React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.


### Sagas

redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

### Higher-Order Components (HOC) Patterns

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:

```
const NavbarWithRouter = withRouter(Navbar);
```

//React Redux's connect

```
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the connect function have the signature Component => Component. Functions whose output type is the same as its input type are really easy to compose together.

```
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

The compose utility function is provided by many third-party libraries including lodash (as lodash.flowRight), Redux, and Ramda.


### React Performance

#### Lazy

##### What is React.lazy()

It is a new function in react that lets you load react components lazily through code splitting without help from any additional libraries. Lazy loading is the technique of rendering only-needed or critical user interface items first, then quietly unrolling the non-critical items later. It is now fully integrated into core react library itself. We formerly used react-loadable to achieve this but now we have react.lazy() in react core.

##### Lazy Suspense

Suspense is a component required by the lazy function basically used to wrap lazy components. Multiple lazy components can be wrapped with the suspense component. It takes a fallback property that accepts the react elements you want to render as the lazy component is being loaded.

##### Why is Lazy Loading (& Suspense) Important

Firstly, bundling involves aligning our code components in progression and putting them in one javascript chunk that it passes to the browser; but as our application grows, we notice that bundle gets very cumbersome in size. This can quickly make using your application very hard and especially slow. With Code splitting, the bundle can be split to smaller chunks where the most important chunk can be loaded first and then every other secondary one lazily loaded.

#### Error Boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. [Online DEMO](https://codepen.io/gaearon/pen/wqvxGa)


##### Where to Place Error Boundaries

The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.

#### React.memo

Class components can bail out from rendering when their input props are the same using PureComponent or shouldComponentUpdate. Now you can do the same with function components by wrapping them in React.memo.

```
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```

##### useMemo

[Official Link](https://reactjs.org/docs/hooks-reference.html#usememo)

#### PureComponent, ShouldComponentUpdate

#### useCallback

### Material UI

### Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Here, useState is a Hook. We call it inside a function component to add some local state to it. React will preserve this state between re-renders. useState returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It’s similar to this.setState in a class, except it doesn’t merge the old and new state together. 

#### Effect Hook

You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” (or “effects” for short) because they can affect other components and can’t be done during rendering.

The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Effects may also optionally specify how to “clean up” after them by returning a function. For example, this component uses an effect to subscribe to a friend’s online status, and cleans up by unsubscribing from it:

```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

#### Video Intro React Conf

<iframe width="560" height="315" src="https://www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### How to fetch data with React Hooks?

[Link to awesome article](https://www.robinwieruch.de/react-hooks-fetch-data?fbclid=IwAR2iM3l_PulHxdkPduPfJ4b8icId-vvF4EQbQXgk2t4PpsMz0cFIScTXATA)


### Context API

#### I understood

Use redux for more complex projects that need more flexibility and reuse components / Use Context API for simpler projects such as blogs, portfolios, websites and it will give you ease of implementation and will be lighter.

### GraphQL

### Webpack + Babel 