import * as React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 * @param wrapComponent 包装加载的组件。用于注入context组件。比如store、react-query
 * @returns
 */
export const createLoadModal =
  (wrapComponent: (jsx: JSX.Element) => JSX.Element) => (Comment: any) =>
    loadComponendBase(Comment, { wrapComponent });

/**
 * 在特定位置渲染弹窗
 * NOTE: 该组件目前使用场景比较局限
 * 参考：https://github.com/ant-design/ant-design/blob/3d62c44325c03810f1f3ac65839ea0f4c89c39dd/components/modal/confirm.tsx
 * @param component 组件
 * @param options 可以省略
 */
export const loadComponendBase = <T extends Object>(
  ModalComponent: any,
  {
    wrapComponent = (Component) => Component,
  }: {
    wrapComponent?: (Component: JSX.Element) => JSX.Element;
  } = {},
) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // 销毁元素
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  // 渲染元素
  const render = (props: Object) => {
    setTimeout(() => {
      const WrapComponent = wrapComponent(
        (<ModalComponent {...props} />) as any,
      );
      ReactDOM.render(WrapComponent, div);
    });
  };
  let resolve: Function;
  let reject: Function;
  const result = (props: T) => {
    return new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
      render(props);
      // 浏览器前进后退的时候关闭弹窗
      window.addEventListener(
        'popstate',
        (e) => {
          result.cancel();
        },
        { once: true },
      );
    });
  };
  // 取消、关闭
  result.cancel = (value?: unknown) => {
    destroy();
    reject(value);
  };
  // 销毁元素
  result.destroy = destroy;
  // 成功回调
  result.success = (value: unknown) => {
    destroy();
    resolve(value);
  };
  return result;
};
