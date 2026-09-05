"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from "react-day-picker";

import { Button, buttonVariants } from "./button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";

function CalendarRoot({
  className,
  rootRef,
  ...rootProps
}: {
  className?: string;
  rootRef?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...rootProps} />;
}

function CalendarChevron({
  className,
  orientation,
  ...chevronProps
}: React.ComponentProps<"svg"> & { orientation?: "left" | "right" | "down" | "up" }) {
  if (orientation === "left") {
    return <ChevronLeftIcon className={cn("size-4", className)} {...chevronProps} />;
  }

  if (orientation === "right") {
    return <ChevronRightIcon className={cn("size-4", className)} {...chevronProps} />;
  }

  return <ChevronDownIcon className={cn("size-4", className)} {...chevronProps} />;
}

function CalendarWeekNumber({ children, ...weekNumberProps }: React.ComponentProps<"td">) {
  return (
    <td {...weekNumberProps}>
      <div className="flex size-9 items-center justify-center text-center">{children}</div>
    </td>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...dayPickerProps
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-card border-border rounded-lg border p-3 in-data-[slot=card-content]:border-0 in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-sm" }),
          "select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon-sm" }),
          "select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-9 w-full items-center justify-center px-9",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative min-h-8 rounded-md border border-input bg-card px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground selection:bg-selection selection:text-selection-foreground md:text-sm outline-none focus-visible:border-ring focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors duration-(--duration-enter) ease-standard motion-reduce:transition-none disabled:cursor-not-allowed disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:placeholder:text-muted-foreground data-disabled:cursor-not-allowed data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:border-destructive data-invalid:border-destructive",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 appearance-none bg-transparent text-transparent",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-md text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 text-xs font-medium select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-9 select-none", defaultClassNames.week_number_header),
        week_number: cn("text-muted-foreground text-xs select-none", defaultClassNames.week_number),
        day: cn(
          "group/day relative aspect-square h-full w-full rounded-md p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          dayPickerProps.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day,
        ),
        range_start: cn("relative isolate z-0 rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("relative isolate z-0 rounded-r-md", defaultClassNames.range_end),
        today: cn("text-accent-foreground font-semibold", defaultClassNames.today),
        outside: cn("text-muted-foreground", defaultClassNames.outside),
        disabled: cn("text-muted-foreground line-through", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      {...dayPickerProps}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...dayButtonProps
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "hover:bg-secondary focus-visible:outline-ring ease-standard data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground group-data-[today=true]/day:text-accent-foreground group-data-[selected=true]/day:text-primary-foreground relative isolate z-10 size-9 rounded-md border-0 text-sm font-normal transition-colors duration-(--duration-enter) outline-none group-data-[today=true]/day:font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid motion-reduce:transition-none",
        defaultClassNames.day,
        className,
      )}
      {...dayButtonProps}
    />
  );
}

export { Calendar, CalendarDayButton };
