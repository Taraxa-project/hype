import React from "react";
import { ComponentStory } from "@storybook/react";
import Card from "./Card";
import Button from "../button/Button";

export default {
  title: "Hype/Card",
  component: Card,
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args}></Card>;

export const Regular = Template.bind({});
Regular.args = {
  children: (
    <div className="container">
      <h3>ApeCoin Staking Launch!</h3>
      <span>
        APE is launching it’s testnet, and we’d like everyone to come & check it
        out! All participants will be able to claim rewards...
      </span>
      <div className="dataContainer">
        <span className="dataHeader">Pool:</span>
        <span className="dataValue">100,000 APE</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Bonus:</span>
        <span className="dataValue">12,000 TARA</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Min reward:</span>
        <span className="dataValue">1 APE</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Duration:</span>
        <span className="dataValue">3 months left</span>
      </div>
      <Button size="full-width">Learn more</Button>
    </div>
  ),
};

export const Mobile = Template.bind({});
Mobile.args = {
  variant: "mobile",
  children: (
    <div className="container">
      <h3>ApeCoin Staking Launch!</h3>
      <span>
        APE is launching it’s testnet, and we’d like everyone to come & check it
        out! All participants will be able to claim rewards...
      </span>
      <div className="dataContainer">
        <span className="dataHeader">Pool:</span>
        <span className="dataValue">100,000 APE</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Bonus:</span>
        <span className="dataValue">12,000 TARA</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Min reward:</span>
        <span className="dataValue">1 APE</span>
      </div>
      <div className="dataContainer">
        <span className="dataHeader">Duration:</span>
        <span className="dataValue">3 months left</span>
      </div>
      <Button size="full-width">Learn more</Button>
    </div>
  ),
};
