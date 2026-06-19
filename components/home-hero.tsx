import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    desktop: "/images/tlc/home/hero-01-desktop.jpg",
    mobile: "/images/tlc/home/hero-01-mobile.jpg",
    alt: "The Living Church front desk and member resource shelves"
  },
  {
    desktop: "/images/tlc/home/hero-02-desktop.jpg",
    mobile: "/images/tlc/home/hero-02-mobile.jpg",
    alt: "The Living Church meditation room with floor cushions and purple lighting"
  },
  {
    desktop: "/images/tlc/home/hero-03-desktop.jpg",
    mobile: "/images/tlc/home/hero-03-mobile.jpg",
    alt: "The Living Church member shelves and front desk"
  },
  {
    desktop: "/images/tlc/home/hero-04-desktop.jpg",
    mobile: "/images/tlc/home/hero-04-mobile.jpg",
    alt: "The Living Church seating area with framed mushroom artwork"
  },
  {
    desktop: "/images/tlc/home/hero-05-desktop.jpg",
    mobile: "/images/tlc/home/hero-05-mobile.jpg",
    alt: "The Living Church member resource shelves"
  },
  {
    desktop: "/images/tlc/home/hero-06-desktop.jpg",
    mobile: "/images/tlc/home/hero-06-mobile.jpg",
    alt: "A candle being lit inside The Living Church"
  }
];

export function HomeHero() {
  return (
    <section className="bg-black text-creme">
      <div className="relative min-h-[560px] overflow-hidden lg:min-h-[760px]">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.desktop}
              className={`home-hero-slide absolute inset-0 ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 5}s` }}
            >
              <Image
                src={slide.desktop}
                alt={index === 0 ? slide.alt : ""}
                fill
                sizes="(min-width: 768px) 100vw, 0px"
                className="hidden object-cover md:block"
                priority={index === 0}
              />
              <Image
                src={slide.mobile}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 0px"
                className="object-cover md:hidden"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[760px] lg:px-8">
          <h1 className="max-w-[560px] text-[clamp(3.2rem,8.3vw,7.7rem)] leading-[0.8] tracking-normal text-creme drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
            <span className="block">Ancient</span>
            <span className="block">Wisdom</span>
            <span className="block text-gold">Modern</span>
            <span className="block text-gold">Guidance</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-7 text-creme/88 sm:text-xl sm:leading-8">
            A spiritual community offering education, guidance, and
            sacramental participation rooted in sacred mushroom traditions.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-24">
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/images/brand/tlc-logo-blue.png"
            alt="The Living Church San Francisco"
            width={320}
            height={406}
            className="h-auto w-56 sm:w-72"
            priority
          />
        </div>
        <div className="max-w-3xl self-center">
          <p className="font-ui text-lg font-semibold uppercase leading-tight tracking-normal text-gold sm:text-2xl">
            Education. Guidance. Community.
          </p>
          <p className="mt-7 text-base leading-7 text-creme/88 sm:text-lg sm:leading-8">
            The Living Church helps members engage sacred mushroom traditions
            through educational resources, community gatherings, and access to
            sacramental offerings. Whether you&apos;re beginning your journey or
            deepening an existing practice, TLC provides a place to learn,
            connect, and participate with intention.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold bg-gold px-7 py-3 text-base font-semibold text-black transition hover:bg-creme"
            >
              Become a Member
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold bg-transparent px-7 py-3 text-base font-semibold text-gold transition hover:bg-gold hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
