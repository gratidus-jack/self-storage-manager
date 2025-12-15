# Path Aliases Configuration

This project uses path aliases to enable clean, absolute-style imports across the monorepo.

## Configured Aliases

| Alias | Resolves To | Usage |
|-------|-------------|-------|
| `@/*` | `./src/*` (in client/server) | Internal module imports |
| `@shared/*` | `../shared/src/*` | Shared types and constants |

## Examples

### Before (Relative Imports)
```typescript
import { ApiError } from '../../../utils/ApiError.js';
import { env } from '../../config/environment.js';
import type { Unit } from '../../../shared/types/unit.js';
```

### After (Path Aliases)
```typescript
import { ApiError } from '@/utils/ApiError.js';
import { env } from '@/config/environment.js';
import type { Unit } from '@shared/types/unit.js';
```

## Configuration Files

### Client (React + Vite)

**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../shared/src/*"]
    }
  }
}
```

**vite.config.ts**
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
});
```

### Server (Node.js + TypeScript)

**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../shared/src/*"]
    }
  }
}
```

**vitest.config.ts**
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
});
```

**Build Process**
- Development: `tsx` natively supports TypeScript path aliases
- Production: `tsc-alias` resolves aliases after TypeScript compilation
- Build command: `tsc && tsc-alias`

## How It Works

### Development Mode
- **Client**: Vite's resolver handles the aliases via `vite.config.ts`
- **Server**: `tsx` (TypeScript executor) resolves aliases from `tsconfig.json`
- **Tests**: Vitest resolves aliases via `vitest.config.ts`

### Production Build
1. TypeScript compiles `.ts` files to `.js` with aliases intact
2. `tsc-alias` post-processes the output, converting aliases to relative paths
3. Result: Standard JavaScript with relative imports that Node.js can execute

## Benefits

1. **Cleaner Imports**: No more `../../../` chains
2. **Refactor-Friendly**: Moving files doesn't break imports
3. **Consistent**: Same pattern across client and server
4. **IDE Support**: Full autocomplete and go-to-definition
5. **Type-Safe**: TypeScript validates all imports

## Important Notes

- Always include `.js` extension in imports (ESM requirement)
- Path aliases work in both `.ts` and `.tsx` files
- Aliases are resolved at build/runtime, not by TypeScript directly
- The `@shared` alias allows cross-package imports in the monorepo

## Troubleshooting

### "Cannot find module '@/...'"
- Verify `baseUrl` and `paths` in `tsconfig.json`
- Check that `vite.config.ts` or `vitest.config.ts` has matching aliases
- Restart your IDE/dev server

### Build fails with unresolved aliases
- Ensure `tsc-alias` is installed: `npm install --save-dev tsc-alias`
- Verify build script includes: `tsc && tsc-alias`

### Tests can't resolve aliases
- Check `vitest.config.ts` has the `resolve.alias` configuration
- Ensure paths match those in `tsconfig.json`
