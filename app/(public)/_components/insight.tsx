import VideoPlayer from "@/components/video-player";

export function Insight() {
  return (
    <section
      className="py-16 md:py-24 bg-teal-700  dark:bg-primary/5 rounded-b-md"
      id="insight"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading & Description */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white">
            Investment Insights
          </h2>
          <p className="mt-4 text-white/75 text-base sm:text-lg">
            Gain valuable insights into the markets we operate in. Our expert
            team breaks down opportunities in gemstones, gold, real estate, and
            digital assets — helping you make informed decisions with
            confidence.
          </p>
        </div>

        {/* Video */}
        <div className="mt-12">
          <VideoPlayer
            className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10"
            src="https://player.vimeo.com/video/898087321?h=e32387ac90"
            title="Investment Insights Video"
          />
        </div>
      </div>
    </section>
  );
}
