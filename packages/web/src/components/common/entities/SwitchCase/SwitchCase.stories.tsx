import type { Meta, StoryObj } from "@storybook/nextjs";

import SwitchCase from ".";

const meta = {
  title: "Entities/SwitchCase",
  component: SwitchCase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "inline-radio",
      options: ["a", "b", "c", "unknown"],
    },
  },
  args: {
    value: "a",
    caseBy: {
      a: <div className="rounded bg-primary px-4 py-2 text-white">A 화면</div>,
      b: <div className="rounded bg-success px-4 py-2 text-white">B 화면</div>,
      c: <div className="rounded bg-warning px-4 py-2 text-white">C 화면</div>,
    },
    defaultComponent: (
      <div className="rounded bg-gray-200 px-4 py-2">기본 화면</div>
    ),
  },
} satisfies Meta<typeof SwitchCase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MatchedCase: Story = {
  args: { value: "b" },
};

export const DefaultCase: Story = {
  args: { value: "unknown" },
};
