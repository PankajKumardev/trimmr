import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./Layouts/app-layout"
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Link from "./pages/Link"
import RedirectLink from "./pages/RedirectLink"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"
import { Analytics } from "@vercel/analytics/react"
const baseUrl = "https://trimmrr.vercel.app";
  const router = createBrowserRouter([
    {
      element : <AppLayout/>,
      children : [
        {
          path : "/",
          element : <LandingPage/>
        },
        {
          path : "/Dashboard",
          element : 
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        },
        {
          path : "/Auth",
          element : <Auth/>
        },
        {
          path : "/Link/:id",
          element : 
          <RequireAuth>
             <Link/>
          </RequireAuth>
         
        },
        {
          path : "/:id",
          element : <RedirectLink/>
        },
      ]
    }
  ])

function App() {

  return (
    <UrlProvider>
      <Analytics/>
    <RouterProvider router={router}/>
    </UrlProvider>
  )
}

export default App
