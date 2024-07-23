import PageHeader from "@/components/header";

export default function Layout({children}) {
  return (
  <>
    <PageHeader className="mt-8" />
    <main>{children}</main>
    
  </>
  )
}