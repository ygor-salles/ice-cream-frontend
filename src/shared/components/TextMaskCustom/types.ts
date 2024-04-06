export interface CustomProps {
  onChange: (event: { target: { name: string; value: unknown } }) => void;
  name: string;
  mask: string;
}
