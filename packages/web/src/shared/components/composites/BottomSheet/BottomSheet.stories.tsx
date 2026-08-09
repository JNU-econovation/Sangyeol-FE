import type { Meta, StoryObj } from "@storybook/nextjs";

import BottomSheet from ".";

const meta = {
  title: "Entities/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    debug: { control: "boolean" },
  },
  args: {
    debug: false,
  },
  decorators: [
    // 실제 사용처(PositionBottom)와 동일하게 바텀시트를 하단에 고정해야
    // 닫을 때 하단이 고정된 채 상단(핸들)이 내려오는 동작을 확인할 수 있습니다.
    (Story) => (
      <div className="relative h-[480px] w-full overflow-hidden bg-gray-100">
        <div className="absolute bottom-0 left-0 w-full px-4">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="py-4">
        <p className="text-lg font-semibold">바텀시트 콘텐츠</p>
        <p className="mt-2 text-gray-600">
          상단 핸들을 드래그하여 열고 닫을 수 있습니다.
        </p>
        <div className="mt-4 h-40 rounded-lg bg-gray-100" />
      </div>
    ),
  },
};

export const Debug: Story = {
  args: {
    debug: true,
    children: (
      <div className="py-4">
        <p className="text-lg font-semibold">디버그 모드</p>
        <div className="mt-4 h-32 rounded-lg bg-gray-100" />
      </div>
    ),
  },
};
