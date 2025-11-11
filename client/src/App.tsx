import { Route, Switch } from 'wouter';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Me from './pages/Me';
import Terms from './pages/Terms';
import './videocall.css';
import './fancy-cards.css';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/auth" component={Auth} />
          <Route path="/register" component={Register} />
          <Route path="/me" component={Me} />
          <Route path="/terms" component={Terms} />
        </Switch>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
