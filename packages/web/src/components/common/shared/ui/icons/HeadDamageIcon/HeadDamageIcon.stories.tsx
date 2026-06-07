import type { Meta, StoryObj } from "@storybook/nextjs";

import HeadDamageIcon from ".";

const meta = {
  title: "Shared/UI/Icons/HeadDamageIcon",
  component: HeadDamageIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeadDamageIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
