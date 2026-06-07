import type { Meta, StoryObj } from "@storybook/nextjs";

import CourseBaseTab from ".";

const meta = {
  title: "Entities/CourseBaseTab",
  component: CourseBaseTab,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "change" },
  },
  args: {
    courseList: ["A코스", "B코스", "C코스"],
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CourseBaseTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    children: ({ selectedCourseName }) => (
      <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
        선택된 코스: <b>{selectedCourseName}</b>
      </div>
    ),
  },
};
