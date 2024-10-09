import { Button } from '@/components/ui/button'
import { blogs } from '../news/data'

export default function MoreFromOvation() {
  return (
    <section className="container w-[75%] grid grid-cols-3 gap-x-[20px] gap-y-12 py-20 more-section">
      <div className="flex flex-col">
        <p className="font-heading font-bold text-2xl md:text-3xl section-header mb-4 ">
          More from ovation
        </p>

        <a href="/news" className="flex items-center gap-2">
          <Button className="text-sm  h-fit gap-2">Browse articles</Button>
        </a>
      </div>

      {blogs.map((blog, index) => (
        <a
          href={`/news/${blog.id}`}
          className="flex flex-col gap-6 h-auto w-fit max-w-[385px]"
          key={index}
        >
          <img
            src={`${blog.image}`}
            alt="Blog post"
            className="w-auto h-[247px]"
          />

          <div className="flex flex-col gap-[10px]">
            <p className="text-xl font-semibold">{blog.blogHeader}</p>
            <p className="text-sm text-lighter">{blog.blogDetails}</p>
          </div>
        </a>
      ))}
    </section>
  )
}
