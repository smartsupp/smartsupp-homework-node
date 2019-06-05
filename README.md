# smartsupp-homework-node

## Install

```bash
make install
docker-compose up
```

Now when you open docker-compose.yml you can see public port, for node application its `9100`.
You can test it via `http://localhost:9100/status`

## Development

Install modules from docker
```bash
docker-compose run --rm app npm i npm install --save @hapi/joi
``` 

## Homework (todo)

Create Simple OAuth server to provide `authorize` and `token` methods. 

- register client ( `POST /clients/:id` this method is only for internal usage to manage available clients)
- then get `code` via authorize method (`GET /oauth/authorize`)
- with this `code` you should be able call `token` method (`GET /oauth/token`) and get access token.
- with access token you should be able access to protected section `GET /api/test`

Make some usage-tests in `jest` as example how it works.
There is no need to make OAuth specification compatible server rather show

- how you can deal with async/await
- how you can write tests

They are used some "recommended" libs you can use...
 
- `koa` - routing
- `joi` - validation
- `jest` - testing
- `ioredis` - redis client
- `axios` - request client
- `node-injectable` - dependency builder via comment hints

GL & HF

NOTE: they are some libs like `auth-server`, `koa-oauth-server` and others but not recommended to use, they have issues or no longer maintained.