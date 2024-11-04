// Sentry Error Logging
import './utils/instrument'

import express, { Request, Response} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import * as Sentry from "@sentry/node";

//midllewares
import { authenticateToken } from "./middlewares/authToken.middleware";
import { logActivity } from "./middlewares/logActivity.middleware";

//routes
import medicalEquipmentRouter from "./routes/MedicalEquipmentRoutes";
import utilitiesRoutes from "./routes/UtilitiesRoute";
import userRoutes from "./routes/UserRoutes";
import propertyRoutes from "./routes/PropertyRoutes";
import researchCenterRoutes from "./routes/ResearchCenterRoutes";
import medicalSchoolRoutes from "./routes/MedicalSchoolRoutes";
import workforceRoutes from "./routes/WorkforceRoute";
import pharmaceuticalRoutes from "./routes/PharmaceuticalRoutes";


dotenv.config({path: "./env"});
 
console.log(process.env.PORT)



const mongoUri = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.MONGO_URI

const corsOptions = { 
  origin: "*",
  optionsSuccessStatus: 200,
};

mongoose
.connect(mongoUri!)
.then((r: any) => console.log("Database connected successfully"));


let port: any = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "This is the homepage" });
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


// middleware
// app.use(authenticateToken as any);
// app.use(logActivity);

app.use(cors(corsOptions));
//
// routes
app.use("/api/user", userRoutes);
app.use("/api/utility", utilitiesRoutes);
app.use("/api/equipment", medicalEquipmentRouter);
app.use("/api/research-center", researchCenterRoutes);
app.use("/api/medical-school", medicalSchoolRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/workforce", workforceRoutes);
app.use("/api/pharmaceuticals", pharmaceuticalRoutes);

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
