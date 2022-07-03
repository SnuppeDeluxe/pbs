//Imports von Node Modulen
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//Imports von ausgelagerten Funktionen
//const adminRoutes = require("./routes/admin.js");
//const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/error");

//Express starten
const app = express();

//EJS als Engine einrichten
app.set("view engine", "ejs");

//Body-Parser für req.body (Funktioniert nicht wie gewünscht)
app.use(bodyParser.urlencoded({ extended: false }));

//Lesezugriff auf das Filesystem
app.use(express.static(path.join(__dirname, "public")));

//Funktionen benutzen
//app.use(adminRoutes.routes);
//app.use(shopRoutes);

/*app.get("/", (req, res, next)=>{
  console.log("test");
  res.status(500);
});*/

//Page not found
app.use("/", errorController.PNF404);

//Port öffnen
app.listen(3000); //Erstellt den Server und öffnet den Port
