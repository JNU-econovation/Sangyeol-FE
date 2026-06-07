import type { Meta, StoryObj } from "@storybook/nextjs";

import ManualPainManIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ManualPainManIcon",
  component: ManualPainManIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ManualPainManIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
