import type { Meta, StoryObj } from "@storybook/nextjs";

import Dimmed from ".";

const meta = {
  title: "Shared/UI/Dimmed",
  component: Dimmed,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dimmed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-96 w-full bg-gray-100 p-6">
      <p>딤(Dimmed) 뒤의 콘텐츠입니다.</p>
      <Dimmed {...args} />
    </div>
  ),
};

export const WithContent: Story = {
  render: (args) => (
    <div className="relative h-96 w-full bg-gray-100 p-6">
      <p>딤(Dimmed) 뒤의 콘텐츠입니다.</p>
      <Dimmed {...args}>
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg bg-white px-6 py-4">모달 콘텐츠</div>
        </div>
      </Dimmed>
    </div>
  ),
};
