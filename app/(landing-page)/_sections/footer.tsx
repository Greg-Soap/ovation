import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { LinkedinIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="container flex flex-wrap justify-between w-[90%] py-10 border-t border-[#FFFFFF80] px-0">
      <div className="flex flex-col gap-10 footer-left">
        <a href="/" rel="noreferrer">
          <img
            src="/assets/images/logo/logo.png"
            width={250}
            height={40}
            alt="logo"
            className="-ml-10"
          />
        </a>

        <p className="text-gray">© 2024 Ovation Technologies.</p>
      </div>

      <div className="flex items-stretch justify-end gap-10 w-[60%] h-fit footer-right">
        {/* <div className="flex flex-col gap-6 footer-left">
					<p className="font-heading text-primary-foreground text-xl">
						Contact
					</p>
					<p>hello@ovation.network</p>
				</div> */}

        <div className="flex flex-col gap-6 footer-left">
          <p className="font-heading text-xl">Support</p>

          <div className="flex flex-col gap-3 text-gray">
            <a
              href="https://ovationnetwork.notion.site/Ovation-Terms-of-Service-4f90f9d4f85c4e95bdd28c47e187323c"
              target="_blank"
              rel="noreferrer"
            >
              Terms of service
            </a>
            <a
              href="https://ovationnetwork.notion.site/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy policy
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 footer-left">
          <p className="font-heading text-xl">Socials</p>

          <div className="flex gap-3 w-fit">
            <a
              href="https://www.linkedin.com/company/ovationnetwork/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[#272727]">
                <LinkedinIcon size={18} color="white" />
              </div>
            </a>
            <a
              href="http://discord.gg/E3gZdW727H"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[#272727]">
                <DiscordLogoIcon width={18} height={18} color="white" />
              </div>
            </a>
            <a
              href="https://x.com/Ovation_Network?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/assets/images/footer/footer3.png"
                alt=""
                className="w-8 h-8"
              />
            </a>
            {/* <a
              href="https://opensea.io/collection/founder-nfts"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/assets/images/footer/footer5.png"
                alt=""
                className="w-8 h-8 rounded-full"
              />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
