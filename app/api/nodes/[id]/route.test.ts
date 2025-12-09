/**
 * @jest-environment node
 */
import { GET } from './route';

describe('GET /api/nodes/[id]', () => {
  it('returns node details for a valid ID', async () => {
    const params = Promise.resolve({ id: 'CHEMBL_D1' });
    const response = await GET(new Request('http://localhost/api/nodes/CHEMBL_D1'), { params });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('drugbankId', 'DB00619');
    expect(data).toHaveProperty('mechanismOfAction');
  });

  it('returns 404 for an invalid ID', async () => {
    const params = Promise.resolve({ id: 'NON_EXISTENT_ID' });
    const response = await GET(new Request('http://localhost/api/nodes/NON_EXISTENT_ID'), { params });
    
    expect(response.status).toBe(404);
  });

  it('returns 404 for potentially malicious IDs', async () => {
    const params = Promise.resolve({ id: '../secret' });
    const response = await GET(new Request('http://localhost/api/nodes/../secret'), { params });
    
    expect(response.status).toBe(404);
  });
});
