const Passwordgen = require('./generate');

var program = require('commander');

program
  .description('Generate password')
  .option(
    '-l, --length <length>',
    'password length. Minimal length is 8 characters'
  )
  .option(
    '-u, --uppercase <uppercase>',
    'minimal number of uppercase characters'
  )
  .option('-d, --digits <digits>', 'minimal number of digits')
  .option('-s, --special <special>', 'minimal number of special characters');

program.parse(process.argv);

const options = {
  length: program.length,
  uppercase: program.uppercase,
  digits: program.digits,
  special: program.special
};

console.log(new Passwordgen(options).generate());
