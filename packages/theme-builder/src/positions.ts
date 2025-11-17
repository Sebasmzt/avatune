import type { Position } from '@avatune/types'
import { offsetFrom, percentage } from '@avatune/utils'

/**
 * Position helper that calculates offset from head position
 */
export function fromHead(
  headPosition: (size: number) => { x: number; y: number },
) {
  return offsetFrom(headPosition)
}

/**
 * Create a position from percentage strings
 */
export function pos(x: string, y: string): Position {
  return (size: number) => ({
    x: size * percentage(x),
    y: size * percentage(y),
  })
}

/**
 * Create a position with absolute pixel values
 */
export function absPos(x: number, y: number): Position {
  return { x, y }
}

/**
 * Combine multiple position transformations
 */
export function combinePositions(
  ...positions: ((size: number) => { x: number; y: number })[]
): Position {
  return (size: number) => {
    const result = { x: 0, y: 0 }
    for (const positionFn of positions) {
      const offset = positionFn(size)
      result.x += typeof offset.x === 'number' ? offset.x : 0
      result.y += typeof offset.y === 'number' ? offset.y : 0
    }
    return result
  }
}
