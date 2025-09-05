import { useEffect, useState } from "react"


const useDebounce=(search,delay=300)=>{

    const [value, setValue] = useState(search)

    useEffect(() => {
      let timer=null
      timer=setTimeout(()=>{
        setValue(search)
      },delay)
      return()=>clearTimeout(timer)
    }, [search,delay])
    
    return value

}

export default useDebounce