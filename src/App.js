import  { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminBlogManagePage = lazy(() => import('./pages/AdminBlogManagePage'));
const AdminBlogEditorPage = lazy(() => import('./pages/AdminBlogEditorPage'));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogPostPage />} />
            <Route path="login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route path="admin/blog/manage" element={
              <ProtectedRoute>
                <AdminBlogManagePage />
              </ProtectedRoute>
            } />
            <Route path="admin/blog/new" element={
              <ProtectedRoute>
                <AdminBlogEditorPage />
              </ProtectedRoute>
            } />
            <Route path="admin/blog/edit/:id" element={
              <ProtectedRoute>
                <AdminBlogEditorPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;