import { useContext } from "react"
import useAuth from "./useAuth"
interface AuthDataType {
    user: string;
    roles: number[];
  }
  
function useRefreshToken() {
    const [setAuth] = useAuth()
    const refresh = async ()=>{
        //send this token to refersh
        const response = {
            data:{
                accessToken:"111",
            }
        }
        setAuth((prev: AuthDataType)=>{
            console.log(JSON.stringify(prev));
            return [...prev,response.data.accessToken]
        })
    }
 
  return (
    <div>
      
    </div>
  )
}

export default useRefreshToken
