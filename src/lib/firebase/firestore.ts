import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  QueryConstraint,
  DocumentSnapshot,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore'
import { clientApp } from './config'
import type { PaginatedResult } from '@/types'

export const db = getFirestore(clientApp)

export { serverTimestamp, where, orderBy, limit, startAfter, query, collection, doc }

function makeConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = data as Record<string, unknown>
      return rest as DocumentData
    },
    fromFirestore(snap: QueryDocumentSnapshot, options: SnapshotOptions): T {
      return { id: snap.id, ...snap.data(options) } as T
    },
  }
}

export function createCollection<T extends { id: string }>(collectionPath: string) {
  const converter = makeConverter<T>()
  const colRef = () => collection(db, collectionPath).withConverter(converter)
  const docRef = (id: string) => doc(db, collectionPath, id).withConverter(converter)

  return {
    ref: colRef,
    docRef,

    async getById(id: string): Promise<T | null> {
      const snap = await getDoc(docRef(id))
      return snap.exists() ? snap.data() : null
    },

    async create(id: string, data: Omit<T, 'id'>): Promise<void> {
      await setDoc(docRef(id), { ...data, id } as WithFieldValue<T>)
    },

    async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<void> {
      await updateDoc(docRef(id), data as Partial<DocumentData>)
    },

    async delete(id: string): Promise<void> {
      await deleteDoc(docRef(id))
    },

    async add(data: Omit<T, 'id'>): Promise<string> {
      const ref = await addDoc(colRef(), data as WithFieldValue<T>)
      return ref.id
    },

    async query(...constraints: QueryConstraint[]): Promise<T[]> {
      const q = query(colRef(), ...constraints)
      const snap = await getDocs(q)
      return snap.docs.map((d) => d.data())
    },

    async paginate(
      constraints: QueryConstraint[],
      pageLimit: number,
      cursor?: DocumentSnapshot,
    ): Promise<PaginatedResult<T>> {
      const pageConstraints: QueryConstraint[] = [
        ...constraints,
        limit(pageLimit + 1),
        ...(cursor ? [startAfter(cursor)] : []),
      ]
      const q = query(colRef(), ...pageConstraints)
      const snap = await getDocs(q)
      const docs = snap.docs

      const hasMore = docs.length > pageLimit
      const items = docs.slice(0, pageLimit).map((d) => d.data())
      const lastCursor = hasMore ? docs[pageLimit - 1] : undefined

      return { items, hasMore, lastCursor }
    },
  }
}

export const Collections = {
  USERS: 'users',
  APPS: 'apps',
  REVIEWS: 'reviews',
  FAVORITES: 'favorites',
  REVIEW_VOTES: 'reviewVotes',
  AUDIT_LOGS: 'auditLogs',
} as const
