import React from "react";
import { ComponentStory } from "@storybook/react";
import Input from "./Input";

export default {
  title: "Hype/Input",
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);

export const Regular = Template.bind({});
Regular.args = { };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
