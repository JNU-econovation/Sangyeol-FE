import type { Meta, StoryObj } from "@storybook/nextjs";

import SearchInput from ".";

const meta = {
  title: "Shared/UI/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    handleSearch: { action: "search" },
  },
  args: {
    placeholder: "산 이름을 검색하세요",
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "북한산",
  },
};
