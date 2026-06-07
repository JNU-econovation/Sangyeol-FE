import type { Meta, StoryObj } from "@storybook/nextjs";
import { StackLinkProvider } from "stack-link";

import MapHeaderNavbar from ".";

const meta = {
  title: "Entities/MapHeaderNavbar",
  component: MapHeaderNavbar,
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/map",
        query: {},
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StackLinkProvider>
        <div className="w-96">
          <Story />
        </div>
      </StackLinkProvider>
    ),
  ],
} satisfies Meta<typeof MapHeaderNavbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
