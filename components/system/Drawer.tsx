import { Drawer } from 'antd';

type Props = {
    open: boolean;
    onClose: () => void;
}

const App = ({open, onClose}: Props) => {

  return (
    <>
      <Drawer
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;