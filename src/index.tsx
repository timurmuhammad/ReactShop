import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import { HashRouter  as Router } from 'react-router-dom';
import { Provider } from 'react-redux'

import { App } from './app'
import { store } from './redux/store'
import './nulling-style.css'

const element = document.querySelector('#root') as HTMLElement;

createRoot(element).render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)
