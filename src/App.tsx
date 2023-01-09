import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { store } from './store';

export function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:itemId" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
