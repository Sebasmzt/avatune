import type { HairColorPredictorClass } from '@avatune/types'
import * as tf from '@tensorflow/tfjs'

export type HairColorResult = {
  color: HairColorPredictorClass
  confidence: number
  probabilities: Record<HairColorPredictorClass, number>
}

type ModelState = {
  model: tf.LayersModel
  classes: string[]
}

/**
 * Load the TensorFlow.js model and classes
 */
async function loadModel(modelDir: string): Promise<ModelState> {
  const normalizedDir = modelDir.endsWith('/')
    ? modelDir.slice(0, -1)
    : modelDir
  const modelPath = `${normalizedDir}/model.json`

  try {
    const response = await fetch(modelPath)
    const modelJSON = await response.json()

    // Fix the InputLayer config - convert batch_shape to inputShape
    if (
      modelJSON.modelTopology?.model_config?.config?.layers?.[0]?.class_name ===
      'InputLayer'
    ) {
      const inputLayer = modelJSON.modelTopology.model_config.config.layers[0]
      if (inputLayer.config.batch_shape) {
        const batchShape = inputLayer.config.batch_shape
        inputLayer.config.inputShape = batchShape.slice(1)
        delete inputLayer.config.batch_shape
      }
    }

    const weightsManifest = modelJSON.weightsManifest
    const weightsPath = `${normalizedDir}/${weightsManifest[0].paths[0]}`
    const weightsResponse = await fetch(weightsPath)
    const weightsData = await weightsResponse.arrayBuffer()

    const model = await tf.loadLayersModel(
      tf.io.fromMemory({
        modelTopology: modelJSON.modelTopology,
        weightSpecs: weightsManifest[0].weights,
        weightData: weightsData,
      }),
    )

    const classes = await loadClasses(normalizedDir)

    return { model, classes }
  } catch (error) {
    console.error('Failed to load model:', error)
    throw new Error(`Failed to load hair color model: ${error}`)
  }
}

/**
 * Load class labels from classes.json
 */
async function loadClasses(modelDir: string): Promise<string[]> {
  try {
    const classesPath = `${modelDir}/classes.json`
    const response = await fetch(classesPath)
    const data = await response.json()
    return data.classes || data
  } catch (error) {
    console.warn('Could not load classes.json, using fallback:', error)
    return ['black', 'brown', 'blond', 'gray']
  }
}

/**
 * Predict hair color from image tensor
 *
 * @param modelState - Loaded model and classes
 * @param imageTensor - Normalized image tensor [H, W, 3] in range [0, 1]
 * @returns Hair color prediction with confidence and probabilities
 */
function predict(
  modelState: ModelState,
  imageTensor: tf.Tensor3D,
): HairColorResult {
  return tf.tidy(() => {
    const resized = tf.image.resizeBilinear(imageTensor, [128, 128])
    const batched = resized.expandDims(0) as tf.Tensor4D
    const predictions = modelState.model.predict(batched) as tf.Tensor
    const probabilities = predictions.dataSync()

    const maxProbability = Math.max(...Array.from(probabilities))
    const maxIndex = Array.from(probabilities).indexOf(maxProbability)

    const allProbabilities: Record<HairColorPredictorClass, number> = {
      black: 0,
      brown: 0,
      blond: 0,
      gray: 0,
    }
    modelState.classes.forEach((color, i) => {
      allProbabilities[color as HairColorPredictorClass] = probabilities[i]
    })

    return {
      color: modelState.classes[maxIndex] as HairColorPredictorClass,
      confidence: maxProbability,
      probabilities: allProbabilities,
    }
  })
}

/**
 * Create a hair color predictor
 */
export function createHairColorPredictor(modelDir: string) {
  let modelStatePromise: Promise<ModelState> | null = null

  return {
    async loadModel(): Promise<void> {
      if (!modelStatePromise) {
        modelStatePromise = loadModel(modelDir)
      }
      await modelStatePromise
    },

    async predict(imageTensor: tf.Tensor3D): Promise<HairColorResult> {
      if (!modelStatePromise) {
        throw new Error('Model not loaded. Call loadModel() first.')
      }
      const modelState = await modelStatePromise
      return predict(modelState, imageTensor)
    },
  }
}
