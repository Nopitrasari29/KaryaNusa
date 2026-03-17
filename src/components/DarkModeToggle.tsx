import { useEffect, useState } from "react"

export default function DarkModeToggle() {

  const [dark,setDark] = useState(false)

  useEffect(()=>{

    const saved = localStorage.getItem("darkmode")

    if(saved==="true"){

      document.documentElement.classList.add("dark")
      setDark(true)

    }

  },[])

  const toggle = ()=>{

    const newMode = !dark

    setDark(newMode)

    if(newMode){

      document.documentElement.classList.add("dark")

    }else{

      document.documentElement.classList.remove("dark")

    }

    localStorage.setItem("darkmode",String(newMode))

  }

  return(

    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 bg-white dark:bg-gray-800 shadow px-4 py-2 rounded-full"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>

  )
}