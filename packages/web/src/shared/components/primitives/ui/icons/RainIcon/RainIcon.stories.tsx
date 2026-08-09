import type { Meta, StoryObj } from "@storybook/nextjs";

import RainIcon from ".";

const meta = {
  title: "Shared/UI/Icons/RainIcon",
  component: RainIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RainIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
