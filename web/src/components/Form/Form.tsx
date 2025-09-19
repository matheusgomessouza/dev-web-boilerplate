import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.css';

export function Form() {
  const [visitationData, setVisitationData] = useState<{
    name: string;
    address: string
    hour: string
    date:  string
    description: string
    evaluation: number
  }>({
    name: '',
    address: '',
    hour: '',
    date: '',
    description: '',
    evaluation: 0
  });
  
  async function handleCreateVisitation(e: React.FormEvent<HTMLFormElement>) {
    const date = new Date();
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/visitation', {
        name: visitationData.name,
        address: visitationData.address,
        hour: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
        date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
        description: visitationData.description,
        evaluation: visitationData.evaluation
      });
      
      console.log('Visitation created:', response.data);
      alert('Visitation created successfully!');

      setVisitationData({
        name: '',
        address: '',
        hour: '',
        date: '',
        description: '',
        evaluation: 0
      });
    } catch (error) {
      console.error('Error creating visitation:', error);
      alert('Failed to create visitation.');
    }
  }

  return (
    <form onSubmit={handleCreateVisitation} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input required id="name" autoComplete='on' type="text" placeholder='John Doe' value={visitationData.name} onChange={(e) => setVisitationData({
          ...visitationData,
          name: e.target.value
        })} />
        <label htmlFor="address">Address</label>
        <input required id="address" autoComplete='off' type="text" placeholder='123 Main St, City, State' value={visitationData.address} onChange={(e) => setVisitationData({
          ...visitationData,
          address: e.target.value
        })} />
        <label htmlFor="description">Description</label>
        <input required id="description" autoComplete='off' type="text" placeholder='Brief description of your visit' value={visitationData.description} onChange={(e) => setVisitationData({
          ...visitationData,
          description: e.target.value
        })} />
        <label htmlFor="evaluation">Description</label>
        <input required id="evaluation" type="number" min={0} max={10} placeholder='Evaluate from 0 to 10' step={1} value={visitationData.evaluation} onChange={(e) => {
          const value = Math.min(10, Math.max(0, Number(e.target.value)));
          setVisitationData({
            ...visitationData,
            evaluation: value
          });
        }} />
        <Button>Submit</Button>
      </form>
  )
}