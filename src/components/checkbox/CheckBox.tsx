import { useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import './checkBox.scss';

const CheckBox = (props: any) => {
  const inputRef = useRef(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };
  return (
    <label className="custom-checkbox">
      <input type="checkbox" ref={inputRef} onChange={onChange} />
      <div className="custom-checkbox__checkmark">
        <AiOutlineCheck />
      </div>
      {props.label ? props.label : ''}
      {props.children}
    </label>
  );
};

export default CheckBox;
