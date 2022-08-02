# Base Auth Prisma

## Installing dependencies
- npm install

## Configure .env
- Set globals in .env file
    DATABASE_URL="mysql://root:@localhost:3306/base_auth_prisma?schema=public"
    NEXTAUTH_SECRET=9bf110500300facca2488ecad4c8924e

## Pushing database
- Verify database code in the prisma/schema.prisma file
- Verify seed code in the prisma/seed.ts file
- npx prisma generate
- npx prisma migrate dev

## OR

## Pulling database
- npx prisma init
- npx prisma db pull
- npx prisma generate

## Start
- npm run dev
