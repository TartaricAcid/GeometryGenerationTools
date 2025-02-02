import {addCustomCube, addCustomGroup} from "../utils/add.js";

export function generateCylinderLengthMode(group, edge, length, hasGroup) {
    let angle = (2 * Math.PI) / edge;
    let radius = Math.sqrt((length * length) / 2 / (1 + Math.cos(angle)));
    generateCylinder(group, edge, radius, hasGroup);
}

export function generateRingLengthMode(group, edge, length, hasGroup) {
    let angle = (2 * Math.PI) / edge;
    let radius = Math.sqrt((length * length) / 2 / (1 + Math.cos(angle)));
    generateRing(group, edge, radius, hasGroup);
}

export function generateCylinder(group, edge, radius, hasGroup) {
    Undo.initEdit({outliner: true, elements: [], selection: true});
    let cubesBefore = elements.length;

    let rootGroup = initRootGroup(group);
    let selectedGroup = rootGroup;

    let angleIncrement = (2 * Math.PI) / edge;
    let x = radius * Math.cos(angleIncrement);
    let y = radius * Math.sin(angleIncrement);
    let width = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y, 2));
    let length = Math.sqrt(Math.pow(2 * radius, 2) - Math.pow(width, 2));
    let count = edge / 2;

    if (hasGroup) {
        for (let i = 0; i < count; i++) {
            let deg = 360 / edge * i;
            selectedGroup = addCustomGroup(selectedGroup, [0, 0, 0], [0, deg, 0]);
            addCustomCube(selectedGroup, [-width / 2, 0, -length / 2], [width, 1, length]);
            selectedGroup = rootGroup;
        }
    } else {
        for (let i = 0; i < count; i++) {
            let deg = 360 / edge * i;
            addCustomCube(rootGroup, [-width / 2, 0, -length / 2], [width, 1, length], [0, deg, 0]);
        }
    }

    Undo.finishEdit("add_polygon_bone", {
        outliner: true,
        elements: elements.slice().slice(cubesBefore),
        selection: true
    });

    Canvas.updateAll();
}

export function generateRing(group, edge, radius, hasGroup) {
    Undo.initEdit({outliner: true, elements: [], selection: true});
    let cubesBefore = elements.length;

    let rootGroup = initRootGroup(group);
    let selectedGroup = rootGroup;

    let angleIncrement = (2 * Math.PI) / edge;
    let x = radius * Math.cos(angleIncrement);
    let y = radius * Math.sin(angleIncrement);
    let edgeLength = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y, 2));
    let z = (edgeLength / 2) / Math.tan(Math.PI / edge);

    if (hasGroup) {
        for (let i = 0; i < edge; i++) {
            let deg = 360 / edge * i;
            selectedGroup = addCustomGroup(selectedGroup, [0, 0, 0], [0, deg, 0]);
            addCustomCube(selectedGroup, [-edgeLength / 2, 0, z], [edgeLength, 1, 0]);
            selectedGroup = rootGroup;
        }
    } else {
        for (let i = 0; i < edge; i++) {
            let deg = 360 / edge * i;
            addCustomCube(rootGroup, [-edgeLength / 2, 0, z], [edgeLength, 1, 0], [0, deg, 0]);
        }
    }

    Undo.finishEdit("add_polygon_bone", {
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