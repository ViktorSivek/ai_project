import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://aplikace.policie.cz/dopravni-informace/GetFile.aspx?dt=20240104150101');
        const data = await response.text();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching XML data' });
    }
}