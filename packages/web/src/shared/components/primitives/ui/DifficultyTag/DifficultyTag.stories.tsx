import type { Meta, StoryObj } from "@storybook/nextjs";

import DifficultyTag from ".";

const meta = {
  title: "Shared/UI/DifficultyTag",
  component: DifficultyTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    difficulty: {
      control: "inline-radio",
      options: ["EASY", "NORMAL", "HARD"],
    },
  },
  args: {
    difficulty: "NORMAL",
  },
} satisfies Meta<typeof DifficultyTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllDifficulties: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <DifficultyTag difficulty="EASY" />
      <DifficultyTag difficulty="NORMAL" />
      <DifficultyTag difficulty="HARD" />
    </div>
  ),
};
