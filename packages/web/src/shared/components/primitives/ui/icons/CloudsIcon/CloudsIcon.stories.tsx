import type { Meta, StoryObj } from "@storybook/nextjs";

import CloudsIcon from ".";

const meta = {
  title: "Shared/UI/Icons/CloudsIcon",
  component: CloudsIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CloudsIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
