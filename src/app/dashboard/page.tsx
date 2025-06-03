'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const router = useRouter();

    const [user, setUser] = useState([])

    async function logout() {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/');
    }

    useEffect(()=>{
        async function resprofile() {
            try {
                const res = await fetch("./api/profile", {
                    method:"GET",
                })
                const data = await res.json()
                setUser(data.profile)

            }
            catch{

            }
        }
        resprofile()
    }, [])

    return (    
        <div>
            <h2>Bem vindo {user}</h2>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={()=>router.push("/dashboard/profile")}>area profile</Button>
        </div>
    )
}