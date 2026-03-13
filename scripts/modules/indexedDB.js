export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("beltHubDB", 1);

    req.onupgradeneeded = () => {
      const db = req.result;

      if (!db.objectStoreNames.contains("rides"))
        db.createObjectStore("rides", { keyPath: "id", autoIncrement: true });

      if (!db.objectStoreNames.contains("cache"))
        db.createObjectStore("cache");
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveRide(ride) {
  const db = await openDB();
  const tx = db.transaction("rides", "readwrite");
  tx.objectStore("rides").add(ride);
  return tx.complete;
}

export async function getRides() {
  const db = await openDB();
  return new Promise(resolve => {
    const tx = db.transaction("rides", "readonly");
    const store = tx.objectStore("rides");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function cacheSet(key, value) {
  const db = await openDB();
  const tx = db.transaction("cache", "readwrite");
  tx.objectStore("cache").put(value, key);
  return tx.complete;
}

export async function cacheGet(key) {
  const db = await openDB();
  return new Promise(resolve => {
    const tx = db.transaction("cache", "readonly");
    const req = tx.objectStore("cache").get(key);
    req.onsuccess = () => resolve(req.result);
  });
}
