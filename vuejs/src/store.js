import Vue from 'vue';
import Vuex from 'vuex';

import { downloadFile } from './services/download';
import * as api from './services/api';

Vue.use(Vuex);

const Status = {
    NONE: -1,
    FETCHING: 0,
    EDITING: 1,
    EXPORTING: 2,
    DOWNLOADING: 3
};

const store = new Vuex.Store({
    state: {
        databaseSchema: {},
        currentDatabase: -1,
        selectedItems: {},
        loading: false,
        loadingMessage: '',
        status: Status.NONE
    },
    getters: {
        databases: function (state) {
            return state.databaseSchema ? Object.keys(state.databaseSchema) : [];
        },
        currentDatabaseName: function (state, getters) {
            return state.currentDatabase === -1 ? null : getters.databases[state.currentDatabase];
        },
        currentCollections: function (state, getters) {
            const selected = (db, collection) => {
                return (
                    state.selectedItems[db] && state.selectedItems[db].includes(collection)
                );
            };

            const db = getters.currentDatabaseName;
            if (db) {
                return state.databaseSchema[db].map(label => ({
                    label,
                    selected: selected(db, label)
                }));
            } else {
                return [];
            }
        }
    },
    mutations: {
        setDatabaseSchema: function (state, value) {
            state.databaseSchema = value;
            state.currentDatabase = -1;
            state.selectedItems = {};
        },
        setCurrentDatabase: function (state, value) {
            state.currentDatabase = value;
        },
        setSelectedItems: function (state, value) {
            state.selectedItems = value;
        },
        setLoading: function (state, value) {
            state.loading = value;
        },
        setLoadingMessage: function (state, value) {
            state.loadingMessage = value;
        },
        setStatus: function (state, value) {
            state.status = value;
        }
    },
    actions: {
        setStatus: function ({ commit }, status) {
            switch (status) {
                case Status.FETCHING:
                    commit('setLoading', true);
                    commit('setLoadingMessage', 'Fetching database schema');
                    break;
                case Status.EXPORTING:
                    commit('setLoading', true);
                    commit('setLoadingMessage', 'Exporting selected collections');
                    break;
                case Status.DOWNLOADING:
                    commit('setLoading', true);
                    commit('setLoadingMessage', 'Downloading exported collections');
                    break;
                default:
                    commit('setLoading', false);
                    commit('setLoadingMessage', '');
                    break;
            }
            commit('setStatus', status);
        },
        fetchDatabaseSchema: async function ({ commit, state, dispatch }) {
            if (state.status === Status.NONE) {
                dispatch('setStatus', Status.FETCHING);
                const databaseSchema = await api.getDatabaseSchema();
                commit('setDatabaseSchema', databaseSchema);
                dispatch('setStatus', Status.EDITING);
            }
        },
        selectDatabase: function ({ commit, state }, currentDatabase) {
            if (state.status === Status.EDITING) {
                commit('setCurrentDatabase', currentDatabase);
            }
        },
        addCollection: function ({ commit, state }, { db, collection }) {
            if (state.status === Status.EDITING) {
                const selectedItems = { ...state.selectedItems };
                if (selectedItems[db]) {
                    selectedItems[db].push(collection);
                } else {
                    selectedItems[db] = [collection];
                }
                commit('setSelectedItems', selectedItems);
            }
        },
        removeCollection: function ({ commit, state }, { db, collection }) {
            if (state.status === Status.EDITING) {
                const selectedItems = { ...state.selectedItems };
                const index = selectedItems[db].indexOf(collection);
                selectedItems[db].splice(index, 1);
                if (!selectedItems[db].length) {
                    delete selectedItems[db];
                }
                commit('setSelectedItems', selectedItems);
            }
        },
        exportJson: async function ({ state, dispatch }) {
            if (state.status === Status.EDITING) {
                dispatch('setStatus', Status.EXPORTING);
                const data = await api.exportJson(state.selectedItems);
                dispatch('setStatus', Status.DOWNLOADING);
                downloadFile(data);
                dispatch('downloadDone');
            }
        },
        exportCsv: async function ({ state, dispatch }) {
            if (state.status === Status.EDITING) {
                dispatch('setStatus', Status.EXPORTING);
                // doing shit
                // commit('setReceivedZip', null);
                dispatch('setStatus', Status.DOWNLOADING);
            }
        },
        downloadDone: async function ({ state, dispatch }) {
            if (state.status === Status.DOWNLOADING) {
                dispatch('setStatus', Status.EDITING);
            }
        }
    }
});

export default store;
