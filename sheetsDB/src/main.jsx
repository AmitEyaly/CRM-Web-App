
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import bookingReducer from './redux/bookingReducer.jsx'

const appStore = createStore(bookingReducer);

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <App/>
  </Provider>
)
