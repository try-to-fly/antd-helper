import { Drawer } from 'antd';
import * as React from 'react';
import omit from 'lodash.omit';
import { DrawerProps } from 'antd/lib/drawer';
import { loadComponendBase } from './load-component';

type IOwnProps = DrawerProps & {
  onCancel?: () => void;
  onOk?: (data: unknown) => void;
  getContent?: (onOk: (data: unknown) => void) => React.ReactNode;
};

const DrawerWrapper: React.FC<IOwnProps> = (props) => {
  const [visible, setVisible] = React.useState(true);
  const { getContent, onOk } = props;

  const handleClose = React.useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      props.onCancel?.();
    }, 200);
  }, []);

  return (
    <Drawer
      visible={visible}
      {...omit(props, ['getContent', 'onOk'])}
      onClose={handleClose}
    >
      {getContent?.(onOk!)}
    </Drawer>
  );
};

/**
 * 加载抽屉组件
 */
export const loadDrawer = (props: IOwnProps = {}) => {
  const render = loadComponendBase(DrawerWrapper);
  props.onCancel = render.cancel;
  props.onOk = render.success;
  return render(props);
};
