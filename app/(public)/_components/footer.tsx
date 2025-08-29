import { Logo } from "@/components/logo";
import { IconBrandLinkedin, IconBrandTelegram } from "@tabler/icons-react";
import Link from "next/link";

const links = [
  {
    group: "Product",
    items: [
      {
        title: "Our mision",
        href: "/#our-mision",
      },
      {
        title: "plans",
        href: "/#plans",
      },
      {
        title: "Insight",
        href: "/#insight",
      },
    ],
  },
  {
    group: "Company",
    items: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "Help",
        href: "/help",
      },
    ],
  },
];

export default function FooterSection() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="flex  justify-between gap-12 ">
        <div className="">
          <Logo size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
          {links.map((link, index) => (
            <div key={index} className="space-y-4 text-sm">
              <span className="block font-medium">{link.group}</span>
              {link.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary block duration-150"
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
        <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
          © {new Date().getFullYear()} Universalprimecapital, All rights
          reserved
        </span>
        <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <IconBrandTelegram className="size-6" />
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <IconBrandLinkedin className="size-6" />
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
