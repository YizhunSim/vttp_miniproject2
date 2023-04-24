# Build Angular app
FROM node:14-alpine as build-angular

WORKDIR /app

# Copy Files
COPY client/angular.json .
COPY client/package.json .
COPY client/package-lock.json .
COPY client/tsconfig.json .
COPY client/tsconfig.app.json .
COPY client/tsconfig.spec.json .
COPY client/src ./src

# Install Angular
RUN npm install -g @angular/cli

# Install packages and build
RUN npm install
RUN ng build

# Build Spring Boot app with Angular files
FROM maven:3.8.4-openjdk-17-slim as build-spring-boot

WORKDIR /app

## build
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/pom.xml .
COPY backend/src ./src

# Copy compiled angular app to static directory
COPY --from=build-angular /app/dist/client/* ./src/main/resources/static/

# Build the application
RUN mvn package -Dmaven.test.skip=true

# Run Spring Boot app with Angular files
FROM eclipse-temurin:19-jre

WORKDIR /app

COPY --from=build-spring-boot /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar

ENV PORT=8080
ENV DB_SERVER=localhost
ENV DB_PORT=3306
ENV SPRING_DATASOURCE_URL=jdbc:mysql://${DB_SERVER}:${DB_PORT}/goodreads
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=rootroot

EXPOSE ${PORT}

ENTRYPOINT java -Dserver.port=${PORT} -jar backend.jar
