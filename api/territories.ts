import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST'], 
});
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  try {

    const response = await axios.get("https://netzwelt-devtest.azurewebsites.net/Territories/All");
    const data = response.data;

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
}
