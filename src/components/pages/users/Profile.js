import { useEffect, useState } from "react"
import axios from "axios"

export default function Profile({currentUser, handleLogut}){
    // state for user profile msg
    const [msg, setMsg] = useState(" ")

    // use effect gets user data and checks auth
    useEffect (()=>{
        const fetchData = async ()=>{
            try{
            // get token from local storage
            const token = localStorage.get("jwt")
            // make auth headers
            const options = {
                headers:{
                    "Authorization": token
                }
            }
            // hit auth lock endpoint
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)

            // set user welcome msg
            setMsg(response.data.msg)

            }catch(err){
                console.warn(err)
                if(err.response){
                    if(err.response.status === 401){
                        handleLogut()
                    }
                }
            }
        }
        fetchData()
    }, [])
   
    return(
        <div>
            <h1> Welcome {currentUser.name} </h1>
        </div>
    )
}