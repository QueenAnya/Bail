/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $Boolean = $util.global.Boolean, $String = $util.global.String, $Array = $util.global.Array;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const CompanionReg = $root.CompanionReg = (() => {

    const CompanionReg = {};

    CompanionReg.ClientPairingProps = (function() {

        const ClientPairingProps = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ClientPairingProps.prototype.isChatDbLidMigrated = null;
        ClientPairingProps.prototype.isSyncdPureLidSession = null;
        ClientPairingProps.prototype.isSyncdSnapshotRecoveryEnabled = null;
        ClientPairingProps.prototype.isHsThumbnailSyncEnabled = null;
        ClientPairingProps.prototype.subscriptionSyncPayload = null;
        ClientPairingProps.prototype.isBotJidDbMigrated = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_isChatDbLidMigrated", {
            get: $util.oneOfGetter($oneOfFields = ["isChatDbLidMigrated"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_isSyncdPureLidSession", {
            get: $util.oneOfGetter($oneOfFields = ["isSyncdPureLidSession"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_isSyncdSnapshotRecoveryEnabled", {
            get: $util.oneOfGetter($oneOfFields = ["isSyncdSnapshotRecoveryEnabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_isHsThumbnailSyncEnabled", {
            get: $util.oneOfGetter($oneOfFields = ["isHsThumbnailSyncEnabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_subscriptionSyncPayload", {
            get: $util.oneOfGetter($oneOfFields = ["subscriptionSyncPayload"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPairingProps.prototype, "_isBotJidDbMigrated", {
            get: $util.oneOfGetter($oneOfFields = ["isBotJidDbMigrated"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ClientPairingProps.create = function(properties) {
            return new ClientPairingProps(properties);
        };

        ClientPairingProps.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.isChatDbLidMigrated != null && $Object.hasOwnProperty.call(m, "isChatDbLidMigrated"))
                w.uint32(8).bool(m.isChatDbLidMigrated);
            if (m.isSyncdPureLidSession != null && $Object.hasOwnProperty.call(m, "isSyncdPureLidSession"))
                w.uint32(16).bool(m.isSyncdPureLidSession);
            if (m.isSyncdSnapshotRecoveryEnabled != null && $Object.hasOwnProperty.call(m, "isSyncdSnapshotRecoveryEnabled"))
                w.uint32(24).bool(m.isSyncdSnapshotRecoveryEnabled);
            if (m.isHsThumbnailSyncEnabled != null && $Object.hasOwnProperty.call(m, "isHsThumbnailSyncEnabled"))
                w.uint32(32).bool(m.isHsThumbnailSyncEnabled);
            if (m.subscriptionSyncPayload != null && $Object.hasOwnProperty.call(m, "subscriptionSyncPayload"))
                w.uint32(42).bytes(m.subscriptionSyncPayload);
            if (m.isBotJidDbMigrated != null && $Object.hasOwnProperty.call(m, "isBotJidDbMigrated"))
                w.uint32(48).bool(m.isBotJidDbMigrated);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ClientPairingProps.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.ClientPairingProps();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 0)
                            break;
                        m.isChatDbLidMigrated = r.bool();
                        m._isChatDbLidMigrated = "isChatDbLidMigrated";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.isSyncdPureLidSession = r.bool();
                        m._isSyncdPureLidSession = "isSyncdPureLidSession";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.isSyncdSnapshotRecoveryEnabled = r.bool();
                        m._isSyncdSnapshotRecoveryEnabled = "isSyncdSnapshotRecoveryEnabled";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.isHsThumbnailSyncEnabled = r.bool();
                        m._isHsThumbnailSyncEnabled = "isHsThumbnailSyncEnabled";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.subscriptionSyncPayload = r.bytes();
                        m._subscriptionSyncPayload = "subscriptionSyncPayload";
                        continue;
                    }
                case 6: {
                        if (u !== 0)
                            break;
                        m.isBotJidDbMigrated = r.bool();
                        m._isBotJidDbMigrated = "isBotJidDbMigrated";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        ClientPairingProps.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.ClientPairingProps)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.ClientPairingProps: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.ClientPairingProps();
            if (d.isChatDbLidMigrated != null) {
                m.isChatDbLidMigrated = $Boolean(d.isChatDbLidMigrated);
            }
            if (d.isSyncdPureLidSession != null) {
                m.isSyncdPureLidSession = $Boolean(d.isSyncdPureLidSession);
            }
            if (d.isSyncdSnapshotRecoveryEnabled != null) {
                m.isSyncdSnapshotRecoveryEnabled = $Boolean(d.isSyncdSnapshotRecoveryEnabled);
            }
            if (d.isHsThumbnailSyncEnabled != null) {
                m.isHsThumbnailSyncEnabled = $Boolean(d.isHsThumbnailSyncEnabled);
            }
            if (d.subscriptionSyncPayload != null) {
                if (typeof d.subscriptionSyncPayload === "string")
                    $util.base64.decode(d.subscriptionSyncPayload, m.subscriptionSyncPayload = $util.newBuffer($util.base64.length(d.subscriptionSyncPayload)), 0);
                else if (d.subscriptionSyncPayload.length >= 0)
                    m.subscriptionSyncPayload = d.subscriptionSyncPayload;
            }
            if (d.isBotJidDbMigrated != null) {
                m.isBotJidDbMigrated = $Boolean(d.isBotJidDbMigrated);
            }
            return m;
        };

        ClientPairingProps.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.isChatDbLidMigrated != null && $Object.hasOwnProperty.call(m, "isChatDbLidMigrated")) {
                d.isChatDbLidMigrated = m.isChatDbLidMigrated;
            }
            if (m.isSyncdPureLidSession != null && $Object.hasOwnProperty.call(m, "isSyncdPureLidSession")) {
                d.isSyncdPureLidSession = m.isSyncdPureLidSession;
            }
            if (m.isSyncdSnapshotRecoveryEnabled != null && $Object.hasOwnProperty.call(m, "isSyncdSnapshotRecoveryEnabled")) {
                d.isSyncdSnapshotRecoveryEnabled = m.isSyncdSnapshotRecoveryEnabled;
            }
            if (m.isHsThumbnailSyncEnabled != null && $Object.hasOwnProperty.call(m, "isHsThumbnailSyncEnabled")) {
                d.isHsThumbnailSyncEnabled = m.isHsThumbnailSyncEnabled;
            }
            if (m.subscriptionSyncPayload != null && $Object.hasOwnProperty.call(m, "subscriptionSyncPayload")) {
                d.subscriptionSyncPayload = o.bytes === $String ? $util.base64.encode(m.subscriptionSyncPayload, 0, m.subscriptionSyncPayload.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.subscriptionSyncPayload) : m.subscriptionSyncPayload;
            }
            if (m.isBotJidDbMigrated != null && $Object.hasOwnProperty.call(m, "isBotJidDbMigrated")) {
                d.isBotJidDbMigrated = m.isBotJidDbMigrated;
            }
            return d;
        };

        ClientPairingProps.prototype.toJSON = function() {
            return ClientPairingProps.toObject(this, $protobuf.util.toJSONOptions);
        };

        ClientPairingProps.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.ClientPairingProps";
        };

        return ClientPairingProps;
    })();

    CompanionReg.EncryptedPairingRequest = (function() {

        const EncryptedPairingRequest = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        EncryptedPairingRequest.prototype.encryptedPayload = null;
        EncryptedPairingRequest.prototype.iv = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(EncryptedPairingRequest.prototype, "_encryptedPayload", {
            get: $util.oneOfGetter($oneOfFields = ["encryptedPayload"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(EncryptedPairingRequest.prototype, "_iv", {
            get: $util.oneOfGetter($oneOfFields = ["iv"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        EncryptedPairingRequest.create = function(properties) {
            return new EncryptedPairingRequest(properties);
        };

        EncryptedPairingRequest.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.encryptedPayload != null && $Object.hasOwnProperty.call(m, "encryptedPayload"))
                w.uint32(10).bytes(m.encryptedPayload);
            if (m.iv != null && $Object.hasOwnProperty.call(m, "iv"))
                w.uint32(18).bytes(m.iv);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        EncryptedPairingRequest.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.EncryptedPairingRequest();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.encryptedPayload = r.bytes();
                        m._encryptedPayload = "encryptedPayload";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.iv = r.bytes();
                        m._iv = "iv";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        EncryptedPairingRequest.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.EncryptedPairingRequest)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.EncryptedPairingRequest: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.EncryptedPairingRequest();
            if (d.encryptedPayload != null) {
                if (typeof d.encryptedPayload === "string")
                    $util.base64.decode(d.encryptedPayload, m.encryptedPayload = $util.newBuffer($util.base64.length(d.encryptedPayload)), 0);
                else if (d.encryptedPayload.length >= 0)
                    m.encryptedPayload = d.encryptedPayload;
            }
            if (d.iv != null) {
                if (typeof d.iv === "string")
                    $util.base64.decode(d.iv, m.iv = $util.newBuffer($util.base64.length(d.iv)), 0);
                else if (d.iv.length >= 0)
                    m.iv = d.iv;
            }
            return m;
        };

        EncryptedPairingRequest.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.encryptedPayload != null && $Object.hasOwnProperty.call(m, "encryptedPayload")) {
                d.encryptedPayload = o.bytes === $String ? $util.base64.encode(m.encryptedPayload, 0, m.encryptedPayload.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.encryptedPayload) : m.encryptedPayload;
            }
            if (m.iv != null && $Object.hasOwnProperty.call(m, "iv")) {
                d.iv = o.bytes === $String ? $util.base64.encode(m.iv, 0, m.iv.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.iv) : m.iv;
            }
            return d;
        };

        EncryptedPairingRequest.prototype.toJSON = function() {
            return EncryptedPairingRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        EncryptedPairingRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.EncryptedPairingRequest";
        };

        return EncryptedPairingRequest;
    })();

    CompanionReg.PairingRequest = (function() {

        const PairingRequest = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        PairingRequest.prototype.companionPublicKey = null;
        PairingRequest.prototype.companionIdentityKey = null;
        PairingRequest.prototype.advSecret = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(PairingRequest.prototype, "_companionPublicKey", {
            get: $util.oneOfGetter($oneOfFields = ["companionPublicKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(PairingRequest.prototype, "_companionIdentityKey", {
            get: $util.oneOfGetter($oneOfFields = ["companionIdentityKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(PairingRequest.prototype, "_advSecret", {
            get: $util.oneOfGetter($oneOfFields = ["advSecret"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        PairingRequest.create = function(properties) {
            return new PairingRequest(properties);
        };

        PairingRequest.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.companionPublicKey != null && $Object.hasOwnProperty.call(m, "companionPublicKey"))
                w.uint32(10).bytes(m.companionPublicKey);
            if (m.companionIdentityKey != null && $Object.hasOwnProperty.call(m, "companionIdentityKey"))
                w.uint32(18).bytes(m.companionIdentityKey);
            if (m.advSecret != null && $Object.hasOwnProperty.call(m, "advSecret"))
                w.uint32(26).bytes(m.advSecret);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        PairingRequest.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.PairingRequest();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.companionPublicKey = r.bytes();
                        m._companionPublicKey = "companionPublicKey";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.companionIdentityKey = r.bytes();
                        m._companionIdentityKey = "companionIdentityKey";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.advSecret = r.bytes();
                        m._advSecret = "advSecret";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        PairingRequest.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.PairingRequest)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.PairingRequest: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.PairingRequest();
            if (d.companionPublicKey != null) {
                if (typeof d.companionPublicKey === "string")
                    $util.base64.decode(d.companionPublicKey, m.companionPublicKey = $util.newBuffer($util.base64.length(d.companionPublicKey)), 0);
                else if (d.companionPublicKey.length >= 0)
                    m.companionPublicKey = d.companionPublicKey;
            }
            if (d.companionIdentityKey != null) {
                if (typeof d.companionIdentityKey === "string")
                    $util.base64.decode(d.companionIdentityKey, m.companionIdentityKey = $util.newBuffer($util.base64.length(d.companionIdentityKey)), 0);
                else if (d.companionIdentityKey.length >= 0)
                    m.companionIdentityKey = d.companionIdentityKey;
            }
            if (d.advSecret != null) {
                if (typeof d.advSecret === "string")
                    $util.base64.decode(d.advSecret, m.advSecret = $util.newBuffer($util.base64.length(d.advSecret)), 0);
                else if (d.advSecret.length >= 0)
                    m.advSecret = d.advSecret;
            }
            return m;
        };

        PairingRequest.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.companionPublicKey != null && $Object.hasOwnProperty.call(m, "companionPublicKey")) {
                d.companionPublicKey = o.bytes === $String ? $util.base64.encode(m.companionPublicKey, 0, m.companionPublicKey.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.companionPublicKey) : m.companionPublicKey;
            }
            if (m.companionIdentityKey != null && $Object.hasOwnProperty.call(m, "companionIdentityKey")) {
                d.companionIdentityKey = o.bytes === $String ? $util.base64.encode(m.companionIdentityKey, 0, m.companionIdentityKey.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.companionIdentityKey) : m.companionIdentityKey;
            }
            if (m.advSecret != null && $Object.hasOwnProperty.call(m, "advSecret")) {
                d.advSecret = o.bytes === $String ? $util.base64.encode(m.advSecret, 0, m.advSecret.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.advSecret) : m.advSecret;
            }
            return d;
        };

        PairingRequest.prototype.toJSON = function() {
            return PairingRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        PairingRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.PairingRequest";
        };

        return PairingRequest;
    })();

    CompanionReg.PrimaryEphemeralIdentity = (function() {

        const PrimaryEphemeralIdentity = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        PrimaryEphemeralIdentity.prototype.publicKey = null;
        PrimaryEphemeralIdentity.prototype.nonce = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(PrimaryEphemeralIdentity.prototype, "_publicKey", {
            get: $util.oneOfGetter($oneOfFields = ["publicKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(PrimaryEphemeralIdentity.prototype, "_nonce", {
            get: $util.oneOfGetter($oneOfFields = ["nonce"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        PrimaryEphemeralIdentity.create = function(properties) {
            return new PrimaryEphemeralIdentity(properties);
        };

        PrimaryEphemeralIdentity.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.publicKey != null && $Object.hasOwnProperty.call(m, "publicKey"))
                w.uint32(10).bytes(m.publicKey);
            if (m.nonce != null && $Object.hasOwnProperty.call(m, "nonce"))
                w.uint32(18).bytes(m.nonce);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        PrimaryEphemeralIdentity.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.PrimaryEphemeralIdentity();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.publicKey = r.bytes();
                        m._publicKey = "publicKey";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.nonce = r.bytes();
                        m._nonce = "nonce";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        PrimaryEphemeralIdentity.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.PrimaryEphemeralIdentity)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.PrimaryEphemeralIdentity: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.PrimaryEphemeralIdentity();
            if (d.publicKey != null) {
                if (typeof d.publicKey === "string")
                    $util.base64.decode(d.publicKey, m.publicKey = $util.newBuffer($util.base64.length(d.publicKey)), 0);
                else if (d.publicKey.length >= 0)
                    m.publicKey = d.publicKey;
            }
            if (d.nonce != null) {
                if (typeof d.nonce === "string")
                    $util.base64.decode(d.nonce, m.nonce = $util.newBuffer($util.base64.length(d.nonce)), 0);
                else if (d.nonce.length >= 0)
                    m.nonce = d.nonce;
            }
            return m;
        };

        PrimaryEphemeralIdentity.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.publicKey != null && $Object.hasOwnProperty.call(m, "publicKey")) {
                d.publicKey = o.bytes === $String ? $util.base64.encode(m.publicKey, 0, m.publicKey.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.publicKey) : m.publicKey;
            }
            if (m.nonce != null && $Object.hasOwnProperty.call(m, "nonce")) {
                d.nonce = o.bytes === $String ? $util.base64.encode(m.nonce, 0, m.nonce.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.nonce) : m.nonce;
            }
            return d;
        };

        PrimaryEphemeralIdentity.prototype.toJSON = function() {
            return PrimaryEphemeralIdentity.toObject(this, $protobuf.util.toJSONOptions);
        };

        PrimaryEphemeralIdentity.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.PrimaryEphemeralIdentity";
        };

        return PrimaryEphemeralIdentity;
    })();

    CompanionReg.ProloguePayload = (function() {

        const ProloguePayload = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ProloguePayload.prototype.companionEphemeralIdentity = null;
        ProloguePayload.prototype.commitment = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ProloguePayload.prototype, "_companionEphemeralIdentity", {
            get: $util.oneOfGetter($oneOfFields = ["companionEphemeralIdentity"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ProloguePayload.prototype, "_commitment", {
            get: $util.oneOfGetter($oneOfFields = ["commitment"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ProloguePayload.create = function(properties) {
            return new ProloguePayload(properties);
        };

        ProloguePayload.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.companionEphemeralIdentity != null && $Object.hasOwnProperty.call(m, "companionEphemeralIdentity"))
                w.uint32(10).bytes(m.companionEphemeralIdentity);
            if (m.commitment != null && $Object.hasOwnProperty.call(m, "commitment"))
                $root.CompanionReg.CompanionCommitment.encode(m.commitment, w.uint32(18).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ProloguePayload.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.ProloguePayload();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.companionEphemeralIdentity = r.bytes();
                        m._companionEphemeralIdentity = "companionEphemeralIdentity";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.commitment = $root.CompanionReg.CompanionCommitment.decode(r, r.uint32(), $undefined, q + 1, m.commitment);
                        m._commitment = "commitment";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        ProloguePayload.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.ProloguePayload)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.ProloguePayload: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.ProloguePayload();
            if (d.companionEphemeralIdentity != null) {
                if (typeof d.companionEphemeralIdentity === "string")
                    $util.base64.decode(d.companionEphemeralIdentity, m.companionEphemeralIdentity = $util.newBuffer($util.base64.length(d.companionEphemeralIdentity)), 0);
                else if (d.companionEphemeralIdentity.length >= 0)
                    m.companionEphemeralIdentity = d.companionEphemeralIdentity;
            }
            if (d.commitment != null) {
                if (!$util.isObject(d.commitment))
                    throw $TypeError(".CompanionReg.ProloguePayload.commitment: object expected");
                m.commitment = $root.CompanionReg.CompanionCommitment.fromObject(d.commitment, q + 1);
            }
            return m;
        };

        ProloguePayload.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.companionEphemeralIdentity != null && $Object.hasOwnProperty.call(m, "companionEphemeralIdentity")) {
                d.companionEphemeralIdentity = o.bytes === $String ? $util.base64.encode(m.companionEphemeralIdentity, 0, m.companionEphemeralIdentity.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.companionEphemeralIdentity) : m.companionEphemeralIdentity;
            }
            if (m.commitment != null && $Object.hasOwnProperty.call(m, "commitment")) {
                d.commitment = $root.CompanionReg.CompanionCommitment.toObject(m.commitment, o, q + 1);
            }
            return d;
        };

        ProloguePayload.prototype.toJSON = function() {
            return ProloguePayload.toObject(this, $protobuf.util.toJSONOptions);
        };

        ProloguePayload.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.ProloguePayload";
        };

        return ProloguePayload;
    })();

    CompanionReg.CompanionCommitment = (function() {

        const CompanionCommitment = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        CompanionCommitment.prototype.hash = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CompanionCommitment.prototype, "_hash", {
            get: $util.oneOfGetter($oneOfFields = ["hash"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        CompanionCommitment.create = function(properties) {
            return new CompanionCommitment(properties);
        };

        CompanionCommitment.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.hash != null && $Object.hasOwnProperty.call(m, "hash"))
                w.uint32(10).bytes(m.hash);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        CompanionCommitment.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.CompanionCommitment();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.hash = r.bytes();
                        m._hash = "hash";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        CompanionCommitment.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.CompanionCommitment)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.CompanionCommitment: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.CompanionCommitment();
            if (d.hash != null) {
                if (typeof d.hash === "string")
                    $util.base64.decode(d.hash, m.hash = $util.newBuffer($util.base64.length(d.hash)), 0);
                else if (d.hash.length >= 0)
                    m.hash = d.hash;
            }
            return m;
        };

        CompanionCommitment.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.hash != null && $Object.hasOwnProperty.call(m, "hash")) {
                d.hash = o.bytes === $String ? $util.base64.encode(m.hash, 0, m.hash.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.hash) : m.hash;
            }
            return d;
        };

        CompanionCommitment.prototype.toJSON = function() {
            return CompanionCommitment.toObject(this, $protobuf.util.toJSONOptions);
        };

        CompanionCommitment.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.CompanionCommitment";
        };

        return CompanionCommitment;
    })();

    CompanionReg.CompanionEphemeralIdentity = (function() {

        const CompanionEphemeralIdentity = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        CompanionEphemeralIdentity.prototype.publicKey = null;
        CompanionEphemeralIdentity.prototype.deviceType = null;
        CompanionEphemeralIdentity.prototype.ref = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CompanionEphemeralIdentity.prototype, "_publicKey", {
            get: $util.oneOfGetter($oneOfFields = ["publicKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CompanionEphemeralIdentity.prototype, "_deviceType", {
            get: $util.oneOfGetter($oneOfFields = ["deviceType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(CompanionEphemeralIdentity.prototype, "_ref", {
            get: $util.oneOfGetter($oneOfFields = ["ref"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        CompanionEphemeralIdentity.create = function(properties) {
            return new CompanionEphemeralIdentity(properties);
        };

        CompanionEphemeralIdentity.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.publicKey != null && $Object.hasOwnProperty.call(m, "publicKey"))
                w.uint32(10).bytes(m.publicKey);
            if (m.deviceType != null && $Object.hasOwnProperty.call(m, "deviceType"))
                w.uint32(16).int32(m.deviceType);
            if (m.ref != null && $Object.hasOwnProperty.call(m, "ref"))
                w.uint32(26).string(m.ref);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        CompanionEphemeralIdentity.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.CompanionEphemeralIdentity();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.publicKey = r.bytes();
                        m._publicKey = "publicKey";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.deviceType = r.int32();
                        m._deviceType = "deviceType";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.ref = r.stringVerify();
                        m._ref = "ref";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        CompanionEphemeralIdentity.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.CompanionEphemeralIdentity)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.CompanionEphemeralIdentity: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.CompanionEphemeralIdentity();
            if (d.publicKey != null) {
                if (typeof d.publicKey === "string")
                    $util.base64.decode(d.publicKey, m.publicKey = $util.newBuffer($util.base64.length(d.publicKey)), 0);
                else if (d.publicKey.length >= 0)
                    m.publicKey = d.publicKey;
            }
            switch (d.deviceType) {
            case "UNKNOWN":
            case 0:
                m.deviceType = 0;
                break;
            case "CHROME":
            case 1:
                m.deviceType = 1;
                break;
            case "FIREFOX":
            case 2:
                m.deviceType = 2;
                break;
            case "IE":
            case 3:
                m.deviceType = 3;
                break;
            case "OPERA":
            case 4:
                m.deviceType = 4;
                break;
            case "SAFARI":
            case 5:
                m.deviceType = 5;
                break;
            case "EDGE":
            case 6:
                m.deviceType = 6;
                break;
            case "DESKTOP":
            case 7:
                m.deviceType = 7;
                break;
            case "IPAD":
            case 8:
                m.deviceType = 8;
                break;
            case "ANDROID_TABLET":
            case 9:
                m.deviceType = 9;
                break;
            case "OHANA":
            case 10:
                m.deviceType = 10;
                break;
            case "ALOHA":
            case 11:
                m.deviceType = 11;
                break;
            case "CATALINA":
            case 12:
                m.deviceType = 12;
                break;
            case "TCL_TV":
            case 13:
                m.deviceType = 13;
                break;
            case "IOS_PHONE":
            case 14:
                m.deviceType = 14;
                break;
            case "IOS_CATALYST":
            case 15:
                m.deviceType = 15;
                break;
            case "ANDROID_PHONE":
            case 16:
                m.deviceType = 16;
                break;
            case "ANDROID_AMBIGUOUS":
            case 17:
                m.deviceType = 17;
                break;
            case "WEAR_OS":
            case 18:
                m.deviceType = 18;
                break;
            case "AR_WRIST":
            case 19:
                m.deviceType = 19;
                break;
            case "AR_DEVICE":
            case 20:
                m.deviceType = 20;
                break;
            case "UWP":
            case 21:
                m.deviceType = 21;
                break;
            case "VR":
            case 22:
                m.deviceType = 22;
                break;
            case "CLOUD_API":
            case 23:
                m.deviceType = 23;
                break;
            case "SMARTGLASSES":
            case 24:
                m.deviceType = 24;
                break;
            case "WAIL":
            case 25:
                m.deviceType = 25;
                break;
            case "WASS":
            case 26:
                m.deviceType = 26;
                break;
            case "BUSINESS_BACK_OFFICE":
            case 27:
                m.deviceType = 27;
                break;
            default:
                if (typeof d.deviceType === "number" && (d.deviceType | 0) === d.deviceType)
                    m.deviceType = d.deviceType;
            }
            if (d.ref != null) {
                m.ref = $String(d.ref);
            }
            return m;
        };

        CompanionEphemeralIdentity.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.publicKey != null && $Object.hasOwnProperty.call(m, "publicKey")) {
                d.publicKey = o.bytes === $String ? $util.base64.encode(m.publicKey, 0, m.publicKey.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.publicKey) : m.publicKey;
            }
            if (m.deviceType != null && $Object.hasOwnProperty.call(m, "deviceType")) {
                d.deviceType = o.enums === $String ? $root.CompanionReg.DeviceProps.PlatformType[m.deviceType] === $undefined ? m.deviceType : $root.CompanionReg.DeviceProps.PlatformType[m.deviceType] : m.deviceType;
            }
            if (m.ref != null && $Object.hasOwnProperty.call(m, "ref")) {
                d.ref = m.ref;
            }
            return d;
        };

        CompanionEphemeralIdentity.prototype.toJSON = function() {
            return CompanionEphemeralIdentity.toObject(this, $protobuf.util.toJSONOptions);
        };

        CompanionEphemeralIdentity.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.CompanionEphemeralIdentity";
        };

        return CompanionEphemeralIdentity;
    })();

    CompanionReg.DeviceProps = (function() {

        const DeviceProps = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        DeviceProps.prototype.os = null;
        DeviceProps.prototype.version = null;
        DeviceProps.prototype.platformType = null;
        DeviceProps.prototype.requireFullSync = null;
        DeviceProps.prototype.historySyncConfig = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DeviceProps.prototype, "_os", {
            get: $util.oneOfGetter($oneOfFields = ["os"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DeviceProps.prototype, "_version", {
            get: $util.oneOfGetter($oneOfFields = ["version"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DeviceProps.prototype, "_platformType", {
            get: $util.oneOfGetter($oneOfFields = ["platformType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DeviceProps.prototype, "_requireFullSync", {
            get: $util.oneOfGetter($oneOfFields = ["requireFullSync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DeviceProps.prototype, "_historySyncConfig", {
            get: $util.oneOfGetter($oneOfFields = ["historySyncConfig"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        DeviceProps.create = function(properties) {
            return new DeviceProps(properties);
        };

        DeviceProps.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.os != null && $Object.hasOwnProperty.call(m, "os"))
                w.uint32(10).string(m.os);
            if (m.version != null && $Object.hasOwnProperty.call(m, "version"))
                $root.CompanionReg.DeviceProps.AppVersion.encode(m.version, w.uint32(18).fork(), q + 1).ldelim();
            if (m.platformType != null && $Object.hasOwnProperty.call(m, "platformType"))
                w.uint32(24).int32(m.platformType);
            if (m.requireFullSync != null && $Object.hasOwnProperty.call(m, "requireFullSync"))
                w.uint32(32).bool(m.requireFullSync);
            if (m.historySyncConfig != null && $Object.hasOwnProperty.call(m, "historySyncConfig"))
                $root.CompanionReg.DeviceProps.HistorySyncConfig.encode(m.historySyncConfig, w.uint32(42).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        DeviceProps.decode = function (r, l, z, q, g) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            if (q === $undefined)
                q = 0;
            if (q > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var c, m, v;
            if (l === $undefined)
                c = r.len;
            else {
                c = r.pos + l;
                if (c > r.len)
                    throw $RangeError("index out of range");
                l = r.len;
                r.len = c;
            }
            m = g || new $root.CompanionReg.DeviceProps();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 1: {
                        if (u !== 2)
                            break;
                        m.os = r.stringVerify();
                        m._os = "os";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.version = $root.CompanionReg.DeviceProps.AppVersion.decode(r, r.uint32(), $undefined, q + 1, m.version);
                        m._version = "version";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.platformType = r.int32();
                        m._platformType = "platformType";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.requireFullSync = r.bool();
                        m._requireFullSync = "requireFullSync";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.historySyncConfig = $root.CompanionReg.DeviceProps.HistorySyncConfig.decode(r, r.uint32(), $undefined, q + 1, m.historySyncConfig);
                        m._historySyncConfig = "historySyncConfig";
                        continue;
                    }
                }
                r.skipType(u, q, t);
                if (!r.discardUnknown) {
                    $util.makeProp(m, "$unknowns", false);
                    (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                }
            }
            if (l !== $undefined) {
                if (r.pos !== c)
                    throw $RangeError("index out of range");
                r.len = l;
            }
            if (z !== $undefined)
                throw $Error("missing end group");
            return m;
        };

        DeviceProps.fromObject = function (d, q) {
            if (d instanceof $root.CompanionReg.DeviceProps)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".CompanionReg.DeviceProps: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.CompanionReg.DeviceProps();
            if (d.os != null) {
                m.os = $String(d.os);
            }
            if (d.version != null) {
                if (!$util.isObject(d.version))
                    throw $TypeError(".CompanionReg.DeviceProps.version: object expected");
                m.version = $root.CompanionReg.DeviceProps.AppVersion.fromObject(d.version, q + 1);
            }
            switch (d.platformType) {
            case "UNKNOWN":
            case 0:
                m.platformType = 0;
                break;
            case "CHROME":
            case 1:
                m.platformType = 1;
                break;
            case "FIREFOX":
            case 2:
                m.platformType = 2;
                break;
            case "IE":
            case 3:
                m.platformType = 3;
                break;
            case "OPERA":
            case 4:
                m.platformType = 4;
                break;
            case "SAFARI":
            case 5:
                m.platformType = 5;
                break;
            case "EDGE":
            case 6:
                m.platformType = 6;
                break;
            case "DESKTOP":
            case 7:
                m.platformType = 7;
                break;
            case "IPAD":
            case 8:
                m.platformType = 8;
                break;
            case "ANDROID_TABLET":
            case 9:
                m.platformType = 9;
                break;
            case "OHANA":
            case 10:
                m.platformType = 10;
                break;
            case "ALOHA":
            case 11:
                m.platformType = 11;
                break;
            case "CATALINA":
            case 12:
                m.platformType = 12;
                break;
            case "TCL_TV":
            case 13:
                m.platformType = 13;
                break;
            case "IOS_PHONE":
            case 14:
                m.platformType = 14;
                break;
            case "IOS_CATALYST":
            case 15:
                m.platformType = 15;
                break;
            case "ANDROID_PHONE":
            case 16:
                m.platformType = 16;
                break;
            case "ANDROID_AMBIGUOUS":
            case 17:
                m.platformType = 17;
                break;
            case "WEAR_OS":
            case 18:
                m.platformType = 18;
                break;
            case "AR_WRIST":
            case 19:
                m.platformType = 19;
                break;
            case "AR_DEVICE":
            case 20:
                m.platformType = 20;
                break;
            case "UWP":
            case 21:
                m.platformType = 21;
                break;
            case "VR":
            case 22:
                m.platformType = 22;
                break;
            case "CLOUD_API":
            case 23:
                m.platformType = 23;
                break;
            case "SMARTGLASSES":
            case 24:
                m.platformType = 24;
                break;
            case "WAIL":
            case 25:
                m.platformType = 25;
                break;
            case "WASS":
            case 26:
                m.platformType = 26;
                break;
            case "BUSINESS_BACK_OFFICE":
            case 27:
                m.platformType = 27;
                break;
            default:
                if (typeof d.platformType === "number" && (d.platformType | 0) === d.platformType)
                    m.platformType = d.platformType;
            }
            if (d.requireFullSync != null) {
                m.requireFullSync = $Boolean(d.requireFullSync);
            }
            if (d.historySyncConfig != null) {
                if (!$util.isObject(d.historySyncConfig))
                    throw $TypeError(".CompanionReg.DeviceProps.historySyncConfig: object expected");
                m.historySyncConfig = $root.CompanionReg.DeviceProps.HistorySyncConfig.fromObject(d.historySyncConfig, q + 1);
            }
            return m;
        };

        DeviceProps.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.os != null && $Object.hasOwnProperty.call(m, "os")) {
                d.os = m.os;
            }
            if (m.version != null && $Object.hasOwnProperty.call(m, "version")) {
                d.version = $root.CompanionReg.DeviceProps.AppVersion.toObject(m.version, o, q + 1);
            }
            if (m.platformType != null && $Object.hasOwnProperty.call(m, "platformType")) {
                d.platformType = o.enums === $String ? $root.CompanionReg.DeviceProps.PlatformType[m.platformType] === $undefined ? m.platformType : $root.CompanionReg.DeviceProps.PlatformType[m.platformType] : m.platformType;
            }
            if (m.requireFullSync != null && $Object.hasOwnProperty.call(m, "requireFullSync")) {
                d.requireFullSync = m.requireFullSync;
            }
            if (m.historySyncConfig != null && $Object.hasOwnProperty.call(m, "historySyncConfig")) {
                d.historySyncConfig = $root.CompanionReg.DeviceProps.HistorySyncConfig.toObject(m.historySyncConfig, o, q + 1);
            }
            return d;
        };

        DeviceProps.prototype.toJSON = function() {
            return DeviceProps.toObject(this, $protobuf.util.toJSONOptions);
        };

        DeviceProps.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/CompanionReg.DeviceProps";
        };

        DeviceProps.AppVersion = (function() {

            const AppVersion = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AppVersion.prototype.primary = null;
            AppVersion.prototype.secondary = null;
            AppVersion.prototype.tertiary = null;
            AppVersion.prototype.quaternary = null;
            AppVersion.prototype.quinary = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AppVersion.prototype, "_primary", {
                get: $util.oneOfGetter($oneOfFields = ["primary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AppVersion.prototype, "_secondary", {
                get: $util.oneOfGetter($oneOfFields = ["secondary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AppVersion.prototype, "_tertiary", {
                get: $util.oneOfGetter($oneOfFields = ["tertiary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AppVersion.prototype, "_quaternary", {
                get: $util.oneOfGetter($oneOfFields = ["quaternary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AppVersion.prototype, "_quinary", {
                get: $util.oneOfGetter($oneOfFields = ["quinary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AppVersion.create = function(properties) {
                return new AppVersion(properties);
            };

            AppVersion.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.primary != null && $Object.hasOwnProperty.call(m, "primary"))
                    w.uint32(8).uint32(m.primary);
                if (m.secondary != null && $Object.hasOwnProperty.call(m, "secondary"))
                    w.uint32(16).uint32(m.secondary);
                if (m.tertiary != null && $Object.hasOwnProperty.call(m, "tertiary"))
                    w.uint32(24).uint32(m.tertiary);
                if (m.quaternary != null && $Object.hasOwnProperty.call(m, "quaternary"))
                    w.uint32(32).uint32(m.quaternary);
                if (m.quinary != null && $Object.hasOwnProperty.call(m, "quinary"))
                    w.uint32(40).uint32(m.quinary);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AppVersion.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.CompanionReg.DeviceProps.AppVersion();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 0)
                                break;
                            m.primary = r.uint32();
                            m._primary = "primary";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.secondary = r.uint32();
                            m._secondary = "secondary";
                            continue;
                        }
                    case 3: {
                            if (u !== 0)
                                break;
                            m.tertiary = r.uint32();
                            m._tertiary = "tertiary";
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.quaternary = r.uint32();
                            m._quaternary = "quaternary";
                            continue;
                        }
                    case 5: {
                            if (u !== 0)
                                break;
                            m.quinary = r.uint32();
                            m._quinary = "quinary";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            AppVersion.fromObject = function (d, q) {
                if (d instanceof $root.CompanionReg.DeviceProps.AppVersion)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".CompanionReg.DeviceProps.AppVersion: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.CompanionReg.DeviceProps.AppVersion();
                if (d.primary != null) {
                    m.primary = d.primary >>> 0;
                }
                if (d.secondary != null) {
                    m.secondary = d.secondary >>> 0;
                }
                if (d.tertiary != null) {
                    m.tertiary = d.tertiary >>> 0;
                }
                if (d.quaternary != null) {
                    m.quaternary = d.quaternary >>> 0;
                }
                if (d.quinary != null) {
                    m.quinary = d.quinary >>> 0;
                }
                return m;
            };

            AppVersion.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.primary != null && $Object.hasOwnProperty.call(m, "primary")) {
                    d.primary = m.primary;
                }
                if (m.secondary != null && $Object.hasOwnProperty.call(m, "secondary")) {
                    d.secondary = m.secondary;
                }
                if (m.tertiary != null && $Object.hasOwnProperty.call(m, "tertiary")) {
                    d.tertiary = m.tertiary;
                }
                if (m.quaternary != null && $Object.hasOwnProperty.call(m, "quaternary")) {
                    d.quaternary = m.quaternary;
                }
                if (m.quinary != null && $Object.hasOwnProperty.call(m, "quinary")) {
                    d.quinary = m.quinary;
                }
                return d;
            };

            AppVersion.prototype.toJSON = function() {
                return AppVersion.toObject(this, $protobuf.util.toJSONOptions);
            };

            AppVersion.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/CompanionReg.DeviceProps.AppVersion";
            };

            return AppVersion;
        })();

        DeviceProps.HistorySyncConfig = (function() {

            const HistorySyncConfig = function (p) {
                this.supportedBotChannelFbids = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            HistorySyncConfig.prototype.fullSyncDaysLimit = null;
            HistorySyncConfig.prototype.fullSyncSizeMbLimit = null;
            HistorySyncConfig.prototype.storageQuotaMb = null;
            HistorySyncConfig.prototype.inlineInitialPayloadInE2EeMsg = null;
            HistorySyncConfig.prototype.recentSyncDaysLimit = null;
            HistorySyncConfig.prototype.supportCallLogHistory = null;
            HistorySyncConfig.prototype.supportBotUserAgentChatHistory = null;
            HistorySyncConfig.prototype.supportCagReactionsAndPolls = null;
            HistorySyncConfig.prototype.supportBizHostedMsg = null;
            HistorySyncConfig.prototype.supportRecentSyncChunkMessageCountTuning = null;
            HistorySyncConfig.prototype.supportHostedGroupMsg = null;
            HistorySyncConfig.prototype.supportFbidBotChatHistory = null;
            HistorySyncConfig.prototype.supportAddOnHistorySyncMigration = null;
            HistorySyncConfig.prototype.supportMessageAssociation = null;
            HistorySyncConfig.prototype.supportGroupHistory = null;
            HistorySyncConfig.prototype.onDemandReady = null;
            HistorySyncConfig.prototype.supportGuestChat = null;
            HistorySyncConfig.prototype.completeOnDemandReady = null;
            HistorySyncConfig.prototype.thumbnailSyncDaysLimit = null;
            HistorySyncConfig.prototype.initialSyncMaxMessagesPerChat = null;
            HistorySyncConfig.prototype.supportManusHistory = null;
            HistorySyncConfig.prototype.supportHatchHistory = null;
            HistorySyncConfig.prototype.supportedBotChannelFbids = $util.emptyArray;
            HistorySyncConfig.prototype.supportInlineContacts = null;
            HistorySyncConfig.prototype.supportNewsletter = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_fullSyncDaysLimit", {
                get: $util.oneOfGetter($oneOfFields = ["fullSyncDaysLimit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_fullSyncSizeMbLimit", {
                get: $util.oneOfGetter($oneOfFields = ["fullSyncSizeMbLimit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_storageQuotaMb", {
                get: $util.oneOfGetter($oneOfFields = ["storageQuotaMb"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_inlineInitialPayloadInE2EeMsg", {
                get: $util.oneOfGetter($oneOfFields = ["inlineInitialPayloadInE2EeMsg"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_recentSyncDaysLimit", {
                get: $util.oneOfGetter($oneOfFields = ["recentSyncDaysLimit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportCallLogHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportCallLogHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportBotUserAgentChatHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportBotUserAgentChatHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportCagReactionsAndPolls", {
                get: $util.oneOfGetter($oneOfFields = ["supportCagReactionsAndPolls"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportBizHostedMsg", {
                get: $util.oneOfGetter($oneOfFields = ["supportBizHostedMsg"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportRecentSyncChunkMessageCountTuning", {
                get: $util.oneOfGetter($oneOfFields = ["supportRecentSyncChunkMessageCountTuning"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportHostedGroupMsg", {
                get: $util.oneOfGetter($oneOfFields = ["supportHostedGroupMsg"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportFbidBotChatHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportFbidBotChatHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportAddOnHistorySyncMigration", {
                get: $util.oneOfGetter($oneOfFields = ["supportAddOnHistorySyncMigration"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportMessageAssociation", {
                get: $util.oneOfGetter($oneOfFields = ["supportMessageAssociation"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportGroupHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportGroupHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_onDemandReady", {
                get: $util.oneOfGetter($oneOfFields = ["onDemandReady"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportGuestChat", {
                get: $util.oneOfGetter($oneOfFields = ["supportGuestChat"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_completeOnDemandReady", {
                get: $util.oneOfGetter($oneOfFields = ["completeOnDemandReady"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_thumbnailSyncDaysLimit", {
                get: $util.oneOfGetter($oneOfFields = ["thumbnailSyncDaysLimit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_initialSyncMaxMessagesPerChat", {
                get: $util.oneOfGetter($oneOfFields = ["initialSyncMaxMessagesPerChat"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportManusHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportManusHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportHatchHistory", {
                get: $util.oneOfGetter($oneOfFields = ["supportHatchHistory"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportInlineContacts", {
                get: $util.oneOfGetter($oneOfFields = ["supportInlineContacts"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(HistorySyncConfig.prototype, "_supportNewsletter", {
                get: $util.oneOfGetter($oneOfFields = ["supportNewsletter"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            HistorySyncConfig.create = function(properties) {
                return new HistorySyncConfig(properties);
            };

            HistorySyncConfig.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.fullSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "fullSyncDaysLimit"))
                    w.uint32(8).uint32(m.fullSyncDaysLimit);
                if (m.fullSyncSizeMbLimit != null && $Object.hasOwnProperty.call(m, "fullSyncSizeMbLimit"))
                    w.uint32(16).uint32(m.fullSyncSizeMbLimit);
                if (m.storageQuotaMb != null && $Object.hasOwnProperty.call(m, "storageQuotaMb"))
                    w.uint32(24).uint32(m.storageQuotaMb);
                if (m.inlineInitialPayloadInE2EeMsg != null && $Object.hasOwnProperty.call(m, "inlineInitialPayloadInE2EeMsg"))
                    w.uint32(32).bool(m.inlineInitialPayloadInE2EeMsg);
                if (m.recentSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "recentSyncDaysLimit"))
                    w.uint32(40).uint32(m.recentSyncDaysLimit);
                if (m.supportCallLogHistory != null && $Object.hasOwnProperty.call(m, "supportCallLogHistory"))
                    w.uint32(48).bool(m.supportCallLogHistory);
                if (m.supportBotUserAgentChatHistory != null && $Object.hasOwnProperty.call(m, "supportBotUserAgentChatHistory"))
                    w.uint32(56).bool(m.supportBotUserAgentChatHistory);
                if (m.supportCagReactionsAndPolls != null && $Object.hasOwnProperty.call(m, "supportCagReactionsAndPolls"))
                    w.uint32(64).bool(m.supportCagReactionsAndPolls);
                if (m.supportBizHostedMsg != null && $Object.hasOwnProperty.call(m, "supportBizHostedMsg"))
                    w.uint32(72).bool(m.supportBizHostedMsg);
                if (m.supportRecentSyncChunkMessageCountTuning != null && $Object.hasOwnProperty.call(m, "supportRecentSyncChunkMessageCountTuning"))
                    w.uint32(80).bool(m.supportRecentSyncChunkMessageCountTuning);
                if (m.supportHostedGroupMsg != null && $Object.hasOwnProperty.call(m, "supportHostedGroupMsg"))
                    w.uint32(88).bool(m.supportHostedGroupMsg);
                if (m.supportFbidBotChatHistory != null && $Object.hasOwnProperty.call(m, "supportFbidBotChatHistory"))
                    w.uint32(96).bool(m.supportFbidBotChatHistory);
                if (m.supportAddOnHistorySyncMigration != null && $Object.hasOwnProperty.call(m, "supportAddOnHistorySyncMigration"))
                    w.uint32(104).bool(m.supportAddOnHistorySyncMigration);
                if (m.supportMessageAssociation != null && $Object.hasOwnProperty.call(m, "supportMessageAssociation"))
                    w.uint32(112).bool(m.supportMessageAssociation);
                if (m.supportGroupHistory != null && $Object.hasOwnProperty.call(m, "supportGroupHistory"))
                    w.uint32(120).bool(m.supportGroupHistory);
                if (m.onDemandReady != null && $Object.hasOwnProperty.call(m, "onDemandReady"))
                    w.uint32(128).bool(m.onDemandReady);
                if (m.supportGuestChat != null && $Object.hasOwnProperty.call(m, "supportGuestChat"))
                    w.uint32(136).bool(m.supportGuestChat);
                if (m.completeOnDemandReady != null && $Object.hasOwnProperty.call(m, "completeOnDemandReady"))
                    w.uint32(144).bool(m.completeOnDemandReady);
                if (m.thumbnailSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "thumbnailSyncDaysLimit"))
                    w.uint32(152).uint32(m.thumbnailSyncDaysLimit);
                if (m.initialSyncMaxMessagesPerChat != null && $Object.hasOwnProperty.call(m, "initialSyncMaxMessagesPerChat"))
                    w.uint32(160).uint32(m.initialSyncMaxMessagesPerChat);
                if (m.supportManusHistory != null && $Object.hasOwnProperty.call(m, "supportManusHistory"))
                    w.uint32(168).bool(m.supportManusHistory);
                if (m.supportHatchHistory != null && $Object.hasOwnProperty.call(m, "supportHatchHistory"))
                    w.uint32(176).bool(m.supportHatchHistory);
                if (m.supportedBotChannelFbids != null && m.supportedBotChannelFbids.length) {
                    for (var i = 0; i < m.supportedBotChannelFbids.length; ++i)
                        w.uint32(186).string(m.supportedBotChannelFbids[i]);
                }
                if (m.supportInlineContacts != null && $Object.hasOwnProperty.call(m, "supportInlineContacts"))
                    w.uint32(192).bool(m.supportInlineContacts);
                if (m.supportNewsletter != null && $Object.hasOwnProperty.call(m, "supportNewsletter"))
                    w.uint32(200).bool(m.supportNewsletter);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            HistorySyncConfig.decode = function (r, l, z, q, g) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                if (q === $undefined)
                    q = 0;
                if (q > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                var c, m;
                if (l === $undefined)
                    c = r.len;
                else {
                    c = r.pos + l;
                    if (c > r.len)
                        throw $RangeError("index out of range");
                    l = r.len;
                    r.len = c;
                }
                m = g || new $root.CompanionReg.DeviceProps.HistorySyncConfig();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 1: {
                            if (u !== 0)
                                break;
                            m.fullSyncDaysLimit = r.uint32();
                            m._fullSyncDaysLimit = "fullSyncDaysLimit";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.fullSyncSizeMbLimit = r.uint32();
                            m._fullSyncSizeMbLimit = "fullSyncSizeMbLimit";
                            continue;
                        }
                    case 3: {
                            if (u !== 0)
                                break;
                            m.storageQuotaMb = r.uint32();
                            m._storageQuotaMb = "storageQuotaMb";
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.inlineInitialPayloadInE2EeMsg = r.bool();
                            m._inlineInitialPayloadInE2EeMsg = "inlineInitialPayloadInE2EeMsg";
                            continue;
                        }
                    case 5: {
                            if (u !== 0)
                                break;
                            m.recentSyncDaysLimit = r.uint32();
                            m._recentSyncDaysLimit = "recentSyncDaysLimit";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.supportCallLogHistory = r.bool();
                            m._supportCallLogHistory = "supportCallLogHistory";
                            continue;
                        }
                    case 7: {
                            if (u !== 0)
                                break;
                            m.supportBotUserAgentChatHistory = r.bool();
                            m._supportBotUserAgentChatHistory = "supportBotUserAgentChatHistory";
                            continue;
                        }
                    case 8: {
                            if (u !== 0)
                                break;
                            m.supportCagReactionsAndPolls = r.bool();
                            m._supportCagReactionsAndPolls = "supportCagReactionsAndPolls";
                            continue;
                        }
                    case 9: {
                            if (u !== 0)
                                break;
                            m.supportBizHostedMsg = r.bool();
                            m._supportBizHostedMsg = "supportBizHostedMsg";
                            continue;
                        }
                    case 10: {
                            if (u !== 0)
                                break;
                            m.supportRecentSyncChunkMessageCountTuning = r.bool();
                            m._supportRecentSyncChunkMessageCountTuning = "supportRecentSyncChunkMessageCountTuning";
                            continue;
                        }
                    case 11: {
                            if (u !== 0)
                                break;
                            m.supportHostedGroupMsg = r.bool();
                            m._supportHostedGroupMsg = "supportHostedGroupMsg";
                            continue;
                        }
                    case 12: {
                            if (u !== 0)
                                break;
                            m.supportFbidBotChatHistory = r.bool();
                            m._supportFbidBotChatHistory = "supportFbidBotChatHistory";
                            continue;
                        }
                    case 13: {
                            if (u !== 0)
                                break;
                            m.supportAddOnHistorySyncMigration = r.bool();
                            m._supportAddOnHistorySyncMigration = "supportAddOnHistorySyncMigration";
                            continue;
                        }
                    case 14: {
                            if (u !== 0)
                                break;
                            m.supportMessageAssociation = r.bool();
                            m._supportMessageAssociation = "supportMessageAssociation";
                            continue;
                        }
                    case 15: {
                            if (u !== 0)
                                break;
                            m.supportGroupHistory = r.bool();
                            m._supportGroupHistory = "supportGroupHistory";
                            continue;
                        }
                    case 16: {
                            if (u !== 0)
                                break;
                            m.onDemandReady = r.bool();
                            m._onDemandReady = "onDemandReady";
                            continue;
                        }
                    case 17: {
                            if (u !== 0)
                                break;
                            m.supportGuestChat = r.bool();
                            m._supportGuestChat = "supportGuestChat";
                            continue;
                        }
                    case 18: {
                            if (u !== 0)
                                break;
                            m.completeOnDemandReady = r.bool();
                            m._completeOnDemandReady = "completeOnDemandReady";
                            continue;
                        }
                    case 19: {
                            if (u !== 0)
                                break;
                            m.thumbnailSyncDaysLimit = r.uint32();
                            m._thumbnailSyncDaysLimit = "thumbnailSyncDaysLimit";
                            continue;
                        }
                    case 20: {
                            if (u !== 0)
                                break;
                            m.initialSyncMaxMessagesPerChat = r.uint32();
                            m._initialSyncMaxMessagesPerChat = "initialSyncMaxMessagesPerChat";
                            continue;
                        }
                    case 21: {
                            if (u !== 0)
                                break;
                            m.supportManusHistory = r.bool();
                            m._supportManusHistory = "supportManusHistory";
                            continue;
                        }
                    case 22: {
                            if (u !== 0)
                                break;
                            m.supportHatchHistory = r.bool();
                            m._supportHatchHistory = "supportHatchHistory";
                            continue;
                        }
                    case 23: {
                            if (u !== 2)
                                break;
                            if (!(m.supportedBotChannelFbids && m.supportedBotChannelFbids.length))
                                m.supportedBotChannelFbids = [];
                            m.supportedBotChannelFbids.push(r.stringVerify());
                            continue;
                        }
                    case 24: {
                            if (u !== 0)
                                break;
                            m.supportInlineContacts = r.bool();
                            m._supportInlineContacts = "supportInlineContacts";
                            continue;
                        }
                    case 25: {
                            if (u !== 0)
                                break;
                            m.supportNewsletter = r.bool();
                            m._supportNewsletter = "supportNewsletter";
                            continue;
                        }
                    }
                    r.skipType(u, q, t);
                    if (!r.discardUnknown) {
                        $util.makeProp(m, "$unknowns", false);
                        (m.$unknowns || (m.$unknowns = [])).push(r.raw(s, r.pos));
                    }
                }
                if (l !== $undefined) {
                    if (r.pos !== c)
                        throw $RangeError("index out of range");
                    r.len = l;
                }
                if (z !== $undefined)
                    throw $Error("missing end group");
                return m;
            };

            HistorySyncConfig.fromObject = function (d, q) {
                if (d instanceof $root.CompanionReg.DeviceProps.HistorySyncConfig)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".CompanionReg.DeviceProps.HistorySyncConfig: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.CompanionReg.DeviceProps.HistorySyncConfig();
                if (d.fullSyncDaysLimit != null) {
                    m.fullSyncDaysLimit = d.fullSyncDaysLimit >>> 0;
                }
                if (d.fullSyncSizeMbLimit != null) {
                    m.fullSyncSizeMbLimit = d.fullSyncSizeMbLimit >>> 0;
                }
                if (d.storageQuotaMb != null) {
                    m.storageQuotaMb = d.storageQuotaMb >>> 0;
                }
                if (d.inlineInitialPayloadInE2EeMsg != null) {
                    m.inlineInitialPayloadInE2EeMsg = $Boolean(d.inlineInitialPayloadInE2EeMsg);
                }
                if (d.recentSyncDaysLimit != null) {
                    m.recentSyncDaysLimit = d.recentSyncDaysLimit >>> 0;
                }
                if (d.supportCallLogHistory != null) {
                    m.supportCallLogHistory = $Boolean(d.supportCallLogHistory);
                }
                if (d.supportBotUserAgentChatHistory != null) {
                    m.supportBotUserAgentChatHistory = $Boolean(d.supportBotUserAgentChatHistory);
                }
                if (d.supportCagReactionsAndPolls != null) {
                    m.supportCagReactionsAndPolls = $Boolean(d.supportCagReactionsAndPolls);
                }
                if (d.supportBizHostedMsg != null) {
                    m.supportBizHostedMsg = $Boolean(d.supportBizHostedMsg);
                }
                if (d.supportRecentSyncChunkMessageCountTuning != null) {
                    m.supportRecentSyncChunkMessageCountTuning = $Boolean(d.supportRecentSyncChunkMessageCountTuning);
                }
                if (d.supportHostedGroupMsg != null) {
                    m.supportHostedGroupMsg = $Boolean(d.supportHostedGroupMsg);
                }
                if (d.supportFbidBotChatHistory != null) {
                    m.supportFbidBotChatHistory = $Boolean(d.supportFbidBotChatHistory);
                }
                if (d.supportAddOnHistorySyncMigration != null) {
                    m.supportAddOnHistorySyncMigration = $Boolean(d.supportAddOnHistorySyncMigration);
                }
                if (d.supportMessageAssociation != null) {
                    m.supportMessageAssociation = $Boolean(d.supportMessageAssociation);
                }
                if (d.supportGroupHistory != null) {
                    m.supportGroupHistory = $Boolean(d.supportGroupHistory);
                }
                if (d.onDemandReady != null) {
                    m.onDemandReady = $Boolean(d.onDemandReady);
                }
                if (d.supportGuestChat != null) {
                    m.supportGuestChat = $Boolean(d.supportGuestChat);
                }
                if (d.completeOnDemandReady != null) {
                    m.completeOnDemandReady = $Boolean(d.completeOnDemandReady);
                }
                if (d.thumbnailSyncDaysLimit != null) {
                    m.thumbnailSyncDaysLimit = d.thumbnailSyncDaysLimit >>> 0;
                }
                if (d.initialSyncMaxMessagesPerChat != null) {
                    m.initialSyncMaxMessagesPerChat = d.initialSyncMaxMessagesPerChat >>> 0;
                }
                if (d.supportManusHistory != null) {
                    m.supportManusHistory = $Boolean(d.supportManusHistory);
                }
                if (d.supportHatchHistory != null) {
                    m.supportHatchHistory = $Boolean(d.supportHatchHistory);
                }
                if (d.supportedBotChannelFbids) {
                    if (!$Array.isArray(d.supportedBotChannelFbids))
                        throw $TypeError(".CompanionReg.DeviceProps.HistorySyncConfig.supportedBotChannelFbids: array expected");
                    m.supportedBotChannelFbids = $Array(d.supportedBotChannelFbids.length);
                    for (var i = 0; i < d.supportedBotChannelFbids.length; ++i) {
                        m.supportedBotChannelFbids[i] = $String(d.supportedBotChannelFbids[i]);
                    }
                }
                if (d.supportInlineContacts != null) {
                    m.supportInlineContacts = $Boolean(d.supportInlineContacts);
                }
                if (d.supportNewsletter != null) {
                    m.supportNewsletter = $Boolean(d.supportNewsletter);
                }
                return m;
            };

            HistorySyncConfig.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.supportedBotChannelFbids = [];
                }
                if (m.fullSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "fullSyncDaysLimit")) {
                    d.fullSyncDaysLimit = m.fullSyncDaysLimit;
                }
                if (m.fullSyncSizeMbLimit != null && $Object.hasOwnProperty.call(m, "fullSyncSizeMbLimit")) {
                    d.fullSyncSizeMbLimit = m.fullSyncSizeMbLimit;
                }
                if (m.storageQuotaMb != null && $Object.hasOwnProperty.call(m, "storageQuotaMb")) {
                    d.storageQuotaMb = m.storageQuotaMb;
                }
                if (m.inlineInitialPayloadInE2EeMsg != null && $Object.hasOwnProperty.call(m, "inlineInitialPayloadInE2EeMsg")) {
                    d.inlineInitialPayloadInE2EeMsg = m.inlineInitialPayloadInE2EeMsg;
                }
                if (m.recentSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "recentSyncDaysLimit")) {
                    d.recentSyncDaysLimit = m.recentSyncDaysLimit;
                }
                if (m.supportCallLogHistory != null && $Object.hasOwnProperty.call(m, "supportCallLogHistory")) {
                    d.supportCallLogHistory = m.supportCallLogHistory;
                }
                if (m.supportBotUserAgentChatHistory != null && $Object.hasOwnProperty.call(m, "supportBotUserAgentChatHistory")) {
                    d.supportBotUserAgentChatHistory = m.supportBotUserAgentChatHistory;
                }
                if (m.supportCagReactionsAndPolls != null && $Object.hasOwnProperty.call(m, "supportCagReactionsAndPolls")) {
                    d.supportCagReactionsAndPolls = m.supportCagReactionsAndPolls;
                }
                if (m.supportBizHostedMsg != null && $Object.hasOwnProperty.call(m, "supportBizHostedMsg")) {
                    d.supportBizHostedMsg = m.supportBizHostedMsg;
                }
                if (m.supportRecentSyncChunkMessageCountTuning != null && $Object.hasOwnProperty.call(m, "supportRecentSyncChunkMessageCountTuning")) {
                    d.supportRecentSyncChunkMessageCountTuning = m.supportRecentSyncChunkMessageCountTuning;
                }
                if (m.supportHostedGroupMsg != null && $Object.hasOwnProperty.call(m, "supportHostedGroupMsg")) {
                    d.supportHostedGroupMsg = m.supportHostedGroupMsg;
                }
                if (m.supportFbidBotChatHistory != null && $Object.hasOwnProperty.call(m, "supportFbidBotChatHistory")) {
                    d.supportFbidBotChatHistory = m.supportFbidBotChatHistory;
                }
                if (m.supportAddOnHistorySyncMigration != null && $Object.hasOwnProperty.call(m, "supportAddOnHistorySyncMigration")) {
                    d.supportAddOnHistorySyncMigration = m.supportAddOnHistorySyncMigration;
                }
                if (m.supportMessageAssociation != null && $Object.hasOwnProperty.call(m, "supportMessageAssociation")) {
                    d.supportMessageAssociation = m.supportMessageAssociation;
                }
                if (m.supportGroupHistory != null && $Object.hasOwnProperty.call(m, "supportGroupHistory")) {
                    d.supportGroupHistory = m.supportGroupHistory;
                }
                if (m.onDemandReady != null && $Object.hasOwnProperty.call(m, "onDemandReady")) {
                    d.onDemandReady = m.onDemandReady;
                }
                if (m.supportGuestChat != null && $Object.hasOwnProperty.call(m, "supportGuestChat")) {
                    d.supportGuestChat = m.supportGuestChat;
                }
                if (m.completeOnDemandReady != null && $Object.hasOwnProperty.call(m, "completeOnDemandReady")) {
                    d.completeOnDemandReady = m.completeOnDemandReady;
                }
                if (m.thumbnailSyncDaysLimit != null && $Object.hasOwnProperty.call(m, "thumbnailSyncDaysLimit")) {
                    d.thumbnailSyncDaysLimit = m.thumbnailSyncDaysLimit;
                }
                if (m.initialSyncMaxMessagesPerChat != null && $Object.hasOwnProperty.call(m, "initialSyncMaxMessagesPerChat")) {
                    d.initialSyncMaxMessagesPerChat = m.initialSyncMaxMessagesPerChat;
                }
                if (m.supportManusHistory != null && $Object.hasOwnProperty.call(m, "supportManusHistory")) {
                    d.supportManusHistory = m.supportManusHistory;
                }
                if (m.supportHatchHistory != null && $Object.hasOwnProperty.call(m, "supportHatchHistory")) {
                    d.supportHatchHistory = m.supportHatchHistory;
                }
                if (m.supportedBotChannelFbids && m.supportedBotChannelFbids.length) {
                    d.supportedBotChannelFbids = $Array(m.supportedBotChannelFbids.length);
                    for (var j = 0; j < m.supportedBotChannelFbids.length; ++j) {
                        d.supportedBotChannelFbids[j] = m.supportedBotChannelFbids[j];
                    }
                }
                if (m.supportInlineContacts != null && $Object.hasOwnProperty.call(m, "supportInlineContacts")) {
                    d.supportInlineContacts = m.supportInlineContacts;
                }
                if (m.supportNewsletter != null && $Object.hasOwnProperty.call(m, "supportNewsletter")) {
                    d.supportNewsletter = m.supportNewsletter;
                }
                return d;
            };

            HistorySyncConfig.prototype.toJSON = function() {
                return HistorySyncConfig.toObject(this, $protobuf.util.toJSONOptions);
            };

            HistorySyncConfig.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/CompanionReg.DeviceProps.HistorySyncConfig";
            };

            return HistorySyncConfig;
        })();

        DeviceProps.PlatformType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "CHROME"] = 1;
            values[valuesById[2] = "FIREFOX"] = 2;
            values[valuesById[3] = "IE"] = 3;
            values[valuesById[4] = "OPERA"] = 4;
            values[valuesById[5] = "SAFARI"] = 5;
            values[valuesById[6] = "EDGE"] = 6;
            values[valuesById[7] = "DESKTOP"] = 7;
            values[valuesById[8] = "IPAD"] = 8;
            values[valuesById[9] = "ANDROID_TABLET"] = 9;
            values[valuesById[10] = "OHANA"] = 10;
            values[valuesById[11] = "ALOHA"] = 11;
            values[valuesById[12] = "CATALINA"] = 12;
            values[valuesById[13] = "TCL_TV"] = 13;
            values[valuesById[14] = "IOS_PHONE"] = 14;
            values[valuesById[15] = "IOS_CATALYST"] = 15;
            values[valuesById[16] = "ANDROID_PHONE"] = 16;
            values[valuesById[17] = "ANDROID_AMBIGUOUS"] = 17;
            values[valuesById[18] = "WEAR_OS"] = 18;
            values[valuesById[19] = "AR_WRIST"] = 19;
            values[valuesById[20] = "AR_DEVICE"] = 20;
            values[valuesById[21] = "UWP"] = 21;
            values[valuesById[22] = "VR"] = 22;
            values[valuesById[23] = "CLOUD_API"] = 23;
            values[valuesById[24] = "SMARTGLASSES"] = 24;
            values[valuesById[25] = "WAIL"] = 25;
            values[valuesById[26] = "WASS"] = 26;
            values[valuesById[27] = "BUSINESS_BACK_OFFICE"] = 27;
            return values;
        })();

        return DeviceProps;
    })();

    return CompanionReg;
})();

export {
  $root as default
};
