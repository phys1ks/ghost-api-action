# Ghost API Action

Send a call to a Ghost API from GitHub.

Currently this is in development and not ready for universal use.

Exmaple Usage:
```
jobs:
    deployment:
        runs-on: ubuntu-latest
        
        steps:
        # Checks-out your repository under $GITHUB_WORKSPACE, so this Action can access it
        - uses: actions/checkout@v2

        - name: Ghost API Call
            uses: phys1ks/ghost-api-action@master
            with:
                url: 'https://blog.myghost.io'
                key: ${{ secrets.GHOST_ADMIN_KEY }}
                version: 'v3'
                page: 'pageID here'
                readme: 'README.md'
```

### Input Arguments

|Argument|  Description  |  Default  |
|--------|---------------|-----------|
|url     | Request URL   | _required_ Field |
|key| Ghost Admin API Key | _required_ Field |
|version| API Version to use (I suggest v3) | Default: 'v3' |
|page    | Page ID to update | _required_ Field |
|readme| Name of your README.md file | Default: 'README.md' |