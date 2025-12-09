import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Basic sanitization: allow only alphanumeric characters, underscores, and hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 404 });
  }

  const jsonDirectory = path.join(process.cwd(), 'public', 'mock_node_details');
  const filePath = path.join(jsonDirectory, `${id}.json`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Node not found' }, { status: 404 });
  }
}
