import { createFileRoute } from '@tanstack/react-router'
import { Form } from '../components/Form/Form';
import styles from './index.module.css'
import { Menu } from '../components/Menu/Menu';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return    (
    <main className={styles.main}>
      <Menu />
      <Form />
    </main>
  )
}
