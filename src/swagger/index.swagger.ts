import { SwaggerOptions } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import "dotenv/config";

const port = process.env.PORT || 4200;

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock Management API",
      version: "1.0.0",
    },
    servers: [
      { url: `https://secure-journey-54754.herokuapp.com`, description: "development server" },
    ],
  },
  securityDefinitions: {
    bearerAuth: {
      type: "jwt",
      name: "Authorization",
      schema: "bearer",
      in: "header",
    },
  },
  apis: ["./src/app.ts", "./src/routes/*.ts", "./src/routes/wallet-stocks/*.ts", "./src/swagger/schema.swagger.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
