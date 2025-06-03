'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const router = useRouter();

    const [user, setUser] = useState("")
    const [credits, setCredits] = useState(0)

    useEffect(()=>{

        async function resprofile(){
            try {
                const res = await fetch("../../api/profile", {
                    method:"GET",
                })
                const data = await res.json()
                setUser(data.profile)

                const res2= await fetch("../../api/credits", {
                    method:"GET"
                })
                const data2 = await res2.json()
                setCredits(data2.credits)

            }
            catch(error){
                console.log("error", error)
            }
        }
        
        resprofile()
    }, [])

    return (
        <div>
            <h2>area profile {user}</h2>
            <h2>tem {credits || 0} de creditos</h2>
            <Button onClick={()=>router.push("/dashboard")}>voltar a dashboard</Button>
        </div>
    )
}