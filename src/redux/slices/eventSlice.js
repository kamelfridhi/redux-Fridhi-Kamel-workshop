import { createSlice } from "@reduxjs/toolkit";
import { getallEvents, deleteEvent, addEvent, editEvent } from "../../services/api";

const eventSlice = createSlice({
    name: "events",
    initialState: { list: [] },
    reducers: {
        populateEvents: (state, action) => {
            state.list = action.payload;
        },
        deleteEventReducer: (state, action) => {
            state.list = state.list.filter(
                (eventItem) => eventItem.id !== action.payload
            );
            deleteEv(action.payload);
        },
        addEventReducer: (state, action) => {
            state.list.push(action.payload);
            addEvent(action.payload);
        },
        updateEventReducer: (state, action) => {
            const index = state.list.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
                // editEvent(action.payload.id, action.payload);
        },
    },
});

export const selectEvents = (state) => {
    return [state.events.list];
};

export const fetchEvents = () => async (dispatch) => {
    try {
        const eventsResult = await getallEvents();
        dispatch(populateEvents(eventsResult.data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteEv = async (id) => {
    try {
        const eventsResult = await deleteEvent(id);
    } catch (error) {
        console.log(error);
    }
};

export const addNewEvent = async (event, dispatch) => {
    try {
        const response = await addEvent(event);
        dispatch(populateEvents(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const updateExistingEvent = async (id, event, dispatch) => {
    try {
        const response = await editEvent(id, event);
        dispatch(populateEvents(response.data));
    } catch (error) {
        console.error(error);
    }
};


export default eventSlice.reducer;

export const { populateEvents, deleteEventReducer, addEventReducer, updateEventReducer } = eventSlice.actions;
