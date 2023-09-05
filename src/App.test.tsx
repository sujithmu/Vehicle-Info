import { render } from '@testing-library/react';
import { TextBox } from './component/Control/TextBox';

test('Should render a TextBox component', () => {
  const textBoxProps = {
      name: '', id: '', type:'', value:'', label:'', onChange:Function, error:''
  }
  render(<TextBox {...textBoxProps} />);
});