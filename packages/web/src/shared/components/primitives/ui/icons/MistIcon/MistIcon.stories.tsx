import type { Meta, StoryObj } from "@storybook/nextjs";

import MistIcon from ".";

const meta = {
  title: "Shared/UI/Icons/MistIcon",
  component: MistIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MistIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
