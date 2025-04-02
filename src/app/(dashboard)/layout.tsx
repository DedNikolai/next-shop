export const metadata = {
    title: 'Next Shop Dashboard',
    description: 'Next Shop admin dashboard',
  }
  
  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main>{children}</main>
    )
  }
  