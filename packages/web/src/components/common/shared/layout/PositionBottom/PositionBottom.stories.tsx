import type { Meta, StoryObj } from "@storybook/nextjs";

import PositionBottom from ".";

const meta = {
  title: "Shared/Layout/PositionBottom",
  component: PositionBottom,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    bottom: { control: { type: "number" } },
    zIndex: { control: { type: "number" } },
    padding: { control: { type: "number" } },
  },
  args: {
    bottom: 18,
    zIndex: 10,
    padding: 4,
  },
  decorators: [
    (Story) => (
      <div className="relative h-96 w-full overflow-hidden bg-gray-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PositionBottom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <button className="w-full rounded-lg bg-primary py-4 text-white">
        하단 고정 버튼
      </button>
    ),
  },
};
