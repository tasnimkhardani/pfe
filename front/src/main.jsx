import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import {ToastProvider} from './components/toaster-provider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
