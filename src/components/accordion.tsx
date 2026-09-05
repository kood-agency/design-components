import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../lib/utils";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-border border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger text-foreground ease-standard hover:text-accent-foreground focus-visible:outline-ring disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground relative flex flex-1 items-center justify-between gap-4 py-3 text-left text-sm font-semibold transition-colors duration-(--duration-enter) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none max-md:min-h-11",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="text-muted-foreground ease-standard pointer-events-none size-4 shrink-0 transition-transform duration-(--duration-enter) group-data-panel-open/accordion-trigger:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="ease-standard overflow-hidden text-sm transition-opacity duration-(--duration-enter) data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pb-3", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
