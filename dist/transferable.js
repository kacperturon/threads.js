"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
function isTransferable(thing) {
    if (!thing || typeof thing !== "object")
        return false;
    // Don't check too thoroughly, since the list of transferable things in JS might grow over time
    return true;
}
function isTransferDescriptor(thing) {
    return thing && typeof thing === "object" && thing[symbols_1.$transferable];
}
exports.isTransferDescriptor = isTransferDescriptor;
/**
 * Mark transferable objects within an arbitrary object or array as
 * being a transferable object. They will then not be serialized
 * and deserialized on messaging with the main thread, but ownership
 * of them will be tranferred to the receiving thread.
 *
 * Only array buffers, message ports and few more special types of
 * objects can be transferred, but it's much faster than serializing and
 * deserializing them.
 *
 * Note:
 * The transferable object cannot be accessed by this thread again
 * unless the receiving thread transfers it back again!
 *
 * @param transferable Array buffer, message port or similar.
 * @see <https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast>
 */
function Transfer(payload, transferables) {
    if (!transferables) {
        if (!isTransferable(payload))
            throw Error();
        transferables = [payload];
    }
    return {
        [symbols_1.$transferable]: true,
        send: payload,
        transferables
    };
}
exports.Transfer = Transfer;
