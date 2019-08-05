const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log('script ' +  chalk.red('ERR!') + ' Git working directory unclean.');
        return;
    }

    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        const actualBranch = stdout;

        if (process.argv[2]) {

            exec(`git checkout ${process.argv[2]}`, (err, stdout, stderr) => {
                patchMergePush(process.argv[2], actualBranch);
            });
        } else {
            patchMergePush(actualBranch);
        }
    });
});

function patchMergePush(hotfixBranch, actualBranch) {

    exec('npm version patch', (err, stdout, stderr) => {
        console.log('script ' + chalk.black.bgWhite('INFO') + ` Patching branch ${hotfixBranch}...`);

        prompt([{ type : 'input', name : 'merge', message: `Merge version ${stdout.replace(/[\n\r]+/g, '')} to master/develop? [y/n]` }]).then(answer => {

            if (answer.merge.match(/^y$/i)) {

                exec('git checkout master', (err, stdout, stderr) => {

                    exec(`git merge --no-ff ${hotfixBranch}`, (err, stdout, stderr) => {
                        console.log('script ' + chalk.black.bgWhite('INFO') + ' Merging changes into master...');

                        exec('git checkout develop', (err, stdout, stderr) => {

                            exec(`git merge --no-ff ${hotfixBranch}`, (err, stdout, stderr) => {
                                console.log('script ' + chalk.black.bgWhite('INFO') + ' Merging changes into develop...');

                                exec(`git checkout ${actualBranch ? actualBranch : hotfixBranch}`, (err, stdout, stderr) => {
                                    console.log('script ' + chalk.black.bgWhite('INFO') + ' Hotfix applied.');

                                    prompt([{ type : 'input', name : 'push', message: 'Push tags & branches to remote origin? [y/n]' }]).then(answer => {

                                        if (answer.push.match(/^y$/i)) {

                                            exec('git push --all origin', (err, stdout, stderr) => {

                                                if (!err) {
                                                    console.log('script ' + chalk.black.bgWhite('INFO') + ' Tags & branches pushed to remote origin');
                                                }
                                            });
                                        } else {
                                            console.log('script ' + chalk.black.bgYellow('WARN') + ' Push to origin canceled.')
                                        }
                                    });                            
                                });
                            });
                        });
                    });
                });
            } else {

                exec(`git checkout ${actualBranch ? actualBranch : hotfixBranch}`, (err, stdout, stderr) => {
                    console.log('script ' + chalk.black.bgYellow('WARN') + ' Merge canceled.')
                });
            }
        });
    });
}