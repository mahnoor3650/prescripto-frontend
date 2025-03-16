import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctor from '../components/topdoctor'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctor />
      <Banner />
    </div>
  )
}

export default Home
