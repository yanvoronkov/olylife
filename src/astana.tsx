import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AstanaApp } from './AstanaApp';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не найден корневой элемент #root в документе astana/index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <AstanaApp />
  </StrictMode>
);
