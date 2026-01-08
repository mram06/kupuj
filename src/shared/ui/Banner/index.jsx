export const Banner = () => {
  return (
    <section className="relative container mx-auto py-16 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-20 right-16 w-24 h-24 bg-emerald-300/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-16 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/4 w-16 h-16 border-2 border-emerald-400/20 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-8 left-1/3 w-12 h-12 border-2 border-emerald-300/25 rotate-12 rounded-full"></div>
        <div className="absolute top-1/3 left-8 w-8 h-8 bg-emerald-400/15 rotate-45"></div>
      </div>
      <div className="relative z-10">
        <h1 className="title text-center text-white font-bold text-4xl md:text-5xl drop-shadow-lg">
          Знаходь, купуй та продавай :)
        </h1>
      </div>
    </section>
  );
};
