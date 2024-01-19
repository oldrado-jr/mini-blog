import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../firebase/config';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) {
      return;
    }

    setLoading(true);

    try {
      const collectionRef = collection(db, docCollection);

      let q;

      if (search) {
        q = query(
          collectionRef,
          where(
            'tagsList',
            'array-contains',
            search
          ),
          orderBy('createdAt', 'desc')
        );
      } else if (uid) {
        q = query(
          collectionRef,
          where('uid', '==', uid),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(collectionRef, orderBy('createdAt', 'desc'));
      }

      onSnapshot(q, (querySnapshot) => {
        setDocuments(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
