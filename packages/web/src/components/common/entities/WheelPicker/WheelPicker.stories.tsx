import type { Meta, StoryObj } from "@storybook/nextjs";

import { WheelPicker, WheelPickerWrapper, type WheelPickerOption } from ".";

const meta = {
  title: "Entities/WheelPicker",
  component: WheelPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-48">
        <WheelPickerWrapper>
          <Story />
        </WheelPickerWrapper>
      </div>
    ),
  ],
} satisfies Meta<typeof WheelPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: WheelPickerOption[] = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}월`,
  value: `${i + 1}`,
}));

export const Default: Story = {
  args: {
    options,
    defaultValue: "3",
    visibleCount: 9,
  },
};
