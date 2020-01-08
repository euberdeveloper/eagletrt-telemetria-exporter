import Vue from 'vue';
import Vuex from 'vuex';

import { order } from './services/order';
import { downloadFile } from './services/download';
import * as api from './services/api';

Vue.use(Vuex);

export const Status = {
    NONE: -1,
    FETCHING: 0,
    EDITING: 1,
    EXPORTING: 2,
    FETCHING_ERROR: 3,
    EXPORTING_ERROR: 4
};

const store = new Vuex.Store({
    state: {
        databaseSchema: {},
        currentDatabase: -1,
        selectedItems: {},
        message: '',
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
        setMessage: function (state, value) {
            state.message = value;
        },
        setStatus: function (state, value) {
            state.status = value;
        }
    },
    actions: {
        setStatus: function ({ commit }, status) {
            switch (status) {
            case Status.FETCHING:
                commit('setMessage', 'Fetching database schema');
                break;
            case Status.EXPORTING:
                commit('setMessage', 'Exporting selected collections');
                break;
            case Status.FETCHING_ERROR:
                commit('setMessage', 'Error in fetching database');
                break;
            case Status.EXPORTING_ERROR:
                commit('setMessage', 'Error in exporting collections');
                break;
            default:
                commit('setMessage', '');
                break;
            }
            commit('setStatus', status);
        },
        fetchDatabaseSchema: async function ({ commit, state, dispatch }) {
            if (state.status === Status.NONE || state.status === Status.FETCHING_ERROR || state.status === Status.EXPORTING) {
                dispatch('setStatus', Status.FETCHING);
                try {
                    const databaseSchema = await api.getDatabaseSchema();
                    order(databaseSchema);
                    commit('setDatabaseSchema', databaseSchema);
                    dispatch('setStatus', Status.EDITING);
                } catch (error) {
                    console.error('Error in fetching database', error);
                    dispatch('setStatus', Status.FETCHING_ERROR);
                }
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
                try {
                    const data = await api.exportJson(state.selectedItems);
                    downloadFile(data);
                    dispatch('fetchDatabaseSchema');
                } catch (error) {
                    console.error('Error in exporting collections as json', error);
                    dispatch('setStatus', Status.EXPORTING_ERROR);
                }
            }
        },
        exportCsv: async function ({ state, dispatch }) {
            if (state.status === Status.EDITING) {
                dispatch('setStatus', Status.EXPORTING);
                try {
                    const data = await api.exportCsv(state.selectedItems);
                    downloadFile(data);
                    dispatch('fetchDatabaseSchema');
                } catch (error) {
                    console.error('Error in exporting collections as csv', error);
                    dispatch('setStatus', Status.EXPORTING_ERROR);
                }
            }
        },
        backToEditing: async function ({ state, dispatch, commit }) {
            if (state.status === Status.EXPORTING || state.status === Status.EXPORTING_ERROR) {
                dispatch('setStatus', Status.EDITING);
            }
        }
    }
});

export default store;
