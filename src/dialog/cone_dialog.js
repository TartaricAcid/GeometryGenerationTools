import coneVue from "../vue/cone.vue";

export var addConeDialog = {
    icon: "fa-ice-cream",
    name: "dialog.geometry_generation_tools.cone",
    condition: () => Modes.edit,
    click: function (group) {
        let dialog = new Dialog({
            title: "dialog.geometry_generation_tools.cone",
            singleButton: true,
            component: {
                data() {
                    return {
                        dialogInput: dialog,
                        group: group
                    };
                },
                components: {
                    coneVue: coneVue
                },
                template: "<coneVue :dialog-input=\"dialogInput\" :group=\"group\"/>"
            }
        });
        dialog.show();
    }
};