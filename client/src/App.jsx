import { useState } from 'react'
import { Footer, Navbar, Services, Transactions, Welcome, Header } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="z-10 min-h-screen main-gradient text-white font-lato w-screen">
      <div className='container mx-auto'>
        <Header />
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
      </div>
      <Footer />
    </div>
  )
}

export default App
