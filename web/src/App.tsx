import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  }>({
    name: '',
    email: ''
  });

  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users', {
        name: userData.name,
        email: userData.email,
      });
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder='John Doe' value={userData.name} onChange={(e) => setUserData({
          ...userData,
          name: e.target.value
        })} />
        <br />
        <label htmlFor="email">Email</label>
        <input id="email" type="text" placeholder='mail@mail.com' value={userData.email} onChange={(e) => setUserData({
          ...userData,
          email: e.target.value
        })} /><br />
        <button type="submit">Submit</button>
      </form>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
