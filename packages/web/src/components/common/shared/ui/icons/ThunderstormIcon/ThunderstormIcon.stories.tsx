import type { Meta, StoryObj } from "@storybook/nextjs";

import ThunderstormIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ThunderstormIcon",
  component: ThunderstormIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThunderstormIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
