import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState, type ComponentProps } from "react";

import WheelPickerInput from ".";

const meta = {
  title: "Entities/WheelPickerInput",
  component: WheelPickerInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WheelPickerInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { label: "북한산", value: "bukhan" },
  { label: "지리산", value: "jiri" },
  { label: "설악산", value: "seorak" },
  { label: "한라산", value: "halla" },
];

const DefaultStoryRender = (args: ComponentProps<typeof WheelPickerInput>) => {
  const [value, setValue] = useState<string | null>(args.value);
  return <WheelPickerInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    options,
    value: null,
    onChange: () => {},
    placeholder: "산을 선택하세요",
  },
  render: (args) => <DefaultStoryRender {...args} />,
};
