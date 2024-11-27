# Assets Directory

This directory will contain:
- Character sprites (extracted from the provided ZIP file)
- Tile sets for the town generation

Please add your PNG assets here in the following structure:

```
assets/
├── characters/
│   └── player/
│       └── female_character.png
└── tiles/
    └── town/
        ├── grass.png
        └── path.png
```

Note: The female character sprite sheet should be arranged in a 4x4 grid with:
- Row 1: Walking down animation frames
- Row 2: Walking up animation frames
- Row 3: Walking left animation frames
- Row 4: Walking right animation frames