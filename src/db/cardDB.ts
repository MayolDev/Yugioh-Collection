// db.ts
let request: IDBOpenDBRequest;
let db: IDBDatabase;
const  version = 1;
const expectedVersion = 1;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Abrir la conexión
    const request = indexedDB.open('cardDB');

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Si el almacén de datos (object store) 'cards' no existe, créalo
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id' });
      }

      // No es necesario resolver aquí; la resolución se manejará en request.onsuccess
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Capturar la versión actual de la base de datos
      const version = db.version;

      // Si la versión no está establecida o no es la versión esperada, cerrar la conexión y actualizar la versión
      if (version === 0 || version < expectedVersion) {
        db.close();

        const upgradeRequest = indexedDB.open('cardDB', expectedVersion);

        upgradeRequest.onupgradeneeded = (upgradeEvent) => {
          const upgradedDB = (upgradeEvent.target as IDBOpenDBRequest).result;

          // Realizar las actualizaciones necesarias en la estructura de la base de datos
          if (!upgradedDB.objectStoreNames.contains('cards')) {
            upgradedDB.createObjectStore('cards', { keyPath: 'id' });
          }
        };

        upgradeRequest.onsuccess = () => {
          resolve(true);
        };

        upgradeRequest.onerror = () => {
          resolve(false);
        };
      } else {
        // La versión es la esperada, no es necesario realizar una actualización
        resolve(true);
      }
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open('cardDB', version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      // Agregar un manejador de eventos para el evento de éxito de la transacción
      tx.oncomplete = () => {
        resolve(data);
      };

      // Agregar un manejador de eventos para el evento de error de la transacción
      tx.onerror = () => {
        const error = tx.error?.message;
        if (error) {
          resolve(error);
        } else {
          resolve('Unknown error');
        }
      };

      // Añadir los datos al almacén
      const addRequest = store.add(data);

      // Agregar manejadores de eventos para el evento de éxito y error de la solicitud de añadir
      addRequest.onsuccess = () => {
        // No es necesario hacer nada aquí, ya que el éxito se maneja en tx.oncomplete
      };

      addRequest.onerror = () => {
        const error = addRequest.error?.message;
        if (error) {
          resolve(error);
        } else {
          resolve('Unknown error');
        }
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};

  export const getStoreData = <T>(storeName: string): Promise<T[]> => {
    return new Promise((resolve) => {
      request = indexedDB.open('cardDB');
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const res = store.getAll();
        res.onsuccess = () => {
          resolve(res.result);
        };
      };
    });
  };

  export const getData = <T>(storeName: string, key: number): Promise<T> => {
    return new Promise((resolve) => {
      request = indexedDB.open('cardDB');
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const res = store.get(key);
        res.onsuccess = () => {
          resolve(res.result);
        };
      };
    });
  }

  export const updateData = <T>(storeName: string, data: T): Promise<T> => {
    return new Promise((resolve) => {
      request = indexedDB.open('cardDB', version);
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put(data);
        resolve(data);
      };
    });
  }

  export const existsData = (storeName: string, key: number): Promise<boolean> => {
    return new Promise((resolve) => {
      request = indexedDB.open('cardDB');
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const res = store.get(key);
        res.onsuccess = () => {
          resolve(res.result ? true : false);
        };
      };
    });
  }


  export const deleteData = (storeName: string, key: number): Promise<boolean> => {
    return new Promise((resolve) => {
      // again open the connection
      request = indexedDB.open('cardDB', version);
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const res = store.delete(key);
  
        // add listeners that will resolve the Promise
        res.onsuccess = () => {
          resolve(true);
        };
        res.onerror = () => {
          resolve(false);
        }
      };
    });
  };

  export const clearData = (storeName: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // again open the connection
      request = indexedDB.open('cardDB', version);
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const res = store.clear();
  
        // add listeners that will resolve the Promise
        res.onsuccess = () => {
          resolve(true);
        };
        res.onerror = () => {
          resolve(false);
        }
      };
    });
  }