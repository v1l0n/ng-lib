const { exec } = require('child_process');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const templatePackageJson = require('../projects/template/package.json');

exec('git status --porcelain', (err, stdout, stderr) => {

    if (stdout) {
        console.log(`script ${chalk.red('ERR!')} Git working directory unclean.`);
        return;
    }

    if (process.argv[2]) {

        if (process.argv[2] == '-M') {
            tag('major' );
            return;
        }

        if (process.argv[2] == '-m') {
            tag('minor');
            return;
        }

        if (process.argv[2] == '-p') {
            tag();
            return;
        }
    } else {

        prompt([{ type : 'input', name : 'version', message: 'Create (p)atch, (m)inor or (M)ajor version? [p/m/M]' }]).then(answer => {

            if (answer.version == 'M') {
                tag('major');
                return;
            }
    
            if (answer.version == 'm') {
                tag('minor');
                return;
            }
    
            if (answer.version == 'p') {
                tag();
                return;
            }
        });
    }
});

function tag(versionUpdateType = 'patch') {
    console.log('script ' + chalk.black.bgWhite('INFO') + ` Versioning ng-template...`);

    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
        const activeBranch = stdout;
            
        exec('cd ./projects/template', (err, stdout, stderr) => {
        
            exec(`npm version ${versionUpdateType} --no-git-tag-version`, (err, stdout, stderr) => {
        
            });
        });
    });
}
