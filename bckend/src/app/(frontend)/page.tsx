import { headers as getHeaders } from 'next/headers.js';
import Image from 'next/image';
import { getPayload } from 'payload';
import React from 'react';
import { fileURLToPath } from 'url';

import config from '@/payload.config';
import './styles.css';

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  // Replace this URL with the one from your Media collection
  const logoURL = 'http://localhost:3000/api/media/file/logo-whitea1.png';

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet={logoURL} />
          <Image
            alt="Fearless Logo"
            height={65}
            src={logoURL}
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to the Fearless Admin Panel.</h1>}
        {user && <h1>Welcome back, {user.email}!</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to Admin Panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Payload Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  );
}