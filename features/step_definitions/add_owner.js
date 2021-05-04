const chai = require("chai");
var expect = chai.expect;
// import { Given } from "@cucumber/cucumber";
const { Given, Then, When, BeforeAll } = require("@cucumber/cucumber");
const { browser } = require("protractor");

BeforeAll({ timeout: 100 * 1000 }, async () => {
  console.log(browser.baseUrl);
  await browser.get("/");
});
Given("I am on the page to add a new owner", async function () {
  // Write code here that turns the phrase above into concrete actions
  // http://localhost:4200/petclinic/owners
  // http://localhost:4200/petclinic/owners/add
  await browser.get(`/petclinic/owners/add`);
});

When("I click on the back button", async function () {
  // Write code here that turns the phrase above into concrete actions
  const backButton = element(by.cssContainingText(".btn", "Back"));
  backButton.click();
});
Then(
  "I expect to go back to the page with a table of owners info",
  async function () {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).equals(`${browser.baseUrl}petclinic/owners`);
  }
);

Given("I am on the add owner page", async function () {
  await browser.get(`/petclinic/owners/add`);
});

Given("The input for Telephone is not a series of numbers", async function () {
  // Write code here that turns the phrase above into concrete actions
  const telephone = element(by.id("telephone"));
  telephone.sendKeys("asdf");
  expect(telephone).not.to.be.undefined;
});

When("I try to click on Add Owner", async function () {
  // Write code here that turns the phrase above into concrete actions
  const addOwnerButton = element(by.cssContainingText(".btn", "Add Owner"));
  addOwnerButton.click();
});

Then("I expect the Add Owner button to not be clickable", async function () {
  await browser.waitForAngularEnabled();
  // Write code here that turns the phrase above into concrete actions
  expect(
    element(by.cssContainingText(".btn", "Add Owner")).disabled
  ).to.be.true;
});
