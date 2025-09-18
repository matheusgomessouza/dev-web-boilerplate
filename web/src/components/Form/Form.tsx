import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.css';

export function Form() {
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
    <form onSubmit={handleCreateUser} className={styles.form}>
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
        <Button>Submit</Button>
      </form>
  )
}