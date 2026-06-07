import type { Meta, StoryObj } from "@storybook/nextjs";

import Selector from ".";

const meta = {
  title: "Entities/Selector",
  component: Selector,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: { action: "select" },
  },
  args: {
    options: [
      { text: "서울", value: "seoul" },
      { text: "경기", value: "gyeonggi" },
      { text: "강원", value: "gangwon" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="h-64 w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Selector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedValue: Story = {
  args: {
    value: "gyeonggi",
  },
};
