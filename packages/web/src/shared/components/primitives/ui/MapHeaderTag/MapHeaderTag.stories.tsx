import type { Meta, StoryObj } from "@storybook/nextjs";

import MapHeaderTag from ".";

const meta = {
  title: "Shared/UI/MapHeaderTag",
  component: MapHeaderTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    isSelected: { control: "boolean" },
    onClickHandler: { action: "click" },
  },
  args: {
    text: "전체",
    isSelected: false,
  },
} satisfies Meta<typeof MapHeaderTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { isSelected: true },
};

export const Group: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <MapHeaderTag {...args} text="전체" isSelected />
      <MapHeaderTag {...args} text="등산로" isSelected={false} />
      <MapHeaderTag {...args} text="대피소" isSelected={false} />
    </div>
  ),
};
