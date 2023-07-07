import inquirer from "inquirer";

export async function getEnvironment() {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "env",
      message: "What enironment do you want to use?",
      choices: ["development", "production"],
    },
  ]);

  return response.env;
}
