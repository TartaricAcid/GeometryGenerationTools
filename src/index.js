import {loadI18n} from "./utils/i18nloader.js";
import packageInfo from "../package.json";
import {addCircle} from "./geometry/circle.js";

BBPlugin.register(packageInfo.name, {
    title: packageInfo.title,
    author: packageInfo.author,
    description: packageInfo.description,
    icon: "card_membership",
    variant: "desktop",
    version: packageInfo.version,
    min_version: packageInfo.min_blockbench_version,
    tags: ["Minecraft: Java Edition"],
    await_loading: true,
    onload() {
        loadI18n();
        Group.prototype.menu.structure.push("_");
        Group.prototype.menu.structure.push(addCircle);
        Interface.Panels.outliner.menu.structure.push("_");
        Interface.Panels.outliner.menu.structure.push(addCircle);
    },
    onunload() {
    },
    oninstall() {
    },
    onuninstall() {
    },
});