import type { Meta, StoryObj } from "@storybook/nextjs";

import CourseMetaDataUi from ".";

const meta = {
  title: "Shared/UI/CourseMetaDataUi",
  component: CourseMetaDataUi,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    distance: { control: { type: "number" } },
    time: { control: { type: "number" }, description: "소요 시간(분)" },
    difficulty: {
      control: "inline-radio",
      options: [undefined, "EASY", "NORMAL", "HARD"],
    },
  },
  args: {
    distance: 5,
    time: 150,
    difficulty: "NORMAL",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CourseMetaDataUi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDifficulty: Story = {
  args: { difficulty: undefined },
};
