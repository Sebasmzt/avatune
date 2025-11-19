interface Env {
  // Add bindings here when needed
  [key: string]: unknown
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
