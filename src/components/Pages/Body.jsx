import React from 'react'
import MainSlider from './Homepage/MainSlider'
import Category from './Homepage/Category'
import LatestSection from './Homepage/LatestSection'
import JewellerySection from './Homepage/JewellerySection'
import ShopGenSection from './Homepage/ShopGenSection'
import Login from './Authentication/Login'
import Footer from '../Footer/Footer'

const Body = () => {
  return (
    <>
      <Category />
      <MainSlider />
      <LatestSection />
      <JewellerySection />
      <ShopGenSection />
    </>
  )
}

export default Body