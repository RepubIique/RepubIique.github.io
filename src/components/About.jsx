import React from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services } from '../constants'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { React3d } from './canvas/React'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const ServiceCard = ({ index, title, icon }) => (
    <Tilt className="xs:w-[250px] w-full">
        <motion.div
            variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
            className="w-full teal-yellow-gradient p-[1px] rounded-[20px] shadow-card"
        >
            <div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
                {services.map((service, i) => (
                    <Canvas key={i} className="w-full">
                        <OrbitControls
                            autoRotate
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                        />
                        <spotLight
                            position={[1, 2, 2]}
                            angle={0.2}
                            penumbra={3}
                            intensity={0.8}
                        />
                        {service.title == 'React Developer' && <React3d />}
                        {/* Add more conditions for other icons here */}
                    </Canvas>
                ))}
                <h3 className="text-white text-[20px] font-bold text-center">
                    {title}
                </h3>
            </div>
        </motion.div>
    </Tilt>
)

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Overview.</h2>
            </motion.div>

            <motion.p
                variants={fadeIn('', '', 0.1, 2)}
                className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
                I am a software engineer with a passion for developing clean,
                efficient and innovative solutions. I specialize in languages
                like Typescript, JavaScript and Java, and am proficient in using
                frameworks such as React and Angular. I have extensive
                experience in developing robust and scalable backend systems
                using Node.js with PostgreSQL. As a quick learner and team
                player, I am committed to collaborating with my colleagues to
                solve real-world problems and deliver high-quality software
                products. I am always looking to expand my skillset and stay
                up-to-date with the latest industry trends and technologies. I
                am excited to showcase my work and share my knowledge with
                others in the field.
            </motion.p>

            <div className="mt-20 flex flex-wrap gap-10">
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.title}
                        index={index}
                        {...service}
                    />
                ))}
            </div>
        </>
    )
}

export default SectionWrapper(About, 'about')
