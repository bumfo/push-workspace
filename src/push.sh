#!/bin/sh

# echo Hello World
# exit 0

REF=$1
if [ -z $1 ]; then
    REF='dist'
fi

REMOTE_REPO="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

cd "${GITHUB_WORKSPACE}" || exit 1
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .
git commit -am "Pushed From Action ${GITHUB_ACTION}" && git push ${REMOTE_REPO} :$REF
exit $?