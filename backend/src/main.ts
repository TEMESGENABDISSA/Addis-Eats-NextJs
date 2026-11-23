import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix("api");

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
      stopAtFirstError: false,
      disableErrorMessages: false,
    }),
  );

  // Enable CORS
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Addis Eats API")
    .setDescription(
      "Food delivery for Addis Ababa. Money is in santim; " +
      "phone numbers are TeleBirr format.",
    )
    .setVersion("1.0")
    .addTag("restaurants", "Kitchens that take orders")
    .addTag("dishes", "Items on a restaurant menu")
    .addTag("orders", "Customer orders and their status")
    .addTag("auth", "Authentication endpoints")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger only in non-production environments
  if (process.env.NODE_ENV !== "production") {
    SwaggerModule.setup("docs", app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  // Export OpenAPI spec if requested
  if (process.env.EXPORT_OPENAPI) {
    const fs = require("fs");
    fs.writeFileSync("openapi.json", JSON.stringify(document, null, 2));
    await app.close();
    return;
  }

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
