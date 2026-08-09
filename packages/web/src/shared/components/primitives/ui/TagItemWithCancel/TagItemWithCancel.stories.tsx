import type { Meta, StoryObj } from "@storybook/nextjs";

import TagItemWithCancel from ".";

const meta = {
  title: "Shared/UI/TagItemWithCancel",
  component: TagItemWithCancel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    onClickCancel: { action: "cancel" },
    onClickTag: { action: "clickTag" },
  },
  args: {
    text: "북한산",
  },
} satisfies Meta<typeof TagItemWithCancel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <TagItemWithCancel {...args} text="북한산" />
      <TagItemWithCancel {...args} text="지리산" />
      <TagItemWithCancel {...args} text="설악산" />
    </div>
  ),
};
