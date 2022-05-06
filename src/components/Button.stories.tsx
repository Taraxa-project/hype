import React from "react";
import { ComponentStory } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = { variant: "primary" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary" };

export const Small = Template.bind({});
Small.args = { size: "small" };

export const Regular = Template.bind({});
Regular.args = { size: "regular" };

export const Fullwidth = Template.bind({});
Fullwidth.args = { size: "full-width" };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
