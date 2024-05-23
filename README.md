Fernando Herrera Course

https://cursos.devtalles.com/courses/take/nextjs/lessons/45856412-introduccion

# Development

Steps to build the app in

1.  Build the database

```
docker compose up -d
```

2.  Create a copy of the .env.template to rename it to .env
3.  Replace environment variables
4.  Run the command

```
npm install
```

5.  Run the command

```
npm run dev
```

6.  Run these prisma commands

```
npx prisma migrate dev
npx prisma generate
```

7.  Run the seed to [create the local database](http://localhost:3000/api/seed)

# Prisma

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage
