import './assets/css/app.css';
import 'reflect-metadata';

import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const isSSR = container.hasChildNodes();

const app = (
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

if (isSSR) {
  hydrateRoot(container, app);
} else {
  const root = createRoot(container);
  root.render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
