import { useSupabase } from '@app/core/use-supabase';
import { useUserStore } from '@app/stores';
import { useEffect, useMemo, useState } from 'react';

interface UsePatientGetPhotoResult {
  photoUrl: string | null;
}

interface CachedUrl {
  url: string;
  expiresAt: number;
}

// Cache em memória
const memoryCache = new Map<string, CachedUrl>();

const CACHE_KEY = 'patient-photos-cache';
const CACHE_EXPIRY = 50 * 60 * 1000;

function loadCacheFromStorage(): Map<string, CachedUrl> {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, CachedUrl>;
      const now = Date.now();
      const validEntries = Object.entries(parsed).filter(([, value]) => value.expiresAt > now);

      if (validEntries.length !== Object.keys(parsed).length) {
        const validCache = Object.fromEntries(validEntries);
        localStorage.setItem(CACHE_KEY, JSON.stringify(validCache));
      }

      return new Map(validEntries);
    }
  } catch {}
  return new Map();
}

function saveCacheToStorage(cache: Map<string, CachedUrl>) {
  try {
    const obj = Object.fromEntries(cache);
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
  } catch {}
}

const initialCache = loadCacheFromStorage();
for (const [key, value] of initialCache) {
  memoryCache.set(key, value);
}

export function usePatientGetPhoto(patientId: number | string | undefined): UsePatientGetPhotoResult {
  const supabase = useSupabase();
  const [user] = useUserStore();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  const publicUrl = useMemo(() => {
    if (!patientId) return null;

    const numericId = typeof patientId === 'string' ? Number(patientId) : patientId;
    if (Number.isNaN(numericId)) return null;

    const fileName = `perfil_${numericId}.jpg`;
    const { data } = supabase.storage.from('patient-photos').getPublicUrl(fileName);
    return data.publicUrl;
  }, [patientId, supabase]);

  useEffect(() => {
    if (!patientId || !user?.token) {
      setSignedUrl(null);
      return;
    }

    const numericId = typeof patientId === 'string' ? Number(patientId) : patientId;
    if (Number.isNaN(numericId)) {
      setSignedUrl(null);
      return;
    }

    const fileName = `perfil_${numericId}.jpg`;
    const cacheKey = `signed_${fileName}`;
    const now = Date.now();

    // Verificar cache
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      setSignedUrl(cached.url);
      return;
    }

    supabase.storage
      .from('patient-photos')
      .createSignedUrl(fileName, 3600)
      .then(({ data, error }) => {
        if (!error && data) {
          const expiresAt = now + CACHE_EXPIRY;
          const cacheEntry: CachedUrl = {
            url: data.signedUrl,
            expiresAt,
          };

          memoryCache.set(cacheKey, cacheEntry);
          saveCacheToStorage(memoryCache);

          setSignedUrl(data.signedUrl);
        }
      })
      .catch(() => {});
  }, [patientId, user?.token, supabase]);

  const photoUrl = signedUrl || publicUrl;

  return {
    photoUrl,
  };
}
