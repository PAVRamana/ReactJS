import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);

const render = () => {
  root.render(
        <App />
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./mocks/msw/browser').then(async (browserWorker) => {
    await browserWorker.worker.start({ onUnhandledRequest: 'bypass' });
    render();
  });
} else {
  render();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
