<template>
    <v-layout row wrap>
        <v-flex xs6 sm2>
            <v-text-field
                slot="activator"
                label="Week"
                v-model="week"
                prepend-icon="event"
                readonly
            ></v-text-field>
        </v-flex>
        <v-flex xs6 sm2>
            <v-select
                label="Bot Channel"
                :items="botChannels"
                v-model="selectedBotChannel"
                hint="Select a Bot Channel"
            ></v-select>
        </v-flex>
        <v-flex xs6 sm2>
            <v-select
                label="Sub-category"
                :items="subCategories"
                v-model="selectedSubCategory"
                hint="Select a Sub-category"
            ></v-select>
        </v-flex>
        <v-flex xs6 sm2>
            <v-select
                label="Category"
                :items="categories"
                v-model="selectedCategory"
                hint="Select a Category"
            ></v-select>
        </v-flex>
    </v-layout>
</template>

<script src="./UniqUsersFilters.js"></script>
