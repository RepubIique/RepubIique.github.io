import React from 'react'

import { PhysicsSimulation } from './canvas'
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'

const Tech = () => {
    return <PhysicsSimulation />
}

export default SectionWrapper(Tech, '')
