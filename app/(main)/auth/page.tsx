"use client"
import Login from "@/components/auth/Login"
import Register from "@/components/auth/Register"
import { useState } from "react"


export default function page() {
    const [currentMode, setCurrentMode] = useState('login')
    return currentMode === 'login' ? <Login changeMode={setCurrentMode} /> : <Register changeMode={setCurrentMode} />
}
