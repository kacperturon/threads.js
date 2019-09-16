"use strict";
/// <reference no-default-lib="true"/>
/// <reference types="../../types/webworker" />
// tslint:disable no-shadowed-variable
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof self === "undefined") {
    global.self = global;
}
const isWorkerRuntime = function isWorkerRuntime() {
    return typeof self !== "undefined" && self.postMessage ? true : false;
};
const postMessageToMaster = function postMessageToMaster(data) {
    // TODO: Warn that Transferables are not supported on first attempt to use feature
    self.postMessage(data);
};
const subscribeToMasterMessages = function subscribeToMasterMessages(onMessage) {
    const messageHandler = (messageEvent) => {
        onMessage(messageEvent.data);
    };
    const unsubscribe = () => {
        self.removeEventListener("message", messageHandler);
    };
    self.addEventListener("message", messageHandler);
    return unsubscribe;
};
exports.default = {
    isWorkerRuntime,
    postMessageToMaster,
    subscribeToMasterMessages
};