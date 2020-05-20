# Ghost API Action

Send a call to a Ghost API from GitHub

Exmaple Usage:
```
jobs:
    deployment
        - name: Deploy Stage
            uses: phys1ks/ghost-api-action@master
            with:
                url: 'https://blog.myghost.io/ghost/api/v3/admin/pages/{pageid}'
                method: 'PUT'
                id: ${{ secrets.GHOST_ADMIN_ID }}
                secret: ${{ secrets.GHOST_ADMIN_SECRET }}
                data: '{"pages":[{"title":"Updated page title","updated_at":"2020-05-19T23:30:37.000Z"}]}'
```

### Input Arguments

|Argument|  Description  |  Default  |
|--------|---------------|-----------|
|url     | Request URL   | _required_ Field |
|method  | Request Method| POST |
|data    | Request Body Content as JSON String, only for POST / PUT / PATCH Requests | '{}' |
|timeout| Request Timeout in ms | 5000 (5s) |
|id| Ghost Admin API ID ||
|secret| Ghost Admin API Secret ||

### Output

- `response` Request Response as JSON String


### Debug Informations

Enable Debug mode to get informations about

- Instance Configuration (Url / Timeout / Headers)
- Request Data (Body / Auth / Method)