'use client'

import { useState } from 'react'
import styles from './existInventory.module.css'
import { useRouter } from 'next/navigation'


interface Product {
  id: string
  name: string
  pcs: number
  cost: number
  price: number
  image: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Fishball',
    pcs: 100,
    cost: 0.5,
    price: 1,
    image: '/assets/fishball.png',
  },
  {
    id: '2',
    name: 'Kwek-Kwek',
    pcs: 50,
    cost: 1,
    price: 2,
    image: '/assets/kwek-kwek.png',
  },
  {
    id: '3',
    name: 'Gulay',
    pcs: 30,
    cost: 5,
    price: 10,
    image: '/assets/gulay.png',
  },
]


export default function ExistingInventoryPage() {
  const router = useRouter()


  return (
    <div className={styles.container}>
      <img
        src="/assets/arrowleft.png"
        alt="Back"
        className={styles.backArrow}
        onClick={() => router.push('/vendors')} 
      />

      <h1 className={styles.title}>Let's set you up!</h1>
      <p className={styles.subheading}>Start by listing your existing products.</p>

      <div className={styles.blurBox}>
        <div className={styles.scrollArea}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(product)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === 'name' ? value : +value })
  }

  const handleSave = () => setIsEditing(false)
  const handleCancel = () => {
    setFormData(product)
    setIsEditing(false)
  }

  return (
    <div className={styles.productCard}>
      {!isEditing ? (
        <>
          <img src={product.image} alt={product.name} className={styles.image} />
          <div className={styles.info}>
            <h3>{product.name}</h3>
            <p>{product.pcs} pcs</p>
            <p>Cost: ₱{product.cost}</p>
            <p>Total: ₱{product.pcs * product.cost}</p>
            <p>Price/pc: ₱{product.price}</p>
          </div>
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <input type="file" name="image" />
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="pcs" type="number" value={formData.pcs} onChange={handleChange} />
          <input name="cost" type="number" value={formData.cost} onChange={handleChange} />
          <input name="price" type="number" value={formData.price} onChange={handleChange} />
          <div className={styles.actions}>
            <button className={styles.delete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      )}
    </div>
  )
}
