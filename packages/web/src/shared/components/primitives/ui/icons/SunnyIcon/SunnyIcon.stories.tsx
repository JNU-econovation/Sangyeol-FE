import type { Meta, StoryObj } from "@storybook/nextjs";

import SunnyIcon from ".";

const meta = {
  title: "Shared/UI/Icons/SunnyIcon",
  component: SunnyIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SunnyIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
