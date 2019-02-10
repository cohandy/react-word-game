import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import registerServiceWorker from './registerServiceWorker';

import "normalize.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/module.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
