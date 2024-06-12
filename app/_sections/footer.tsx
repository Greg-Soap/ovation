export default function Footer() {
  return (
    <footer className="container flex flex-wrap justify-between w-[90%] py-10 border-t px-0">
      <div className="flex flex-col gap-10 footer-left">
        <img
          src="/assets/images/logo/logo.png"
          width={250}
          height={40}
          alt="logo"
          className="-ml-10"
        />

        <p>© 2024 Ovation Technologies.</p>
      </div>

      <div className="flex items-stretch justify-between gap-7 w-[60%] h-fit footer-right">
        <div className="flex flex-col gap-6 footer-left">
          <p className="font-heading text-primary-foreground text-xl">
            Contact
          </p>
          <p>hello@ovation.network</p>
        </div>

        <div className="flex flex-col gap-6 footer-left">
          <p className="font-heading text-primary-foreground text-xl">
            Support
          </p>

          <div className="flex flex-col gap-3">
            <p>Terms of service</p>
            <p>Privacy policy</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 footer-left">
          <p className="font-heading text-primary-foreground text-xl">
            Socials
          </p>

          <div className="flex gap-3 w-fit">
            <img src="assets/images/footer/footer1.png" alt="" />
            <img src="assets/images/footer/footer2.png" alt="" />
            <img src="assets/images/footer/footer3.png" alt="" />
            <img src="assets/images/footer/footer4.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}