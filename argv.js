const options = require("commander");

options
    .option("--stats, --validate")
    .parse(process.argv);

if (options.validate) {
    console.log("Let's make some noise!");
}