import type { Meta, StoryObj } from "@storybook/nextjs";

import Tabs from ".";

const meta = {
  title: "Entities/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "change" },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.TabList>
        <Tabs.Tab label="코스" defaultSelected />
        <Tabs.Tab label="지도" />
        <Tabs.Tab label="후기" />
      </Tabs.TabList>
      <Tabs.Content>
        {({ selectedTab }) => (
          <div className="mt-4 rounded-lg bg-gray-100 p-6 text-center">
            <b>{selectedTab}</b> 탭의 콘텐츠입니다.
          </div>
        )}
      </Tabs.Content>
    </Tabs>
  ),
};
