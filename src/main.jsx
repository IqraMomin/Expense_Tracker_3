import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/auth-context'
import { ExpenseProvider } from './store/expense-context'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ExpenseProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ExpenseProvider>
    </BrowserRouter>,
)
