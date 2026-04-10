interface HeaderProps {
  cafeName: string;
}

export default function Header({ cafeName }: HeaderProps) {
  return (
    <div className="flex flex-col border border-solid border-white h-[12dvh]">
      <h1>
        {cafeName}
      </h1>
    </div>
  );
}
