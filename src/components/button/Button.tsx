import './button.scss';

type Props = {
  children?: React.ReactNode;
  className?: React.ReactNode;
  onClick?: (e: any) => void;
};
const Button = (props: Props) => {
  console.log('button rendering');
  return (
    <button
      className={`btn-outline btn ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
