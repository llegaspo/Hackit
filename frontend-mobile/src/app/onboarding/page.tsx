'use client'

import { useEffect, useState } from 'react'
import styles from './onboarding.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [lang, setLang] = useState<'English' | 'Tagalog' | 'Bisaya'>('English')
  const [selected, setSelected] = useState<'option1' | 'option2' | null>(null)

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage')
    if (storedLang === 'Tagalog' || storedLang === 'Bisaya') {
      setLang(storedLang)
    }
  }, [])

  const t = {
    English: {
      title: 'Start by choosing your path:',
      option1: 'I already have a business',
      option2: 'I want to start a business',
      confirm: 'Confirm',
    },
    Tagalog: {
      title: 'Simulan sa pagpili ng iyong landas:',
      option1: 'May negosyo na ako',
      option2: 'Nais kong magsimula ng negosyo',
      confirm: 'Magpatuloy',
    },
    Bisaya: {
      title: 'Sugdi pinaagi sa pagpili sa imong dalan:',
      option1: 'Naa koy negosyo',
      option2: 'Gusto kong magsugod og negosyo',
      confirm: 'Padayon',
    },
  }

  const text = t[lang]

  const handleConfirm = () => {
    if (selected === 'option1') {
      router.push('/existing')
    } else if (selected === 'option2') {
      router.push('/start')
    }
  }

  return (
    <div className={`${styles.container} flex flex-col items-center justify-center`}>
      <div className={styles.blurBox}>
        

        {selected && (
          <div className={styles.imageWrapper}>
            <Image
              src={
                selected === 'option1'
                  ? '/assets/onbrd-op1.png'
                  : '/assets/onbrd-op2.png'
              }
              alt="Onboarding Option Image"
              width={120}
              height={200}
              priority
            />
          </div>
        )}
        <h2 className={styles.title}>{text.title}</h2>
        <div className={`${styles.squareWrapper} ${selected ? styles.moveDown : ''}`}>
          <div
            className={`${styles.square} ${selected === 'option1' ? styles.selected : ''}`}
            onClick={() => setSelected('option1')}
          >
            <p className={styles.text}>{text.option1}</p>
          </div>

          <div
            className={`${styles.square} ${selected === 'option2' ? styles.selected : ''}`}
            onClick={() => setSelected('option2')}
          >
            <p className={styles.text}>{text.option2}</p>
          </div>

          {selected && (
            <div className={styles.confirmSquare} onClick={handleConfirm}>
              <p className={styles.confirmText}>{text.confirm}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
