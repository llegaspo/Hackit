'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './language.module.css'

export default function Language() {
  const router = useRouter()
  const [selectedLang, setSelectedLang] = useState<'English' | 'Tagalog' | 'Bisaya' | null>(null)

  const translations = {
    English: {
      title: 'Set Preferred Language:',
      confirm: 'Confirm',
    },
    Tagalog: {
      title: 'Itakda ang Gustong Wika:',
      confirm: 'Magpatuloy',
    },
    Bisaya: {
      title: 'Pislita ang Ganahan na Pinulongan:',
      confirm: 'Padayun',
    },
  }

  const handleConfirm = () => {
    if (selectedLang) {
      localStorage.setItem('preferredLanguage', selectedLang)
      router.push('/onboarding')
    }
  }

  const currentText = translations[selectedLang || 'English']

  return (
    <div className={`${styles.container} flex flex-col items-center justify-center`}>
      <div className={styles.blurBox}>
        <h2 className={styles.title}>{currentText.title}</h2>

        <div className={styles.squareWrapper}>
          {(['English', 'Tagalog', 'Bisaya'] as const).map((lang) => (
            <div
              key={lang}
              className={`${styles.square} ${selectedLang === lang ? styles.selected : ''}`}
              onClick={() => setSelectedLang(lang)}
            >
              <p className={styles.text}>{lang}</p>
            </div>
          ))}

          {selectedLang && (
            <div className={styles.confirmSquare} onClick={handleConfirm}>
              <p className={styles.confirmText}>{currentText.confirm}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
