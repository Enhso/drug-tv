'use client';

import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { fetchGraphTopology } from '@/lib/api';
import { GraphData } from '@/lib/types';
import { useAppStore } from '@/lib/store';

export function GraphView() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cyInstance, setCyInstance] = useState<any>(null);
  const { setSelectedElementId, clearSelection } = useAppStore();

  useEffect(() => {
    fetchGraphTopology()
      .then((graphData) => {
        setData(graphData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load graph data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!cyInstance) return;

    const handleElementTap = (event: any) => {
      const id = event.target?.id?.();
      if (id) {
        setSelectedElementId(id);
      }
    };

    const handleBackgroundTap = (event: any) => {
      if (event.target === cyInstance) {
        clearSelection();
      }
    };

    const handleMouseOver = (event: any) => {
      const target = event.target;
      if (!target) return;

      const neighborhood = target.neighborhood();
      const all = cyInstance.elements();

      all.removeClass('hover-highlight hover-fade');
      target.addClass('hover-highlight');
      neighborhood.addClass('hover-highlight');

      all.difference(target.union(neighborhood)).addClass('hover-fade');
    };

    const handleMouseOut = () => {
      cyInstance.elements().removeClass('hover-highlight hover-fade');
    };

    cyInstance.on('tap', 'node, edge', handleElementTap);
    cyInstance.on('tap', handleBackgroundTap);
    cyInstance.on('mouseover', 'node, edge', handleMouseOver);
    cyInstance.on('mouseout', 'node, edge', handleMouseOut);

    return () => {
      cyInstance.off('tap', 'node, edge', handleElementTap);
      cyInstance.off('tap', handleBackgroundTap);
      cyInstance.off('mouseover', 'node, edge', handleMouseOver);
      cyInstance.off('mouseout', 'node, edge', handleMouseOut);
    };
  }, [cyInstance, setSelectedElementId, clearSelection]);

  if (loading) {
    return <div className="flex items-center justify-center h-[600px] text-zinc-400">Loading graph...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-[600px] text-red-400">{error}</div>;
  }

  if (!data) {
    return null;
  }

  const elements = [
    ...data.nodes.map((node) => ({
      data: {
        id: node.id,
        label: node.label,
        type: node.type,
        ...node.data,
      },
    })),
    ...data.edges.map((edge) => ({
      data: {
        ...edge.data,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      },
    })),
  ];

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-width': 2,
        'text-outline-color': '#666',
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'border-color': '#fef08a', // amber-200 for highlight
        'background-color': '#fbbf24',
        'text-outline-color': '#fbbf24',
      }
    },
    {
      selector: 'node[type="drug"]',
      style: {
        'background-color': '#3b82f6', // blue-500
        'text-outline-color': '#3b82f6',
        'shape': 'rectangle'
      }
    },
    {
      selector: 'node[type="target"]',
      style: {
        'background-color': '#22c55e', // green-500
        'text-outline-color': '#22c55e',
        'shape': 'ellipse'
      }
    },
    {
      selector: 'node[type="disease"]',
      style: {
        'background-color': '#ef4444', // red-500
        'text-outline-color': '#ef4444',
        'shape': 'diamond'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#a1a1aa', // zinc-400 (light gray)
        'target-arrow-color': '#a1a1aa',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },
    {
      selector: '.hover-highlight',
      style: {
        'opacity': 1,
        'text-opacity': 1,
        'shadow-blur': 12,
        'shadow-opacity': 0.35,
        'shadow-color': '#fef3c7', // amber-100 glow
        'z-index': 999
      }
    },
    {
      selector: '.hover-fade',
      style: {
        'opacity': 0.2,
        'text-opacity': 0.2
      }
    }
  ];

  const layout = {
    name: 'cose',
    animate: false,
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  };

  return (
    <div className="w-full h-[600px] border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900">
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        layout={layout}
        stylesheet={stylesheet}
        cy={(cy) => {
          if (!cyInstance) {
            setCyInstance(cy);
          }
        }}
        zoomingEnabled={true}
        userZoomingEnabled={true}
        panningEnabled={true}
        userPanningEnabled={true}
        autolock={false}
        autounselectify={false}
      />
    </div>
  );
}
