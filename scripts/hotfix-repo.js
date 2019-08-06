const { exec } = require('child_process');
const chalk = require('chalk');
const packageJson = require('../package.json');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log('script ' +  chalk.red('ERR!') + ' Git working directory unclean.');
        return;
    }


    let i = 0;

    const newVersionNumber = packageJson.version.replace(/[0-9]+/g, number => {
        i++;

        if (i == 3) {
            return parseInt(number) + 1;
        }
    
        return number;
    });

    console.log('script ' + chalk.black.bgWhite('INFO') + ` Creating & Versioning branch 'hotfix/v${newVersionNumber}'...`);

    exec(`git checkout -b hotfix/v${newVersionNumber} master`, (err, stdout, stderr) => {
        
        exec(`npm version patch --no-git-tag-version`, (err, stdout, stderr) => {
        
            exec(`git commit -a -m 'v${newVersionNumber}'`);
        });
    });
});
