import type { Meta, StoryObj } from "@storybook/nextjs";

import SelectorOpenIcon from ".";

const meta = {
  title: "Shared/UI/Icons/SelectorOpenIcon",
  component: SelectorOpenIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectorOpenIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
