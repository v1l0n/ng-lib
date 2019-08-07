const { exec } = require('child_process');
const chalk = require('chalk');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log('script ' +  chalk.red('ERR!') + ' Git working directory unclean.');
        return;
    }

    if (process.argv[2]) {
        console.log('script ' + chalk.black.bgWhite('INFO') + ` Creating branch 'feature/${process.argv[2]}'...`);
        exec(`git checkout -b feature/${process.argv[2]} develop`);    
    } else {
        console.log('script ' +  chalk.red('ERR!') + ' Specify name of feature.');
        return;
    }

});
