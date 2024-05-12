# Remote

## List Remoted

List current remotes in the local repo:

`git remote`

Should be empty if repo is not linked to remote repo yet

## Create A New Remote

`git remote add origin https://github.com/skkylimits/git.git`

## Show More Remote Info

`git remote show origin`

## Push Files

Use git push to upload your local code to GitHub.

`git push origin master`

Note: the -u flag is used to set origin as the upstream remote in your git config so git pull can be used without any arguments in the future.

## Fetch Files

Fetch the latest changes locally. Code in editor hasn't changed to reflect that because we didn't merged yet.

If you look at the branches you will see multiple branches.

`git fetch`

## Merge Files

It takes two different branches/codebases and merges it together.

`git merge origin/master`

Now local code should be synced up with the remote repo.

## Merge Strategy

Fast-forward - simplest type of strategy when commits are connected together so the pointer can be moved to the most recent commits.

We'll take a look at merge again later to look at more complex merge strategy.

For now there is a much simpler one

## Git Pull

Combine the fetch & merge from the previous section with the pull command.

When you work on a software project that changes frequently you'll often be pulling down new code from the remote repo.

`git pull origin master`

To do everything in a single go.

However since we used the -u flag setting up the repo earlier we don't need to specify the remote branch

## Uncommitted Changes

One important thing to point out. If you have any uncommited changed in your current working dir and you try to pull down something from the remote.

The operation will fail! - Must have clear working dir.

Because it's not just going to overwrite your local changes.

The way to address that problem is to either commit your lcoal changes first or use a technique called stash

## Merge Conflict

Another thing is to be aware of is that your local code is modifying the same line of code that you're trying to pull and merge in. It could result in a merge conflict

## Git Clone

Clone a remote repository to your local machine and optionally change the name of the director.

When you clone a repo it will write and clone all the files in the remote to your local machine, but it also keeps a reference to the original repo.

That means that you can use most of the git commands on it.

`git clone <repo-url> <local-directory>`

## Github Codespaces

Press `.` to activate vscode in github to commit small changes without having to clone the entire repo to your local machine.

One limitation is that you can't access the terminal.

So you can't build and serve the app.

Codespaces is a paid service and allows you to run a vm inside github so you will have access to the terminal.
