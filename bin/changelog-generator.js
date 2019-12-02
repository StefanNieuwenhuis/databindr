const { version } = require('../package.json');
const child = require('child_process');
const fs = require('fs');

const DELIMETER = '----DELIMITER----';
const repoUrl = 'https://github.com/stefannieuwenhuis/databindr';

const output = child.execSync(`git log --format=%B%H${DELIMETER}`).toString('utf-8');

const commitsArray = output.split(DELIMETER)
    .map(commit => {
        const [message, sha] = commit.split('\n');

        return { sha, message };
    }).filter(commit => Boolean(commit.sha));

const currentChangelog = fs.readFileSync('../CHANGELOG.md', 'utf-8');

let newChangelog = `# Version ${version} (${
    new Date().toISOString().split("T")[0]
    })\n\n`;

const features = [];
const chores = [];

commitsArray.forEach(commit => {
    if (commit.message.startsWith('feature: ')) {
        features.push(
            `* ${commit.message.replace('feature', '')} ([${commit.sha.substring(0, 6)}](${repoUrl}/commit/${commit.sha}))\n`
        );
    }
    if (commit.message.startsWith('chore: ')) {
        chores.push(
            `* ${commit.message.replace('chore: ', '')} ([${commit.sha.substring(0, 6)}](${repoUrl}/commit/${commit.sha}))\n`
        );
    }
});

if (features.length) {
    newChangelog += `## Features\n`;
    features.forEach(feature => {
        newChangelog += feature;
    });
    newChangelog += '\n';
}

if (features.length) {
    newChangelog += `## Chores\n`;
    features.forEach(chore => {
        newChangelog += chore;
    });
    newChangelog += '\n';
}

fs.writeFileSync('../CHANGELOG.md', `${newChangelog}${currentChangelog}`);