#!/usr/bin/env node
const http = require('http');
const fs   = require('fs');
const path = require('path');

const API  = 'http://localhost:8080/api';
const BASE = '/portfolio'; // must match "homepage" in package.json

function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 8000 }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error(`Invalid JSON from ${url}`)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function demoSlug(title) {
  const t = title.toLowerCase();
  if (/auto|apex|motor|car/.test(t))             return 'autoservice';
  if (/barber|hair|cut/.test(t))                 return 'barbershop';
  if (/sultan|döner|doner|kebab/.test(t))        return 'kebab';
  if (/brew|soul|coffee|café|cafe/.test(t))      return 'cafe';
  if (/restaurant|bella|food|dining/.test(t))    return 'restaurant';
  return null;
}

async function main() {
  console.log(`Fetching from ${API} …`);

  let profile, projects, skills, experience, education;
  try {
    [profile, projects, skills, experience, education] = await Promise.all([
      get(`${API}/profile`),
      get(`${API}/projects`),
      get(`${API}/skills`),
      get(`${API}/experience`),
      get(`${API}/education`),
    ]);
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    console.error('  Start the backend first:  docker-compose up -d\n');
    process.exit(1);
  }

  projects = (projects || []).map(p => {
    const s = demoSlug(p.title);
    return {
      ...p,
      link:  p.link ?? (s ? `${BASE}/demo-sites/${s}/` : null),
      image: null,
    };
  });

  const data = {
    profile,
    projects,
    skills:     skills     || [],
    experience: experience || [],
    education:  education  || [],
  };

  const dest = path.join(__dirname, '../public/static-data.json');
  fs.writeFileSync(dest, JSON.stringify(data, null, 2));
  console.log(`✓ static-data.json updated — ${projects.length} projects, ${(skills||[]).length} skills`);
}

main();
