import React from 'react'
import Marquee from '../utils/Marque'
import HeroShrink from './HeroShrink'

const Hero = () => {
  return (
    <div className='pt-12 bg-bg-contrast'>
       <HeroShrink />
        <Marquee className=""/>
    </div>
  )
}

export default Hero