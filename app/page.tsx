'use client'

import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div>Anton Arbus</div>
      <Link href="/posts" prefetch={false} className={styles.homeButton}>
        Posts
      </Link>
    </div>
  )
}
