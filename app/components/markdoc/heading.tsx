type HeadingProps = {
  children: any;
  level: number;
};

export default function Heading({ children, level }: HeadingProps) {
  switch (level) {
    case 1:
      return (
        <h1 className="text-3xl font-semibold" id={children}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className="text-2xl font-semibold" id={children}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className="text-xl font-semibold" id={children}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className="text-lg font-semibold" id={children}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className="text-base font-semibold" id={children}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className="text-sm font-semibold" id={children}>
          {children}
        </h6>
      );
    default:
      <div className="text-base font-semibold" id={children}>
        {children}
      </div>;
  }
}
