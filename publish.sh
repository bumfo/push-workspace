branch=$(git symbolic-ref --short -q HEAD)
if [ "$branch" != 'v1-release' ]; then
  echo "Wrong branch: $branch"
  exit 1
fi

rm -rf node_modules
npm i --production
git add .
git commit -am'v1'
