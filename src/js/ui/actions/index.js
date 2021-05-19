export const SELECT_PROJ = "SELECT_PROJ";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const DEL_PROJECT = "DEL_PROJECT";
export const SELECT_TRACER = "SELECT_TRACER";
export const ADD_TRACER = "ADD_TRACER";
export const ADD_REQUEST = "ADD_REQUEST";
export const UPDATE_TRACERS = "UPDATE_TRACERS";
export const SELECT_EVENT = "SELECT_EVENT";
export const UPDATE_EVENTS = "UPDATE_EVENTS";
export const ADD_EVENTS = "ADD_EVENTS";
export const TOGGLE_LOADING_EVENTS = "TOGGLE_LOADING_EVENTS";
export const TOGGLE_LOADING_TRACERS = "TOGGLE_LOADING_TRACERS";
export const TOGGLE_INACTIVE_FILTER = "TOGGLE_INACTIVE_FILTER";
export const TOGGLE_HTTP_RESPONSE_FILTER = "TOGGLE_HTTP_RESPONSE_FILTER";
export const TOGGLE_TEXT_FILTER = "TOGGLE_TEXT_FILTER";
export const TOGGLE_REFERER_FILTER = "TOGGLE_REFERER_FILTER";
export const START_REPRODUCTION = "START_REPRODUCTION";
export const CHANGE_TAB = "CHANGE_TAB";
export const ADD_API_KEY = "ADD_API_KEY";
export const SELECT_REQUEST = "SELECT_REQUEST";
export const CHANGE_SETTING = "CHANGE_SETTING";
export const NAVIGATE_TO_SETTINGS_PAGE = "NAVIGATE_TO_SETTINGS_PAGE";
export const NAVIGATE_TO_UI_PAGE = "NAVIGATE_TO_UI_PAGE";
export const APP_INITIALIZED = "APP_INITIALIZED";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const TRACERS_LOADING = "TRACERS_LOADING";
export const EVENTS_LOADING = "EVENTS_LOADING";
export const REFRESH = "REFRESH";
export const SET_RAW_EVENT = "SET_RAW_EVENT";
export const RAW_EVENT_LOADING = "RAW_EVENT_LOADING";
export const SEEN_NOTIFICATIONS = "SEEN_NOTIFICATIONS";

export const seenNotifications = () => ({type: SEEN_NOTIFICATIONS})
export const rawEventLoading = () => ({ type: RAW_EVENT_LOADING });
export const setRawEvent = (rawEvent, type) => ({
  type: SET_RAW_EVENT,
  rawEvent,
  rawEventType: type,
});
export const refresh = (background) => ({ type: REFRESH, background });
export const eventsLoading = () => ({ type: EVENTS_LOADING });
export const tracersLoading = () => ({ type: TRACERS_LOADING });
export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  settings: settings,
});

export const appInitialized = (init) => ({
  type: APP_INITIALIZED,
  init: init,
});
export const navigateToUIPage = () => ({
  type: NAVIGATE_TO_UI_PAGE,
});

export const navigateToSettingsPage = () => ({
  type: NAVIGATE_TO_SETTINGS_PAGE,
});

export const changeSetting = (setting) => ({
  type: CHANGE_SETTING,
  setting: setting,
});
export const selectRequest = (id, clicked) => ({
  type: SELECT_REQUEST,
  requestID: id,
  clicked: clicked,
});
export const addAPIKey = (apiKey) => ({ type: ADD_API_KEY, apiKey: apiKey });
export const changeTab = (tabID) => ({ type: CHANGE_TAB, tabID: tabID });
export const addTracer = (tracer) => ({
  type: ADD_TRACER,
  tracer: tracer,
});
export const updateTracers = (tracers) => ({
  type: UPDATE_TRACERS,
  tracers: tracers,
});
export const addRequest = (req) => ({ type: ADD_REQUEST, req: req });
export const addEvents = (events) => ({ type: ADD_EVENTS, events: events });
export const delProject = (i) => ({ type: DEL_PROJECT, i: i });
export const selectTracer = (id, clicked) => ({
  type: SELECT_TRACER,
  tracerID: id,
  clicked: clicked,
});
export const selectEvent = (id, clicked) => ({
  type: SELECT_EVENT,
  eventID: id,
  clicked: clicked,
});
export const updateEvents = (events) => ({
  type: UPDATE_EVENTS,
  events: events,
});
export const startReproduction = () => ({ type: START_REPRODUCTION });
export const toggleFilter = (type) => {
  switch (type) {
    case TOGGLE_INACTIVE_FILTER:
      return toggleInactiveFilter();
    case TOGGLE_HTTP_RESPONSE_FILTER:
      return toggleHTTPResponseFilter();
    case TOGGLE_TEXT_FILTER:
      return toggleTextFilter();
    case TOGGLE_REFERER_FILTER:
      return toggleRefererFilter();
    default:
      return () => {};
  }
};
export const toggleRefererFilter = () => ({ type: TOGGLE_REFERER_FILTER });
export const toggleInactiveFilter = () => ({ type: TOGGLE_INACTIVE_FILTER });
export const toggleHTTPResponseFilter = () => ({
  type: TOGGLE_HTTP_RESPONSE_FILTER,
});
export const toggleTextFilter = () => ({ type: TOGGLE_TEXT_FILTER });
export const updateProjects = (projs) => ({
  type: UPDATE_PROJECTS,
  projs: projs,
});
export const selectProject = (proj) => ({ type: SELECT_PROJ, proj: proj });
