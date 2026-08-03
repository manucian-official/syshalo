import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { HelmetProvider } from 'react-helmet-async';

// Safeguard against getter-only window.fetch assignment in sandboxed browser environments
(function patchFetchSetter() {
  try {
    let _fetch = window.fetch;
    const proto = Object.getPrototypeOf(window);
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch') || (proto ? Object.getOwnPropertyDescriptor(proto, 'fetch') : null);
    if (!desc || (desc.get && !desc.set)) {
      Object.defineProperty(window, 'fetch', {
        get: () => _fetch,
        set: (v) => { _fetch = v; },
        configurable: true,
        enumerable: true
      });
    }
  } catch {
    // ignore if non-configurable
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>,
);
