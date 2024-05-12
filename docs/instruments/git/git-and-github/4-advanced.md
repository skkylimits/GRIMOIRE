# Advanced

## Git Reset

Fixing things often means deleting files. SO it's important to consider where they live within the context of your project as it relates to git

Unstage all staged files. Remove the files from the stagin area:

`git reset`

Rollback to a previous commit, BUT keep your changes in the working directory.

`git reset <commit-ID>`

Rollback to a previous commit AND discard all changes. Be careful with this one.

`git reset <commit-ID> --hard`

## Git Revert

Undo a recently pushed commit with a new commit

`git revert c9aa472207f6c46c59257800d99c1e80dcad11fa -n`

After running this command, you can then commit the changes using:

`git commit -m "Revert last commit"`

## Git Ammend

Update the message on your last commit:

`git commit --amend -m "better message"`

Include a file you forgot on your last commit. Doesn't make a new commit

`git add <your-file>`

`git commit --amend --no-edit`

Only works if you haven't pushed your code to a remote repository unless..

--force overwrite history on remote, however if there are commits on the remote branch that you don't have you will lose them forever. your coworkers will blast you.

`git push origin master --force`

## Git Stash

Allows you to save your work, without actually committing it.

Basic way to create and apply a stash

`git stash`

`git stash pop`

Manage your stashes more easily by giving them a name:

`git stash save coolstuff`

List out all stashes:

`git stash list`

Apply a stash based on its index:

`git stash apply 1`

## Git Rebase

If you work on a team, some people will use rebase instead of merge.

Because merge will introduce a lot of commit complexity when working with larger teams.

Only do it on your own private branch. It actually rewrites history

Really usefull way to keep your feature branch up to date with you master branch.

From a feature branch, rebase the latest changes from the master branch.

`git checkout feature`

`git rebase master`

## Squash

Oftentimes when working on a feature you make a lot of commits that aren't really necessary when the feature finally gets merged on to the main master branch many of these commits are likely irrelevant to the rest of the team, so the maintainer of the project may ask you to squash your commits.

What that means is you take multiple commits, and just combine them into one single commit with a single message.

Or it might be multiple smaller commits that are just more organized.

`git rebase master --interactive`

Or

`git -c sequence.editor="code --wait --reuse-window" rebase --interactive <commit-id>`

If you want to be more productive you can use --fixup and --squash on commit:

`git commit --fixup fb2f677`

`git commit --squash fc2f55`

Then:

`git rebase -i --autosquash`

## Git Hooks

Whenever you perform an operation with git like a commit for example it creates an events and hooks allows you to create an event before or after it happens.

In the hoooks folders you will find some scripts that can be useful.

If you're a javascript dev you can use [husky](https://typicode.github.io/husky/)

- Test on every commit

`git commit -m "🌎✌"`

## Git Destroy

Let's say your local version of the repo are not as great as you'd like them to be.

You can do a hard reset by doing the following.

Careful, your local changes will be lost forever.

`git fetch origin`

`git reset --hard origin/master`

You might still be left with some random untracked files or build artifects.

`git clean -df`

If you're sick of git at this point and want to remove git altogether:

**REMOVE THE .GIT FOLDER:**

`rm -rf .git`

## [Github Actions](https://github.com/fireship-io/225-github-actions-demo)

Github Actions make it easy to roll out a wide variety of DevOps [automation tasks](https://github.com/sdras/awesome-actions). The following lesson provides five examples of CI/CD and automation using [Github Actions](https://github.com/features/actions).

### Example 1: Continuous Integration

```text
name: Node Continuous Integration

on:
  pull_request:
    branches: [ master ]


jobs:
  test_pull_request:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### Example 2: Continuous Deployment

Continuous Deployment (CD) automatically releases new production code to users. It is the step that happens after new code has been integrated

See the full [Firebase Deployment with Github Actions Guide](https://fireship.io/snippets/github-actions-deploy-angular-to-firebase-hosting/).

### Example 3: Publish Package to NPM on Release

you maintain an open source package? It can be tedious to re-publish your package after creating a new release. Use the next workflow to automatically publish a package to NPM or Github Package Registry.

```text
name: Sveltefire Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}


    publish-gpr:
        needs: build
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
            with:
            node-version: 12
            registry-url: https://npm.pkg.github.com/
            scope: '@your-github-username'
        - run: npm ci
        - run: npm publish
            env:
            NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

### Example 4: Send Email or Chat Messages

Yet another powerful use-case is to post data from Github to your favorite chat or email service, like Slack, Discord, or Twilio SendGrid.

Also see the lessons about [Building a Slack Bot](https://fireship.io/lessons/how-to-build-a-slack-bot/) and [SendGrid Transactional Email](https://fireship.io/lessons/sendgrid-transactional-email-guide/) with Firebase.

```text
name: Slack Issues

on:
  issues:
    types: [opened]


jobs:
  post_slack_message:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: rtCamp/action-slack-notify@v2.0.0
    env:
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        SLACK_USERNAME: CyberJeff 
        SLACK_CHANNEL: gh-issues
```

### Example 5: Scheduled Background Jobs

You can also run scheduled workflows using [cron](https://fireship.io/snippets/crontab-crash-course/). A workflow can even be used to run arbitrary tasks at a set interval. For example, you might generate a weekly report of your code changes and email it to your product managers.

For a full example, checkout the [Automatic Firestore Backup](https://fireship.io/snippets/firestore-automated-backups/) snippet for a breakdown of this use-case.
