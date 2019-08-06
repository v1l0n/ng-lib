const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const packageJson = require('../package.json');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log(`script ${chalk.red('ERR!')} Git working directory unclean.`);
        return;
    }

    let newVersionNumber;

    if (process.argv[2]) {

        if (process.argv[2] == '-M') {
            createMergePush(updateVersion('major'), 'major' );
            return;
        }

        if (process.argv[2] == '-m') {
            createMergePush(updateVersion('minor'));
            return;
        }
    }
    
    if (!newVersionNumber) {

        prompt([{ type : 'input', name : 'version', message: 'Create (m)inor or (M)ajor version? [m/M]' }]).then(answer => {

            if (answer.version == 'M') {
                createMergePush(updateVersion('major'), 'major');
                return;
            }
    
            if (answer.version == 'm') {
                createMergePush(updateVersion('minor'));
                return;
            }
        });    
    }
});

function updateVersion(versionUpdateType) {
    let i = 0;

    return packageJson.version.replace(/[0-9]+/g, number => {
        i++;

        if (i == 1 && versionUpdateType == 'major') {
            return parseInt(number) + 1;
        }

        if (i == 1 && versionUpdateType == 'minor') {
            return number;
        }

        if (i == 2 && versionUpdateType == 'minor') {
            return parseInt(number) + 1;
        }

        return 0;
    });
}

function createMergePush(newVersionNumber, versionUpdateType = 'minor') {
    console.log('script ' + chalk.black.bgWhite('INFO') + ` Creating & Versioning branch 'release/v${newVersionNumber}'...`);

    exec(`git checkout -b release/v${newVersionNumber} develop`, (err, stdout, stderr) => {

        exec(`npm version ${versionUpdateType} --no-git-tag-version`, (err, stdout, stderr) => {

            exec(`git commit -a -m 'v${newVersionNumber}'`, (err, stdout, stderr) => {

                prompt([{ type : 'input', name : 'merge', message: `Merge 'release/v${newVersionNumber}' to master/develop? [y/n]` }]).then(answer => {

                    if (answer.merge.match(/^y$/i)) {

                        exec(`git checkout master`, (err, stdout, stderr) => {

                            exec(`git merge --no-ff release/v${newVersionNumber}`, (err, stdout, stderr) => {

                                exec(`git tag -a v${newVersionNumber} -m 'v${newVersionNumber}'`, (err, stdout, stderr) => {

                                    exec(`git checkout develop`, (err, stdout, stderr) => {

                                        exec(`git merge --no-ff release/v${newVersionNumber}`, (err, stdout, stderr) => {

                                            prompt([{ type : 'input', name : 'push', message: 'Push master/develop and tag to remote origin? [y/n]' }]).then(answer => {

                                                if (answer.push.match(/^y$/i)) {

                                                    exec(`git checkout develop`, (err, stdout, stderr) => {

                                                        exec(`git push`, (err, stdout, stderr) => {

                                                            exec(`git checkout master`, (err, stdout, stderr) => {
                                                        
                                                                exec(`git push`, (err, stdout, stderr) => {
                                                        
                                                                    exec(`git push --follow-tags`, (err, stdout, stderr) => {
                                                        
                                                                        exec(`git checkout release/v${newVersionNumber}`);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                } else {
                                                    exec(`git checkout release/v${newVersionNumber}`);
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    } else {
                        console.log(`script ${chalk.black.bgYellow('WARN')} Merge canceled.`);
                    }
                });
            });
        });
    });
}
