---
title: "First Steps with React"
date: "2020-05-07"
---

### React Basics

### React Route and Routing

### Styled Component

Styled Components allow you to write plain CSS in your components without worrying about class name collisions. It helps to write CSS that's scoped to a single component and does not leak to any other element in the page.

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

#### How to fetch data with React Hooks?

[Link to awesome article](https://www.robinwieruch.de/react-hooks-fetch-data?fbclid=IwAR2iM3l_PulHxdkPduPfJ4b8icId-vvF4EQbQXgk2t4PpsMz0cFIScTXATA)


### Context API

#### I understood

Use redux for more complex projects that need more flexibility and reuse components / Use Context API for simpler projects such as blogs, portfolios, websites and it will give you ease of implementation and will be lighter.

### GraphQL

### Webpack + Babel 