//Imports von Node Modulen
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Imports von ausgelagerten Funktionen
//const adminRoutes = require("./routes/admin.js");
//const shopRoutes = require("./routes/shop.js");

//Express starten
const app = express();

//Body-Parser für req.body (Funktioniert nicht wie gewünscht)
app.use(bodyParser.urlencoded({ extended: false }));

//Lesezugriff auf das Filesystem
app.use(express.static(path.join(__dirname, "public")));

//Funktionen benutzen
//app.use(adminRoutes.routes);
//app.use(shopRoutes);

app.get("/", (req, res, next)=>{
  console.log("test");
  res.status(500);
});

//Page not found
/*app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});*/

//Port öffnen
app.listen(3000); //Erstellt den Server und öffnet den Port
