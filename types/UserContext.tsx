import React from 'react'

type AuthUser = {
  name: string
  email: string
}

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

type UserContextProviderProps = {
  children: React.ReactNode
}

export const UserContext = React.createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = React.useState<AuthUser | null>(null)

  // @ts-expect-error
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
