/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $Boolean = $util.global.Boolean, $parseInt = $util.global.parseInt, $String = $util.global.String, $BigInt = $util.global.BigInt, $Number = $util.global.Number;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Protocol = $root.Protocol = (() => {

    const Protocol = {};

    Protocol.ACP2Setting = (function() {

        const ACP2Setting = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ACP2Setting.prototype.enabled = null;
        ACP2Setting.prototype.trigger = null;
        ACP2Setting.prototype.settingTimestamp = null;
        ACP2Setting.prototype.initiatedByMe = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_enabled", {
            get: $util.oneOfGetter($oneOfFields = ["enabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_trigger", {
            get: $util.oneOfGetter($oneOfFields = ["trigger"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_settingTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["settingTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ACP2Setting.prototype, "_initiatedByMe", {
            get: $util.oneOfGetter($oneOfFields = ["initiatedByMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ACP2Setting.create = function(properties) {
            return new ACP2Setting(properties);
        };

        ACP2Setting.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.enabled != null && $Object.hasOwnProperty.call(m, "enabled"))
                w.uint32(8).bool(m.enabled);
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger"))
                w.uint32(16).int32(m.trigger);
            if (m.settingTimestamp != null && $Object.hasOwnProperty.call(m, "settingTimestamp"))
                w.uint32(24).int64(m.settingTimestamp);
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe"))
                w.uint32(32).bool(m.initiatedByMe);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ACP2Setting.decode = function (r, l, z, q, g) {
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
            m = g || new $root.Protocol.ACP2Setting();
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
                        m.enabled = r.bool();
                        m._enabled = "enabled";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.trigger = r.int32();
                        m._trigger = "trigger";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.settingTimestamp = r.int64();
                        m._settingTimestamp = "settingTimestamp";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.initiatedByMe = r.bool();
                        m._initiatedByMe = "initiatedByMe";
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

        ACP2Setting.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.ACP2Setting)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.ACP2Setting: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.ACP2Setting();
            if (d.enabled != null) {
                m.enabled = $Boolean(d.enabled);
            }
            switch (d.trigger) {
            case "UNKNOWN":
            case 0:
                m.trigger = 0;
                break;
            case "CHAT_SETTING":
            case 1:
                m.trigger = 1;
                break;
            case "BIZ_SUPPORTS_FB_HOSTING":
            case 2:
                m.trigger = 2;
                break;
            case "UNKNOWN_GROUP":
            case 3:
                m.trigger = 3;
                break;
            default:
                if (typeof d.trigger === "number" && (d.trigger | 0) === d.trigger)
                    m.trigger = d.trigger;
            }
            if (d.settingTimestamp != null) {
                if ($util.Long)
                    m.settingTimestamp = $util.Long.fromValue(d.settingTimestamp, false);
                else if (typeof d.settingTimestamp === "string")
                    m.settingTimestamp = $parseInt(d.settingTimestamp, 10);
                else if (typeof d.settingTimestamp === "number")
                    m.settingTimestamp = d.settingTimestamp;
                else if (typeof d.settingTimestamp === "object")
                    m.settingTimestamp = new $util.LongBits(d.settingTimestamp.low >>> 0, d.settingTimestamp.high >>> 0).toNumber();
            }
            if (d.initiatedByMe != null) {
                m.initiatedByMe = $Boolean(d.initiatedByMe);
            }
            return m;
        };

        ACP2Setting.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.enabled != null && $Object.hasOwnProperty.call(m, "enabled")) {
                d.enabled = m.enabled;
            }
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger")) {
                d.trigger = o.enums === $String ? $root.Protocol.LimitSharing.TriggerType[m.trigger] === $undefined ? m.trigger : $root.Protocol.LimitSharing.TriggerType[m.trigger] : m.trigger;
            }
            if (m.settingTimestamp != null && $Object.hasOwnProperty.call(m, "settingTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.settingTimestamp = typeof m.settingTimestamp === "number" ? $BigInt(m.settingTimestamp) : $util.Long.fromBits(m.settingTimestamp.low >>> 0, m.settingTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.settingTimestamp === "number")
                    d.settingTimestamp = o.longs === $String ? $String(m.settingTimestamp) : m.settingTimestamp;
                else
                    d.settingTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.settingTimestamp) : o.longs === $Number ? new $util.LongBits(m.settingTimestamp.low >>> 0, m.settingTimestamp.high >>> 0).toNumber() : m.settingTimestamp;
            }
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe")) {
                d.initiatedByMe = m.initiatedByMe;
            }
            return d;
        };

        ACP2Setting.prototype.toJSON = function() {
            return ACP2Setting.toObject(this, $protobuf.util.toJSONOptions);
        };

        ACP2Setting.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.ACP2Setting";
        };

        return ACP2Setting;
    })();

    Protocol.LimitSharing = (function() {

        const LimitSharing = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        LimitSharing.prototype.sharingLimited = null;
        LimitSharing.prototype.trigger = null;
        LimitSharing.prototype.limitSharingSettingTimestamp = null;
        LimitSharing.prototype.initiatedByMe = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_sharingLimited", {
            get: $util.oneOfGetter($oneOfFields = ["sharingLimited"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_trigger", {
            get: $util.oneOfGetter($oneOfFields = ["trigger"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_limitSharingSettingTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["limitSharingSettingTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(LimitSharing.prototype, "_initiatedByMe", {
            get: $util.oneOfGetter($oneOfFields = ["initiatedByMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        LimitSharing.create = function(properties) {
            return new LimitSharing(properties);
        };

        LimitSharing.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sharingLimited != null && $Object.hasOwnProperty.call(m, "sharingLimited"))
                w.uint32(8).bool(m.sharingLimited);
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger"))
                w.uint32(16).int32(m.trigger);
            if (m.limitSharingSettingTimestamp != null && $Object.hasOwnProperty.call(m, "limitSharingSettingTimestamp"))
                w.uint32(24).int64(m.limitSharingSettingTimestamp);
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe"))
                w.uint32(32).bool(m.initiatedByMe);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        LimitSharing.decode = function (r, l, z, q, g) {
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
            m = g || new $root.Protocol.LimitSharing();
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
                        m.sharingLimited = r.bool();
                        m._sharingLimited = "sharingLimited";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.trigger = r.int32();
                        m._trigger = "trigger";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.limitSharingSettingTimestamp = r.int64();
                        m._limitSharingSettingTimestamp = "limitSharingSettingTimestamp";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.initiatedByMe = r.bool();
                        m._initiatedByMe = "initiatedByMe";
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

        LimitSharing.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.LimitSharing)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.LimitSharing: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.LimitSharing();
            if (d.sharingLimited != null) {
                m.sharingLimited = $Boolean(d.sharingLimited);
            }
            switch (d.trigger) {
            case "UNKNOWN":
            case 0:
                m.trigger = 0;
                break;
            case "CHAT_SETTING":
            case 1:
                m.trigger = 1;
                break;
            case "BIZ_SUPPORTS_FB_HOSTING":
            case 2:
                m.trigger = 2;
                break;
            case "UNKNOWN_GROUP":
            case 3:
                m.trigger = 3;
                break;
            default:
                if (typeof d.trigger === "number" && (d.trigger | 0) === d.trigger)
                    m.trigger = d.trigger;
            }
            if (d.limitSharingSettingTimestamp != null) {
                if ($util.Long)
                    m.limitSharingSettingTimestamp = $util.Long.fromValue(d.limitSharingSettingTimestamp, false);
                else if (typeof d.limitSharingSettingTimestamp === "string")
                    m.limitSharingSettingTimestamp = $parseInt(d.limitSharingSettingTimestamp, 10);
                else if (typeof d.limitSharingSettingTimestamp === "number")
                    m.limitSharingSettingTimestamp = d.limitSharingSettingTimestamp;
                else if (typeof d.limitSharingSettingTimestamp === "object")
                    m.limitSharingSettingTimestamp = new $util.LongBits(d.limitSharingSettingTimestamp.low >>> 0, d.limitSharingSettingTimestamp.high >>> 0).toNumber();
            }
            if (d.initiatedByMe != null) {
                m.initiatedByMe = $Boolean(d.initiatedByMe);
            }
            return m;
        };

        LimitSharing.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sharingLimited != null && $Object.hasOwnProperty.call(m, "sharingLimited")) {
                d.sharingLimited = m.sharingLimited;
            }
            if (m.trigger != null && $Object.hasOwnProperty.call(m, "trigger")) {
                d.trigger = o.enums === $String ? $root.Protocol.LimitSharing.TriggerType[m.trigger] === $undefined ? m.trigger : $root.Protocol.LimitSharing.TriggerType[m.trigger] : m.trigger;
            }
            if (m.limitSharingSettingTimestamp != null && $Object.hasOwnProperty.call(m, "limitSharingSettingTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.limitSharingSettingTimestamp = typeof m.limitSharingSettingTimestamp === "number" ? $BigInt(m.limitSharingSettingTimestamp) : $util.Long.fromBits(m.limitSharingSettingTimestamp.low >>> 0, m.limitSharingSettingTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.limitSharingSettingTimestamp === "number")
                    d.limitSharingSettingTimestamp = o.longs === $String ? $String(m.limitSharingSettingTimestamp) : m.limitSharingSettingTimestamp;
                else
                    d.limitSharingSettingTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.limitSharingSettingTimestamp) : o.longs === $Number ? new $util.LongBits(m.limitSharingSettingTimestamp.low >>> 0, m.limitSharingSettingTimestamp.high >>> 0).toNumber() : m.limitSharingSettingTimestamp;
            }
            if (m.initiatedByMe != null && $Object.hasOwnProperty.call(m, "initiatedByMe")) {
                d.initiatedByMe = m.initiatedByMe;
            }
            return d;
        };

        LimitSharing.prototype.toJSON = function() {
            return LimitSharing.toObject(this, $protobuf.util.toJSONOptions);
        };

        LimitSharing.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.LimitSharing";
        };

        LimitSharing.TriggerType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "CHAT_SETTING"] = 1;
            values[valuesById[2] = "BIZ_SUPPORTS_FB_HOSTING"] = 2;
            values[valuesById[3] = "UNKNOWN_GROUP"] = 3;
            return values;
        })();

        return LimitSharing;
    })();

    Protocol.MessageKey = (function() {

        const MessageKey = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        MessageKey.prototype.remoteJid = null;
        MessageKey.prototype.fromMe = null;
        MessageKey.prototype.id = null;
        MessageKey.prototype.participant = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_remoteJid", {
            get: $util.oneOfGetter($oneOfFields = ["remoteJid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_fromMe", {
            get: $util.oneOfGetter($oneOfFields = ["fromMe"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_id", {
            get: $util.oneOfGetter($oneOfFields = ["id"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MessageKey.prototype, "_participant", {
            get: $util.oneOfGetter($oneOfFields = ["participant"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        MessageKey.create = function(properties) {
            return new MessageKey(properties);
        };

        MessageKey.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.remoteJid != null && $Object.hasOwnProperty.call(m, "remoteJid"))
                w.uint32(10).string(m.remoteJid);
            if (m.fromMe != null && $Object.hasOwnProperty.call(m, "fromMe"))
                w.uint32(16).bool(m.fromMe);
            if (m.id != null && $Object.hasOwnProperty.call(m, "id"))
                w.uint32(26).string(m.id);
            if (m.participant != null && $Object.hasOwnProperty.call(m, "participant"))
                w.uint32(34).string(m.participant);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        MessageKey.decode = function (r, l, z, q, g) {
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
            m = g || new $root.Protocol.MessageKey();
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
                        m.remoteJid = r.stringVerify();
                        m._remoteJid = "remoteJid";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.fromMe = r.bool();
                        m._fromMe = "fromMe";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.id = r.stringVerify();
                        m._id = "id";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.participant = r.stringVerify();
                        m._participant = "participant";
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

        MessageKey.fromObject = function (d, q) {
            if (d instanceof $root.Protocol.MessageKey)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Protocol.MessageKey: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Protocol.MessageKey();
            if (d.remoteJid != null) {
                m.remoteJid = $String(d.remoteJid);
            }
            if (d.fromMe != null) {
                m.fromMe = $Boolean(d.fromMe);
            }
            if (d.id != null) {
                m.id = $String(d.id);
            }
            if (d.participant != null) {
                m.participant = $String(d.participant);
            }
            return m;
        };

        MessageKey.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.remoteJid != null && $Object.hasOwnProperty.call(m, "remoteJid")) {
                d.remoteJid = m.remoteJid;
            }
            if (m.fromMe != null && $Object.hasOwnProperty.call(m, "fromMe")) {
                d.fromMe = m.fromMe;
            }
            if (m.id != null && $Object.hasOwnProperty.call(m, "id")) {
                d.id = m.id;
            }
            if (m.participant != null && $Object.hasOwnProperty.call(m, "participant")) {
                d.participant = m.participant;
            }
            return d;
        };

        MessageKey.prototype.toJSON = function() {
            return MessageKey.toObject(this, $protobuf.util.toJSONOptions);
        };

        MessageKey.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Protocol.MessageKey";
        };

        return MessageKey;
    })();

    return Protocol;
})();

export {
  $root as default
};
