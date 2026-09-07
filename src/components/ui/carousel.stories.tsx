import * as React from "react";
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

export const WithClickHandler: Story = {
  render: () => {
    const [clicks, setClicks] = React.useState(0);

    return (
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
          <CarouselNext onClick={() => setClicks((count) => count + 1)} />
        </Carousel>
        <output data-slot="carousel-click-count" className="mt-3 block text-sm">
          Next clicks: {clicks}
        </output>
      </div>
    );
  },
};
