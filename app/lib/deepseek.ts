import type { DeepSeekResponse } from '../../types'

const API_URL = process.env.DEEPSEEK_API_URL ?? 'https://api.deepseek.ai/v1/query'
const API_KEY = process.env.DEEPSEEK_API_KEY

// Simple in-memory rate limiter per key/IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10
const buckets = new Map<string, { ts: number; count: number }>()

function getClientKey(ip?: string) {
  return ip ?? 'anonymous'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || now - b.ts > RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { ts: now, count: 1 })
    return false
  }
  if (b.count >= RATE_LIMIT_MAX) return true
  b.count += 1
  return false
}

export async function queryDeepSeek(question: string, clientIp?: string): Promise<string> {
  if (!question || typeof question !== 'string') {
    return 'Je suis désolé, je n’ai pas compris la question.'
  }

  const key = getClientKey(clientIp)
  if (isRateLimited(key)) {
    return 'Trop de requêtes — veuillez réessayer dans une minute.'
  }

  if (!API_KEY) {
    // Graceful fallback without exposing secrets
    console.warn('DeepSeek API key missing; returning canned fallback response')
    return 'Service de recherche indisponible pour le moment. Veuillez réessayer plus tard.'
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ question }),
    })

    if (!res.ok) {
      console.warn('DeepSeek responded with', res.status)
      return 'Le service de DeepSeek a retourné une erreur. Réessayez plus tard.'
    }

    const payload = (await res.json()) as DeepSeekResponse | unknown

    // Defensive parsing
    if (payload && typeof payload === 'object') {
      const p = payload as DeepSeekResponse
      if (typeof p.answer === 'string') return p.answer
      if (typeof (p as any).text === 'string') return (p as any).text
    }

    return 'Aucune réponse disponible.'
  } catch (err) {
    console.error('DeepSeek query failed', err)
    return 'Erreur interne lors de la recherche — veuillez réessayer.'
  }
}
