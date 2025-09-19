import { createFileRoute, Link } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './list.module.css'
import { Menu } from '../components/Menu/Menu'

export const Route = createFileRoute('/list')({
  component: RouteComponent,
})

type Visitation = {
  id: number;
  name: string;
  address: string;
  hour: string;
  date: string;
  description: string;
  evaluation: number;
}

function RouteComponent() {
  const [visitations, setVisitations] = useState<Visitation[]>([]);

  async function getVisitations() {
    const visitations = await axios.get('http://localhost:8080/visitation')
    setVisitations(visitations.data)
  }

  useEffect(() => {
    getVisitations()
  }, []);

  return (
    <main className={styles.container}>
      <Menu />
      <h1 className={styles.title}>List of visitations</h1>
      {visitations.map((visitation) => (
        <div key={visitation.id} className={styles.visitationCard}>
          <p><strong>Name:</strong> {visitation.name}</p>
          <p><strong>Address:</strong> {visitation.address}</p>
          <p><strong>Date:</strong> {visitation.date}</p>
          <p><strong>Hour:</strong> {visitation.hour}</p>
          <p><strong>Description:</strong> {visitation.description}</p>
          <p><strong>Evaluation:</strong> {visitation.evaluation}</p>
          <div className={styles.actions}>
            <Link 
              to="/edit/$editId" 
              params={{ editId: String(visitation.id) }}
              className={styles.editLink}
            >
              Update Visitation
            </Link>
            <button
              type='button'
              onClick={async () => {
                await axios.delete(`http://localhost:8080/visitation/${visitation.id}`);
                await getVisitations();
              }}
              className={styles.deleteButton}>
              X
            </button>

          </div>
        </div>
      ))}
    </main>
  )
}
