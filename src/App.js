import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RootLayout, Shop, About, Stories, Home, CartPage, AdminLayout } from './pages/index'
import { Profile, Wishlist, Order } from './pages/ProfileMenu/index'
import { Login, Signup, ResetPassword, VerifyEmail, ForgotPasswordPage } from './components/auth/index'
import { ProductTable, EditProduct, AddProduct, AdminOrderList, OrderDetailpage, NewOrderpage } from './components/admin/index'
import { SingleProduct, ReviewForm } from './components/client/index';
import { SearchProduct } from './components/ui/index'
import { useAuth } from './context/Authcontext';


//!  This method check that user is authenticated or not also check that user is Verified or not if not than it will redired to login or verify-email page 
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userData } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }
  if (!userData.isVerified) {
    return <Navigate to='/auth/verify-email' replace />
  }
  return children;
}

//! Admin Protaction Route
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, userData } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }
  if (!userData.isVerified) {
    return <Navigate to='/auth/verify-email' replace />
  }
  if (!userData.isAdmin) {
    return <Navigate to='/' replace />
  }
  return children;
}

//! This method is for the redirection if user is authenticated but not verify that it will redirect to verify-email also if the user is authenticated and user is verified that it will redirect to home  '/' page than login and signup are not accesable 

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, userData } = useAuth();
  if (isAuthenticated && !userData.isVerified) {
    return <Navigate to='/auth/verify-email' />
  }
  if (isAuthenticated && userData.isVerified) {
    return <Navigate to='/' replace />
  }
  return children;
}

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'shop',
          element: <Shop />
        },
        {
          path: 'singleproduct/:id',
          element: <SingleProduct />
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'stories',
          element: <Stories />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'searchproduct',
          element: <SearchProduct />
        },
        {
          path: 'add-reviews/:id',
          element: <ReviewForm />
        },
        // ? Profile Menu Route 
        {
          path: 'profile',
          element: <ProtectedRoute><Profile /></ProtectedRoute>
        },
        {
          path: 'wishlist',
          element: <ProtectedRoute><Wishlist /></ProtectedRoute>
        },
        {
          path: 'orders',
          element: <ProtectedRoute><Order /></ProtectedRoute>
        },
        // ? Login route 
        {
          path: 'auth/login',
          element: <RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser >,
        },
        {
          path: 'auth/signup',
          element: <RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>,
        },
        {
          path: 'auth/verify-email',
          element: <VerifyEmail />
        },
        {
          path: 'auth/forgot-password',
          element: <RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>
        },
        {
          path: 'auth/reset-password/:token',
          element: <RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>
        },
      ]
    },

    //! If any route that is not on the above roues than it will redirect to '/' route:- Universel route 
    {
      path: "*",
      element: <Navigate to='/' replace />,
    },

    // ! Admin dashbord route 
    {
      path: '/dashbord',
      element: <AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>,
      children: [
        {
          path: 'ecommerce',
          element: <Home />
        },
        {
          path: 'addproduct',
          element: <AddProduct />
        },
        {
          path: 'products',
          element: <ProductTable />
        },
        {
          path: 'productlist/:id',
          element: <EditProduct />
        },
        {
          path: 'orders',
          element: <AdminOrderList />
        },
        {
          path: 'orderlist/:id',
          element: <OrderDetailpage />
        },
        {
          path: 'newOrder',
          element: <NewOrderpage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={route} />
  );
}

export default App;
