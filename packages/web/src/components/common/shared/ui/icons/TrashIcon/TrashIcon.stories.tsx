import type { Meta, StoryObj } from "@storybook/nextjs";

import TrashIcon from ".";

const meta = {
  title: "Shared/UI/Icons/TrashIcon",
  component: TrashIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TrashIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
