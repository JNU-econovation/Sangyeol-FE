import type { Meta, StoryObj } from "@storybook/nextjs";

import Spinner from ".";

const meta = {
  title: "Shared/UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
    },
  },
  args: {
    size: "md",
  },
  decorators: [
    (Story) => (
      <div className="text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-primary">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};
