import { useState } from 'react'
import './App.css'
import Header from '../header/Header'
import TimeLine from '../timeline/Timeline'
import ActionButton from '../actionbutton/ActionButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <div className="page__content"> 
        <Header />
        <TimeLine />
        <ActionButton />

      </div>

    </div>
  )
}

export default App

// --- The main page of the app, still has to be styled and its but I was able to lay some of the groundwork for the timeline page with the little Node.js knowledge I know ---