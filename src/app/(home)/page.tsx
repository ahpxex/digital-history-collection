import { HomeSearch } from "@/features/home/components/HomeSearch";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] py-20 px-4">
      <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
          Digital History
        </h1>
        <p className="text-xl text-default-500 max-w-2xl mx-auto font-light">
          Discover curated cases, research tools, and datasets empowering digital humanities.
        </p>
      </div>
      
      <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
        <HomeSearch />
      </div>
    </div>
  );
}
