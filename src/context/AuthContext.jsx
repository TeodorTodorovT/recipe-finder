import { createContext, useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

export const AuthContext = createContext({ user: null })

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
            }
        })
	}, [])

	return (
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	)
}