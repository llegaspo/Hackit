'use client'

import styles from './splash.module.css'
import Image from 'next/image'

export default function Splash() {
  return (
    <div className={`${styles.container} flex flex-col items-center justify-center`}>
      <Image
        src="/assets/logo1.png"
        alt="PALengkeLogo"
        width={266}
        height={223}
        priority
      />

      <Image
        src="/assets/palengke.png"
        alt="PALengke typography"
        width={208}
        height={50}
      />
    </div>

  )
}
