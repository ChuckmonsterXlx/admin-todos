# Development

Steps to build the app in

1.  Build the database

```
docker compose up -d
```

2.  Rename the .env.template to .env
3.  Replace environment variables
4.  Run the seed to [create the local database](http://localhost:3000/api/seed)

# Prisma

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage
