import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/sections/HomePage';
import { AuthPage } from '@/sections/AuthPage';
import { Dashboard } from '@/sections/Dashboard';
import { AboutPage } from '@/sections/AboutPage';
import { AdminDashboard } from '@/sections/AdminDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { store } from '@/lib/store';
import type { User, View } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [navOpen, setNavOpen] = useState(false);
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotifications(user?.id);

  useEffect(() => {
    store.initialize();
    
    // Check if user is already logged in
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      // Redirect to appropriate dashboard
      if (currentUser.role === 'Admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('dashboard');
      }
    }
  }, []);

  const handleAuth = (authenticatedUser: User) => {
    if (authenticatedUser.role === 'Admin') {
      setCurrentView('admin');
      toast.success(`Welcome back, ${authenticatedUser.username}!`, {
        description: 'You have admin access.',
      });
    } else {
      setCurrentView('dashboard');
      toast.success(`Welcome, ${authenticatedUser.username}!`, {
        description: 'Your dashboard is ready.',
      });
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
    toast.info('You have been logged out.');
  };

  const handleViewChange = (view: View) => {
    // Close nav when changing views
    setNavOpen(false);
    
    // Check authentication for protected views
    if ((view === 'dashboard' || view === 'script' || view === 'admin') && !isAuthenticated) {
      setCurrentView('login');
      toast.error('Please sign in to access this page.');
      return;
    }
    
    // Check admin access
    if (view === 'admin' && !isAdmin) {
      setCurrentView('dashboard');
      toast.error('You do not have admin access.');
      return;
    }
    
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleNotification = () => {
    toast.success('Update successful!', {
      description: 'Changes have been saved.',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-neon-pink/20 border-t-neon-pink animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${navOpen ? 'nav-open' : ''}`}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(8, 8, 12, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
        }}
      />
      
      {/* Navigation */}
      {(currentView !== 'home' || isAuthenticated) && (
        <Navigation
          user={user}
          currentView={currentView}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
          unreadCount={unreadCount}
          isOpen={navOpen}
          onToggle={() => setNavOpen(!navOpen)}
        />
      )}

      {/* Main Content - No blur applied */}
      <main className="relative">
        {currentView === 'home' && <HomePage onViewChange={handleViewChange} />}
        
        {currentView === 'signup' && (
          <AuthPage 
            mode="signup" 
            onViewChange={handleViewChange} 
            onAuth={handleAuth}
          />
        )}
        
        {currentView === 'login' && (
          <AuthPage 
            mode="login" 
            onViewChange={handleViewChange} 
            onAuth={handleAuth}
          />
        )}
        
        {currentView === 'dashboard' && isAuthenticated && user && (
          <Dashboard 
            user={user} 
            onNotification={handleNotification}
          />
        )}
        
        {currentView === 'script' && isAuthenticated && user && (
          <Dashboard 
            user={user} 
            onNotification={handleNotification}
          />
        )}
        
        {currentView === 'about' && <AboutPage />}
        
        {currentView === 'admin' && isAuthenticated && isAdmin && (
          <AdminDashboard onNotification={handleNotification} />
        )}
      </main>
    </div>
  );
}

export default App;
