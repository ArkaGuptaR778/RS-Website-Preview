<p align="center">
  <img src=".github/readme-banner.svg" alt="RS Software — Corporate Website" width="100%">
</p>

<p align="center">
  <a href="https://www.rssoftware.com"><img alt="Live site" src="https://img.shields.io/badge/live-www.rssoftware.com-0075b7?style=flat-square"></a>
  <img alt="Hosted on GitHub Pages" src="https://img.shields.io/badge/hosted%20on-GitHub%20Pages-14b8a6?style=flat-square&logo=github">
  <img alt="Built with Gatsby" src="https://img.shields.io/badge/built%20with-Gatsby-5cc5bf?style=flat-square&logo=gatsby&logoColor=white">
</p>

# RS Software — Corporate Website

This repository holds the **published files** of the RS Software corporate website, served through **GitHub Pages** at **[www.rssoftware.com](https://www.rssoftware.com)**.

RS Software helps banks, payment networks, fintechs and payment ecosystem players move billions of transactions securely, reliably and efficiently. The site introduces the company, its payment products, its leadership team, and its thinking on real-time payments.

> **Note:** Everything here is the *finished, ready-to-serve* website, produced by a Gatsby build. The editable source code lives in a separate project. To change the site, edit the source, rebuild, and replace these files (see [Updating the site](#updating-the-site)).

---

## What's on the site

| Section | Address | What it covers |
|---|---|---|
| Home | `/` | Company overview, products, clients and partners |
| About | `/about/` | Company story, philosophy and patents |
| Products | `/products/…` | **BillEdge**, **DigitalEdge**, **IntelliEdge** and **Payabbhi** |
| People | `/people/…` | Leadership team profiles |
| Insights | `/insights/…` | Articles on ISO 20022, FedNow, request-to-pay, fraud, open banking and more |
| News | `/news/…` | Company announcements and press coverage |
| Careers | `/careers/…` | Open roles and the application form |
| Our Culture | `/our-culture/` | Life and values at RS Software |
| Investor | `/investor/` | Investor information |
| Contact / Request a Demo | `/contact/`, `/request-demo/` | Ways to get in touch |
| Sandbox | `/sandbox/` | Product sandbox page |
| Legal & Sitemap | `/legal/`, `/sitemap/` | Policies and a full page list |

## What's in this repository

```
├── index.html             Home page
├── <page>/index.html      Each page of the site, in its own folder
├── assets/                Images, logos, team photos and videos
├── page-data/, static/    Data and files Gatsby needs to run the pages
├── *.js, styles.*.css     Site code and styling (generated — don't edit by hand)
├── CNAME                  Tells GitHub Pages to use www.rssoftware.com
├── .nojekyll              Tells GitHub Pages to serve the files exactly as they are
├── sitemap-index.xml      Sitemap for search engines
└── robots.txt             Instructions for search engine crawlers
```

> ⚠️ Please **don't delete `CNAME` or `.nojekyll`**. Without `CNAME` the custom web address stops working; without `.nojekyll` parts of the site fail to load.

## Updating the site

1. Make your changes in the website's **source project** (the Gatsby project).
2. Build it with `gatsby build`. This creates a `public/` folder.
3. Replace the contents of this repository with the contents of that `public/` folder. Keep `CNAME`, `.nojekyll`, this `README.md` and the `.github/` folder.
4. Commit and push. GitHub Pages republishes the site automatically, usually within a few minutes.
5. Open [www.rssoftware.com](https://www.rssoftware.com) on **both a desktop and a phone** to check that everything looks right.

## Hosting

| | |
|---|---|
| **Host** | GitHub Pages (Settings → Pages) |
| **Custom domain** | `www.rssoftware.com` (set by the `CNAME` file) |
| **Framework** | Gatsby (React) — static site |

## Contact

For questions about the website, please reach out through the [Contact page](https://www.rssoftware.com/contact/).

---

<p align="center"><sub>© RS Software. All rights reserved. Client and partner logos belong to their respective owners.</sub></p>
