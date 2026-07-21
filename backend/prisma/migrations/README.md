Prisma 7 stores datasource connection details in prisma.config.ts, not in schema.prisma.
Use `DATABASE_URL` in backend/.env and keep the datasource provider in schema.prisma.
Run migrations with `npx prisma migrate dev --name init`.