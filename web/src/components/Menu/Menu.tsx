import { Link } from "@tanstack/react-router";
import styles from './Menu.module.css';

export function Menu() {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <Link to="/" className={styles.menuItem}>Home</Link>
        <Link to="/list" className={styles.menuItem}>Visitations</Link>
      </ul>
    </nav>
  )
}