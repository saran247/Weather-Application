import React from 'react'
import Myapp from './components/Myapp'
import CloudBG from './assets/bg.jpg'
const App = () => {
  return (
    <div className='app'
    style={{ backgroundImage: `url(${CloudBG})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
>
        <Myapp/>
    </div>
  )
}

export default App