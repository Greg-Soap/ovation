export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="other-link w-full flex flex-col overflow-auto">
        {children}
      </section>
    </>
  )
}
