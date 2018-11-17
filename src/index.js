const path = require('path');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

// Default git cmds to get the required information.
const HASH = 'rev-parse HEAD';
const VERSION = 'describe --always --tags --dirty';
const BRANCH = 'rev-parse --abbrev-ref HEAD';
const LATEST_COMMIT_ON = 'log -1 --pretty=format:%cd';
const LATEST_COMMIT_BY = 'log -1 --pretty=format:"%an <%ae>"';

/**
 * Utility to get the current source git hash/version/branch
 * @param {string} gitDir - A directory containg .git dir
 * @param {string} cmd - A command to get information
 * @param {function} [cb] - A callback function to get the results
 *
 * @returns {string} - A result of provided git command.
 */
const run = (gitDir, cmd, cb) => {
  if (!gitDir) throw new Error(`Provided directory doesn't contain a git repository (.git)`);

  if (!cmd) throw new Error('Please provide valid git command options.');

  const exeCmd = gitDir
    ? ['git', `--git-dir=${path.join(gitDir, '.git')}`, `--work-tree=${gitDir}`, cmd]
    : ['git', cmd];

  if (cb) {
    return exec(exeCmd.join(' '), (err, res) => err ? cb(err) : cb(null, dropEmptyLines(res)));
  } else {
    return dropEmptyLines(String(execSync(exeCmd.join(' '))));
  }
};

/**
 * Deletes any empty lines present in the given string
 * @param {string} string
 *
 * @returns {string} - Returns a string without any emptylines
 */
const dropEmptyLines = (string = '') => string.replace(/[\s\r\n]+$/, '');

/**
 * Returns the current git hash
 * @param {string} dir - A directory having a .git directory
 * @param {string} [cmd] - Git command to get latest commit hash
 * @param {function} [cb]
 *
 * @returns {string} - Latest commit hash
 */
const hash = (dir, cmd = HASH, cb) => run(dir, cmd, cb);

/**
 * Returns the version composed of the tags, hash, and suffix passed in the cmd
 * (default suffix is '-dirty')
 * @param {string} dir - A directory having a .git directory
 * @param {string} [cmd] - Git command to get version
 * @param {function} [cb]
 *
 * @returns {string} - Current version
 */
const version = (dir, cmd = VERSION, cb) => run(dir, cmd, cb);

/**
 * Returns the current git branch
 * @param {string} dir - A directory having a .git directory
 * @param {string} [cmd] - Git command to get current branch
 * @param {function} [cb]
 *
 * @returns {string} - Current git branch
 */
const branch = (dir, cmd = BRANCH, cb) => run(dir, cmd, cb);

/**
 * Returns the latest commit date
 * @param {string} dir - A directory having a .git directory
 * @param {string} [cmd] - Git command to get latest commit date
 * @param {function} [cb]
 *
 * @returns {string} - Latest commit date
 */
const lastCommitOn = (dir, cmd = LATEST_COMMIT_ON, cb) => run(dir, cmd, cb);

/**
 * Returns the latest commit Author
 * @param {string} dir - A directory having a .git directory
 * @param {string} [cmd] - Git command to get latest commit author
 * @param {function} [cb]
 *
 * @returns {string} - Latest commit author
 */
const lastCommitBy = (dir, cmd = LATEST_COMMIT_BY, cb) => run(dir, cmd, cb);

module.exports = {
  hash: hash,
  branch: branch,
  version: version,
  lastCommitOn: lastCommitOn,
  lastCommitBy: lastCommitBy,
  rawCmd: run
};
