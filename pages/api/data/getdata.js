import data from "../../data";


export default async function handler(req, res) {
  if (req.method === "GET") {
    res.staus(200).json({
      data: JSON.stringify(data.icons)
    })
  }
  else {
    res.staus(405).end();
  }
}