import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"

    if (charAllowed) str += "!@#$%^&*()_+{}`~<>?,';:"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() =>{
    passwordGenerator()
  }, [length,numAllowed,charAllowed,passwordGenerator])

  return (
    <div className='bg-black w-screen h-screen pt-10 flex justify-center'>
      <div className='bg-gray-600 h-[230px] w-[500px] rounded-md flex items-center flex-col gap-10'>
        <div className='text-white text-xl pt-6'>Password Generator</div>
        <div className='flex gap-2'>
          <input type="text" value={password} readOnly placeholder="password" className="input input-bordered w-[400px]"  ref={passwordRef} />
          <button className='btn btn-info' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex gap-6 text-white'>
            <input type="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label> Length {length}</label>

          <div>
            <input type="checkbox" defaultChecked={numAllowed} id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label htmlFor="numberInput"> Numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={charAllowed} id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label htmlFor="characterInput"> Characters </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
