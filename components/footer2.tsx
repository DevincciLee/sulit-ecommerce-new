import Link from "next/link";
import logo from "@/public/logo.png";
import { Label } from "./ui/label";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
}

const Footer2 = ({
  tagline = "Your one stop shop for computer and printer needs.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "/" },
        { text: "Shop", url: "/shop" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ],
  copyright = "Sulit tech copyright",
}: Footer2Props) => {
  return (
    <section className="py-32">
      <div className="w-[90vw] container mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-4 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link
                  href="/"
                  className="cursor-pointer flex flex-row gap-2 items-center justify-center"
                >
                  <Image src={logo} alt="logo" className="w-10" />
                  <Label className="text-xl cursor-pointer font-bold">
                    SULIT-TECH
                  </Label>
                </Link>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
