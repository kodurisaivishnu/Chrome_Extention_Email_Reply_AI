# 📧 Email Writer Spring Boot Application

This project is a simple Email Reply Generator built with Spring Boot. It takes an email content and desired tone, sends it to the Gemini API, and returns a professional reply.

## 🚀 Features

✅ REST API endpoint to generate email replies  
✅ Integration with Google Gemini API  
✅ Easy deployment with Docker  
✅ Configurable port

## 🛠 Requirements

- Java 17+
- Maven
- (Optional) Docker

## 🔨 Building the Application

Clone the repository and build with Maven:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
mvn clean package
```

## ▶️ Running Locally

Run the generated jar file:

```bash
java -jar target/email-writer-sb-0.0.1-SNAPSHOT.jar
```

The server will start on the port configured in `application.properties` (e.g., 8084).

## 🔗 API Usage

Send a POST request to generate a reply:

```bash
POST http://localhost:8084/api/email/generate
Content-Type: application/json

{
  "emailContent": "Hello, thank you for reaching out to us.",
  "tone": "friendly"
}
```

Example response:

```json
{
  "reply": "Thank you for contacting us! ..."
}
```

## 🐳 Running with Docker

Build the Docker image:

```bash
docker build -t email-writer-sb .
```

Run the container:

```bash
docker run -d -p 8084:8084 email-writer-sb
```

The application will be available at:

```
http://localhost:8084/api/email/generate
```

## ⚙️ Configuration

You can change the port in `src/main/resources/application.properties`:

```properties
server.port=8084
```

The Gemini API URL and key are hardcoded in `EmailGeneratorService.java`. Update them if needed.
