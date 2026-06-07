import type { Meta, StoryObj } from "@storybook/nextjs";

import Input from ".";

const meta = {
  title: "Shared/UI/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["primary", "white"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    color: "primary",
    placeholder: "내용을 입력하세요",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { color: "primary" },
};

export const White: Story = {
  args: { color: "white" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "수정 불가" },
};
