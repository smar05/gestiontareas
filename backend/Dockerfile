FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/gestion-tareas-0.0.1-SNAPSHOT.jar app-0.0.1-SNAPSHOT.jar
COPY src/main/resources /app/src/main/resources

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app-0.0.1-SNAPSHOT.jar"]
