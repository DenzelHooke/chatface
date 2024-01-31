import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Layout = ({children}: {children: any}) => {
  return (
    <div className="layout">
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </div>
  )
}

export default Layout