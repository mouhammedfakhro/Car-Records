import { NextResponse } from 'next/server';

const TESLA_API_URL = 'https://fleet-api.prd.eu.vn.cloud.tesla.com/api/1/vehicles/LRWYGCEK4MC052047/vehicle_data';
const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkhnQWhQNnB1aVVXcGpISDdZUV9GY3U3WW9TSSIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X3R5cGUiOiJwZXJzb24iLCJhbXIiOlsicHdkIiwibWZhIiwib3RwIl0sImF1ZCI6WyJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92My91c2VyaW5mbyIsImh0dHBzOi8vZmxlZXQtYXBpLnByZC5ldS52bi5jbG91ZC50ZXNsYS5jb20iLCJodHRwczovL2ZsZWV0LWFwaS5wcmQubmEudm4uY2xvdWQudGVzbGEuY29tIl0sImF1dGhfdGltZSI6MTc3MTU4MDYwNiwiYXpwIjoiNThiM2VlYjQtOWFmZS00NGMzLTliMDktOGI4ZTBjYjYyMjVkIiwiZXhwIjoxNzcxNjA5NDI0LCJpYXQiOjE3NzE1ODA2MjQsImlzcyI6Imh0dHBzOi8vYXV0aC50ZXNsYS5jb20vb2F1dGgyL3YzL250cyIsImxvY2FsZSI6InN2LVNFIiwib3VfY29kZSI6IkVVIiwic2NwIjpbIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIiwidmVoaWNsZV9kZXZpY2VfZGF0YSIsInZlaGljbGVfbG9jYXRpb24iXSwic3ViIjoiNjIyNDBkYzMtZWYxZC00YjM2LWE4NjUtYWNkMGYzN2IwNDgxIn0.NuLwUzWtx09sFyEQ2a65383XF8nYsl8DTZYS6QeUs19T9rSRaKpvqr8ileWo7O5-RT0NvYtnVQugkIdVcL1R9G5TyvkAthJBZr1oQjAiBkdfZQ6httMK12Xnb82Ch4KppBhuEb1eT_VXrfoGipcH3r8RaRVnDWQeLZdk3h5uxZgUqOAmoQGlQgDWL6Xn1Xis_tr5s4dCXNWFWZCcWjtwL7Rmo4a--DxNhD3zOq--vnOwYIre7vndfZrERwjPEpZQT2G5O54IHx91R16OXY3yxcmpRZiwKJGSfePOpA9V6lZsg8j-kvWDzyIOSGHn0gQvRTbRVngoJqDr85RWOuRCsQ';

export async function GET() {
  try {
    const response = await fetch(TESLA_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tesla API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Tesla data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data' },
      { status: 500 }
    );
  }
}
