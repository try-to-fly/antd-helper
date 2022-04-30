import { Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadDrawer } from './utils';
import './index.css';
import 'antd/dist/antd.css';
function App() {
  const handleOpenDrawer = () => {
    loadDrawer({
      title: '测试',
      placement: 'bottom',
      getContent: (onOk) => (
        <div>
          <h1>123</h1>
          <Button onClick={onOk}>确定</Button>
        </div>
      ),
    });
  };
  return (
    <div className="App">
      <Button onClick={handleOpenDrawer}>Open drawer</Button>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
