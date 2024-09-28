import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
    <>
      <div className='w-screen relative h-[38rem]  overflow-hidden flex md:flex-row flex-col justify-center '>
        {/* left div  */}

        <div className='md:w-2/3 w-full md:h-full h-1/2 flex items-center flex-col justify-center  '>

          <p className='text-6xl font-semibold font-serif kanit-semibold'>Elevate Your University <br></br> Community Experience</p>
          <p className="text-lg text-gray-600 max-w-xl">
            The specialised community solution for leading schools and universities
          </p>
          <button className="bg-[#ff7e7e] hover:bg-[#ff6b6b] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            About us
          </button>

        </div>

        {/* right div  */}
        <div className='md:w-1/3 w-full md:h-full h-1/2 flex items-center justify-end mr-6'>
          <img className='w-96' src="/Home-Image.svg" alt="" /></div>
        <div>

        </div>
      </div>
      <div className="max-w-4xl mx-auto w-screen ">
        <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">

          <h3 className="text-5xl font-bold text-[#ff7e7e] mb-4">Campus Connect</h3>
          <p className="text-gray-700 mb-6 max-w-2xl">
            Join a vibrant community where you can connect with peers, share events, and collaborate on projects effortlessly.
          </p>
          <div className="flex justify-between items-end">
            <img
              src="/img1.png?height=150&width=200"
              alt="Students collaborating"
              className="w-48 h-auto"
            />
            <img
              src="/img2.png?height=100&width=150"
              alt="Digital interaction"
              className="w-36 h-auto"
            />
          </div>

        </div>
      </div>
      <div>

        <div className="max-w-4xl mx-auto my-auto mt-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-5xl font-bold text-[#ff7e7e] mb-1">Campus Sells</h3>
                <p className="text-gray-600 text-lg mb-2">Click 📸  AND SELL</p>
              </div>
              <img
                src="/img7.jpeg?height=100&width=150"
                alt="People in park"
                className="w-36 h-auto"
              />
            </div>
            <p className="text-gray-700 mb-6 max-w-2xl">
              Join a vibrant community where you can connect with peers, share events, and collaborate on projects effortlessly.
            </p>
            <div className="flex justify-between items-end">
              <img
                src="/img4.jpeg?height=80&width=80"
                alt="People icons"
                className="w-20 h-20 rounded-full bg-pink-200"
              />
              <img
                src="/img5.jpeg?height=150&width=250"
                alt="Campus building"
                className="w-64 h-auto mx-4"
              />
              <img
                src="/img6.jpeg?height=80&width=80"
                alt="Online shopping"
                className="w-20 h-20"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-4xl mx-auto mt-5 mb-3">
          <div className="bg-gray-50 rounded-3xl shadow-lg p-8 relative">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-bold text-lg">Campus-360</span>
              </div>
              <div>
                <h1 className='text-5xl'>➕</h1>
              </div>
              <div className="bg-white rounded-lg p-2 shadow">
                <span className="text-sm font-medium">Your college here</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <img
                src="/img8.jpeg?height=200&width=150"
                alt="Woman in red coat"
                className="w-1/3 rounded-lg"
              />
              <div className="w-1/3 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to level up your community strategy?</h2>
                <button className="bg-[#ff7e7e] hover:bg-[#ff6b6b] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                  Contact us
                </button>
              </div>
              <img
                src="/img9.jpeg?height=150&width=150"
                alt="Isometric community illustration"
                className="w-1/3"
              />
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Home