import type { Meta, StoryObj } from "@storybook/nextjs";

import ClothesIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ClothesIcon",
  component: ClothesIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClothesIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
