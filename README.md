# Push workspace

Push workspace back to Github

Usage: 
```yml
jobs:
  build:
    - uses: bumfo/push-workspace@v1-release
      with:
        ref: 'refs/heads/dist'
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```