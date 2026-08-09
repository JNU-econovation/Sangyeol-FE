import type { Meta, StoryObj } from "@storybook/nextjs";

import Carousel from ".";

const meta = {
  title: "Entities/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const Slide = ({ index }: { index: number }) => (
  <div className="flex h-48 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
    Slide {index}
  </div>
);

export const Default: Story = {
  args: {
    items: [
      <Slide key={1} index={1} />,
      <Slide key={2} index={2} />,
      <Slide key={3} index={3} />,
    ],
  },
};
