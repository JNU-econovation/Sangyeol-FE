import type { Meta, StoryObj } from "@storybook/nextjs";

import SelectorCloseIcon from ".";

const meta = {
  title: "Shared/UI/Icons/SelectorCloseIcon",
  component: SelectorCloseIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectorCloseIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
