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
                mergePush(process.argv[2], actualBranch);
            });
        } else {
            mergePush(actualBranch);
        }
    });
});

function mergePush(hotfixBranch, actualBranch) {

    exec('git checkout develop', (err, stdout, stderr) => {

        exec(`git merge --no-ff ${hotfixBranch}`, (err, stdout, stderr) => {
            console.log('script ' + chalk.black.bgWhite('INFO') + ' Merging changes into develop...');

            exec(`git checkout ${actualBranch ? actualBranch : hotfixBranch}`, (err, stdout, stderr) => {
                console.log('script ' + chalk.black.bgWhite('INFO') + ' Feature merged.');

                prompt([{ type : 'input', name : 'push', message: 'Push branches to remote origin? [y/n]' }]).then(answer => {

                    if (answer.push.match(/^y$/i)) {

                        exec('git push --all origin', (err, stdout, stderr) => {

                            if (!err) {
                                console.log('script ' + chalk.black.bgWhite('INFO') + ' Branches pushed to remote origin');
                            }
                        });
                    } else {
                        console.log('script ' + chalk.black.bgYellow('WARN') + ' Push to origin canceled.')
                    }
                });                            
            });
        });
    });
}