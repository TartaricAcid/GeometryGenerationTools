import {addCustomCube, addCustomGroup} from "../utils/add.js";

export function generateConeLengthMode(group, topLength, bottomLength, edge, length) {
    let angle = (2 * Math.PI) / edge;
    let topDiameter = Math.sqrt((topLength * topLength) / 2 / (1 + Math.cos(angle))) * 2;
    let bottomDiameter = Math.sqrt((bottomLength * bottomLength) / 2 / (1 + Math.cos(angle))) * 2;

    generateCone(group, topDiameter, bottomDiameter, edge, length);
}

export function generateCone(group, topDiameter, bottomDiameter, edge, length) {
    Undo.initEdit({outliner: true, elements: [], selection: true});
    let cubesBefore = elements.length;

    let angleIncrement = (2 * Math.PI) / edge;
    let radius = Math.max(topDiameter, bottomDiameter) / 2;
    let x = radius * Math.cos(angleIncrement);
    let y = radius * Math.sin(angleIncrement);
    let edgeLength = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y, 2)) - 2;

    let deg = Math.radToDeg(Math.asin(Math.abs(topDiameter - bottomDiameter) / 2 / length));

    let rootGroup = initRootGroup(group);
    let selectedGroup = rootGroup;
    let beta = Math.atan(Math.sin(Math.degToRad(deg) * Math.tan(Math.PI / edge)));

    for (let i = 0; i < edge; i++) {
        let box1;
        selectedGroup = addCustomGroup(selectedGroup, [0, 0, 0], [0, (360 / edge) * i, 0]);
        selectedGroup = addCustomGroup(selectedGroup, [0, 0, Math.cos(beta) + (edgeLength / 2)],
            [-deg, 0, 0]);
        addCustomCube(selectedGroup, [-edgeLength / 2, -1 * Math.sin(beta), (Math.cos(beta) + edgeLength / 2) / Math.tan(Math.PI / edge)],
            [edgeLength, length, 0]);
        box1 = addCustomGroup(selectedGroup, [edgeLength / 2, -1 * Math.sin(beta), Math.cos(beta) + edgeLength / 2], [0, 0, Math.radToDeg(beta)]);
        addCustomCube(box1, [edgeLength / 2, -1 * Math.sin(beta), (Math.cos(beta) + edgeLength / 2) / Math.tan(Math.PI / edge) - 0.001], [1, length, 0]);
        box1 = addCustomGroup(selectedGroup, [-edgeLength / 2, -1 * Math.sin(beta), Math.cos(beta) + edgeLength / 2], [0, 0, -Math.radToDeg(beta)]);
        addCustomCube(box1, [-edgeLength / 2 - 1, -1 * Math.sin(beta), (Math.cos(beta) + edgeLength / 2) / Math.tan(Math.PI / edge) + 0.001], [1, length, 0]);
        selectedGroup = rootGroup;
    }

    Undo.finishEdit("add_square_skirt_bone", {
        outliner: true,
        elements: elements.slice().slice(cubesBefore),
        selection: true
    });

    Canvas.updateAll();
}

function initRootGroup(group) {
    let rootGroup = new Group({
        origin: group ? group.origin : undefined
    });
    rootGroup.addTo(group);
    if (Format.bone_rig) {
        rootGroup.createUniqueName();
    }
    rootGroup.init();
    return rootGroup;
}