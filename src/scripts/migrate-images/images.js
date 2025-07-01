const fs = require("fs-extra");
const path = require("path");

// Starting Image Component Migration...

// Configuration
const COMPONENTS_DIR = "./src/components";
const PAGES_DIR = "./src/pages";

// Image migration patterns
const imageMigrations = [
  {
    from: "import { StaticImage } from 'gatsby-plugin-image';",
    to: "import Image from 'next/image';",
    description: "StaticImage import",
  },
  {
    from: "import { GatsbyImage } from 'gatsby-plugin-image';",
    to: "import Image from 'next/image';",
    description: "GatsbyImage import",
  },
  {
    from: "import { getImage } from 'gatsby-plugin-image';",
    to: "// getImage not needed in Next.js",
    description: "getImage import",
  },
  {
    from: "<StaticImage",
    to: "<Image",
    description: "StaticImage component",
  },
  {
    from: "<GatsbyImage",
    to: "<Image",
    description: "GatsbyImage component",
  },
];

// Path migration patterns
const pathMigrations = [
  {
    from: 'src="../assets/images/',
    to: 'src="/images/',
    description: "Relative image paths to public paths",
  },
  {
    from: 'src="../../assets/images/',
    to: 'src="/images/',
    description: "Deep relative image paths to public paths",
  },
  {
    from: 'src="../../../assets/images/',
    to: 'src="/images/',
    description: "Very deep relative image paths to public paths",
  },
];

// Helper function to process a file
async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, "utf8");
    let modified = false;

    // Apply image migration patterns
    imageMigrations.forEach((migration) => {
      if (content.includes(migration.from)) {
        content = content.replace(
          new RegExp(
            migration.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
          ),
          migration.to
        );
        modified = true;
        // Migration applied successfully
      }
    });

    // Apply path migration patterns
    pathMigrations.forEach((migration) => {
      if (content.includes(migration.from)) {
        content = content.replace(
          new RegExp(
            migration.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g"
          ),
          migration.to
        );
        modified = true;
        // Migration applied successfully
      }
    });

    // Add width and height props to Image components if missing
    const imageRegex = /<Image([^>]*?)src="([^"]*)"([^>]*?)>/g;
    content = content.replace(imageRegex, (match, before, src, after) => {
      if (!before.includes("width=") && !after.includes("width=")) {
        // Add default width and height
        return `<Image${before}src="${src}"${after} width={1200} height={600}>`;
      }
      return match;
    });

    if (modified) {
      await fs.writeFile(filePath, content, "utf8");
      // File updated successfully
    }
  } catch (error) {
    // Error processing file
  }
}

// Helper function to find all JavaScript files
async function findJsFiles(dir) {
  const files = [];

  try {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        files.push(...(await findJsFiles(fullPath)));
      } else if (item.endsWith(".js") || item.endsWith(".jsx")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return files;
}

// Main migration function
async function migrateImages() {
  try {
    // Finding JavaScript files...

    // Find all JS files in components and pages directories
    const componentFiles = await findJsFiles(COMPONENTS_DIR);
    const pageFiles = await findJsFiles(PAGES_DIR);
    const allFiles = [...componentFiles, ...pageFiles];

    // Found files to process

    // Process each file
    for (const file of allFiles) {
      await processFile(file);
    }

    // Image migration completed!
    // Next steps:
    // 1. Review the changes made to your components
    // 2. Update any remaining image paths manually
    // 3. Add proper width and height props to Image components
    // 4. Test that all images load correctly
    // 5. Run: npm run dev to test the application
  } catch (error) {
    // Migration failed
    process.exit(1);
  }
}

// Run the migration
migrateImages();
