import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from "material-ui"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import './index.css';
import PlanPage from "./containers/Pages/PlanPage"
import {Colors} from "./constants/colors"

import registerServiceWorker from './registerServiceWorker';
import store from "./store"

const muiTheme = getMuiTheme({
    palette:{
        primary1Color:Colors.MonashBlue
    }
})

ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}><Provider store={store}><PlanPage/></Provider></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
