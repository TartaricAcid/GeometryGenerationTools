<script>
import {
    generateCylinder,
    generateCylinderLengthMode,
    generateRing,
    generateRingLengthMode
} from "../geometry/circle.js";

export default {
    props: {
        dialogInput: {
            type: Object,
            required: true
        },
        group: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isRing: true,
            diameter: 12,
            edge: 6,
            hasGroup: true,
            edgeLengthMode: true,
        };
    },
    methods: {
        tl: tl,
        changeEdge: function () {
            if (!this.isRing && this.edge % 2 !== 0) {
                this.edge += 1;
            }
        },
        confirm: function () {
            if (this.isRing) {
                if (this.edgeLengthMode) {
                    generateRingLengthMode(this.group, this.edge, this.diameter, this.hasGroup);
                } else {
                    generateRing(this.group, this.edge, this.diameter / 2, this.hasGroup);
                }
            } else {
                if (this.edgeLengthMode) {
                    generateCylinderLengthMode(this.group, this.edge, this.diameter, this.hasGroup);
                } else {
                    generateCylinder(this.group, this.edge, this.diameter / 2, this.hasGroup);
                }
            }
            this.dialogInput.close();
        }
    }
};
</script>

<template>
    <div class="main-body">
        <div class="horizontal-item">
            <div style="width: 82%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.is_ring") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.is_ring.desc") }}</p>
            </div>

            <div style="width: 18%; margin: 0 auto;">
                <input type="checkbox" v-model="isRing" style="transform: scale(1.5)" @click="changeEdge">
            </div>
        </div>

        <div class="horizontal-item">
            <div style="width: 82%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge_length_mode") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge_length_mode.desc") }}</p>
            </div>

            <div style="width: 18%; margin: 0 auto;">
                <input type="checkbox" v-model="edgeLengthMode" style="transform: scale(1.5)">
            </div>
        </div>

        <div class="horizontal-item">
            <div style="width: 82%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.has_group") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.has_group.desc") }}</p>
            </div>

            <div style="width: 18%; margin: 0 auto;">
                <input type="checkbox" v-model="hasGroup" style="transform: scale(1.5)">
            </div>
        </div>

        <div class="horizontal-item" v-if="edgeLengthMode">
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge_length") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge_length.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="0.01" step="0.01" v-model.number="diameter">
            </div>
        </div>

        <div class="horizontal-item" v-else>
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.diameter") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.diameter.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="0.01" step="0.01" v-model.number="diameter">
            </div>
        </div>

        <div class="horizontal-item" v-if="isRing">
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="3" step="1" v-model.number="edge">
            </div>
        </div>

        <div class="horizontal-item" v-else>
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="4" step="2" v-model.number="edge">
            </div>
        </div>

        <div style="margin-top: 32px">
            <button style="width: 100%" @click="confirm">{{ tl("dialog.confirm") }}</button>
        </div>
    </div>
</template>

<style scoped>
.main-body {
    width: 100%;
    overflow-y: auto;
    padding: 10px 20px
}

.horizontal-item {
    height: 100%;
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
}

.title {
    margin: 0;
    padding: 0;
    font-size: large
}

.desc {
    margin: 0;
    padding: 0;
    color: #6a6a6d
}

.input {
    border-radius: 1px;
    margin-top: 5px;
    padding: 2px 2px 2px 10px;
    width: 100%;
    height: 32px;
    font-size: 20px;
    background-color: #1c2026;
    border-style: solid;
    border-width: 1px;
    border-color: #181a1f;
}
</style>