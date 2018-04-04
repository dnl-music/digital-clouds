const React = require("react");
const ReactDOM = require("react-dom");
const redux = require("redux");
const Provider = require("react-redux").Provider;
const reducer = require("./reducer.jsx");
const AppView = require("./appview.jsx");

const store = redux.createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: {
    employers: [
      {id: 1, fullName: "Алексеев Тимон Викторович", position: "Director", phone: "8-800-234-23-23"},
      {id: 2, fullName: "Петров Василий Сергеевич", position: "Lead", phone: "8-800-733-00-44"},
      {id: 3, fullName: "Матвеев Тимофей Алексеевич", position: "Chief", phone: "8-800-999-00-23"},
    ]
  }
});


ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>,
  document.getElementById("container")
);