# git-optimum-stats
utility to get the summary of your git repository. useful in adding a build/commit hash to your deployment/deployed scripts/html so you can track the deployment builds. Using it we can easily debug the issues in different environment and find the exact source present in that environment in case of multiple environments.

## __Usage__
```js
const stats = require('git-optimum-stats');
const gitDir = 'some/dir/containing/git/directory';
```

```js
const info = {
  Version: stats.version(gitDir),
  Branch: stats.branch(gitDir),
  Hash: stats.hash(gitDir),
  LastCommitOn: stats.lastCommitOn(gitDir),
  LastCommitBy: stats.lastCommitBy(gitDir),
};

console.log(JSON.stringify(info, null, 2));

// {
//   "Version": "A_GIT_TAG-g<SHORT_HASH>-dirty",
//   "Branch": "CURRENT_BRANCH",
//   "Hash": "LONG_STRING_OF_APLHA-NUMERIC_CHARS",
//   "LastCommitOn": "DATE",
//   "LastCommitBy": "AUTHOR <AUTHOR_EMAIL>"
// }

```

```js
const version = stats.rawCmd(gitDir, 'describe --always --tags --dirty="-dev"');

console.log("Version: ", version);
// "A_GIT_TAG-g<SHORT_HASH>-dev"
```

```js
// hash as a class in html document
const hash = stats.hash(gitDir);

<body class="<%= hash %>"></body> // Sample ejs template
```

## __Installation__
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 6.0.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install git-optimum-stats
```
## __API__
### __Note:__ All the below APIs has both `sync` and `async` versions - depending on the `callback` function.
#### *All the below APIs take a root directory path containing a `.git` directory as a first param (this is a `required` param) and a optional custom git command as a second param.*

### *`#version(gitDir[, custom_command] [, callback])`*
- Returns a string of git tags and short hash along with `'-dirty' suffix` (the suffix can be changed by passing the custom command.

### *`#branch(gitDir[, custom_command] [, callback])`*
- Returns a current git branch.

### *`#hash(gitDir[, custom_command] [, callback])`*
- Returns a current git hash in the form alpha-numeric string.

### *`#lastCommitOn(gitDir[, custom_command] [, callback])`*
- Returns a date when the latest commit is made.

### *`#lastCommitBy(gitDir[, custom_command] [, callback])`*
- Returns a name and the email address of latest commit author.

### *`#rawCmd(gitDir, custom_command [, callback])`*
- This a special function that takes a root directory path containing a `.git` directory as first param and any valid `git` command as second param. Both these params are `required` and a third optional param as a callback function.
- Returns a result of passed git command.
- *__Note:__ We are using `child_process#exec` functionality which has a default buffer limit of `200KB`.*

## License
[MIT](LICENSE)
