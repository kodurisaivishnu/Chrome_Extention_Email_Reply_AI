# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies first (leverages Docker cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the jar
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Create a minimal runtime image with the built jar
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port (matches what Spring Boot uses)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","/app/app.jar"]
