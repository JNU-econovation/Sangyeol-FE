import type { Meta, StoryObj } from "@storybook/nextjs";
import { StackLinkProvider } from "stack-link";

import WeekHeader from ".";

const meta = {
  title: "Entities/WeekHeader",
  component: WeekHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    headerText: { control: "text" },
  },
  args: {
    headerText: "이번 주 산행",
  },
  decorators: [
    (Story) => (
      <StackLinkProvider>
        {/* transform을 주면 fixed 헤더가 뷰포트가 아닌 이 컨테이너 기준으로 고정되어, 캔버스 높이만큼만 차지합니다 */}
        <div className="relative h-20 w-full transform-gpu">
          <Story />
        </div>
      </StackLinkProvider>
    ),
  ],
} satisfies Meta<typeof WeekHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
