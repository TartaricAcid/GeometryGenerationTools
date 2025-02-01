import {addCustomCube, addCustomGroup} from "../utils/add.js";

export var addCircle = {
    icon: "fa-circle",
    name: "dialog.geometry_generation_tools.circle",
    condition: () => Modes.edit,
    click: function (group) {
        let dialog = new Dialog({
            title: "dialog.geometry_generation_tools.circle",
            form: {
                edge: {
                    label: "dialog.geometry_generation_tools.circle.edge",
                    type: "number",
                    value: 6,
                    min: 3,
                    step: 1,
                },
                radius: {
                    label: "dialog.geometry_generation_tools.circle.radius",
                    type: "number",
                    value: 6,
                    step: 0.01,
                }
            },
            onConfirm: function (formResult) {
                if (formResult.edge >= 3 && formResult.radius > 0) {
                    generate(group, formResult.edge, formResult.radius);
                }
            }
        });
        dialog.show();
    }
};

function generate(group, edge, radius) {
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