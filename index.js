const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Children = require('./models/childrenModel');
const Collection = require('./models/collectionModel');
const Sub = require('./models/subsModel');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/proyecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Children {
    _id: ID!
    name: String!
    pin: String!
    avatar: String!
    age: Int!
    collections: [Collection!]!
  }

  type Collection {
    _id: ID!
    name: String!
    videos: Int!
  }

  type Query {
    getChildCollections(childrenId: ID!): [Collection!]!
  }
`);

// Definir los resolutores
const root = {
  getChildCollections: async ({ childrenId }) => {
    try {
      const subs = await Sub.find({ children: childrenId });
      const collectionIds = subs.map(sub => sub.collection);
      const collections = await Collection.find({ _id: { $in: collectionIds } });
      return collections;
    } catch (error) {
      throw new Error('Error fetching collections:', error);
    }
  }
};

// Endpoint GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true 
}));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


<?php

// Abstracción: Separación de la lógica de negocio y la implementación específica

abstract class StorageBackend {
    abstract public function storeFile($path, $contents);
    abstract public function getFile($path);
    abstract public function deleteFile($path);
}

class LocalStorageBackend extends StorageBackend {
    public function storeFile($path, $contents) {
        // Implementación específica para almacenamiento local
    }

    public function getFile($path) {
        // Implementación específica para recuperar archivos desde almacenamiento local
    }

    public function deleteFile($path) {
        // Implementación específica para eliminar archivos desde almacenamiento local
    }
}

class S3StorageBackend extends StorageBackend {
    public function storeFile($path, $contents) {
        // Implementación específica para almacenamiento en AWS S3
    }

    public function getFile($path) {
        // Implementación específica para recuperar archivos desde AWS S3
    }

    public function deleteFile($path) {
        // Implementación específica para eliminar archivos desde AWS S3
    }
}

// Modularidad: División del sistema en componentes independientes y reutilizables

class FileStorage {
    private $backend;

    public function __construct(StorageBackend $backend) {
        $this->backend = $backend;
    }

    public function storeFile($path, $contents) {
        $this->backend->storeFile($path, $contents);
    }

    public function getFile($path) {
        return $this->backend->getFile($path);
    }

    public function deleteFile($path) {
        $this->backend->deleteFile($path);
    }
}

// Ocultamiento de Información (Encapsulamiento): Protección de la implementación interna

$fileStorage = new FileStorage(new LocalStorageBackend());
$fileStorage->storeFile('/path/to/file.txt', 'Hello, world!');
$fileContents = $fileStorage->getFile('/path/to/file.txt');
$fileStorage->deleteFile('/path/to/file.txt');

// Cohesión: Agrupación de funcionalidades relacionadas en un componente

class UserManager {
    public function createUser() {
        // Crear usuario
    }

    public function updateUser() {
        // Actualizar usuario
    }

    public function deleteUser() {
        // Eliminar usuario
    }
}

// Acoplamiento: Dependencia entre componentes

class UserModule {
    private $userManager;

    public function __construct(UserManager $userManager) {
        $this->userManager = $userManager;
    }

    public function createUser() {
        $this->userManager->createUser();
    }

    public function updateUser() {
        $this->userManager->updateUser();
    }

    public function deleteUser() {
        $this->userManager->deleteUser();
    }
}

// Consistencia: Mantenimiento de estándares y convenciones en el código

// En el código de Nextcloud, se sigue un estilo de codificación consistente y se utilizan patrones de diseño comunes en todo el proyecto.

// Claridad: Código limpio y fácil de entender

// El código de Nextcloud está bien documentado y sigue convenciones de nomenclatura claras y comprensibles, lo que facilita su comprensión y mantenimiento.
