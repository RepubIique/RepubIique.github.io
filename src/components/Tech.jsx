import React from 'react'

import { PhysicsSimulation } from './canvas'
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'

const Tech = () => {
    return (
        // <div className="flex flex-row flex-wrap justify-center gap-10">
        //     {technologies.map((technology) => (
        //         <div className="w-28 h-28" key={technology.name}>
        //             <PhysicsSimulation icon={technology.icon} />
        //         </div>
        //     ))}
        // </div>
        <PhysicsSimulation />
    )
}

export default SectionWrapper(Tech, '')
