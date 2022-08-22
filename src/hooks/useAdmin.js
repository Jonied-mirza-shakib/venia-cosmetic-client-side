import { useEffect, useState } from "react"

const useAdmin = user => {
const [admin,setAdmin]=useState(false);
useEffect(()=>{

},[user])
return[admin]
}

export default useAdmin;