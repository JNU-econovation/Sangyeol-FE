import type { Meta, StoryObj } from "@storybook/nextjs";

import PolygonIcon from ".";

const meta = {
  title: "Shared/UI/Icons/PolygonIcon",
  component: PolygonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PolygonIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
