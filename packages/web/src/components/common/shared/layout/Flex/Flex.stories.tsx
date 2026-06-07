import type { Meta, StoryObj } from "@storybook/nextjs";

import Flex from ".";

const meta = {
  title: "Shared/Layout/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    flexDirection: {
      control: "inline-radio",
      options: ["flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse"],
    },
    justifyContent: {
      control: "select",
      options: [
        "justify-start",
        "justify-end",
        "justify-center",
        "justify-between",
        "justify-around",
        "justify-evenly",
        "justify-normal",
      ],
    },
    alignItems: {
      control: "select",
      options: [
        "items-start",
        "items-end",
        "items-center",
        "items-baseline",
        "items-stretch",
      ],
    },
    gap: {
      control: "select",
      options: [0, 1, 2, 4, 8, 12],
    },
  },
  args: {
    flexDirection: "flex-row",
    justifyContent: "justify-start",
    alignItems: "items-center",
    gap: 4,
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg bg-primary px-6 py-4 text-white">{children}</div>
);

export const Row: Story = {
  args: {
    flexDirection: "flex-row",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    flexDirection: "flex-col",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    flexDirection: "flex-row",
    justifyContent: "justify-between",
    children: (
      <>
        <Box>left</Box>
        <Box>right</Box>
      </>
    ),
  },
};
