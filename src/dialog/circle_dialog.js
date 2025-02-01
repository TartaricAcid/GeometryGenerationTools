import circleVue from "../vue/circle.vue";

export var addCircleDialog = {
    icon: "fa-circle",
    name: "dialog.geometry_generation_tools.circle",
    condition: () => Modes.edit,
    click: function (group) {
        let dialog = new Dialog({
            title: "dialog.geometry_generation_tools.circle",
            singleButton: true,
            component: {
                data() {
                    return {
                        dialogInput: dialog,
                        group: group
                    };
                },
                components: {
                    circleVue: circleVue
                },
                template: "<circleVue :dialog-input=\"dialogInput\" :group=\"group\"/>"
            }
        });
        dialog.show();
    }
};