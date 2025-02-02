<script>
import {generateCone, generateConeLengthMode} from "../geometry/cone.js";

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
            topDiameter: 8,
            bottomDiameter: 12,
            edge: 6,
            length: 6,
            edgeLengthMode: true,
        };
    },
    methods: {
        tl: tl,
        confirm: function () {
            if (this.edgeLengthMode) {
                generateConeLengthMode(this.group, this.topDiameter, this.bottomDiameter, this.edge, this.length);
            } else {
                generateCone(this.group, this.topDiameter, this.bottomDiameter, this.edge, this.length);
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
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge_length_mode") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge_length_mode.desc") }}</p>
            </div>

            <div style="width: 18%; margin: 0 auto;">
                <input type="checkbox" v-model="edgeLengthMode" style="transform: scale(1.5)">
            </div>
        </div>

        <div v-if="edgeLengthMode">
            <div class="horizontal-item">
                <div style="width: 70%">
                    <p class="title">{{ tl("dialog.geometry_generation_tools.cone.top_length") }}</p>
                    <p class="desc">{{ tl("dialog.geometry_generation_tools.cone.top_length.desc") }}</p>
                </div>

                <div style="width: 30%; margin: 0 auto;">
                    <input class="input" type="number" min="0.01" step="0.01" v-model.number="topDiameter">
                </div>
            </div>

            <div class="horizontal-item">
                <div style="width: 70%">
                    <p class="title">{{ tl("dialog.geometry_generation_tools.cone.bottom_length") }}</p>
                    <p class="desc">{{ tl("dialog.geometry_generation_tools.cone.bottom_length.desc") }}</p>
                </div>

                <div style="width: 30%; margin: 0 auto;">
                    <input class="input" type="number" min="0.01" step="0.01" v-model.number="bottomDiameter">
                </div>
            </div>
        </div>

        <div v-else>
            <div class="horizontal-item">
                <div style="width: 70%">
                    <p class="title">{{ tl("dialog.geometry_generation_tools.cone.top_diameter") }}</p>
                    <p class="desc">{{ tl("dialog.geometry_generation_tools.cone.top_diameter.desc") }}</p>
                </div>

                <div style="width: 30%; margin: 0 auto;">
                    <input class="input" type="number" min="0.01" step="0.01" v-model.number="topDiameter">
                </div>
            </div>

            <div class="horizontal-item">
                <div style="width: 70%">
                    <p class="title">{{ tl("dialog.geometry_generation_tools.cone.bottom_diameter") }}</p>
                    <p class="desc">{{ tl("dialog.geometry_generation_tools.cone.bottom_diameter.desc") }}</p>
                </div>

                <div style="width: 30%; margin: 0 auto;">
                    <input class="input" type="number" min="0.01" step="0.01" v-model.number="bottomDiameter">
                </div>
            </div>
        </div>

        <div class="horizontal-item">
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.circle.edge") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.circle.edge.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="3" step="1" v-model.number="edge">
            </div>
        </div>

        <div class="horizontal-item">
            <div style="width: 70%">
                <p class="title">{{ tl("dialog.geometry_generation_tools.cone.length") }}</p>
                <p class="desc">{{ tl("dialog.geometry_generation_tools.cone.length.desc") }}</p>
            </div>

            <div style="width: 30%; margin: 0 auto;">
                <input class="input" type="number" min="0.01" step="0.01" v-model.number="length">
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