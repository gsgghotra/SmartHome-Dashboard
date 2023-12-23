import useLongPress from '../utils/useLongPress';
import Button from 'react-bootstrap/Button';

function Timers (props) {
  const backspaceLongPress = useLongPress(props.longPressBackspaceCallback, 2000);

  return (
      <Button {...backspaceLongPress}>
        Click me
      </Button>
  );
};

export default Timers;
