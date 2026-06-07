import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from ".";

const meta = {
  title: "Shared/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["green", "kakaoYellow", "black", "white", "gray"],
    },
    size: {
      control: "inline-radio",
      options: ["lg", "md", "sm"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "버튼",
    color: "green",
    size: "lg",
    fullWidth: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} color="green">
        green
      </Button>
      <Button {...args} color="kakaoYellow">
        kakaoYellow
      </Button>
      <Button {...args} color="black">
        black
      </Button>
      <Button {...args} color="white">
        white
      </Button>
      <Button {...args} color="gray">
        gray
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="lg">
        lg
      </Button>
      <Button {...args} size="md">
        md
      </Button>
      <Button {...args} size="sm">
        sm
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 버튼",
  },
  parameters: {
    layout: "padded",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화 버튼",
  },
};
