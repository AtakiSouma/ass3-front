import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
export default function App() {

  return (
    <>
   <RouterProvider router={router}/>
    </>
  
  )
}