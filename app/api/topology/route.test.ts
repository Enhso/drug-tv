/**
 * @jest-environment node
 */
import { GET } from './route';

describe('GET /api/topology', () => {
  it('returns the topology data', async () => {
    const response = await GET(new Request('http://localhost/api/topology'));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json');
    
    const data = await response.json();
    expect(data).toHaveProperty('nodes');
    expect(data).toHaveProperty('edges');
  });
});
