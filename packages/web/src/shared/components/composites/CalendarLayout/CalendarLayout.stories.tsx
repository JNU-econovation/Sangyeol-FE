import type { Meta, StoryObj } from "@storybook/nextjs";

import CalendarLayout from ".";

const meta = {
  title: "Entities/CalendarLayout",
  component: CalendarLayout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onDateClick: { action: "dateClick" },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalendarLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDateContent: Story = {
  args: {
    content: (props) =>
      props?.date && props.date.getDate() % 5 === 0 ? (
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      ) : null,
  },
};
