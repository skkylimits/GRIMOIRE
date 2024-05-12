# Git Started

Further expand and solidify your git knowledge 📚

## .git directory

In vscode settings. Remove **/.git from Preference Open: Settings UI (SHIFT + CTRL P) and search for Files: Exclude

## U & A

U = Untracked

A = Tracked

## Add Files

Add an entire working directory to the staging area:

`git add .`

## Remove Files

Remove a file from the staging area:

`git reset .`

## Commit Files

Commit staged files to a repository

`git commit -m "initial commit 🚀`

Tip: Add files and commit in a single command

`git commit -am "additional commit"`

Bonus: Make an alias

`git config --global alias.ac "commit -am"`

Now run:

`git ac "noice!`

## Git Logs

`git log`

For a more readable version:

`git log --graph --oneline --decorate`

## Git Bisect

Performs a binary search on yourr repo

`git bisect start`

Use on every good commit:

`git bisect good`

Continue this until you've found the bad apple then:

`git bisect bad`

## VSCODE TIPS

Don't forget the source control tab in vscode.

It's a hidden gem. The burger menu gives you an overview of all the possible git commands and an easy to use UI to see the diff in your files.

## Gitlens

Useful when working with bigger teams
