import data from "./data";
import { filterAndSortIcons } from "@/utils/functions";



export default async function handler(req, res) {

  if (req.method === "POST") {
    try {

      let { query, page, pageSize } = JSON.parse(req.body);
      let totalIcons = [];
      let icons_length = 0;
      let maxPages = 1;


      if (!query && query !== " ") {
        icons_length = data.icons.length;
        maxPages = Math.ceil(data.icons.length / pageSize);

        for (let i = ((page - 1) * pageSize); i < page * pageSize; i++) {
          if (i >= data.icons.length) break;
          totalIcons.push(data.icons[i]);
        }
      }

      else if (query && query !== "") {
        let result = filterAndSortIcons(query, data.icons);
        icons_length = result.length;
        maxPages = Math.ceil(result.length / pageSize);

        for (let i = ((page - 1) * pageSize); i < page * pageSize; i++) {
          if (i >= result.length) break;
          totalIcons.push(result[i]);
        }
      }

      if (maxPages === 0) maxPages = 1;

      res.status(200).json({
        icons: totalIcons,
        maxPages: maxPages,
        currIcons: icons_length
      })


    } catch (error) {
      res.status(200).json({
        msg: "ERROR",
        error: error
      })
    }

  }
  else {
    res.status(405).end();
  }
}