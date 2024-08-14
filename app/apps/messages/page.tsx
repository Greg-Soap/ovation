import FriendList from '../_sections/_messages/friend-lists'

export default function page() {
  return (
    <>
      <section className="w-full flex lg:grid grid-cols-3 bg-[#111115] other-link">
        <FriendList />
      </section>
    </>
  )
}
