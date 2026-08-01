#!/bin/bash

echo "==== GITHUB AUTO PUSH SCRIPT ===="

read -p "Enter Git username: " username
read -p "Enter Git email: " email
read -p "Enter repository name: " repo
read -p "Enter commit message: " commitmsg
read -p "Enter branch name (default main): " branch

branch=${branch:-main}

echo "---- Setting local git identity ----"
git config user.name "$username"
git config user.email "$email"
#git config user.email "$username@mail.com"

echo "---- Initializing repo if needed ----"
if [ ! -d ".git" ]; then
    git init
fi

echo "---- Adding files ----"
git add .

echo "---- Commit ----"
git commit -m "$commitmsg"

echo "---- Setting branch ----"
git branch -M "$branch"

echo "---- Adding remote ----"
git remote remove origin 2>/dev/null
git remote add origin https://github.com/$username/$repo.git

echo "---- Push ----"
git push -u origin "$branch"

echo "==== DONE ===="
