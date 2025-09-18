import { createFileRoute } from '@tanstack/react-router'
import { Form } from '../components/Form/Form';
import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return    (
    <main className={styles.main}>
      <Form />
    </main>
  )
}
