import React, { VFC } from 'react';
import ReactDOM from 'react-dom';

const App: VFC = () => (
  <div>
    <p>hello</p>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
