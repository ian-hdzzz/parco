// interfaces
interface IProps {
  type: string;
  text: string;
  tabIndex: number;
  disabled?: boolean;
  onClick?: () => void; // Asegúrate de incluir el onClick en la interfaz
}

const Button: React.FC<IProps> = ({ type, text, tabIndex, disabled = false, onClick }) => (
  <button
    tabIndex={tabIndex}
    type={type === 'submit' ? 'submit' : 'button'}
    className={`button ${disabled ? 'disabled' : 'active'}`}
    onClick={onClick} // Pasa la función onClick como propiedad
  >
    {text}
  </button>
);

export default Button;