import { WorkerImplementation } from "../types/master"

export const defaultPoolSize = typeof navigator !== "undefined" && navigator.hardwareConcurrency
  ? navigator.hardwareConcurrency
  : 4

export function selectWorkerImplementation(): typeof WorkerImplementation {
  return Worker
}
