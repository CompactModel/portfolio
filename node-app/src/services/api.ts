const API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8080/api`;
const BASE    = process.env.PUBLIC_URL || '';

export async function getProfile() {
  return fetch(`${API_URL}/profile`).then(r => r.json());
}

export async function getProjects() {
  return fetch(`${API_URL}/projects`).then(r => r.json());
}

export async function getSkills() {
  return fetch(`${API_URL}/skills`).then(r => r.json());
}

export async function getEducation() {
  return fetch(`${API_URL}/education`).then(r => r.json());
}

export async function sendContact(data: { name: string; email: string; message: string }) {
  return fetch(`${API_URL}/contact`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
}

export async function getStaticData() {
  return fetch(`${BASE}/static-data.json`).then(r => r.json());
}
