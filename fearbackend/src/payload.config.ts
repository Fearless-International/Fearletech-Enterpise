import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Projects } from './collections/Projects'; // Import Projects collection
import { LogoBrandingProjects } from './collections/LogoBrandingProjects';
import { VideoEditingAnimationProjects } from './collections/VideoEditingAnimationProjects'; // Import the new collection
import { CreativeBrandingProjects } from './collections/CreativeBrandingProjects'; // Import the new collection
import { SocialMediaManagementProjects } from './collections/SocialMediaManagementProjects'; // Import the new collection
import { ContentCreationProjects } from './collections/ContentCreationProjects'; // Import the new collection
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, LogoBrandingProjects, VideoEditingAnimationProjects, CreativeBrandingProjects, SocialMediaManagementProjects, ContentCreationProjects], // Add ContentCreationProjects to the collections array
  cors: ['http://localhost:5173'], // Allow requests from your frontend's origin
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});