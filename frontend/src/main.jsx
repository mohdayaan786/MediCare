import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <ScrollToTop />
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
