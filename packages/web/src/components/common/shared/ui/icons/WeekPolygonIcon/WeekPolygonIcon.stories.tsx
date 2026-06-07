import type { Meta, StoryObj } from "@storybook/nextjs";

import WeekPolygonIcon from ".";

const meta = {
  title: "Shared/UI/Icons/WeekPolygonIcon",
  component: WeekPolygonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WeekPolygonIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
