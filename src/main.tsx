import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/auth-provider';
import { ThemeProvider } from './contexts/theme-provider';
import './index.css';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>,
);
