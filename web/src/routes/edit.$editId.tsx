import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './edit.module.css'
import { Button } from '../components/Button/Button'
import { Menu } from '../components/Menu/Menu'

export const Route = createFileRoute('/edit/$editId')({
  component: RouteComponent,
    loader: async ({ params }) => {
    return (params.editId)
  },
})

type Visitation = {
  name: string;
  address: string;
  hour: string;
  date: string;
  description: string;
  evaluation: number;
}

function RouteComponent() {
  const [visitationInfo, setVisitationInfo] = useState<Visitation>({
    name: '',
    address: '',
    hour: '',
    date: '',
    description: '',
    evaluation: 0
  })
  const { editId } = Route.useParams()
  
  async function getVisitation() {
    try {
      const visitation = await axios.get(`http://localhost:8080/visitation/${editId}`)
      setVisitationInfo(visitation.data)
    } catch (error) {
      console.error('Error fetching visitation:', error)
    }
  }

  async function handleUpdateVisitation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8080/visitation/${editId}`, {
        name: visitationInfo.name,
        address: visitationInfo.address,
        hour: visitationInfo.hour,
        date: visitationInfo.date,
        description: visitationInfo.description,
        evaluation: visitationInfo.evaluation
      })
      alert('Visitation updated successfully!')
    } catch (error) {
      console.error('Error updating visitation:', error)
      alert('Failed to update visitation.')
    }
  }
  
  useEffect(() => {
    getVisitation()
  }, [])


  return (
      <main className={styles.container}>
        <Menu />
        <form onSubmit={handleUpdateVisitation} className={styles.form}>
          <label htmlFor="name">Name</label>
          <input id="name" autoComplete='on' type="text" placeholder='John Doe' value={visitationInfo.name} onChange={(e) => setVisitationInfo({
            ...visitationInfo,
            name: e.target.value
          })} />
          <label htmlFor="address">Address</label>
          <input id="address" autoComplete='off' type="text" placeholder='123 Main St, City, State' value={visitationInfo.address} onChange={(e) => setVisitationInfo({
            ...visitationInfo,
            address: e.target.value
          })} />
          <label htmlFor="description">Description</label>
          <input id="description" autoComplete='off' type="text" placeholder='Brief description of your visit' value={visitationInfo.description} onChange={(e) => setVisitationInfo({
            ...visitationInfo,
            description: e.target.value
          })} />
          <label htmlFor="evaluation">Description</label>
          <input id="evaluation" type="number" min={0} max={10} placeholder='Evaluate from 0 to 10' step={1} value={visitationInfo.evaluation} onChange={(e) => {
            const value = Math.min(10, Math.max(0, Number(e.target.value)));
            setVisitationInfo({
              ...visitationInfo,
              evaluation: value
            });
          }} />
          <Button>Update</Button>
        </form>
      </main>
  )
}
