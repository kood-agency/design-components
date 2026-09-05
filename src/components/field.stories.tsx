import type { Meta, StoryObj } from "@storybook/react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet as FieldSetComponent,
} from "./field";
import { Input } from "./input";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-name">Name</FieldLabel>
      <Input id="field-name" placeholder="Ada Lovelace" />
      <FieldDescription>Your full name.</FieldDescription>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" placeholder="ada@example.com" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="field-invalid">Email</FieldLabel>
      <Input id="field-invalid" aria-invalid defaultValue="not-an-email" />
      <FieldError>Enter a valid email.</FieldError>
    </Field>
  ),
};

export const FieldSet: Story = {
  render: () => (
    <FieldSetComponent>
      <FieldLegend>Account</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-username">Username</FieldLabel>
          <Input id="field-username" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-password">Password</FieldLabel>
          <Input id="field-password" type="password" />
        </Field>
      </FieldGroup>
    </FieldSetComponent>
  ),
};
