import { contrastColor } from 'contrast-color';

interface Props {
  label: string;
  color: string;
  children?: React.ReactNode;
};

const Swatch = ({ label, color, children }: Props) => {
  if (!color) {
    return null;
  }

  return (
    <div
      className="swatch"
      aria-label={label}
      style={{
        '--swatchColor': color?.hex,
        '--swatchBorder': color?.hex
          ? contrastColor({ bgColor: color?.hex })
          : null,
      }}
    >
      {children}
    </div>
  )
}

export default Swatch
