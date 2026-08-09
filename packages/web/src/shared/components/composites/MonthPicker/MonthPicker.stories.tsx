import type { Meta, StoryObj } from "@storybook/nextjs";

import MonthPicker from ".";

const meta = {
  title: "Entities/MonthPicker",
  component: MonthPicker,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onConfirm: { action: "confirm" },
    onCancel: { action: "cancel" },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[480px] w-full bg-gray-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MonthPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: { year: 2023, month: 5 },
  },
};
