<template>
    <v-layout row wrap>
        <v-flex xs6 sm2>
            <v-text-field
                slot="activator"
                label="Start Date"
                v-model="sDate"
                prepend-icon="event"
                readonly
            ></v-text-field>
        </v-flex>
        <v-flex xs6 sm2>
            <v-text-field
                slot="activator"
                label="End Date"
                v-model="eDate"
                prepend-icon="event"
                readonly
            ></v-text-field>
        </v-flex>
        <v-flex xs6 sm2>
            <v-select
                label="Bot Channel(/s)"
                :items="botChannels"
                v-model="selectedBotChannels"
                multiple
                chips
                hint="Select Bot Channel(/s)"
            ></v-select>
        </v-flex>
        <v-flex xs6 sm2>
            <v-select
                label="Sub-category(/s)"
                :items="subCategories"
                v-model="selectedSubcategories"
                multiple
                chips
                hint="Select Sub-category(/s)"
            ></v-select>
        </v-flex>
        <v-flex xs6 sm4>
            <v-select
                label="Category(/s)"
                :items="categories"
                v-model="selectedCategories"
                multiple
                chips
                hint="Select Category(/s)"
            ></v-select>
        </v-flex>
    </v-layout>
</template>

<script src="./SummaryFilters.js"></script>
