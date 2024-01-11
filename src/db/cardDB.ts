// db.ts
let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;



export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('cardDB');

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id' });
      }
      // no need to resolve here
    };

    request.onsuccess =  () => {
      
      db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
    
  });
};


export const addData = <T>(storeName: string, data: T): Promise<T|string|null> => {
    return new Promise((resolve) => {
      request = indexedDB.open('cardDB', version);
  
      request.onsuccess = () => {
        db = request.result;
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.add(data);
        resolve(data);
      };
  
      request.onerror = () => {
        const error = request.error?.message
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