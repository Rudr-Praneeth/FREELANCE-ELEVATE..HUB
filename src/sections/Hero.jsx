import React from 'react'
import Marquee from '../utils/Marque'
import HeroShrink from './HeroShrink'

const Hero = () => {
  return (
    <div className='bg-bg-contrast overflow-x-hidden'>
       <HeroShrink />
        <Marquee className=""/>
    </div>
  )
}

export default Hero