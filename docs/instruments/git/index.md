# Git

<https://fireship.io/courses/git/>

## Do A Git Checkout

```bash
git checkout main
```

## Fetch Origin

```bash
git fetch origin
```

## Reset Local Repository

```bash
git reset --hard origin/main
```

## Clean Up Any Untracked Changes

```bash
git clean -xdf
```

The -x flag removes ignored files.
The -d flag removes untracked folders.
The -f flag removes untracked file.

<https://www.freecodecamp.org/news/git-reset-origin-how-to-reset-a-local-branch-to-remote-tracking-branch/>

## Save Current State of Local Branch

```bash
git commit -a -m "I am saving my work"
git branch backup_work
```

## If you are on a detached head and you want to push to your remote branch

```bash
git push origin HEAD:name-of-your-branch
```

<https://stackoverflow.com/questions/35736116/making-a-git-push-from-a-detached-head>

## Otherwise you can create a new branch and push to it (it will be created automatically)

```bash
git branch new-branch-name
git push -u origin new-branch-name
```
