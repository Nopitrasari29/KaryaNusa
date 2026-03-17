import { useEffect } from "react"

type Props={
  progress:number
}

export default function RoadmapReminder({progress}:Props){

  useEffect(()=>{

    if(progress<4){

      const timer=setTimeout(()=>{

        alert("Jangan lupa lanjutkan roadmap bisnismu!")

      },20000)

      return()=>clearTimeout(timer)

    }

  },[progress])

  return null
}