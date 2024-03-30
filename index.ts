#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const theBalance = 10000;
const userPin = 2162009;

async function main() {
  console.log(chalk.bold.yellow("====================================="));
  console.log(chalk.bold.yellow("        WELCOME TO THE ATM!"));
  console.log(chalk.bold.yellow("====================================="));

  const pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      message: "Enter Your Pin:",
      type: "number",
    },
  ]);

  if (pinAnswer.pin === userPin) {
    console.log(chalk.green("Correct pin code"));

    const operationAns = await inquirer.prompt([
      {
        name: "operation",
        message: "Please Select Option",
        type: "list",
        choices: ["Withdraw", "Fast-Withdrawal", "Check-Balance"],
      },
    ]);

    if (operationAns.operation === "Withdraw" || operationAns.operation === "Fast-Withdrawal") {
      const amountAns = await inquirer.prompt([
        {
          name: "amount",
          message: "Enter amount to withdraw:",
          type: "number",
        },
      ]);

      if (amountAns.amount <= theBalance) {
        const remainingBalance = theBalance - amountAns.amount;
        console.log(chalk.green(`Withdrawn $${amountAns.amount}. Remaining balance: $${remainingBalance}`));
      } else {
        console.log(chalk.red("Insufficient balance."));
      }
    } else if (operationAns.operation === "Check-Balance") {
      console.log(chalk.blue(`Your current balance is $${theBalance}`));
    }
  } else {
    console.log(chalk.red("Incorrect pin code!!!"));
  }
}

main();
