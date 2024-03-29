"use strict";

const fs = require("fs");

let final = [];
const estado = JSON.parse(fs.readFileSync("src/estados.json"));
const municipios = JSON.parse(fs.readFileSync("src/municipios.json"));
const getEstado = codigo => {
  const { uf, nome } = estado.filter(e => e.codigo_uf == codigo)[0];
  return { uf, name: nome };
};

municipios.map(e =>
  final.push({
    code: e.codigo_ibge,
    city: e.nome,
    state: getEstado(e.codigo_uf),
    location: {
      type: "Point",
      coordinates: [e.latitude, e.longitude]
    }
  })
);

fs.writeFileSync("src/final.json", JSON.stringify(final, null, 4), {
  encoding: "utf8",
  flag: "w"
});
