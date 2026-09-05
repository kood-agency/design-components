import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion className="w-96" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It uses Base UI primitives with WAI-ARIA patterns.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It follows the DESIGN.md recipes for disclosure.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Opacity only. Layout properties are never animated.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion className="w-96" multiple defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>First panel stays open with others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>Second panel is also open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third item</AccordionTrigger>
        <AccordionContent>Third panel starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
