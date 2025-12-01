# @avatune/face-detector

[![npm version](https://img.shields.io/npm/v/@avatune/face-detector)](https://www.npmjs.com/package/@avatune/face-detector)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@avatune/face-detector)](https://bundlephobia.com/package/@avatune/face-detector)

Browser-based face detection using MediaPipe. Detects faces and provides bounding boxes for cropping.

## Installation

```bash
npm install @avatune/face-detector
```

## Usage

```ts
import { createFaceDetector } from '@avatune/face-detector'

const detector = await createFaceDetector({
  modelAssetPath: '/models/blaze_face_short_range.tflite',
})

const detections = await detector.detect(imageElement)

if (detections.length > 0) {
  const { boundingBox, confidence } = detections[0]
  console.log(`Face detected at (${boundingBox.x}, ${boundingBox.y})`)
  console.log(`Size: ${boundingBox.width}x${boundingBox.height}`)
  console.log(`Confidence: ${confidence}`)
}
```

## API

### `createFaceDetector(options)`

Creates a face detector instance.

```ts
const detector = await createFaceDetector({
  modelAssetPath: string    // Path to the TFLite model file
  minDetectionConfidence?: number  // Minimum confidence threshold (default: 0.5)
})
```

### `detector.detect(image)`

Detects faces in an image.

**Parameters:**
- `image` - HTMLImageElement, HTMLVideoElement, or HTMLCanvasElement

**Returns:**
```ts
Array<{
  boundingBox: FaceBoundingBox  // { x, y, width, height }
  confidence: number            // Detection confidence [0, 1]
}>
```

## Types

```ts
interface FaceBoundingBox {
  x: number
  y: number
  width: number
  height: number
}

interface FaceDetection {
  boundingBox: FaceBoundingBox
  confidence: number
}

interface CropPadding {
  top: number
  right: number
  bottom: number
  left: number
}
```

## License

MIT
