import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom';
import './index.css';
import PlanPage from "./containers/Pages/PlanPage"

import registerServiceWorker from './registerServiceWorker';
import store from "./store"

ReactDOM.render(<Provider store={store}><PlanPage/></Provider>, document.getElementById('root'));
registerServiceWorker();
