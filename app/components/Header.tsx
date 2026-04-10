interface HeaderProps {
  cafeName: string;
  heroImage?: string;
}

export default function Header({ cafeName, heroImage }: HeaderProps) {
  return (
    <header className="relative flex flex-col items-center h-16 justify-center px-4 bg-espresso overflow-hidden">
      {/* Background image */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}
      {/* Dark overlay — always present so text is readable with or without image */}
      <div className="absolute inset-0 bg-espresso/70" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-gold-light uppercase text-center">
          {cafeName}
        </h1>
      </div>
    </header>
  );
}
