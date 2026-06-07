import type { Meta, StoryObj } from "@storybook/nextjs";

import BgLogoIcon from ".";

const meta = {
  title: "Shared/UI/Icons/BgLogoIcon",
  component: BgLogoIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BgLogoIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
