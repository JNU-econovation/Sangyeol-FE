import type { Meta, StoryObj } from "@storybook/nextjs";
import { StackLinkProvider } from "stack-link";

import StackHeader from ".";

const meta = {
  title: "Entities/StackHeader",
  component: StackHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
  args: {
    title: "산행 기록",
  },
  decorators: [
    (Story) => (
      <StackLinkProvider>
        <div className="w-96">
          <Story />
        </div>
      </StackLinkProvider>
    ),
  ],
} satisfies Meta<typeof StackHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
