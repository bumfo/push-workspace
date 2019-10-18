#!/bin/sh

REF="$1"
if [ -z "${REF}" ]; then
    echo Empty ref specified
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo Token invalid
    exit 1
fi

REMOTE_REPO="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

cd "${GITHUB_WORKSPACE}" || exit 1
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .

if git commit -am "Pushed From Action ${GITHUB_ACTION}"; then
    git push "${REMOTE_REPO}" HEAD:"${REF}"
    exit "$?"
else
    echo Nothing to push
    exit 0
fi
