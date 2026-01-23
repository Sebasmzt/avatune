tests # Avatune API Documentation

This document outlines the steps to set up and run the Avatune API server.

## 1. Project Setup

The API is a Bun-based server written in TypeScript. It's located in the `api` directory.

### Files

- `api/package.json`: Defines the project's dependencies and scripts.
- `api/tsconfig.json`: TypeScript configuration for the API.
- `api/src/index.ts`: The main source code for the API server.

*Annotation: These files were created to set up a new, self-contained API server within the existing monorepo structure.*

## 2. Dependencies

The API relies on several packages from the Avatune workspace:

- `@avatune/types`: Contains the data structures for themes, avatars, and configurations.
- `@avatune/utils`: Provides utility functions for selecting avatar parts and colors.
- `@avatune/vanilla`: The vanilla renderer that generates the SVG code.
- `@avatune/fatin-verse-theme`: The theme used for generating the avatars.

*Annotation: We are using a specific theme (`fatin-verse-theme`) for this API, but it could be easily adapted to use any other theme from the `packages/themes` directory.*

## 3. Workspace Configuration

To make the local packages available to the API, the `api` directory needs to be added to the bun workspace configuration in the root `package.json` file.

Add `"api"` to the `"workspaces"` array in the root `package.json`:

```json
{
  ... 
  "workspaces": [
    "apps/*",
    "packages/core/*",
    "packages/assets/*",
    "packages/predictors/*",
    "packages/renderers/*",
    "packages/rsbuild-plugins/*",
    "packages/themes/*",
    "api"
  ],
  ...
}
```

*Annotation: This step is crucial for monorepo development. It allows us to use the local packages as if they were installed from a remote registry, which is essential for rapid development and testing.*

## 4. Installing Dependencies

After updating the workspace configuration, run the following command from the root of the project to install the dependencies:

```bash
bun install
```

*Annotation: `bun install` will link the local packages defined in the workspace, making them available to the API.*

## 5. Running the API

To start the API server, you have two options:

### From the root of the project

You can run the API from the root of the monorepo using the following command:

```bash
bun dev --filter=api
```

### From the `api` directory

Alternatively, you can run the API from within its own directory:

```bash
cd api
bun run dev
```

The server will start on `http://localhost:3000`.

*Annotation: The `dev` script in `api/package.json` uses `bun run --hot` to automatically restart the server when changes are made to the source code.*

## 6. Usage

You can generate an avatar by sending a `POST` request to the server with a JSON body containing the avatar configuration.

Here's an example using `curl`:

```bash
curl -X POST \
  http://localhost:3000/ \
  -H 'Content-Type: application/json' \
  -d '{
    "hair": "long-01",
    "eyes": "variant-01",
    "mouth": "variant-01",
    "hairColor": "#a86454"
  }' \
  -o avatar.svg
```

This will generate an avatar and save it to `avatar.svg`.

*Annotation: The request body is an `AvatarConfig` object. You can specify any of the properties defined in the `AvatarConfig` type to customize the avatar.*
