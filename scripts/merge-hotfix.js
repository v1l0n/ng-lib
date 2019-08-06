const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const packageJson = require('../package.json');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log(`script ${chalk.red('ERR!')} Git working directory unclean.`);
        return;
    }

    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        const hotfixBranch = process.argv[2] ? process.argv[2] : stdout;
        const activeBranch = stdout;

        if (!hotfixBranch.startsWith('hotfix/')) {
            console.log(`script ${chalk.red('ERR!')} '${hotfixBranch}' is not a hotfix branch.`);
            return;
        }

        console.log(`script ${chalk.black.bgWhite('INFO')} Merging '${hotfixBranch}' into master/develop...`);
        
        exec(`git checkout master`, (err, stdout, stderr) => {

            exec(`git merge --no-ff ${hotfixBranch}`, (err, stdout, stderr) => {

                exec(`git tag -a v${packageJson.version} -m 'v${packageJson.version}'`, (err, stdout, stderr) => {

                    exec(`git checkout develop`, (err, stdout, stderr) => {

                        exec(`git merge --no-ff ${hotfixBranch}`, (err, stdout, stderr) => {

                            prompt([{ type : 'input', name : 'push', message: 'Push master/develop and tag to remote origin? [y/n]' }]).then(answer => {
                    
                                if (answer.push.match(/^y$/i)) {

                                    exec(`git checkout develop`, (err, stdout, stderr) => {

                                        exec(`git push`, (err, stdout, stderr) => {

                                            exec(`git checkout master`, (err, stdout, stderr) => {
                                        
                                                exec(`git push`, (err, stdout, stderr) => {
                                        
                                                    exec(`git push --follow-tags`, (err, stdout, stderr) => {
                                        
                                                        exec(`git checkout ${activeBranch}`);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                } else {
                                    exec(`git checkout ${activeBranch}`);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
});
