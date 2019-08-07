const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log('script ' +  chalk.red('ERR!') + ' Git working directory unclean.');
        return;
    }

    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        const featureBranch = process.argv[2] ? process.argv[2] : stdout;
        const activeBranch = stdout;

        if (!featureBranch.startsWith('feature/')) {
            console.log(`script ${chalk.red('ERR!')} '${featureBranch}' is not a feature branch.`);
            return;
        }

        console.log(`script ${chalk.black.bgWhite('INFO')} Merging '${featureBranch}' into develop...`);

        exec(`git checkout develop`, (err, stdout, stderr) => {
            
            exec(`git merge --no-ff ${featureBranch}`, (err, stdout, stderr) => {
            
                prompt([{ type : 'input', name : 'push', message: 'Push develop to remote origin? [y/n]' }]).then(answer => {

                    if (answer.push.match(/^y$/i)) {
                        exec(`git push`, (err, stdout, stderr) => {

                            exec(`git checkout ${activeBranch}`);
                        });
                    } else {
                        exec(`git checkout ${activeBranch}`);
                    }
                });                            
            });                            
        });
    });
});
