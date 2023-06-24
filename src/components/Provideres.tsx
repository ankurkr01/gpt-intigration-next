"use client"

import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

interface ProvideresProps {
    children:ReactNode
  
}

const Provideres: FC<ProvideresProps> = ({children}) => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Provideres