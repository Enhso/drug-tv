# drug-tv

An interactive drug-target-disease knowledge graph visualization tool built with Next.js, React, and Cytoscape.js. Explore relationships between drugs, molecular targets, and diseases through an intuitive graph interface with detailed node information panels.

![Drug-Target Interaction Graph](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## Features

- **Interactive Graph Visualization**: Powered by [Cytoscape.js](https://js.cytoscape.org/) for smooth, interactive network visualization
  - Hover effects with dynamic edge highlighting
  - Click to select and view detailed node information
  - Automatic layout with force-directed positioning
- **Node Details Panel**: View comprehensive information about:
  - **Drugs**: DrugBank ID, mechanism of action, max phase, polypharmacology score
  - **Targets**: Gene name, organism, target class
  - **Diseases**: Associated disease information
- **API Routes**: RESTful endpoints built with Next.js App Router
  - `/api/topology` - Graph structure and relationships
  - `/api/nodes/[id]` - Detailed node information
- **State Management**: Lightweight and reactive state handling with Zustand
- **Type-Safe**: Fully typed with TypeScript for robust development
- **Modern UI**: Dark theme optimized for data visualization using Tailwind CSS v4
- **Tested**: Comprehensive test coverage with Jest and React Testing Library

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Enhso/drug-tv.git
cd drug-tv

# Install dependencies
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
drug-tv/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── topology/      # Graph topology endpoint
│   │   └── nodes/[id]/    # Node details endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── graph/            # Graph visualization
│   │   └── GraphView.tsx
│   ├── layout/           # Layout components
│   │   └── AppShell.tsx
│   └── panel/            # Side panel
│       └── SidePanel.tsx
├── lib/                   # Utilities and helpers
│   ├── api.ts            # API client functions
│   ├── store.ts          # Zustand state management
│   └── types.ts          # TypeScript type definitions
├── public/               # Static assets
│   ├── mock_graph_topology.json
│   └── mock_node_details/
└── __tests__/            # Test files
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Visualization**: [Cytoscape.js](https://js.cytoscape.org/) + [react-cytoscapejs](https://github.com/plotly/react-cytoscapejs)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## API Endpoints

### GET `/api/topology`

Returns the complete graph structure with nodes and edges.

**Response:**
```json
{
  "nodes": [
    {
      "id": "CHEMBL_D1",
      "label": "Drug A",
      "type": "drug"
    }
  ],
  "edges": [
    {
      "source": "CHEMBL_D1",
      "target": "TARGET_T1",
      "type": "drug_target_interaction"
    }
  ]
}
```

### GET `/api/nodes/[id]`

Returns detailed information about a specific node.

**Response:**
```json
{
  "id": "CHEMBL_D1",
  "label": "Drug A",
  "type": "drug",
  "data": {
    "drugbankId": "DB00001",
    "description": "Drug description...",
    "mechanismOfAction": "...",
    "maxPhase": 4,
    "polypharmacologyScore": 0.85
  }
}
```

## Testing

The project includes comprehensive tests for components and API routes:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not currently licensed for public use.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Graph visualization powered by [Cytoscape.js](https://js.cytoscape.org/)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)
