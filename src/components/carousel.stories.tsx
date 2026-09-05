import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

const slides = ["One", "Two", "Three", "Four"];

export const Default: Story = {
  render: () => (
    <div className="mx-12 max-w-sm">
      <Carousel>
        <CarouselContent>
          {slides.map((label) => (
            <CarouselItem key={label}>
              <div className="bg-secondary text-foreground flex h-40 items-center justify-center rounded-md text-sm font-medium">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="mx-12 mt-12 max-w-sm">
      <Carousel orientation="vertical" className="w-full max-w-xs">
        <CarouselContent className="h-52">
          {slides.map((label) => (
            <CarouselItem key={label}>
              <div className="bg-secondary text-foreground flex h-44 items-center justify-center rounded-md text-sm font-medium">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
