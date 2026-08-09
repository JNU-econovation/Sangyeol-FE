import type { Meta, StoryObj } from "@storybook/nextjs";

import ManualTemperatureIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ManualTemperatureIcon",
  component: ManualTemperatureIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ManualTemperatureIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
