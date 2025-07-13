'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './vendors.module.css'
import  Image  from 'next/image';

export default function Vendors() {
  const router = useRouter()
  const [storeName, setStoreName] = useState('')

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's get to know each other, Ate!</h1>

      <label className={styles.label}>Store Name</label>
      <input
        type="text"
        className={styles.input}
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="Enter store name"
      />

      <p className={styles.text}>What is your existing store?</p>

      <div className={styles.storeOptions}>
        <div className={styles.square}>
        
                <img src="/assets/sari.png"
                alt="Sari-sari store"/>
            <p className={styles.text}>sari-sari</p>
        </div>
        <div className={styles.square}>
            <img src="/assets/gulayan.png"
                alt="Sari-sari store"/>
            <p className={styles.text}>gulayan</p>
        </div>
        <div className={styles.square}>
            <img src="/assets/bakery.png"
                alt="Sari-sari store"/>
            <p className={styles.text}>bakery</p>
        </div>
        <div className={styles.square}>
            <img src="/assets/foodstall.png"
                alt="Sari-sari store"/>
            <p className={styles.text}>foodstall</p>
        </div>
        <div className={styles.square}>
            <img src="/assets/butchery.png"
                alt="Sari-sari store"/>
            <p className={styles.text}>butcher</p>
        </div>
      </div>

      <button className={styles.confirmButton}>Confirm</button>
    </div>
  )
}
