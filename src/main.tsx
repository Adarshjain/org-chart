import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './styles/index.css'
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from "./store/store.ts";
import { createMockServer } from "./mock-server.ts";

createMockServer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
