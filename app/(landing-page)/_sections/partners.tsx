/* eslint-disable @next/next/no-img-element */
export default function Partners() {
  return (
    <div className="container flex flex-col items-center max-w-5xl w-full">
      <p className="text-sm font-semibold text-center uppercase">
        On your screen via
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-5 my-7 w-full ">
        {partnersImg.map((partner) => (
          <div
            key={partner.alt}
            className="h-[90px] flex items-center justify-center"
          >
            <img src={partner.src} className="h-[60px]" alt={partner.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}

const partnersImg = [
  {
    src: 'assets/images/partners/1.png',
    alt: 'fox',
  },
  {
    src: 'assets/images/partners/4.png',
    alt: 'usa today',
  },
  {
    src: 'assets/images/partners/3.png',
    alt: 'market watch',
  },
  {
    src: 'assets/images/partners/2.png',
    alt: 'digital journal',
  },
]
