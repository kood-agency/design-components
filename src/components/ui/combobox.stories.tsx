import type { Meta, StoryObj } from "@storybook/react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "./combobox";

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Orange"];

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};
export default meta;

type Story = StoryObj<typeof Combobox>;

function FruitOptions({
  variant,
  testId,
}: {
  variant?: "default" | "glass" | "glass-strong";
  testId?: string;
}) {
  return (
    <ComboboxContent variant={variant} data-testid={testId}>
      <ComboboxEmpty>No fruit found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxCollection>
      </ComboboxList>
    </ComboboxContent>
  );
}

export const Default: Story = {
  render: () => (
    <Combobox items={fruits} defaultOpen>
      <ComboboxInput placeholder="Choose a fruit" />
      <FruitOptions />
    </Combobox>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-16">
      <Combobox items={fruits} defaultOpen>
        <div data-testid="glass">
          <ComboboxInput variant="glass" placeholder="Glass combobox" />
        </div>
        <FruitOptions variant="glass-strong" testId="glass-strong" />
      </Combobox>
      <Combobox items={fruits} defaultOpen>
        <div data-testid="glass-strong">
          <ComboboxInput variant="glass-strong" placeholder="Strong glass combobox" />
        </div>
        <FruitOptions variant="glass" testId="glass" />
      </Combobox>
    </div>
  ),
};

export const GlassChips: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <Combobox items={fruits} multiple defaultValue={["Apple"]}>
        <ComboboxChips variant="glass" data-testid="glass">
          <ComboboxChip>Apple</ComboboxChip>
          <ComboboxChipsInput placeholder="Glass chips" />
        </ComboboxChips>
      </Combobox>
      <Combobox items={fruits} multiple defaultValue={["Cherry"]}>
        <ComboboxChips variant="glass-strong" data-testid="glass-strong">
          <ComboboxChip>Cherry</ComboboxChip>
          <ComboboxChipsInput placeholder="Strong glass chips" />
        </ComboboxChips>
      </Combobox>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Combobox items={fruits} multiple defaultValue={["Apple", "Cherry"]} defaultOpen>
      <ComboboxChips>
        <ComboboxChip>Apple</ComboboxChip>
        <ComboboxChip>Cherry</ComboboxChip>
        <ComboboxChipsInput placeholder="Add fruit" />
      </ComboboxChips>
      <FruitOptions />
    </Combobox>
  ),
};

export const Groups: Story = {
  render: () => (
    <Combobox defaultOpen>
      <ComboboxInput placeholder="Choose a time zone" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>North America</ComboboxLabel>
            <ComboboxItem value="America/New_York">New York</ComboboxItem>
            <ComboboxItem value="America/Los_Angeles">Los Angeles</ComboboxItem>
          </ComboboxGroup>
          <ComboboxGroup>
            <ComboboxLabel>Europe</ComboboxLabel>
            <ComboboxItem value="Europe/London">London</ComboboxItem>
            <ComboboxItem value="Europe/Paris">Paris</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox disabled items={fruits}>
      <ComboboxInput disabled placeholder="Choose a fruit" />
      <FruitOptions />
    </Combobox>
  ),
};
