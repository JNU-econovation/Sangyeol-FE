import type { Meta, StoryObj } from "@storybook/nextjs";

import LinkArrowIcon from ".";

const meta = {
  title: "Shared/UI/Icons/LinkArrowIcon",
  component: LinkArrowIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinkArrowIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
