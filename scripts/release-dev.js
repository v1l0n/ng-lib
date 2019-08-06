const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const packageJson = require('../package.json');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log('script ' +  chalk.red('ERR!') + ' Git working directory unclean.');
        return;
    }

    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        const actualBranch = stdout;

        if(process.argv[2]) {

            if(process.argv[2] == '-M') {
                createMergePush(actualBranch, 'major');
            }
    
            if(process.argv[2] == '-m') {
                createMergePush(actualBranch, 'minor');
            }
        } else {

            prompt([{ type : 'input', name : 'version', message: 'Create (m)inor or (M)ajor version? [m/M]' }]).then(answer => {

                if(answer.version == 'M') {
                    createMergePush(actualBranch, 'major');
                }
        
                if(answer.version == 'm') {
                    createMergePush(actualBranch, 'minor');
                }
            });    
        }
    });
});

function createMergePush(actualBranch, version) {
    var i = 0;
    const newVersionNumber = packageJson.version.replace(/[0-9]+/g, number => {
        i++;

        if (i == 1 && version == 'major') {
            return parseInt(number) + 1;
        }

        if (i == 1 && version == 'minor') {
            return number;
        }

        if (i == 2 && version == 'minor') {
            return parseInt(number) + 1;
        }

        return 0;
    });

    exec(`git checkout -b release/v${newVersionNumber} develop`, (err, stdout, stderr) => {

        exec(`npm version ${version} --no-git-tag-version`, (err, stdout, stderr) => {

            exec(`git commit -a -m 'v${newVersionNumber}'`, (err, stdout, stderr) => {

                prompt([{ type : 'input', name : 'merge', message: `Merge version ${newVersionNumber} to master? [y/n]` }]).then(answer => {

                    if (answer.merge.match(/^y$/i)) {

                        exec('git checkout master', (err, stdout, stderr) => {
                            console.log('script ' + chalk.black.bgWhite('INFO') + ' Merging changes into master...');

                            exec(`git merge --no-ff release/v${newVersionNumber}`, (err, stdout, stderr) => {

                                exec(`git tag -a v${newVersionNumber} -m 'v${newVersionNumber}'`, (err, stdout, stderr) => {

                                    exec(`git checkout ${actualBranch}`, (err, stdout, stderr) => {

                                        prompt([{ type : 'input', name : 'push', message: 'Push tags & branches to remote origin? [y/n]' }]).then(answer => {

                                            if (answer.push.match(/^y$/i)) {
                                                console.log('script ' + chalk.black.bgWhite('INFO') + ' Pushing tags & branches to remote origin...');
                                                exec('git push --all origin');
                                            } else {
                                                console.log('script ' + chalk.black.bgYellow('WARN') + ' Push to origin canceled.')
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    } else {
                        console.log('script ' + chalk.black.bgYellow('WARN') + ' Merge canceled.')
                    }
                });
            });
        });
    });
}
