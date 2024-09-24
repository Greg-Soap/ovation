import { getUserId } from '@/lib/helper-func'
import FriendList from './_components/friend-lists'

export default function Page() {
  const userId = getUserId()
  console.log({ userId })
  return (
    <>
      <section className="w-full flex lg:grid grid-cols-3 bg-[#111115] other-link">
        <FriendList />
      </section>
    </>
  )
}
