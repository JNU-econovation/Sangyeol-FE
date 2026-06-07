import type { Meta, StoryObj } from "@storybook/nextjs";

import TextField from ".";

const meta = {
  title: "Shared/UI/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    subtitle: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "닉네임",
    placeholder: "닉네임을 입력하세요",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    label: "닉네임",
    subtitle: "2~10자 이내로 입력해주세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "닉네임",
    helperText: "이미 사용 중인 닉네임입니다",
    defaultValue: "산결",
  },
};

export const Disabled: Story = {
  args: {
    label: "이메일",
    defaultValue: "sangyeol@example.com",
    disabled: true,
  },
};
