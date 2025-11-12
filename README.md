# 📝 Nayib's Blog

A personal blog built with Gatsby, React, and styled-components where I share my thoughts and experiences as a Software Engineer.

## 👤 Author

**Nayib Sarmiento** ([@nasarcacd](https://github.com/nasarcacd))  
📧 nayibsc@gmail.com

## ✨ Features

- 📱 Responsive design with styled-components
- 📝 Markdown-based blog posts
- ⚡ Blazing fast performance powered by Gatsby
- 🎨 Modern UI with React components
- 🖼️ Optimized images with gatsby-plugin-sharp
- 📄 SEO-friendly with React Helmet
- 🔍 GraphQL data layer

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```shell
   git clone https://github.com/nasarcacd/nasarca-gatsby-blog.git
   cd nasarca-gatsby-blog
   ```

2. **Install dependencies**

   ```shell
   npm install
   ```

3. **Start the development server**

   ```shell
   npm run develop
   ```

4. **View your blog**

   Your site is now running at `http://localhost:8000`!

   You can also access GraphiQL, a tool to experiment with querying your data, at `http://localhost:8000/___graphql`.

## 📜 Available Scripts

In the project directory, you can run:

### `npm run develop`

Runs the app in development mode with hot-reloading.  
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

### `npm run build`

Builds the app for production to the `public` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run serve`

Serves the production build locally for testing.  
Run `npm run build` first, then use this command to test the production build.

### `npm run clean`

Cleans the Gatsby cache and public directories.  
Use this if you're experiencing issues with cached data.

### `npm run format`

Formats all JavaScript, JSX, JSON, and Markdown files using Prettier.

## 🗂️ Project Structure

```
nasarca-gatsby-blog/
├── src/
│   ├── components/       # React components
│   ├── images/          # Image assets
│   ├── markdown-pages/  # Blog posts in Markdown format
│   ├── pages/           # Page components
│   └── templates/       # Page templates
├── gatsby-browser.js    # Browser APIs
├── gatsby-config.js     # Gatsby configuration
├── gatsby-node.js       # Node APIs (dynamic page creation)
├── gatsby-ssr.js        # Server-side rendering APIs
└── package.json         # Dependencies and scripts
```

## 🛠️ Tech Stack

- **[Gatsby](https://www.gatsbyjs.com/)** - React-based static site generator
- **[React](https://reactjs.org/)** - UI library
- **[styled-components](https://styled-components.com/)** - CSS-in-JS styling
- **[GraphQL](https://graphql.org/)** - Data query language
- **Markdown** - Content format for blog posts

### Gatsby Plugins Used

- `gatsby-plugin-react-helmet` - SEO management
- `gatsby-plugin-sharp` & `gatsby-transformer-sharp` - Image optimization
- `gatsby-plugin-styled-components` - styled-components integration
- `gatsby-source-filesystem` - File system data source
- `gatsby-transformer-remark` - Markdown transformer
- `gatsby-plugin-manifest` - PWA manifest
- `gatsby-plugin-image` - Modern image component

## 🔒 Security & Package Updates

This project is actively maintained and uses the latest stable versions of its direct dependencies:

- **Gatsby 5.15.0** - Latest stable version
- **React 18.3.1** - Latest React 18.x version
- **styled-components 6.1.19** - Latest version
- All Gatsby plugins are at their latest compatible versions

### Known Vulnerabilities

There are some known vulnerabilities in transitive dependencies (dependencies of Gatsby itself):

- **24 vulnerabilities** (18 low, 3 moderate, 3 high) in Gatsby's dependencies
- These are in development-time dependencies and do not affect production builds
- Fixing these would require downgrading Gatsby from v5.15.0 to v3.3.1 (breaking change)
- We're monitoring these and will upgrade when Gatsby releases updates

The vulnerabilities are in:

- `@parcel/reporter-dev-server` (moderate) - Parcel origin validation
- `cookie` (moderate) - Cookie parsing (dev dependency)
- `lodash.template` (high) - Command injection (dev dependency, in workbox-build)
- `tmp` (high) - Symbolic link handling (dev dependency, in inquirer)

All direct dependencies are kept up-to-date, and the project is regularly audited for security issues.

## 📝 Adding Blog Posts

To add a new blog post:

1. Create a new Markdown file in `src/markdown-pages/`
2. Add front matter with title and date:

   ```markdown
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   ---

   Your content here...
   ```

3. Save the file and it will automatically appear on your blog!

## 🌐 Deployment

This blog can be deployed to various platforms:

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nasarcacd/nasarca-gatsby-blog)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nasarcacd/nasarca-gatsby-blog)

### GitHub Pages

1. Build the site: `npm run build`
2. Deploy the `public` folder to GitHub Pages

## 📖 Learning Resources

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Gatsby Tutorial](https://www.gatsbyjs.com/tutorial/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [styled-components Documentation](https://styled-components.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/nasarcacd/nasarca-gatsby-blog/issues).

## 💬 Contact

Feel free to reach out if you have any questions or suggestions!

- GitHub: [@nasarcacd](https://github.com/nasarcacd)
- Email: nayibsc@gmail.com

---

Made with ❤️ by Nayib Sarmiento
