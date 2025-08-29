import Image from "next/image";

export function VisionMissionSection() {
  return (
    <section className="py-20" id="our-mision">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/mision.png" // replace with your image path
            alt="Our vision"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            At <span className="font-semibold">AnchorPoint</span>, we believe
            that investing should be transparent, accessible, and empowering.
            Our mission is to guide individuals and institutions toward smarter
            financial decisions, while building trust and long-term growth.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500" />
              <p className="text-muted-foreground">
                Secure and reliable investment strategies
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
              <p className="text-muted-foreground">
                Easy-to-use platform for all experience levels
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-purple-500" />
              <p className="text-muted-foreground">
                Building wealth with confidence and clarity
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
