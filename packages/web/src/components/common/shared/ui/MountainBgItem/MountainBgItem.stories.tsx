import type { Meta, StoryObj } from "@storybook/nextjs";

import MountainBgItem from ".";

const meta = {
  title: "Shared/UI/MountainBgItem",
  component: MountainBgItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    region: { control: "text" },
    mountainName: { control: "text" },
    locked: { control: "boolean" },
  },
  args: {
    region: "서울",
    mountainName: "북한산",
    locked: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MountainBgItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Locked: Story = {
  args: { locked: true },
};
