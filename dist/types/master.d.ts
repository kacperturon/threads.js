import Observable from "zen-observable";
import { ObservablePromise } from "../observable-promise";
import { $errors, $events, $terminate, $worker } from "../symbols";
export declare type ModuleMethods = {
    [methodName: string]: (...args: any) => any;
};
export declare type ProxyableFunction<Args extends any[], ReturnType> = Args extends [] ? () => ObservablePromise<ReturnType> : (...args: Args) => ObservablePromise<ReturnType>;
export declare type ModuleProxy<Methods extends ModuleMethods> = {
    [method in keyof Methods]: ProxyableFunction<Parameters<Methods[method]>, ReturnType<Methods[method]>>;
};
export interface PrivateThreadProps {
    [$errors]: Observable<Error>;
    [$events]: Observable<WorkerEvent>;
    [$terminate]: () => Promise<void>;
    [$worker]: Worker;
}
export declare type FunctionThread<Args extends any[] = any[], ReturnType = any> = ProxyableFunction<Args, ReturnType> & PrivateThreadProps;
export declare type ModuleThread<Methods extends ModuleMethods = any> = ModuleProxy<Methods> & PrivateThreadProps;
interface AnyFunctionThread extends PrivateThreadProps {
    (...args: any[]): ObservablePromise<any>;
}
interface AnyModuleThread extends PrivateThreadProps {
}
/** Worker thread. Either a `FunctionThread` or a `ModuleThread`. */
export declare type Thread = AnyFunctionThread | AnyModuleThread;
export declare type TransferList = Transferable[];
/** Worker instance. Either a web worker or a node.js Worker provided by `worker_threads` or `tiny-worker`. */
export interface Worker extends EventTarget {
    postMessage(value: any, transferList?: TransferList): void;
    terminate(callback?: (error?: Error, exitCode?: number) => void): void;
}
/** Worker implementation. Either web worker or a node.js Worker class. */
export declare class WorkerImplementation extends EventTarget implements Worker {
    constructor(path: string);
    postMessage(value: any, transferList?: TransferList): void;
    terminate(): void;
}
/** Event as emitted by worker thread. Subscribe to using `Thread.events(thread)`. */
export declare enum WorkerEventType {
    internalError = "internalError",
    message = "message",
    termination = "termination"
}
export interface WorkerInternalErrorEvent {
    type: WorkerEventType.internalError;
    error: Error;
}
export interface WorkerMessageEvent<Data> {
    type: WorkerEventType.message;
    data: Data;
}
export interface WorkerTerminationEvent {
    type: WorkerEventType.termination;
}
export declare type WorkerEvent = WorkerInternalErrorEvent | WorkerMessageEvent<any> | WorkerTerminationEvent;
export {};
