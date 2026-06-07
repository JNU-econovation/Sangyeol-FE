import type { Meta, StoryObj } from "@storybook/nextjs";

import Spacing from ".";

const meta = {
  title: "Shared/Layout/Spacing",
  component: Spacing,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 0, step: 1 },
      description: "간격 크기 (size * 0.25rem 높이)",
    },
  },
  args: {
    size: 8,
  },
} satisfies Meta<typeof Spacing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <div className="rounded bg-primary px-4 py-2 text-white">위 블록</div>
      <Spacing {...args} />
      <div className="rounded bg-primary px-4 py-2 text-white">아래 블록</div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64">
      {[2, 4, 8, 16].map((size) => (
        <div key={size}>
          <div className="rounded bg-gray-200 px-2 py-1 text-xs">
            size={size}
          </div>
          <Spacing size={size} />
        </div>
      ))}
    </div>
  ),
};
