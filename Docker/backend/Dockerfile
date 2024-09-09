#Build Stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
copy pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Run Stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/BookStore-1.0.0.jar /app/
EXPOSE 8088
ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profile.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} BookStore-${JAR_VERSION}.jar