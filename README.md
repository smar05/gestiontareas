# Gestion de tareas

A continuación se detallan las instrucciones para clonar, ejecutar y utilizar el backend del proyecto.

## Clonación del Repositorio

Para descargar el repositorio, utiliza el siguiente comando:

```bash
git clone https://github.com/smar05/gestiontareas.git
```

# Documentación del Proyecto

## Backend

### Entorno de desarrollo

Requisitos
- Java: 17
- Maven: 3.8.1 o superior
- Spring Boot: 3.3.5

#### Ejecución del Backend
1. Accede a la carpeta del backend:

```bash
cd backend
```

2. Ejecuta los siguientes comandos para compilar y empaquetar el proyecto:

```bash
mvn install
mvn package
```

3. Para ejecutar el proyecto, puedes usar uno de los siguientes métodos:
- Ejecutar el archivo JAR directamente:
```bash
java -jar gestion-tareas-0.0.1-SNAPSHOT.jar
```

- O ejecutar el proyecto con Maven:
  
```bash
mvn spring-boot:run
```
- También puedes utilizar un entorno de desarrollo como IntelliJ IDEA para ejecutar el proyecto.

El proyecto se despliega localmente en el puerto 8080.

#### Endpoints Disponibles

A continuación se detallan los endpoints disponibles en el API:

1. Consultar las tareas
Endpoint: /tasks
Método: GET

```bash
curl --location --request GET 'https://<url>/tasks' \
--header 'Content-Type: application/json'
```

2. Guardar una tarea
Endpoint: /tasks
Método: POST

```bash
curl --location 'https://<url>/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "title":"titulo",
    "description":"Descripcion",
    "date":"2024-11-06"
}'
```

3. Actualizar tarea
Endpoint: /tasks/{id}
Método: PUT

```bash
curl --location --request PUT 'https://<url>/tasks/{id}' \
--header 'Content-Type: application/json' \
--data '{
    "title":"titulo",
    "description":"Descripcion",
    "date":"2024-11-06"
}'
```

4. Eliminar la tarea
Endpoint: /tasks/{id}
Método: DELETE

```bash
curl --location --request DELETE 'https://<url>/tasks/{id}' \
--header 'Content-Type: application/json'
```

#### Despliegue en Docker
Se ha creado una imagen Docker que se puede clonar con.
```bash
docker pull smar05/gestiontareas:latest
```

Se ha desplegado en un servidor público. Puedes acceder al API en la siguiente URL:

[https://puntored-latest.onrender.com](https://gestiontareas.onrender.com)

# Frontend del Proyecto

Este proyecto es la interfaz de usuario desarrollada en Angular para interactuar con el API. A continuación se detallan las instrucciones para ejecutar y compilar el frontend.

## Requisitos

- **Node.js**: v20.0.0
- **Angular**: v16

## Ejecución del Frontend
1. Accede a la carpeta del frontend:

```bash
cd frontend
```

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run start
```

El aplicativo se ejecutará en el puerto 4200. Puedes acceder a él en tu navegador en la siguiente URL:

http://localhost:4200

## Compilación para Producción
Si deseas compilar el proyecto para llevarlo a producción, utiliza el siguiente comando:

```bash
npm run build
```

Esto creará una carpeta dist con los archivos necesarios para el despliegue del aplicativo.

El aplicativo se desplego en un servicio de hosting en la siguiente url:

[https://punto-red.netlify.app](https://gestion-tareas-front.netlify.app/)

# Contacto

Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarme:

**Correo Electrónico:** [mantillasanchezr@gmail.com](mailto:mantillasanchezr@gmail.com)
