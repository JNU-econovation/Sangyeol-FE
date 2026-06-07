import type { Meta, StoryObj } from "@storybook/nextjs";

import Text from ".";

const meta = {
  title: "Shared/UI/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "text-black",
        "text-white",
        "text-primary",
        "text-gray-600",
        "text-error-message",
      ],
    },
    fontSize: {
      control: "select",
      options: [
        "text-xs",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
      ],
    },
    fontWeight: {
      control: "select",
      options: [
        "font-thin",
        "font-light",
        "font-normal",
        "font-medium",
        "font-semibold",
        "font-bold",
        "font-black",
      ],
    },
    align: {
      control: "inline-radio",
      options: ["text-left", "text-center", "text-right"],
    },
    display: {
      control: "inline-radio",
      options: ["block", "inline"],
    },
    children: { control: "text" },
  },
  args: {
    children: "안전한 산행을 도와드립니다",
    color: "text-black",
    fontSize: "text-base",
    fontWeight: "font-normal",
    align: "text-left",
    display: "inline",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FontSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Text {...args} fontSize="text-xs">
        text-xs
      </Text>
      <Text {...args} fontSize="text-base">
        text-base
      </Text>
      <Text {...args} fontSize="text-xl">
        text-xl
      </Text>
      <Text {...args} fontSize="text-3xl">
        text-3xl
      </Text>
    </div>
  ),
};

export const FontWeights: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Text {...args} fontWeight="font-light">
        font-light
      </Text>
      <Text {...args} fontWeight="font-normal">
        font-normal
      </Text>
      <Text {...args} fontWeight="font-bold">
        font-bold
      </Text>
      <Text {...args} fontWeight="font-black">
        font-black
      </Text>
    </div>
  ),
};
