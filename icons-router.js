import React from "react";
import ReactDOM from "react-dom/server";
import { IconContext } from "react-icons";
import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as cgIcons from "react-icons/cg";
import * as ciIcons from "react-icons/ci";
import * as diIcons from "react-icons/di";
import * as faIcons from "react-icons/fa";
import * as fa6Icons from "react-icons/fa6";
import * as fcIcons from "react-icons/fc";
import * as fiIcons from "react-icons/fi";
import * as giIcons from "react-icons/gi";
import * as goIcons from "react-icons/go";
import * as grIcons from "react-icons/gr";
import * as hiIcons from "react-icons/hi";
import * as hi2Icons from "react-icons/hi2";
import * as imIcons from "react-icons/im";
import * as ioIcons from "react-icons/io";
import * as io5Icons from "react-icons/io5";
import * as liaIcons from "react-icons/lia";
import * as luIcons from "react-icons/lu";
import * as mdIcons from "react-icons/md";
import * as piIcons from "react-icons/pi";
import * as riIcons from "react-icons/ri";
import * as rxIcons from "react-icons/rx";
import * as siIcons from "react-icons/si";
import * as slIcons from "react-icons/sl";
import * as tbIcons from "react-icons/tb";
import * as tfiIcons from "react-icons/tfi";
import * as tiIcons from "react-icons/ti";
import * as vscIcons from "react-icons/vsc";
import * as wiIcons from "react-icons/wi";
import { createSuffixTrie } from "@bkkmg/suffix-trie";
import express from "express";

const iconsRouter = express.Router();

const trie = createSuffixTrie();
[
  aiIcons,
  biIcons,
  bsIcons,
  cgIcons,
  ciIcons,
  diIcons,
  faIcons,
  fa6Icons,
  fcIcons,
  fiIcons,
  giIcons,
  goIcons,
  grIcons,
  hiIcons,
  hi2Icons,
  imIcons,
  ioIcons,
  io5Icons,
  liaIcons,
  luIcons,
  mdIcons,
  piIcons,
  riIcons,
  rxIcons,
  siIcons,
  slIcons,
  tbIcons,
  tfiIcons,
  tiIcons,
  vscIcons,
  wiIcons,
].forEach((icons) =>
  Object.keys(icons).forEach(
    (iconName) =>
      iconName != "default" &&
      trie.add(iconName, {
        name: iconName,
        svgElement: ReactDOM.renderToString(
          React.createElement(
            IconContext.Provider,
            { value: { size: "22" } },
            icons[iconName]()
          )
        ),
      })
  )
);

iconsRouter.get("/:search", async (req, res) => {
  if (req.params.search.length > 2) {
    const results = trie.query(req.params.search);
    return res.status(200).json({
      count: results.length,
      results,
    });
  }
  res.send("Search must be at least 3 characters long");
});

iconsRouter.get("/svg/:name", async (req, res) => {
  const icon = trie.query(req.params.name)[0];

  if (icon)
    return res
      .status(200)
      .header({ "content-type": "image/svg+xml" })
      .send(icon.svgElement);
  res.status(404).send("Not Found");
});

export default iconsRouter;
