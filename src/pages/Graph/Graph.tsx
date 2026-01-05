import S from "./Graph.styles";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import type { OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react'
import {useCallback, useEffect, useState} from "react";
import {getApi} from "@/shared/api";
import '@xyflow/react/dist/style.css'

const Graph = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        getApi.getTerms().then(response => setNodes(response.data.map((term, index) => ({
            id: term.keyword,
            position: { x: Math.floor(index / 10) * 100, y:  index % 10 * 100},
            data: {
                label: term.keyword,
            }
        }))));
        getApi.getRelations().then(response => setEdges(response.data.map(relation => ({
            id: "" + relation.id,
            source: relation.source_keyword,
            target: relation.target_keyword,
            label: relation.relation_type
        }))));
    }, []);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
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
        <S.GraphWrapper style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </S.GraphWrapper>
    );
};

export default Graph;