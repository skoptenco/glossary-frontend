import S from "./Graph.styles";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    // addEdge,
    ReactFlowProvider,
    useReactFlow, addEdge, type OnConnect, MarkerType,
} from '@xyflow/react';
import type {OnNodesChange, OnEdgesChange} from '@xyflow/react';
import type {Node, Edge} from '@xyflow/react'
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {getApi} from "@/shared/api";
import ELK from 'elkjs/lib/elk.bundled.js';
import type { ElkExtendedEdge, ElkNode, LayoutOptions} from 'elkjs';
import '@xyflow/react/dist/style.css'
import type {Term} from "@/shared/model/term";
import type {Relation} from "@/shared/model/relation";

const transformTermToNode = (term: Term): Node => {
    return {
        id: term.keyword,
        position: {x: 0, y: 0},
        data: {
            label: term.keyword
        }
    }
}

const transformRelationToEdge = (relation: Relation): Edge => {
    return {
        id:  `${relation.source_keyword}->${relation.target_keyword}`,
        source: relation.source_keyword,
        target: relation.target_keyword,
        label: relation.relation_type,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
        },
    }
}

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150',
    'elk.layered.spacing.edgeNodeBetweenLayers': '30',
    'spacing.componentComponent': '20',
    'elk.spacing.nodeNode': '140',
    'elk.edgeRouting': 'POLYLINE'
};

const getLayoutedElements = (nodes: Node[], edges: ElkExtendedEdge[], options: LayoutOptions = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph: ElkNode = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            width: 150,
            height: 50,
        })),
        edges: edges,
    };

    return elk
        .layout(graph)
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children!.map((node) => ({
                ...node,
                position: {x: node.x, y: node.y},
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
};

const LayoutFlow = () => {
    const [terms, setTerms] = useState<Term[]>([]);
    const [relations, setRelations] = useState<Relation[]>([]);

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const {fitView} = useReactFlow();

    useEffect(() => {
        getApi.getTerms().then(response => setTerms(response.data));
        getApi.getRelations().then(response => setRelations(response.data));
    }, [setTerms, setRelations]);

    const onLayout = useCallback(({direction = 'DOWN'}) => {
        const opts = { 'elk.direction': direction, ...elkOptions };
        const ns = terms.map(term => transformTermToNode(term));
        const es: ElkExtendedEdge[] = relations.map(rel => transformRelationToEdge(rel)).map(edge => ({...edge, sources: [edge.source], targets: [edge.target]}));

        getLayoutedElements(ns, es, opts).then(
            (res: any) => {
                setNodes(res.nodes);
                setEdges(res.edges);
                fitView();
            },
        );

    }, [terms, relations, setNodes, setEdges, fitView]);

    useLayoutEffect(() => {
        onLayout({ direction: 'LEFT' });
    }, [onLayout]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => {
            return applyNodeChanges(changes, nodesSnapshot || [])
        }),
        [],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        />
    );
}

const Graph = () => {


    return (
        <S.GraphWrapper style={{width: '100vw', height: '100vh'}}>
            <ReactFlowProvider>
                <LayoutFlow/>
            </ReactFlowProvider>
        </S.GraphWrapper>
    );
};

export default Graph;