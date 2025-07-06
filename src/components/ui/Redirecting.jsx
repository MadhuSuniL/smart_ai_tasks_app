import React, { useEffect } from 'react'
import { motion } from "framer-motion";

const Redirecting = ({
  message = 'Redirecting',
  to = '/chat'
}) => {

  const reflectAnimation = {
    hidden: { opacity: 0.4 },
    visible: (i) => ({
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.08,
      },
    }),
  };

  useEffect(() => {
    setTimeout(() => {
      window.location.href = to
    }, 2000)

  }, [])

  return (
    <div className='h-full flex justify-center items-center'>
      <motion.div className="text-lg font-semibold text-main flex space-x-1">
        {message?.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={reflectAnimation}
            initial="hidden"
            animate="visible"
            className="inline-block text-sm text-body"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default Redirecting