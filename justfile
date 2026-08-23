api:
    bun install
    bunx turbo run build --filter='./packages/themes/*' --filter='./packages/assets/*' --filter=@avatune/vanilla --filter=@avatune/types --filter=@avatune/utils
    bun run --cwd api dev

clean:
    find . \( -name node_modules -o -name dist -o -name build -o -name out -o -name .next -o -name .turbo -o -name coverage -o -name storybook-static -o -name .vercel -o -name .preview -o -name .playwright-mcp \) -type d -prune -exec rm -rf {} +
    find . -name '*.tsbuildinfo' -type f -delete
