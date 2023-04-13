import React, { useEffect, useState } from 'react'
import { styles } from '../styles'
import { motion } from 'framer-motion'
import { DuckCanvas } from './canvas'
import TextTransition, { presets } from 'react-text-transition'

const TEXTS = [
    'Coffee Addict',
    'Software Engineer',
    'Duck Enthusiast',
    'Swing Trader',
    '"Comedian"',
]

const ScrambleText = ({ className }) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const originalText = "Hi, I'm Kendrick"
    const [text, setText] = useState(originalText)
    const [intervalId, setIntervalId] = useState(null)

    const handleMouseOver = () => {
        console.log('mouse detected')
        let iteration = 0

        clearInterval(intervalId)

        const newInterval = setInterval(() => {
            setText((currentText) =>
                currentText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index]
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join('')
            )

            if (iteration >= originalText.length) {
                clearInterval(newInterval)
            }

            iteration += 1 / 3
        }, 30)

        setIntervalId(newInterval)
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        }
    }, [intervalId])

    return (
        <h1
            onMouseEnter={handleMouseOver}
            className={className}
            style={{ userSelect: 'auto' }}
        >
            {text}
        </h1>
    )
}

const Hero = () => {
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2000
        )
        const mediaQuery = window.matchMedia('(max-width:500px)')
        setIsMobile(mediaQuery.matches)
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches)
        }
        mediaQuery.addEventListener('change', handleMediaQueryChange)

        return () => {
            clearTimeout(intervalId)
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])
    return (
        <section className="relative w-full h-screen mx-auto">
            <div
                className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
            >
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-[#829edd]"></div>
                    <div className="w-1 sm:h-80 h-40 teal-gradient"></div>
                </div>
                <div className="z-20">
                    <ScrambleText
                        className={`${styles.heroHeadText} text-white`}
                    />
                    <h1
                        className={`font-black text-[#829edd] lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2`}
                    >
                        <TextTransition springConfig={presets.stiff}>
                            {TEXTS[index % TEXTS.length]}
                        </TextTransition>
                    </h1>
                    <h2
                        className={`font-black text-white lg:text-[40px] sm:text-[30px] xs:text-[25px] text-[25px] lg:leading-[98px] ${
                            isMobile ? 'mt-14' : ''
                        }`}
                    >
                        based in Perth, Australia
                    </h2>
                    <h2>WEBSITE UNDER CONSTRUCTION</h2>
                </div>
            </div>
            <DuckCanvas />
            <div className="absolute xs:bottom-10 bottom-14 w-full flex justify-center items-center">
                <a href="#about">
                    <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                            className="w-3 h-3 rounded-full bg-secondary mb-1"
                        />
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Hero
