import { contrastColor } from 'contrast-color';

interface Props {
  label?: string;
  color: string;
  children?: React.ReactNode;
};

const Swatch: React.FC<any> = ({ label, color, children }: Props) => {
  if (!color) {
    return null;
  }

  return (
    <div
      className="swatch"
      aria-label={label}
      // @ts-ignore
      style={{'--swatchColor': color?.hex, '--swatchBorder': color?.hex ? contrastColor({ bgColor: color?.hex }) : null}}
    >
      {children}
    </div>
  )
}

export default Swatch