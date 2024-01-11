import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Collection from './Collection.tsx'
import Search from './Search.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/collection', element: <Collection /> },
    { path: '/search', element: <Search/>}
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
    
    <RouterProvider router={router} />
    
    </>
)
