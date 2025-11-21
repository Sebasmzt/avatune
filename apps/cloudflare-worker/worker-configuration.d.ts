interface Env {
  RATE_LIMIT: KVNamespace
}

interface KVNamespace {
  get(key: string): Promise<string | null>
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
  passThroughOnException(): void
}

type ExportedHandler<E = unknown> = {
  fetch(
    request: Request,
    env: E,
    ctx: ExecutionContext,
  ): Response | Promise<Response>
}
