import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from "material-ui"
import './index.css';
import PlanPage from "./containers/Pages/PlanPage"

import registerServiceWorker from './registerServiceWorker';
import store from "./store"

ReactDOM.render(<MuiThemeProvider><Provider store={store}><PlanPage/></Provider></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
