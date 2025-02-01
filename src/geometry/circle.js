import {addCustomCube, addCustomGroup} from "../utils/add.js";

export function generateCylinder(group, edge, radius) {
    Undo.initEdit({outliner: true, elements: [], selection: true});
    let cubesBefore = elements.length;

    let rootGroup = initRootGroup(group);
    let selectedGroup = rootGroup;

    let angleIncrement = (2 * Math.PI) / edge;
    let count = edge / 2;
    for (let i = 0; i < count; i++) {
        let x1 = radius * Math.cos(i * angleIncrement);
        let y1 = radius * Math.sin(i * angleIncrement);
        let x2 = radius * Math.cos((i + 1) * angleIncrement);
        let y2 = radius * Math.sin((i + 1) * angleIncrement);

        let width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let length = Math.sqrt(Math.pow(2 * radius, 2) - Math.pow(width, 2));

        let deg = 360 / edge * i;
        selectedGroup = addCustomGroup(selectedGroup, [0, 0, 0], [0, deg, 0]);
        console.log(width);
        console.log(length);
        addCustomCube(selectedGroup, [-width / 2, 0, -length / 2], [width, 1, length]);
        selectedGroup = rootGroup;
    }

    Undo.finishEdit("add_polygon_bone", {
        outliner: true,
        elements: elements.slice().slice(cubesBefore),
        selection: true
    });

    Canvas.updateAll();
}

export function generateRing(group, edge, radius) {
    Undo.initEdit({outliner: true, elements: [], selection: true});
    let cubesBefore = elements.length;

    let rootGroup = initRootGroup(group);
    let selectedGroup = rootGroup;

    let angleIncrement = (2 * Math.PI) / edge;
    for (let i = 0; i < edge; i++) {
        let x1 = radius * Math.cos(i * angleIncrement);
        let y1 = radius * Math.sin(i * angleIncrement);
        let x2 = radius * Math.cos((i + 1) * angleIncrement);
        let y2 = radius * Math.sin((i + 1) * angleIncrement);

        let edgeLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        let z = (edgeLength / 2) / Math.tan(Math.PI / edge);
        let deg = 360 / edge * i;
        selectedGroup = addCustomGroup(selectedGroup, [0, 0, 0], [0, deg, 0]);
        addCustomCube(selectedGroup, [-edgeLength / 2, 0, z], [edgeLength, 1, 0]);
        selectedGroup = rootGroup;
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