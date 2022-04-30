import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { loadDrawer } from '../utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>加载抽屉</Button>
);

export const LoadDrawer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoadDrawer.args = {
  type: 'primary',
  size: 'small',
  onClick: async () => {
    const data = await loadDrawer({
      title: '测试',
      placement: 'bottom',
      getContent: (onOk) => (
        <div>
          <h1>123</h1>
          <Button onClick={onOk}>确定</Button>
        </div>
      ),
    });
    console.log(data);
  },
};
