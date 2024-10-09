/* eslint-disable @next/next/no-img-element */

interface ArticleSectionProps {
  header?: string
  content?: string
  list?: Array<{ header?: string; details?: string }>
  link?: Array<{ name?: string; url: string }>
  image?: string
}

export function ArticleSection({
  header,
  content,
  list,
  link,
  image,
}: ArticleSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {header && (
        <p className="text-[28px] font-semibold  leading-[42px]">{header}</p>
      )}
      {content && <p className="text-gray text-xl">{content}</p>}
      {list && (
        <ul className="list-decimal list-inside">
          {list.map((item, index) => (
            <li key={index} className="mb-4">
              {item.header && (
                <span className=" text-[22px] font-medium inline">
                  {item.header}
                </span>
              )}
              {item.header ? (
                <p className="text-gray text-lg leading-[33px]">
                  {item.details}
                </p>
              ) : (
                <span className="text-gray text-lg leading-[33px]">
                  {item.details}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {link && (
        <div className="flex flex-col gap-2">
          {link.map((l) => (
            <a href={l.url} key={l.name} target="_blank" rel="noreferrer">
              {l.name}
            </a>
          ))}
        </div>
      )}
      {image && <img src={image} alt="ovation article" />}
    </div>
  )
}
