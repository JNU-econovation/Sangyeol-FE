import type { Meta, StoryObj } from "@storybook/nextjs";

import CourseList from ".";

const meta = {
  title: "Shared/UI/CourseList",
  component: CourseList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    duration: { control: { type: "number" }, description: "소요 시간(분)" },
    length: { control: { type: "number" }, description: "거리(km)" },
    difficulty: {
      control: "inline-radio",
      options: ["EASY", "NORMAL", "HARD"],
    },
    stared: { control: "boolean" },
    onSetStared: { action: "setStared" },
    onResetStared: { action: "resetStared" },
  },
  args: {
    name: "북한산 백운대 코스",
    duration: 180,
    length: 6,
    difficulty: "HARD",
    stared: false,
    imageSrc: "",
  },
  decorators: [
    (Story) => (
      <ul className="w-96">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof CourseList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stared: Story = {
  args: { stared: true },
};
