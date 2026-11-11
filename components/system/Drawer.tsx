import { Drawer } from 'antd';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
}

const App = ({ open, onClose, children }: Props) => {

  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        {children}
      </Drawer>
    </>
  );
};

export default App;