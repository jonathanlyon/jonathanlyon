# jonathanlyon.com

Jonathan Lyon's personal journal for essays, field notes, fragments, photo
stories and moments. The site is built with Astro, edited through Pages CMS,
and designed for static deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Publishing with Pages CMS

1. Sign in at [Pages CMS](https://app.pagescms.org/) with GitHub.
2. Select the `jonathanlyon/jonathanlyon` repository.
3. Pages CMS will detect `.pages.yml` and expose the Journal collection.
4. Create or edit an entry, upload web-sized images, then save.
5. Pages CMS commits the change to GitHub and Vercel deploys it automatically.

Entries live in `src/content/journal`. Images uploaded through the CMS are
stored in `public/images`.

## Vercel

Import the GitHub repository into Vercel. The framework preset should be
detected as Astro. No environment variables are required.
