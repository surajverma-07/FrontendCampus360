import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
    <div className='w-screen relative h-[38rem]  overflow-hidden flex md:flex-row flex-col justify-center '>
      {/* left div  */}

      <div className='md:w-2/3 w-full md:h-full h-1/2 flex items-center flex-col justify-center  '>

        <p className='text-6xl font-semibold font-serif kanit-semibold'>Elevate Your University <br></br> Community Experience</p>
        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam esse unde adipisci, quos iste aliquam suscipit error quam consectetur expedita et quae autem? Eligendi expedita quam quod necessitatibus at esse.</p>

      </div>

      {/* right div  */}
      <div className='md:w-1/3 w-full md:h-full h-1/2 flex items-center justify-end mr-6'>
        <img className='w-96' src="/Home-Image.svg" alt="" /></div>
    </div>
  )
}

export default Home