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

function FruitOptions() {
  return (
    <ComboboxContent>
      <ComboboxEmpty>No fruit found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {(fruit: string) => <ComboboxItem value={fruit}>{fruit}</ComboboxItem>}
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
