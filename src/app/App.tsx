import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';

const PASSWORD = 'spongebob1428';

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
  return localStorage.getItem('unlocked') === 'true';
});
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === PASSWORD) {
      localStorage.setItem('unlocked', 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (!unlocked) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        background: '#0f0f0f',
        color: '#fff',
        gap: '16px'
      }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 400, letterSpacing: '0.1em' }}>
          This site is password protected
        </h1>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter password"
          style={{
            padding: '10px 16px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: error ? '1px solid #ff4444' : '1px solid #333',
            background: '#1a1a1a',
            color: '#fff',
            outline: 'none',
            width: '260px'
          }}
        />
        {error && <p style={{ color: '#ff4444', fontSize: '0.85rem', margin: 0 }}>Incorrect password</p>}
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 24px',
            fontSize: '0.95rem',
            borderRadius: '6px',
            border: 'none',
            background: '#fff',
            color: '#0f0f0f',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}