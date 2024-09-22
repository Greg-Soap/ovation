import FriendList from './_components/friend-lists'

export default function Page() {
  return (
    <>
      <section className='w-full flex lg:grid grid-cols-3 bg-[#111115] other-link'>
        <FriendList />
      </section>
    </>
  )
}
