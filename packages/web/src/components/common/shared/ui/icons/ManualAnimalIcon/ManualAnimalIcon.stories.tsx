import type { Meta, StoryObj } from "@storybook/nextjs";

import ManualAnimalIcon from ".";

const meta = {
  title: "Shared/UI/Icons/ManualAnimalIcon",
  component: ManualAnimalIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ManualAnimalIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
