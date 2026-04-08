interface HeaderProps {
  cafeName: string;
}

export default function Header({ cafeName }: HeaderProps) {
  return (
    <h1>
      {cafeName}
    </h1>
  );
}
