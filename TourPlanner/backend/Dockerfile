# Build: Java 25 official image
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# copy wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# add execute permissions to mvnw
RUN chmod +x mvnw

# download dependencies
RUN ./mvnw dependency:go-offline

# copy source code and compile
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Runtime stage with smaller image
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
