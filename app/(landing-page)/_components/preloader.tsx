/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const style = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const variants = {
  start: {
    scale: 0.1,
  },
  end: {
    scale: 0.5,
  },
}

const bg = {
  start: {
    backgroundColor: '#C1FE17',
  },
  end: {
    backgroundColor: '#0B0A10',
  },
}

export default function Loader() {
  return (
    <motion.div
      variants={bg}
      style={style}
      initial={'start'}
      animate={'end'}
      transition={{
        repeatType: 'reverse',
        ease: 'anticipate',
        duration: 2,
        delay: 0,
      }}
    >
      <motion.div
        style={style}
        variants={variants}
        initial={'start'}
        animate={'end'}
        transition={{
          repeatType: 'reverse',
          ease: 'anticipate',
          duration: 2,
          delay: 0,
        }}
      >
        <img src="/assets/images/logo/logo.png" className="w-full" alt="logo" />
      </motion.div>
    </motion.div>
  )
}
