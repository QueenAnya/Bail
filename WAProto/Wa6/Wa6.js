/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $parseInt = $util.global.parseInt, $Boolean = $util.global.Boolean, $String = $util.global.String, $Array = $util.global.Array, $BigInt = $util.global.BigInt, $Number = $util.global.Number;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Wa6 = $root.Wa6 = (() => {

    const Wa6 = {};

    Wa6.ClientPayload = (function() {

        const ClientPayload = function (p) {
            this.shards = [];
            this.pairedPeripherals = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ClientPayload.prototype.username = null;
        ClientPayload.prototype.passive = null;
        ClientPayload.prototype.userAgent = null;
        ClientPayload.prototype.webInfo = null;
        ClientPayload.prototype.pushName = null;
        ClientPayload.prototype.sessionId = null;
        ClientPayload.prototype.shortConnect = null;
        ClientPayload.prototype.connectType = null;
        ClientPayload.prototype.connectReason = null;
        ClientPayload.prototype.shards = $util.emptyArray;
        ClientPayload.prototype.dnsSource = null;
        ClientPayload.prototype.connectAttemptCount = null;
        ClientPayload.prototype.device = null;
        ClientPayload.prototype.devicePairingData = null;
        ClientPayload.prototype.product = null;
        ClientPayload.prototype.fbCat = null;
        ClientPayload.prototype.fbUserAgent = null;
        ClientPayload.prototype.oc = null;
        ClientPayload.prototype.lc = null;
        ClientPayload.prototype.iosAppExtension = null;
        ClientPayload.prototype.fbAppId = null;
        ClientPayload.prototype.fbDeviceId = null;
        ClientPayload.prototype.pull = null;
        ClientPayload.prototype.paddingBytes = null;
        ClientPayload.prototype.yearClass = null;
        ClientPayload.prototype.memClass = null;
        ClientPayload.prototype.interopData = null;
        ClientPayload.prototype.trafficAnonymization = null;
        ClientPayload.prototype.lidDbMigrated = null;
        ClientPayload.prototype.accountType = null;
        ClientPayload.prototype.connectionSequenceInfo = null;
        ClientPayload.prototype.paaLink = null;
        ClientPayload.prototype.preacksCount = null;
        ClientPayload.prototype.processingQueueSize = null;
        ClientPayload.prototype.pairedPeripherals = $util.emptyArray;
        ClientPayload.prototype.testIsolationId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_username", {
            get: $util.oneOfGetter($oneOfFields = ["username"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_passive", {
            get: $util.oneOfGetter($oneOfFields = ["passive"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_userAgent", {
            get: $util.oneOfGetter($oneOfFields = ["userAgent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_webInfo", {
            get: $util.oneOfGetter($oneOfFields = ["webInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_pushName", {
            get: $util.oneOfGetter($oneOfFields = ["pushName"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_sessionId", {
            get: $util.oneOfGetter($oneOfFields = ["sessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_shortConnect", {
            get: $util.oneOfGetter($oneOfFields = ["shortConnect"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_connectType", {
            get: $util.oneOfGetter($oneOfFields = ["connectType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_connectReason", {
            get: $util.oneOfGetter($oneOfFields = ["connectReason"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_dnsSource", {
            get: $util.oneOfGetter($oneOfFields = ["dnsSource"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_connectAttemptCount", {
            get: $util.oneOfGetter($oneOfFields = ["connectAttemptCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_device", {
            get: $util.oneOfGetter($oneOfFields = ["device"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_devicePairingData", {
            get: $util.oneOfGetter($oneOfFields = ["devicePairingData"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_product", {
            get: $util.oneOfGetter($oneOfFields = ["product"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_fbCat", {
            get: $util.oneOfGetter($oneOfFields = ["fbCat"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_fbUserAgent", {
            get: $util.oneOfGetter($oneOfFields = ["fbUserAgent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_oc", {
            get: $util.oneOfGetter($oneOfFields = ["oc"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_lc", {
            get: $util.oneOfGetter($oneOfFields = ["lc"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_iosAppExtension", {
            get: $util.oneOfGetter($oneOfFields = ["iosAppExtension"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_fbAppId", {
            get: $util.oneOfGetter($oneOfFields = ["fbAppId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_fbDeviceId", {
            get: $util.oneOfGetter($oneOfFields = ["fbDeviceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_pull", {
            get: $util.oneOfGetter($oneOfFields = ["pull"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_paddingBytes", {
            get: $util.oneOfGetter($oneOfFields = ["paddingBytes"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_yearClass", {
            get: $util.oneOfGetter($oneOfFields = ["yearClass"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_memClass", {
            get: $util.oneOfGetter($oneOfFields = ["memClass"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_interopData", {
            get: $util.oneOfGetter($oneOfFields = ["interopData"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_trafficAnonymization", {
            get: $util.oneOfGetter($oneOfFields = ["trafficAnonymization"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_lidDbMigrated", {
            get: $util.oneOfGetter($oneOfFields = ["lidDbMigrated"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_accountType", {
            get: $util.oneOfGetter($oneOfFields = ["accountType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_connectionSequenceInfo", {
            get: $util.oneOfGetter($oneOfFields = ["connectionSequenceInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_paaLink", {
            get: $util.oneOfGetter($oneOfFields = ["paaLink"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_preacksCount", {
            get: $util.oneOfGetter($oneOfFields = ["preacksCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_processingQueueSize", {
            get: $util.oneOfGetter($oneOfFields = ["processingQueueSize"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ClientPayload.prototype, "_testIsolationId", {
            get: $util.oneOfGetter($oneOfFields = ["testIsolationId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ClientPayload.create = function(properties) {
            return new ClientPayload(properties);
        };

        ClientPayload.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.username != null && $Object.hasOwnProperty.call(m, "username"))
                w.uint32(8).uint64(m.username);
            if (m.passive != null && $Object.hasOwnProperty.call(m, "passive"))
                w.uint32(24).bool(m.passive);
            if (m.userAgent != null && $Object.hasOwnProperty.call(m, "userAgent"))
                $root.Wa6.ClientPayload.UserAgent.encode(m.userAgent, w.uint32(42).fork(), q + 1).ldelim();
            if (m.webInfo != null && $Object.hasOwnProperty.call(m, "webInfo"))
                $root.Wa6.ClientPayload.WebInfo.encode(m.webInfo, w.uint32(50).fork(), q + 1).ldelim();
            if (m.pushName != null && $Object.hasOwnProperty.call(m, "pushName"))
                w.uint32(58).string(m.pushName);
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId"))
                w.uint32(77).sfixed32(m.sessionId);
            if (m.shortConnect != null && $Object.hasOwnProperty.call(m, "shortConnect"))
                w.uint32(80).bool(m.shortConnect);
            if (m.connectType != null && $Object.hasOwnProperty.call(m, "connectType"))
                w.uint32(96).int32(m.connectType);
            if (m.connectReason != null && $Object.hasOwnProperty.call(m, "connectReason"))
                w.uint32(104).int32(m.connectReason);
            if (m.shards != null && m.shards.length) {
                w.uint32(114).int32s(m.shards);
            }
            if (m.dnsSource != null && $Object.hasOwnProperty.call(m, "dnsSource"))
                $root.Wa6.ClientPayload.DNSSource.encode(m.dnsSource, w.uint32(122).fork(), q + 1).ldelim();
            if (m.connectAttemptCount != null && $Object.hasOwnProperty.call(m, "connectAttemptCount"))
                w.uint32(128).uint32(m.connectAttemptCount);
            if (m.device != null && $Object.hasOwnProperty.call(m, "device"))
                w.uint32(144).uint32(m.device);
            if (m.devicePairingData != null && $Object.hasOwnProperty.call(m, "devicePairingData"))
                $root.Wa6.ClientPayload.DevicePairingRegistrationData.encode(m.devicePairingData, w.uint32(154).fork(), q + 1).ldelim();
            if (m.product != null && $Object.hasOwnProperty.call(m, "product"))
                w.uint32(160).int32(m.product);
            if (m.fbCat != null && $Object.hasOwnProperty.call(m, "fbCat"))
                w.uint32(170).bytes(m.fbCat);
            if (m.fbUserAgent != null && $Object.hasOwnProperty.call(m, "fbUserAgent"))
                w.uint32(178).bytes(m.fbUserAgent);
            if (m.oc != null && $Object.hasOwnProperty.call(m, "oc"))
                w.uint32(184).bool(m.oc);
            if (m.lc != null && $Object.hasOwnProperty.call(m, "lc"))
                w.uint32(192).int32(m.lc);
            if (m.iosAppExtension != null && $Object.hasOwnProperty.call(m, "iosAppExtension"))
                w.uint32(240).int32(m.iosAppExtension);
            if (m.fbAppId != null && $Object.hasOwnProperty.call(m, "fbAppId"))
                w.uint32(248).uint64(m.fbAppId);
            if (m.fbDeviceId != null && $Object.hasOwnProperty.call(m, "fbDeviceId"))
                w.uint32(258).bytes(m.fbDeviceId);
            if (m.pull != null && $Object.hasOwnProperty.call(m, "pull"))
                w.uint32(264).bool(m.pull);
            if (m.paddingBytes != null && $Object.hasOwnProperty.call(m, "paddingBytes"))
                w.uint32(274).bytes(m.paddingBytes);
            if (m.yearClass != null && $Object.hasOwnProperty.call(m, "yearClass"))
                w.uint32(288).int32(m.yearClass);
            if (m.memClass != null && $Object.hasOwnProperty.call(m, "memClass"))
                w.uint32(296).int32(m.memClass);
            if (m.interopData != null && $Object.hasOwnProperty.call(m, "interopData"))
                $root.Wa6.ClientPayload.InteropData.encode(m.interopData, w.uint32(306).fork(), q + 1).ldelim();
            if (m.trafficAnonymization != null && $Object.hasOwnProperty.call(m, "trafficAnonymization"))
                w.uint32(320).int32(m.trafficAnonymization);
            if (m.lidDbMigrated != null && $Object.hasOwnProperty.call(m, "lidDbMigrated"))
                w.uint32(328).bool(m.lidDbMigrated);
            if (m.accountType != null && $Object.hasOwnProperty.call(m, "accountType"))
                w.uint32(336).int32(m.accountType);
            if (m.connectionSequenceInfo != null && $Object.hasOwnProperty.call(m, "connectionSequenceInfo"))
                w.uint32(349).sfixed32(m.connectionSequenceInfo);
            if (m.paaLink != null && $Object.hasOwnProperty.call(m, "paaLink"))
                w.uint32(352).bool(m.paaLink);
            if (m.preacksCount != null && $Object.hasOwnProperty.call(m, "preacksCount"))
                w.uint32(360).int32(m.preacksCount);
            if (m.processingQueueSize != null && $Object.hasOwnProperty.call(m, "processingQueueSize"))
                w.uint32(368).int32(m.processingQueueSize);
            if (m.pairedPeripherals != null && m.pairedPeripherals.length) {
                for (var i = 0; i < m.pairedPeripherals.length; ++i)
                    w.uint32(378).string(m.pairedPeripherals[i]);
            }
            if (m.testIsolationId != null && $Object.hasOwnProperty.call(m, "testIsolationId"))
                w.uint32(386).bytes(m.testIsolationId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ClientPayload.decode = function (r, l, z, q, g) {
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
            m = g || new $root.Wa6.ClientPayload();
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
                        m.username = r.uint64();
                        m._username = "username";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.passive = r.bool();
                        m._passive = "passive";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.userAgent = $root.Wa6.ClientPayload.UserAgent.decode(r, r.uint32(), $undefined, q + 1, m.userAgent);
                        m._userAgent = "userAgent";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.webInfo = $root.Wa6.ClientPayload.WebInfo.decode(r, r.uint32(), $undefined, q + 1, m.webInfo);
                        m._webInfo = "webInfo";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.pushName = r.stringVerify();
                        m._pushName = "pushName";
                        continue;
                    }
                case 9: {
                        if (u !== 5)
                            break;
                        m.sessionId = r.sfixed32();
                        m._sessionId = "sessionId";
                        continue;
                    }
                case 10: {
                        if (u !== 0)
                            break;
                        m.shortConnect = r.bool();
                        m._shortConnect = "shortConnect";
                        continue;
                    }
                case 12: {
                        if (u !== 0)
                            break;
                        m.connectType = r.int32();
                        m._connectType = "connectType";
                        continue;
                    }
                case 13: {
                        if (u !== 0)
                            break;
                        m.connectReason = r.int32();
                        m._connectReason = "connectReason";
                        continue;
                    }
                case 14: {
                        if (u === 2) {
                            if (!(m.shards && m.shards.length))
                                m.shards = [];
                            r.int32s(m.shards);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.shards && m.shards.length))
                            m.shards = [];
                        m.shards.push(r.int32());
                        continue;
                    }
                case 15: {
                        if (u !== 2)
                            break;
                        m.dnsSource = $root.Wa6.ClientPayload.DNSSource.decode(r, r.uint32(), $undefined, q + 1, m.dnsSource);
                        m._dnsSource = "dnsSource";
                        continue;
                    }
                case 16: {
                        if (u !== 0)
                            break;
                        m.connectAttemptCount = r.uint32();
                        m._connectAttemptCount = "connectAttemptCount";
                        continue;
                    }
                case 18: {
                        if (u !== 0)
                            break;
                        m.device = r.uint32();
                        m._device = "device";
                        continue;
                    }
                case 19: {
                        if (u !== 2)
                            break;
                        m.devicePairingData = $root.Wa6.ClientPayload.DevicePairingRegistrationData.decode(r, r.uint32(), $undefined, q + 1, m.devicePairingData);
                        m._devicePairingData = "devicePairingData";
                        continue;
                    }
                case 20: {
                        if (u !== 0)
                            break;
                        m.product = r.int32();
                        m._product = "product";
                        continue;
                    }
                case 21: {
                        if (u !== 2)
                            break;
                        m.fbCat = r.bytes();
                        m._fbCat = "fbCat";
                        continue;
                    }
                case 22: {
                        if (u !== 2)
                            break;
                        m.fbUserAgent = r.bytes();
                        m._fbUserAgent = "fbUserAgent";
                        continue;
                    }
                case 23: {
                        if (u !== 0)
                            break;
                        m.oc = r.bool();
                        m._oc = "oc";
                        continue;
                    }
                case 24: {
                        if (u !== 0)
                            break;
                        m.lc = r.int32();
                        m._lc = "lc";
                        continue;
                    }
                case 30: {
                        if (u !== 0)
                            break;
                        m.iosAppExtension = r.int32();
                        m._iosAppExtension = "iosAppExtension";
                        continue;
                    }
                case 31: {
                        if (u !== 0)
                            break;
                        m.fbAppId = r.uint64();
                        m._fbAppId = "fbAppId";
                        continue;
                    }
                case 32: {
                        if (u !== 2)
                            break;
                        m.fbDeviceId = r.bytes();
                        m._fbDeviceId = "fbDeviceId";
                        continue;
                    }
                case 33: {
                        if (u !== 0)
                            break;
                        m.pull = r.bool();
                        m._pull = "pull";
                        continue;
                    }
                case 34: {
                        if (u !== 2)
                            break;
                        m.paddingBytes = r.bytes();
                        m._paddingBytes = "paddingBytes";
                        continue;
                    }
                case 36: {
                        if (u !== 0)
                            break;
                        m.yearClass = r.int32();
                        m._yearClass = "yearClass";
                        continue;
                    }
                case 37: {
                        if (u !== 0)
                            break;
                        m.memClass = r.int32();
                        m._memClass = "memClass";
                        continue;
                    }
                case 38: {
                        if (u !== 2)
                            break;
                        m.interopData = $root.Wa6.ClientPayload.InteropData.decode(r, r.uint32(), $undefined, q + 1, m.interopData);
                        m._interopData = "interopData";
                        continue;
                    }
                case 40: {
                        if (u !== 0)
                            break;
                        m.trafficAnonymization = r.int32();
                        m._trafficAnonymization = "trafficAnonymization";
                        continue;
                    }
                case 41: {
                        if (u !== 0)
                            break;
                        m.lidDbMigrated = r.bool();
                        m._lidDbMigrated = "lidDbMigrated";
                        continue;
                    }
                case 42: {
                        if (u !== 0)
                            break;
                        m.accountType = r.int32();
                        m._accountType = "accountType";
                        continue;
                    }
                case 43: {
                        if (u !== 5)
                            break;
                        m.connectionSequenceInfo = r.sfixed32();
                        m._connectionSequenceInfo = "connectionSequenceInfo";
                        continue;
                    }
                case 44: {
                        if (u !== 0)
                            break;
                        m.paaLink = r.bool();
                        m._paaLink = "paaLink";
                        continue;
                    }
                case 45: {
                        if (u !== 0)
                            break;
                        m.preacksCount = r.int32();
                        m._preacksCount = "preacksCount";
                        continue;
                    }
                case 46: {
                        if (u !== 0)
                            break;
                        m.processingQueueSize = r.int32();
                        m._processingQueueSize = "processingQueueSize";
                        continue;
                    }
                case 47: {
                        if (u !== 2)
                            break;
                        if (!(m.pairedPeripherals && m.pairedPeripherals.length))
                            m.pairedPeripherals = [];
                        m.pairedPeripherals.push(r.stringVerify());
                        continue;
                    }
                case 48: {
                        if (u !== 2)
                            break;
                        m.testIsolationId = r.bytes();
                        m._testIsolationId = "testIsolationId";
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

        ClientPayload.fromObject = function (d, q) {
            if (d instanceof $root.Wa6.ClientPayload)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Wa6.ClientPayload: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Wa6.ClientPayload();
            if (d.username != null) {
                if ($util.Long)
                    m.username = $util.Long.fromValue(d.username, true);
                else if (typeof d.username === "string")
                    m.username = $parseInt(d.username, 10);
                else if (typeof d.username === "number")
                    m.username = d.username;
                else if (typeof d.username === "object")
                    m.username = new $util.LongBits(d.username.low >>> 0, d.username.high >>> 0).toNumber(true);
            }
            if (d.passive != null) {
                m.passive = $Boolean(d.passive);
            }
            if (d.userAgent != null) {
                if (!$util.isObject(d.userAgent))
                    throw $TypeError(".Wa6.ClientPayload.userAgent: object expected");
                m.userAgent = $root.Wa6.ClientPayload.UserAgent.fromObject(d.userAgent, q + 1);
            }
            if (d.webInfo != null) {
                if (!$util.isObject(d.webInfo))
                    throw $TypeError(".Wa6.ClientPayload.webInfo: object expected");
                m.webInfo = $root.Wa6.ClientPayload.WebInfo.fromObject(d.webInfo, q + 1);
            }
            if (d.pushName != null) {
                m.pushName = $String(d.pushName);
            }
            if (d.sessionId != null) {
                m.sessionId = d.sessionId | 0;
            }
            if (d.shortConnect != null) {
                m.shortConnect = $Boolean(d.shortConnect);
            }
            switch (d.connectType) {
            case "CELLULAR_UNKNOWN":
            case 0:
                m.connectType = 0;
                break;
            case "WIFI_UNKNOWN":
            case 1:
                m.connectType = 1;
                break;
            case "CELLULAR_EDGE":
            case 100:
                m.connectType = 100;
                break;
            case "CELLULAR_IDEN":
            case 101:
                m.connectType = 101;
                break;
            case "CELLULAR_UMTS":
            case 102:
                m.connectType = 102;
                break;
            case "CELLULAR_EVDO":
            case 103:
                m.connectType = 103;
                break;
            case "CELLULAR_GPRS":
            case 104:
                m.connectType = 104;
                break;
            case "CELLULAR_HSDPA":
            case 105:
                m.connectType = 105;
                break;
            case "CELLULAR_HSUPA":
            case 106:
                m.connectType = 106;
                break;
            case "CELLULAR_HSPA":
            case 107:
                m.connectType = 107;
                break;
            case "CELLULAR_CDMA":
            case 108:
                m.connectType = 108;
                break;
            case "CELLULAR_1XRTT":
            case 109:
                m.connectType = 109;
                break;
            case "CELLULAR_EHRPD":
            case 110:
                m.connectType = 110;
                break;
            case "CELLULAR_LTE":
            case 111:
                m.connectType = 111;
                break;
            case "CELLULAR_HSPAP":
            case 112:
                m.connectType = 112;
                break;
            default:
                if (typeof d.connectType === "number" && (d.connectType | 0) === d.connectType)
                    m.connectType = d.connectType;
            }
            switch (d.connectReason) {
            case "PUSH":
            case 0:
                m.connectReason = 0;
                break;
            case "USER_ACTIVATED":
            case 1:
                m.connectReason = 1;
                break;
            case "SCHEDULED":
            case 2:
                m.connectReason = 2;
                break;
            case "ERROR_RECONNECT":
            case 3:
                m.connectReason = 3;
                break;
            case "NETWORK_SWITCH":
            case 4:
                m.connectReason = 4;
                break;
            case "PING_RECONNECT":
            case 5:
                m.connectReason = 5;
                break;
            case "UNKNOWN":
            case 6:
                m.connectReason = 6;
                break;
            default:
                if (typeof d.connectReason === "number" && (d.connectReason | 0) === d.connectReason)
                    m.connectReason = d.connectReason;
            }
            if (d.shards) {
                if (!$Array.isArray(d.shards))
                    throw $TypeError(".Wa6.ClientPayload.shards: array expected");
                m.shards = $Array(d.shards.length);
                for (var i = 0; i < d.shards.length; ++i) {
                    m.shards[i] = d.shards[i] | 0;
                }
            }
            if (d.dnsSource != null) {
                if (!$util.isObject(d.dnsSource))
                    throw $TypeError(".Wa6.ClientPayload.dnsSource: object expected");
                m.dnsSource = $root.Wa6.ClientPayload.DNSSource.fromObject(d.dnsSource, q + 1);
            }
            if (d.connectAttemptCount != null) {
                m.connectAttemptCount = d.connectAttemptCount >>> 0;
            }
            if (d.device != null) {
                m.device = d.device >>> 0;
            }
            if (d.devicePairingData != null) {
                if (!$util.isObject(d.devicePairingData))
                    throw $TypeError(".Wa6.ClientPayload.devicePairingData: object expected");
                m.devicePairingData = $root.Wa6.ClientPayload.DevicePairingRegistrationData.fromObject(d.devicePairingData, q + 1);
            }
            switch (d.product) {
            case "WHATSAPP":
            case 0:
                m.product = 0;
                break;
            case "MESSENGER":
            case 1:
                m.product = 1;
                break;
            case "INTEROP":
            case 2:
                m.product = 2;
                break;
            case "INTEROP_MSGR":
            case 3:
                m.product = 3;
                break;
            case "WHATSAPP_LID":
            case 4:
                m.product = 4;
                break;
            default:
                if (typeof d.product === "number" && (d.product | 0) === d.product)
                    m.product = d.product;
            }
            if (d.fbCat != null) {
                if (typeof d.fbCat === "string")
                    $util.base64.decode(d.fbCat, m.fbCat = $util.newBuffer($util.base64.length(d.fbCat)), 0);
                else if (d.fbCat.length >= 0)
                    m.fbCat = d.fbCat;
            }
            if (d.fbUserAgent != null) {
                if (typeof d.fbUserAgent === "string")
                    $util.base64.decode(d.fbUserAgent, m.fbUserAgent = $util.newBuffer($util.base64.length(d.fbUserAgent)), 0);
                else if (d.fbUserAgent.length >= 0)
                    m.fbUserAgent = d.fbUserAgent;
            }
            if (d.oc != null) {
                m.oc = $Boolean(d.oc);
            }
            if (d.lc != null) {
                m.lc = d.lc | 0;
            }
            switch (d.iosAppExtension) {
            case "SHARE_EXTENSION":
            case 0:
                m.iosAppExtension = 0;
                break;
            case "SERVICE_EXTENSION":
            case 1:
                m.iosAppExtension = 1;
                break;
            case "INTENTS_EXTENSION":
            case 2:
                m.iosAppExtension = 2;
                break;
            default:
                if (typeof d.iosAppExtension === "number" && (d.iosAppExtension | 0) === d.iosAppExtension)
                    m.iosAppExtension = d.iosAppExtension;
            }
            if (d.fbAppId != null) {
                if ($util.Long)
                    m.fbAppId = $util.Long.fromValue(d.fbAppId, true);
                else if (typeof d.fbAppId === "string")
                    m.fbAppId = $parseInt(d.fbAppId, 10);
                else if (typeof d.fbAppId === "number")
                    m.fbAppId = d.fbAppId;
                else if (typeof d.fbAppId === "object")
                    m.fbAppId = new $util.LongBits(d.fbAppId.low >>> 0, d.fbAppId.high >>> 0).toNumber(true);
            }
            if (d.fbDeviceId != null) {
                if (typeof d.fbDeviceId === "string")
                    $util.base64.decode(d.fbDeviceId, m.fbDeviceId = $util.newBuffer($util.base64.length(d.fbDeviceId)), 0);
                else if (d.fbDeviceId.length >= 0)
                    m.fbDeviceId = d.fbDeviceId;
            }
            if (d.pull != null) {
                m.pull = $Boolean(d.pull);
            }
            if (d.paddingBytes != null) {
                if (typeof d.paddingBytes === "string")
                    $util.base64.decode(d.paddingBytes, m.paddingBytes = $util.newBuffer($util.base64.length(d.paddingBytes)), 0);
                else if (d.paddingBytes.length >= 0)
                    m.paddingBytes = d.paddingBytes;
            }
            if (d.yearClass != null) {
                m.yearClass = d.yearClass | 0;
            }
            if (d.memClass != null) {
                m.memClass = d.memClass | 0;
            }
            if (d.interopData != null) {
                if (!$util.isObject(d.interopData))
                    throw $TypeError(".Wa6.ClientPayload.interopData: object expected");
                m.interopData = $root.Wa6.ClientPayload.InteropData.fromObject(d.interopData, q + 1);
            }
            switch (d.trafficAnonymization) {
            case "OFF":
            case 0:
                m.trafficAnonymization = 0;
                break;
            case "STANDARD":
            case 1:
                m.trafficAnonymization = 1;
                break;
            default:
                if (typeof d.trafficAnonymization === "number" && (d.trafficAnonymization | 0) === d.trafficAnonymization)
                    m.trafficAnonymization = d.trafficAnonymization;
            }
            if (d.lidDbMigrated != null) {
                m.lidDbMigrated = $Boolean(d.lidDbMigrated);
            }
            switch (d.accountType) {
            case "DEFAULT":
            case 0:
                m.accountType = 0;
                break;
            case "GUEST":
            case 1:
                m.accountType = 1;
                break;
            default:
                if (typeof d.accountType === "number" && (d.accountType | 0) === d.accountType)
                    m.accountType = d.accountType;
            }
            if (d.connectionSequenceInfo != null) {
                m.connectionSequenceInfo = d.connectionSequenceInfo | 0;
            }
            if (d.paaLink != null) {
                m.paaLink = $Boolean(d.paaLink);
            }
            if (d.preacksCount != null) {
                m.preacksCount = d.preacksCount | 0;
            }
            if (d.processingQueueSize != null) {
                m.processingQueueSize = d.processingQueueSize | 0;
            }
            if (d.pairedPeripherals) {
                if (!$Array.isArray(d.pairedPeripherals))
                    throw $TypeError(".Wa6.ClientPayload.pairedPeripherals: array expected");
                m.pairedPeripherals = $Array(d.pairedPeripherals.length);
                for (var i = 0; i < d.pairedPeripherals.length; ++i) {
                    m.pairedPeripherals[i] = $String(d.pairedPeripherals[i]);
                }
            }
            if (d.testIsolationId != null) {
                if (typeof d.testIsolationId === "string")
                    $util.base64.decode(d.testIsolationId, m.testIsolationId = $util.newBuffer($util.base64.length(d.testIsolationId)), 0);
                else if (d.testIsolationId.length >= 0)
                    m.testIsolationId = d.testIsolationId;
            }
            return m;
        };

        ClientPayload.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.shards = [];
                d.pairedPeripherals = [];
            }
            if (m.username != null && $Object.hasOwnProperty.call(m, "username")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.username = typeof m.username === "number" ? $BigInt(m.username) : $util.Long.fromBits(m.username.low >>> 0, m.username.high >>> 0, true).toBigInt();
                else if (typeof m.username === "number")
                    d.username = o.longs === $String ? $String(m.username) : m.username;
                else
                    d.username = o.longs === $String ? $util.Long.prototype.toString.call(m.username) : o.longs === $Number ? new $util.LongBits(m.username.low >>> 0, m.username.high >>> 0).toNumber(true) : m.username;
            }
            if (m.passive != null && $Object.hasOwnProperty.call(m, "passive")) {
                d.passive = m.passive;
            }
            if (m.userAgent != null && $Object.hasOwnProperty.call(m, "userAgent")) {
                d.userAgent = $root.Wa6.ClientPayload.UserAgent.toObject(m.userAgent, o, q + 1);
            }
            if (m.webInfo != null && $Object.hasOwnProperty.call(m, "webInfo")) {
                d.webInfo = $root.Wa6.ClientPayload.WebInfo.toObject(m.webInfo, o, q + 1);
            }
            if (m.pushName != null && $Object.hasOwnProperty.call(m, "pushName")) {
                d.pushName = m.pushName;
            }
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId")) {
                d.sessionId = m.sessionId;
            }
            if (m.shortConnect != null && $Object.hasOwnProperty.call(m, "shortConnect")) {
                d.shortConnect = m.shortConnect;
            }
            if (m.connectType != null && $Object.hasOwnProperty.call(m, "connectType")) {
                d.connectType = o.enums === $String ? $root.Wa6.ClientPayload.ConnectType[m.connectType] === $undefined ? m.connectType : $root.Wa6.ClientPayload.ConnectType[m.connectType] : m.connectType;
            }
            if (m.connectReason != null && $Object.hasOwnProperty.call(m, "connectReason")) {
                d.connectReason = o.enums === $String ? $root.Wa6.ClientPayload.ConnectReason[m.connectReason] === $undefined ? m.connectReason : $root.Wa6.ClientPayload.ConnectReason[m.connectReason] : m.connectReason;
            }
            if (m.shards && m.shards.length) {
                d.shards = $Array(m.shards.length);
                for (var j = 0; j < m.shards.length; ++j) {
                    d.shards[j] = m.shards[j];
                }
            }
            if (m.dnsSource != null && $Object.hasOwnProperty.call(m, "dnsSource")) {
                d.dnsSource = $root.Wa6.ClientPayload.DNSSource.toObject(m.dnsSource, o, q + 1);
            }
            if (m.connectAttemptCount != null && $Object.hasOwnProperty.call(m, "connectAttemptCount")) {
                d.connectAttemptCount = m.connectAttemptCount;
            }
            if (m.device != null && $Object.hasOwnProperty.call(m, "device")) {
                d.device = m.device;
            }
            if (m.devicePairingData != null && $Object.hasOwnProperty.call(m, "devicePairingData")) {
                d.devicePairingData = $root.Wa6.ClientPayload.DevicePairingRegistrationData.toObject(m.devicePairingData, o, q + 1);
            }
            if (m.product != null && $Object.hasOwnProperty.call(m, "product")) {
                d.product = o.enums === $String ? $root.Wa6.ClientPayload.Product[m.product] === $undefined ? m.product : $root.Wa6.ClientPayload.Product[m.product] : m.product;
            }
            if (m.fbCat != null && $Object.hasOwnProperty.call(m, "fbCat")) {
                d.fbCat = o.bytes === $String ? $util.base64.encode(m.fbCat, 0, m.fbCat.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.fbCat) : m.fbCat;
            }
            if (m.fbUserAgent != null && $Object.hasOwnProperty.call(m, "fbUserAgent")) {
                d.fbUserAgent = o.bytes === $String ? $util.base64.encode(m.fbUserAgent, 0, m.fbUserAgent.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.fbUserAgent) : m.fbUserAgent;
            }
            if (m.oc != null && $Object.hasOwnProperty.call(m, "oc")) {
                d.oc = m.oc;
            }
            if (m.lc != null && $Object.hasOwnProperty.call(m, "lc")) {
                d.lc = m.lc;
            }
            if (m.iosAppExtension != null && $Object.hasOwnProperty.call(m, "iosAppExtension")) {
                d.iosAppExtension = o.enums === $String ? $root.Wa6.ClientPayload.IOSAppExtension[m.iosAppExtension] === $undefined ? m.iosAppExtension : $root.Wa6.ClientPayload.IOSAppExtension[m.iosAppExtension] : m.iosAppExtension;
            }
            if (m.fbAppId != null && $Object.hasOwnProperty.call(m, "fbAppId")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.fbAppId = typeof m.fbAppId === "number" ? $BigInt(m.fbAppId) : $util.Long.fromBits(m.fbAppId.low >>> 0, m.fbAppId.high >>> 0, true).toBigInt();
                else if (typeof m.fbAppId === "number")
                    d.fbAppId = o.longs === $String ? $String(m.fbAppId) : m.fbAppId;
                else
                    d.fbAppId = o.longs === $String ? $util.Long.prototype.toString.call(m.fbAppId) : o.longs === $Number ? new $util.LongBits(m.fbAppId.low >>> 0, m.fbAppId.high >>> 0).toNumber(true) : m.fbAppId;
            }
            if (m.fbDeviceId != null && $Object.hasOwnProperty.call(m, "fbDeviceId")) {
                d.fbDeviceId = o.bytes === $String ? $util.base64.encode(m.fbDeviceId, 0, m.fbDeviceId.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.fbDeviceId) : m.fbDeviceId;
            }
            if (m.pull != null && $Object.hasOwnProperty.call(m, "pull")) {
                d.pull = m.pull;
            }
            if (m.paddingBytes != null && $Object.hasOwnProperty.call(m, "paddingBytes")) {
                d.paddingBytes = o.bytes === $String ? $util.base64.encode(m.paddingBytes, 0, m.paddingBytes.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.paddingBytes) : m.paddingBytes;
            }
            if (m.yearClass != null && $Object.hasOwnProperty.call(m, "yearClass")) {
                d.yearClass = m.yearClass;
            }
            if (m.memClass != null && $Object.hasOwnProperty.call(m, "memClass")) {
                d.memClass = m.memClass;
            }
            if (m.interopData != null && $Object.hasOwnProperty.call(m, "interopData")) {
                d.interopData = $root.Wa6.ClientPayload.InteropData.toObject(m.interopData, o, q + 1);
            }
            if (m.trafficAnonymization != null && $Object.hasOwnProperty.call(m, "trafficAnonymization")) {
                d.trafficAnonymization = o.enums === $String ? $root.Wa6.ClientPayload.TrafficAnonymization[m.trafficAnonymization] === $undefined ? m.trafficAnonymization : $root.Wa6.ClientPayload.TrafficAnonymization[m.trafficAnonymization] : m.trafficAnonymization;
            }
            if (m.lidDbMigrated != null && $Object.hasOwnProperty.call(m, "lidDbMigrated")) {
                d.lidDbMigrated = m.lidDbMigrated;
            }
            if (m.accountType != null && $Object.hasOwnProperty.call(m, "accountType")) {
                d.accountType = o.enums === $String ? $root.Wa6.ClientPayload.AccountType[m.accountType] === $undefined ? m.accountType : $root.Wa6.ClientPayload.AccountType[m.accountType] : m.accountType;
            }
            if (m.connectionSequenceInfo != null && $Object.hasOwnProperty.call(m, "connectionSequenceInfo")) {
                d.connectionSequenceInfo = m.connectionSequenceInfo;
            }
            if (m.paaLink != null && $Object.hasOwnProperty.call(m, "paaLink")) {
                d.paaLink = m.paaLink;
            }
            if (m.preacksCount != null && $Object.hasOwnProperty.call(m, "preacksCount")) {
                d.preacksCount = m.preacksCount;
            }
            if (m.processingQueueSize != null && $Object.hasOwnProperty.call(m, "processingQueueSize")) {
                d.processingQueueSize = m.processingQueueSize;
            }
            if (m.pairedPeripherals && m.pairedPeripherals.length) {
                d.pairedPeripherals = $Array(m.pairedPeripherals.length);
                for (var j = 0; j < m.pairedPeripherals.length; ++j) {
                    d.pairedPeripherals[j] = m.pairedPeripherals[j];
                }
            }
            if (m.testIsolationId != null && $Object.hasOwnProperty.call(m, "testIsolationId")) {
                d.testIsolationId = o.bytes === $String ? $util.base64.encode(m.testIsolationId, 0, m.testIsolationId.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.testIsolationId) : m.testIsolationId;
            }
            return d;
        };

        ClientPayload.prototype.toJSON = function() {
            return ClientPayload.toObject(this, $protobuf.util.toJSONOptions);
        };

        ClientPayload.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Wa6.ClientPayload";
        };

        ClientPayload.AccountType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "DEFAULT"] = 0;
            values[valuesById[1] = "GUEST"] = 1;
            return values;
        })();

        ClientPayload.ConnectReason = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "PUSH"] = 0;
            values[valuesById[1] = "USER_ACTIVATED"] = 1;
            values[valuesById[2] = "SCHEDULED"] = 2;
            values[valuesById[3] = "ERROR_RECONNECT"] = 3;
            values[valuesById[4] = "NETWORK_SWITCH"] = 4;
            values[valuesById[5] = "PING_RECONNECT"] = 5;
            values[valuesById[6] = "UNKNOWN"] = 6;
            return values;
        })();

        ClientPayload.ConnectType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "CELLULAR_UNKNOWN"] = 0;
            values[valuesById[1] = "WIFI_UNKNOWN"] = 1;
            values[valuesById[100] = "CELLULAR_EDGE"] = 100;
            values[valuesById[101] = "CELLULAR_IDEN"] = 101;
            values[valuesById[102] = "CELLULAR_UMTS"] = 102;
            values[valuesById[103] = "CELLULAR_EVDO"] = 103;
            values[valuesById[104] = "CELLULAR_GPRS"] = 104;
            values[valuesById[105] = "CELLULAR_HSDPA"] = 105;
            values[valuesById[106] = "CELLULAR_HSUPA"] = 106;
            values[valuesById[107] = "CELLULAR_HSPA"] = 107;
            values[valuesById[108] = "CELLULAR_CDMA"] = 108;
            values[valuesById[109] = "CELLULAR_1XRTT"] = 109;
            values[valuesById[110] = "CELLULAR_EHRPD"] = 110;
            values[valuesById[111] = "CELLULAR_LTE"] = 111;
            values[valuesById[112] = "CELLULAR_HSPAP"] = 112;
            return values;
        })();

        ClientPayload.DNSSource = (function() {

            const DNSSource = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            DNSSource.prototype.dnsMethod = null;
            DNSSource.prototype.appCached = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DNSSource.prototype, "_dnsMethod", {
                get: $util.oneOfGetter($oneOfFields = ["dnsMethod"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DNSSource.prototype, "_appCached", {
                get: $util.oneOfGetter($oneOfFields = ["appCached"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            DNSSource.create = function(properties) {
                return new DNSSource(properties);
            };

            DNSSource.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.dnsMethod != null && $Object.hasOwnProperty.call(m, "dnsMethod"))
                    w.uint32(120).int32(m.dnsMethod);
                if (m.appCached != null && $Object.hasOwnProperty.call(m, "appCached"))
                    w.uint32(128).bool(m.appCached);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            DNSSource.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.ClientPayload.DNSSource();
                while (r.pos < c) {
                    var s = r.pos;
                    var t = r.tag();
                    if (t === z) {
                        z = $undefined;
                        break;
                    }
                    var u = t & 7;
                    switch (t >>>= 3) {
                    case 15: {
                            if (u !== 0)
                                break;
                            m.dnsMethod = r.int32();
                            m._dnsMethod = "dnsMethod";
                            continue;
                        }
                    case 16: {
                            if (u !== 0)
                                break;
                            m.appCached = r.bool();
                            m._appCached = "appCached";
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

            DNSSource.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.ClientPayload.DNSSource)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.ClientPayload.DNSSource: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.ClientPayload.DNSSource();
                switch (d.dnsMethod) {
                case "SYSTEM":
                case 0:
                    m.dnsMethod = 0;
                    break;
                case "GOOGLE":
                case 1:
                    m.dnsMethod = 1;
                    break;
                case "HARDCODED":
                case 2:
                    m.dnsMethod = 2;
                    break;
                case "OVERRIDE":
                case 3:
                    m.dnsMethod = 3;
                    break;
                case "FALLBACK":
                case 4:
                    m.dnsMethod = 4;
                    break;
                case "MNS":
                case 5:
                    m.dnsMethod = 5;
                    break;
                case "MNS_SECONDARY":
                case 6:
                    m.dnsMethod = 6;
                    break;
                case "SOCKS_PROXY":
                case 7:
                    m.dnsMethod = 7;
                    break;
                default:
                    if (typeof d.dnsMethod === "number" && (d.dnsMethod | 0) === d.dnsMethod)
                        m.dnsMethod = d.dnsMethod;
                }
                if (d.appCached != null) {
                    m.appCached = $Boolean(d.appCached);
                }
                return m;
            };

            DNSSource.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.dnsMethod != null && $Object.hasOwnProperty.call(m, "dnsMethod")) {
                    d.dnsMethod = o.enums === $String ? $root.Wa6.ClientPayload.DNSSource.DNSResolutionMethod[m.dnsMethod] === $undefined ? m.dnsMethod : $root.Wa6.ClientPayload.DNSSource.DNSResolutionMethod[m.dnsMethod] : m.dnsMethod;
                }
                if (m.appCached != null && $Object.hasOwnProperty.call(m, "appCached")) {
                    d.appCached = m.appCached;
                }
                return d;
            };

            DNSSource.prototype.toJSON = function() {
                return DNSSource.toObject(this, $protobuf.util.toJSONOptions);
            };

            DNSSource.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.ClientPayload.DNSSource";
            };

            DNSSource.DNSResolutionMethod = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "SYSTEM"] = 0;
                values[valuesById[1] = "GOOGLE"] = 1;
                values[valuesById[2] = "HARDCODED"] = 2;
                values[valuesById[3] = "OVERRIDE"] = 3;
                values[valuesById[4] = "FALLBACK"] = 4;
                values[valuesById[5] = "MNS"] = 5;
                values[valuesById[6] = "MNS_SECONDARY"] = 6;
                values[valuesById[7] = "SOCKS_PROXY"] = 7;
                return values;
            })();

            return DNSSource;
        })();

        ClientPayload.DevicePairingRegistrationData = (function() {

            const DevicePairingRegistrationData = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            DevicePairingRegistrationData.prototype.eRegid = null;
            DevicePairingRegistrationData.prototype.eKeytype = null;
            DevicePairingRegistrationData.prototype.eIdent = null;
            DevicePairingRegistrationData.prototype.eSkeyId = null;
            DevicePairingRegistrationData.prototype.eSkeyVal = null;
            DevicePairingRegistrationData.prototype.eSkeySig = null;
            DevicePairingRegistrationData.prototype.buildHash = null;
            DevicePairingRegistrationData.prototype.deviceProps = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eRegid", {
                get: $util.oneOfGetter($oneOfFields = ["eRegid"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eKeytype", {
                get: $util.oneOfGetter($oneOfFields = ["eKeytype"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eIdent", {
                get: $util.oneOfGetter($oneOfFields = ["eIdent"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eSkeyId", {
                get: $util.oneOfGetter($oneOfFields = ["eSkeyId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eSkeyVal", {
                get: $util.oneOfGetter($oneOfFields = ["eSkeyVal"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_eSkeySig", {
                get: $util.oneOfGetter($oneOfFields = ["eSkeySig"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_buildHash", {
                get: $util.oneOfGetter($oneOfFields = ["buildHash"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(DevicePairingRegistrationData.prototype, "_deviceProps", {
                get: $util.oneOfGetter($oneOfFields = ["deviceProps"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            DevicePairingRegistrationData.create = function(properties) {
                return new DevicePairingRegistrationData(properties);
            };

            DevicePairingRegistrationData.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.eRegid != null && $Object.hasOwnProperty.call(m, "eRegid"))
                    w.uint32(10).bytes(m.eRegid);
                if (m.eKeytype != null && $Object.hasOwnProperty.call(m, "eKeytype"))
                    w.uint32(18).bytes(m.eKeytype);
                if (m.eIdent != null && $Object.hasOwnProperty.call(m, "eIdent"))
                    w.uint32(26).bytes(m.eIdent);
                if (m.eSkeyId != null && $Object.hasOwnProperty.call(m, "eSkeyId"))
                    w.uint32(34).bytes(m.eSkeyId);
                if (m.eSkeyVal != null && $Object.hasOwnProperty.call(m, "eSkeyVal"))
                    w.uint32(42).bytes(m.eSkeyVal);
                if (m.eSkeySig != null && $Object.hasOwnProperty.call(m, "eSkeySig"))
                    w.uint32(50).bytes(m.eSkeySig);
                if (m.buildHash != null && $Object.hasOwnProperty.call(m, "buildHash"))
                    w.uint32(58).bytes(m.buildHash);
                if (m.deviceProps != null && $Object.hasOwnProperty.call(m, "deviceProps"))
                    w.uint32(66).bytes(m.deviceProps);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            DevicePairingRegistrationData.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.ClientPayload.DevicePairingRegistrationData();
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
                            m.eRegid = r.bytes();
                            m._eRegid = "eRegid";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.eKeytype = r.bytes();
                            m._eKeytype = "eKeytype";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.eIdent = r.bytes();
                            m._eIdent = "eIdent";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.eSkeyId = r.bytes();
                            m._eSkeyId = "eSkeyId";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.eSkeyVal = r.bytes();
                            m._eSkeyVal = "eSkeyVal";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.eSkeySig = r.bytes();
                            m._eSkeySig = "eSkeySig";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.buildHash = r.bytes();
                            m._buildHash = "buildHash";
                            continue;
                        }
                    case 8: {
                            if (u !== 2)
                                break;
                            m.deviceProps = r.bytes();
                            m._deviceProps = "deviceProps";
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

            DevicePairingRegistrationData.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.ClientPayload.DevicePairingRegistrationData)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.ClientPayload.DevicePairingRegistrationData: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.ClientPayload.DevicePairingRegistrationData();
                if (d.eRegid != null) {
                    if (typeof d.eRegid === "string")
                        $util.base64.decode(d.eRegid, m.eRegid = $util.newBuffer($util.base64.length(d.eRegid)), 0);
                    else if (d.eRegid.length >= 0)
                        m.eRegid = d.eRegid;
                }
                if (d.eKeytype != null) {
                    if (typeof d.eKeytype === "string")
                        $util.base64.decode(d.eKeytype, m.eKeytype = $util.newBuffer($util.base64.length(d.eKeytype)), 0);
                    else if (d.eKeytype.length >= 0)
                        m.eKeytype = d.eKeytype;
                }
                if (d.eIdent != null) {
                    if (typeof d.eIdent === "string")
                        $util.base64.decode(d.eIdent, m.eIdent = $util.newBuffer($util.base64.length(d.eIdent)), 0);
                    else if (d.eIdent.length >= 0)
                        m.eIdent = d.eIdent;
                }
                if (d.eSkeyId != null) {
                    if (typeof d.eSkeyId === "string")
                        $util.base64.decode(d.eSkeyId, m.eSkeyId = $util.newBuffer($util.base64.length(d.eSkeyId)), 0);
                    else if (d.eSkeyId.length >= 0)
                        m.eSkeyId = d.eSkeyId;
                }
                if (d.eSkeyVal != null) {
                    if (typeof d.eSkeyVal === "string")
                        $util.base64.decode(d.eSkeyVal, m.eSkeyVal = $util.newBuffer($util.base64.length(d.eSkeyVal)), 0);
                    else if (d.eSkeyVal.length >= 0)
                        m.eSkeyVal = d.eSkeyVal;
                }
                if (d.eSkeySig != null) {
                    if (typeof d.eSkeySig === "string")
                        $util.base64.decode(d.eSkeySig, m.eSkeySig = $util.newBuffer($util.base64.length(d.eSkeySig)), 0);
                    else if (d.eSkeySig.length >= 0)
                        m.eSkeySig = d.eSkeySig;
                }
                if (d.buildHash != null) {
                    if (typeof d.buildHash === "string")
                        $util.base64.decode(d.buildHash, m.buildHash = $util.newBuffer($util.base64.length(d.buildHash)), 0);
                    else if (d.buildHash.length >= 0)
                        m.buildHash = d.buildHash;
                }
                if (d.deviceProps != null) {
                    if (typeof d.deviceProps === "string")
                        $util.base64.decode(d.deviceProps, m.deviceProps = $util.newBuffer($util.base64.length(d.deviceProps)), 0);
                    else if (d.deviceProps.length >= 0)
                        m.deviceProps = d.deviceProps;
                }
                return m;
            };

            DevicePairingRegistrationData.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.eRegid != null && $Object.hasOwnProperty.call(m, "eRegid")) {
                    d.eRegid = o.bytes === $String ? $util.base64.encode(m.eRegid, 0, m.eRegid.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eRegid) : m.eRegid;
                }
                if (m.eKeytype != null && $Object.hasOwnProperty.call(m, "eKeytype")) {
                    d.eKeytype = o.bytes === $String ? $util.base64.encode(m.eKeytype, 0, m.eKeytype.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eKeytype) : m.eKeytype;
                }
                if (m.eIdent != null && $Object.hasOwnProperty.call(m, "eIdent")) {
                    d.eIdent = o.bytes === $String ? $util.base64.encode(m.eIdent, 0, m.eIdent.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eIdent) : m.eIdent;
                }
                if (m.eSkeyId != null && $Object.hasOwnProperty.call(m, "eSkeyId")) {
                    d.eSkeyId = o.bytes === $String ? $util.base64.encode(m.eSkeyId, 0, m.eSkeyId.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eSkeyId) : m.eSkeyId;
                }
                if (m.eSkeyVal != null && $Object.hasOwnProperty.call(m, "eSkeyVal")) {
                    d.eSkeyVal = o.bytes === $String ? $util.base64.encode(m.eSkeyVal, 0, m.eSkeyVal.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eSkeyVal) : m.eSkeyVal;
                }
                if (m.eSkeySig != null && $Object.hasOwnProperty.call(m, "eSkeySig")) {
                    d.eSkeySig = o.bytes === $String ? $util.base64.encode(m.eSkeySig, 0, m.eSkeySig.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.eSkeySig) : m.eSkeySig;
                }
                if (m.buildHash != null && $Object.hasOwnProperty.call(m, "buildHash")) {
                    d.buildHash = o.bytes === $String ? $util.base64.encode(m.buildHash, 0, m.buildHash.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.buildHash) : m.buildHash;
                }
                if (m.deviceProps != null && $Object.hasOwnProperty.call(m, "deviceProps")) {
                    d.deviceProps = o.bytes === $String ? $util.base64.encode(m.deviceProps, 0, m.deviceProps.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.deviceProps) : m.deviceProps;
                }
                return d;
            };

            DevicePairingRegistrationData.prototype.toJSON = function() {
                return DevicePairingRegistrationData.toObject(this, $protobuf.util.toJSONOptions);
            };

            DevicePairingRegistrationData.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.ClientPayload.DevicePairingRegistrationData";
            };

            return DevicePairingRegistrationData;
        })();

        ClientPayload.IOSAppExtension = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "SHARE_EXTENSION"] = 0;
            values[valuesById[1] = "SERVICE_EXTENSION"] = 1;
            values[valuesById[2] = "INTENTS_EXTENSION"] = 2;
            return values;
        })();

        ClientPayload.InteropData = (function() {

            const InteropData = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InteropData.prototype.accountId = null;
            InteropData.prototype.token = null;
            InteropData.prototype.enableReadReceipts = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InteropData.prototype, "_accountId", {
                get: $util.oneOfGetter($oneOfFields = ["accountId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InteropData.prototype, "_token", {
                get: $util.oneOfGetter($oneOfFields = ["token"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InteropData.prototype, "_enableReadReceipts", {
                get: $util.oneOfGetter($oneOfFields = ["enableReadReceipts"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InteropData.create = function(properties) {
                return new InteropData(properties);
            };

            InteropData.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.accountId != null && $Object.hasOwnProperty.call(m, "accountId"))
                    w.uint32(8).uint64(m.accountId);
                if (m.token != null && $Object.hasOwnProperty.call(m, "token"))
                    w.uint32(18).bytes(m.token);
                if (m.enableReadReceipts != null && $Object.hasOwnProperty.call(m, "enableReadReceipts"))
                    w.uint32(24).bool(m.enableReadReceipts);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InteropData.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.ClientPayload.InteropData();
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
                            m.accountId = r.uint64();
                            m._accountId = "accountId";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.token = r.bytes();
                            m._token = "token";
                            continue;
                        }
                    case 3: {
                            if (u !== 0)
                                break;
                            m.enableReadReceipts = r.bool();
                            m._enableReadReceipts = "enableReadReceipts";
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

            InteropData.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.ClientPayload.InteropData)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.ClientPayload.InteropData: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.ClientPayload.InteropData();
                if (d.accountId != null) {
                    if ($util.Long)
                        m.accountId = $util.Long.fromValue(d.accountId, true);
                    else if (typeof d.accountId === "string")
                        m.accountId = $parseInt(d.accountId, 10);
                    else if (typeof d.accountId === "number")
                        m.accountId = d.accountId;
                    else if (typeof d.accountId === "object")
                        m.accountId = new $util.LongBits(d.accountId.low >>> 0, d.accountId.high >>> 0).toNumber(true);
                }
                if (d.token != null) {
                    if (typeof d.token === "string")
                        $util.base64.decode(d.token, m.token = $util.newBuffer($util.base64.length(d.token)), 0);
                    else if (d.token.length >= 0)
                        m.token = d.token;
                }
                if (d.enableReadReceipts != null) {
                    m.enableReadReceipts = $Boolean(d.enableReadReceipts);
                }
                return m;
            };

            InteropData.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.accountId != null && $Object.hasOwnProperty.call(m, "accountId")) {
                    if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                        d.accountId = typeof m.accountId === "number" ? $BigInt(m.accountId) : $util.Long.fromBits(m.accountId.low >>> 0, m.accountId.high >>> 0, true).toBigInt();
                    else if (typeof m.accountId === "number")
                        d.accountId = o.longs === $String ? $String(m.accountId) : m.accountId;
                    else
                        d.accountId = o.longs === $String ? $util.Long.prototype.toString.call(m.accountId) : o.longs === $Number ? new $util.LongBits(m.accountId.low >>> 0, m.accountId.high >>> 0).toNumber(true) : m.accountId;
                }
                if (m.token != null && $Object.hasOwnProperty.call(m, "token")) {
                    d.token = o.bytes === $String ? $util.base64.encode(m.token, 0, m.token.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.token) : m.token;
                }
                if (m.enableReadReceipts != null && $Object.hasOwnProperty.call(m, "enableReadReceipts")) {
                    d.enableReadReceipts = m.enableReadReceipts;
                }
                return d;
            };

            InteropData.prototype.toJSON = function() {
                return InteropData.toObject(this, $protobuf.util.toJSONOptions);
            };

            InteropData.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.ClientPayload.InteropData";
            };

            return InteropData;
        })();

        ClientPayload.Product = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "WHATSAPP"] = 0;
            values[valuesById[1] = "MESSENGER"] = 1;
            values[valuesById[2] = "INTEROP"] = 2;
            values[valuesById[3] = "INTEROP_MSGR"] = 3;
            values[valuesById[4] = "WHATSAPP_LID"] = 4;
            return values;
        })();

        ClientPayload.TrafficAnonymization = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "OFF"] = 0;
            values[valuesById[1] = "STANDARD"] = 1;
            return values;
        })();

        ClientPayload.UserAgent = (function() {

            const UserAgent = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            UserAgent.prototype.platform = null;
            UserAgent.prototype.appVersion = null;
            UserAgent.prototype.mcc = null;
            UserAgent.prototype.mnc = null;
            UserAgent.prototype.osVersion = null;
            UserAgent.prototype.manufacturer = null;
            UserAgent.prototype.device = null;
            UserAgent.prototype.osBuildNumber = null;
            UserAgent.prototype.phoneId = null;
            UserAgent.prototype.releaseChannel = null;
            UserAgent.prototype.localeLanguageIso6391 = null;
            UserAgent.prototype.localeCountryIso31661Alpha2 = null;
            UserAgent.prototype.deviceBoard = null;
            UserAgent.prototype.deviceExpId = null;
            UserAgent.prototype.deviceType = null;
            UserAgent.prototype.deviceModelType = null;
            UserAgent.prototype.distributionChannel = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_platform", {
                get: $util.oneOfGetter($oneOfFields = ["platform"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_appVersion", {
                get: $util.oneOfGetter($oneOfFields = ["appVersion"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_mcc", {
                get: $util.oneOfGetter($oneOfFields = ["mcc"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_mnc", {
                get: $util.oneOfGetter($oneOfFields = ["mnc"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_osVersion", {
                get: $util.oneOfGetter($oneOfFields = ["osVersion"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_manufacturer", {
                get: $util.oneOfGetter($oneOfFields = ["manufacturer"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_device", {
                get: $util.oneOfGetter($oneOfFields = ["device"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_osBuildNumber", {
                get: $util.oneOfGetter($oneOfFields = ["osBuildNumber"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_phoneId", {
                get: $util.oneOfGetter($oneOfFields = ["phoneId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_releaseChannel", {
                get: $util.oneOfGetter($oneOfFields = ["releaseChannel"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_localeLanguageIso6391", {
                get: $util.oneOfGetter($oneOfFields = ["localeLanguageIso6391"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_localeCountryIso31661Alpha2", {
                get: $util.oneOfGetter($oneOfFields = ["localeCountryIso31661Alpha2"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_deviceBoard", {
                get: $util.oneOfGetter($oneOfFields = ["deviceBoard"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_deviceExpId", {
                get: $util.oneOfGetter($oneOfFields = ["deviceExpId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_deviceType", {
                get: $util.oneOfGetter($oneOfFields = ["deviceType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_deviceModelType", {
                get: $util.oneOfGetter($oneOfFields = ["deviceModelType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(UserAgent.prototype, "_distributionChannel", {
                get: $util.oneOfGetter($oneOfFields = ["distributionChannel"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            UserAgent.create = function(properties) {
                return new UserAgent(properties);
            };

            UserAgent.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.platform != null && $Object.hasOwnProperty.call(m, "platform"))
                    w.uint32(8).int32(m.platform);
                if (m.appVersion != null && $Object.hasOwnProperty.call(m, "appVersion"))
                    $root.Wa6.ClientPayload.UserAgent.AppVersion.encode(m.appVersion, w.uint32(18).fork(), q + 1).ldelim();
                if (m.mcc != null && $Object.hasOwnProperty.call(m, "mcc"))
                    w.uint32(26).string(m.mcc);
                if (m.mnc != null && $Object.hasOwnProperty.call(m, "mnc"))
                    w.uint32(34).string(m.mnc);
                if (m.osVersion != null && $Object.hasOwnProperty.call(m, "osVersion"))
                    w.uint32(42).string(m.osVersion);
                if (m.manufacturer != null && $Object.hasOwnProperty.call(m, "manufacturer"))
                    w.uint32(50).string(m.manufacturer);
                if (m.device != null && $Object.hasOwnProperty.call(m, "device"))
                    w.uint32(58).string(m.device);
                if (m.osBuildNumber != null && $Object.hasOwnProperty.call(m, "osBuildNumber"))
                    w.uint32(66).string(m.osBuildNumber);
                if (m.phoneId != null && $Object.hasOwnProperty.call(m, "phoneId"))
                    w.uint32(74).string(m.phoneId);
                if (m.releaseChannel != null && $Object.hasOwnProperty.call(m, "releaseChannel"))
                    w.uint32(80).int32(m.releaseChannel);
                if (m.localeLanguageIso6391 != null && $Object.hasOwnProperty.call(m, "localeLanguageIso6391"))
                    w.uint32(90).string(m.localeLanguageIso6391);
                if (m.localeCountryIso31661Alpha2 != null && $Object.hasOwnProperty.call(m, "localeCountryIso31661Alpha2"))
                    w.uint32(98).string(m.localeCountryIso31661Alpha2);
                if (m.deviceBoard != null && $Object.hasOwnProperty.call(m, "deviceBoard"))
                    w.uint32(106).string(m.deviceBoard);
                if (m.deviceExpId != null && $Object.hasOwnProperty.call(m, "deviceExpId"))
                    w.uint32(114).string(m.deviceExpId);
                if (m.deviceType != null && $Object.hasOwnProperty.call(m, "deviceType"))
                    w.uint32(120).int32(m.deviceType);
                if (m.deviceModelType != null && $Object.hasOwnProperty.call(m, "deviceModelType"))
                    w.uint32(130).string(m.deviceModelType);
                if (m.distributionChannel != null && $Object.hasOwnProperty.call(m, "distributionChannel"))
                    w.uint32(136).int32(m.distributionChannel);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            UserAgent.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.ClientPayload.UserAgent();
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
                            m.platform = r.int32();
                            m._platform = "platform";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.appVersion = $root.Wa6.ClientPayload.UserAgent.AppVersion.decode(r, r.uint32(), $undefined, q + 1, m.appVersion);
                            m._appVersion = "appVersion";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.mcc = r.stringVerify();
                            m._mcc = "mcc";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.mnc = r.stringVerify();
                            m._mnc = "mnc";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.osVersion = r.stringVerify();
                            m._osVersion = "osVersion";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.manufacturer = r.stringVerify();
                            m._manufacturer = "manufacturer";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.device = r.stringVerify();
                            m._device = "device";
                            continue;
                        }
                    case 8: {
                            if (u !== 2)
                                break;
                            m.osBuildNumber = r.stringVerify();
                            m._osBuildNumber = "osBuildNumber";
                            continue;
                        }
                    case 9: {
                            if (u !== 2)
                                break;
                            m.phoneId = r.stringVerify();
                            m._phoneId = "phoneId";
                            continue;
                        }
                    case 10: {
                            if (u !== 0)
                                break;
                            m.releaseChannel = r.int32();
                            m._releaseChannel = "releaseChannel";
                            continue;
                        }
                    case 11: {
                            if (u !== 2)
                                break;
                            m.localeLanguageIso6391 = r.stringVerify();
                            m._localeLanguageIso6391 = "localeLanguageIso6391";
                            continue;
                        }
                    case 12: {
                            if (u !== 2)
                                break;
                            m.localeCountryIso31661Alpha2 = r.stringVerify();
                            m._localeCountryIso31661Alpha2 = "localeCountryIso31661Alpha2";
                            continue;
                        }
                    case 13: {
                            if (u !== 2)
                                break;
                            m.deviceBoard = r.stringVerify();
                            m._deviceBoard = "deviceBoard";
                            continue;
                        }
                    case 14: {
                            if (u !== 2)
                                break;
                            m.deviceExpId = r.stringVerify();
                            m._deviceExpId = "deviceExpId";
                            continue;
                        }
                    case 15: {
                            if (u !== 0)
                                break;
                            m.deviceType = r.int32();
                            m._deviceType = "deviceType";
                            continue;
                        }
                    case 16: {
                            if (u !== 2)
                                break;
                            m.deviceModelType = r.stringVerify();
                            m._deviceModelType = "deviceModelType";
                            continue;
                        }
                    case 17: {
                            if (u !== 0)
                                break;
                            m.distributionChannel = r.int32();
                            m._distributionChannel = "distributionChannel";
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

            UserAgent.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.ClientPayload.UserAgent)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.ClientPayload.UserAgent: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.ClientPayload.UserAgent();
                switch (d.platform) {
                case "ANDROID":
                case 0:
                    m.platform = 0;
                    break;
                case "IOS":
                case 1:
                    m.platform = 1;
                    break;
                case "WINDOWS_PHONE":
                case 2:
                    m.platform = 2;
                    break;
                case "BLACKBERRY":
                case 3:
                    m.platform = 3;
                    break;
                case "BLACKBERRYX":
                case 4:
                    m.platform = 4;
                    break;
                case "S40":
                case 5:
                    m.platform = 5;
                    break;
                case "S60":
                case 6:
                    m.platform = 6;
                    break;
                case "PYTHON_CLIENT":
                case 7:
                    m.platform = 7;
                    break;
                case "TIZEN":
                case 8:
                    m.platform = 8;
                    break;
                case "ENTERPRISE":
                case 9:
                    m.platform = 9;
                    break;
                case "SMB_ANDROID":
                case 10:
                    m.platform = 10;
                    break;
                case "KAIOS":
                case 11:
                    m.platform = 11;
                    break;
                case "SMB_IOS":
                case 12:
                    m.platform = 12;
                    break;
                case "WINDOWS":
                case 13:
                    m.platform = 13;
                    break;
                case "WEB":
                case 14:
                    m.platform = 14;
                    break;
                case "PORTAL":
                case 15:
                    m.platform = 15;
                    break;
                case "GREEN_ANDROID":
                case 16:
                    m.platform = 16;
                    break;
                case "GREEN_IPHONE":
                case 17:
                    m.platform = 17;
                    break;
                case "BLUE_ANDROID":
                case 18:
                    m.platform = 18;
                    break;
                case "BLUE_IPHONE":
                case 19:
                    m.platform = 19;
                    break;
                case "FBLITE_ANDROID":
                case 20:
                    m.platform = 20;
                    break;
                case "MLITE_ANDROID":
                case 21:
                    m.platform = 21;
                    break;
                case "IGLITE_ANDROID":
                case 22:
                    m.platform = 22;
                    break;
                case "PAGE":
                case 23:
                    m.platform = 23;
                    break;
                case "MACOS":
                case 24:
                    m.platform = 24;
                    break;
                case "OCULUS_MSG":
                case 25:
                    m.platform = 25;
                    break;
                case "OCULUS_CALL":
                case 26:
                    m.platform = 26;
                    break;
                case "MILAN":
                case 27:
                    m.platform = 27;
                    break;
                case "CAPI":
                case 28:
                    m.platform = 28;
                    break;
                case "WEAROS":
                case 29:
                    m.platform = 29;
                    break;
                case "ARDEVICE":
                case 30:
                    m.platform = 30;
                    break;
                case "VRDEVICE":
                case 31:
                    m.platform = 31;
                    break;
                case "BLUE_WEB":
                case 32:
                    m.platform = 32;
                    break;
                case "IPAD":
                case 33:
                    m.platform = 33;
                    break;
                case "TEST":
                case 34:
                    m.platform = 34;
                    break;
                case "SMART_GLASSES":
                case 35:
                    m.platform = 35;
                    break;
                case "BLUE_VR":
                case 36:
                    m.platform = 36;
                    break;
                case "AR_WRIST":
                case 37:
                    m.platform = 37;
                    break;
                case "WAIL":
                case 38:
                    m.platform = 38;
                    break;
                case "WORK_ANDROID":
                case 39:
                    m.platform = 39;
                    break;
                case "WORK_IOS":
                case 40:
                    m.platform = 40;
                    break;
                default:
                    if (typeof d.platform === "number" && (d.platform | 0) === d.platform)
                        m.platform = d.platform;
                }
                if (d.appVersion != null) {
                    if (!$util.isObject(d.appVersion))
                        throw $TypeError(".Wa6.ClientPayload.UserAgent.appVersion: object expected");
                    m.appVersion = $root.Wa6.ClientPayload.UserAgent.AppVersion.fromObject(d.appVersion, q + 1);
                }
                if (d.mcc != null) {
                    m.mcc = $String(d.mcc);
                }
                if (d.mnc != null) {
                    m.mnc = $String(d.mnc);
                }
                if (d.osVersion != null) {
                    m.osVersion = $String(d.osVersion);
                }
                if (d.manufacturer != null) {
                    m.manufacturer = $String(d.manufacturer);
                }
                if (d.device != null) {
                    m.device = $String(d.device);
                }
                if (d.osBuildNumber != null) {
                    m.osBuildNumber = $String(d.osBuildNumber);
                }
                if (d.phoneId != null) {
                    m.phoneId = $String(d.phoneId);
                }
                switch (d.releaseChannel) {
                case "RELEASE":
                case 0:
                    m.releaseChannel = 0;
                    break;
                case "BETA":
                case 1:
                    m.releaseChannel = 1;
                    break;
                case "ALPHA":
                case 2:
                    m.releaseChannel = 2;
                    break;
                case "DEBUG":
                case 3:
                    m.releaseChannel = 3;
                    break;
                default:
                    if (typeof d.releaseChannel === "number" && (d.releaseChannel | 0) === d.releaseChannel)
                        m.releaseChannel = d.releaseChannel;
                }
                if (d.localeLanguageIso6391 != null) {
                    m.localeLanguageIso6391 = $String(d.localeLanguageIso6391);
                }
                if (d.localeCountryIso31661Alpha2 != null) {
                    m.localeCountryIso31661Alpha2 = $String(d.localeCountryIso31661Alpha2);
                }
                if (d.deviceBoard != null) {
                    m.deviceBoard = $String(d.deviceBoard);
                }
                if (d.deviceExpId != null) {
                    m.deviceExpId = $String(d.deviceExpId);
                }
                switch (d.deviceType) {
                case "PHONE":
                case 0:
                    m.deviceType = 0;
                    break;
                case "TABLET":
                case 1:
                    m.deviceType = 1;
                    break;
                case "DESKTOP":
                case 2:
                    m.deviceType = 2;
                    break;
                case "WEARABLE":
                case 3:
                    m.deviceType = 3;
                    break;
                case "VR":
                case 4:
                    m.deviceType = 4;
                    break;
                default:
                    if (typeof d.deviceType === "number" && (d.deviceType | 0) === d.deviceType)
                        m.deviceType = d.deviceType;
                }
                if (d.deviceModelType != null) {
                    m.deviceModelType = $String(d.deviceModelType);
                }
                switch (d.distributionChannel) {
                case "APPSTORE":
                case 0:
                    m.distributionChannel = 0;
                    break;
                case "WEBSITE":
                case 1:
                    m.distributionChannel = 1;
                    break;
                case "TESTFLIGHT":
                case 2:
                    m.distributionChannel = 2;
                    break;
                case "INTERNAL":
                case 3:
                    m.distributionChannel = 3;
                    break;
                default:
                    if (typeof d.distributionChannel === "number" && (d.distributionChannel | 0) === d.distributionChannel)
                        m.distributionChannel = d.distributionChannel;
                }
                return m;
            };

            UserAgent.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.platform != null && $Object.hasOwnProperty.call(m, "platform")) {
                    d.platform = o.enums === $String ? $root.Wa6.ClientPayload.UserAgent.Platform[m.platform] === $undefined ? m.platform : $root.Wa6.ClientPayload.UserAgent.Platform[m.platform] : m.platform;
                }
                if (m.appVersion != null && $Object.hasOwnProperty.call(m, "appVersion")) {
                    d.appVersion = $root.Wa6.ClientPayload.UserAgent.AppVersion.toObject(m.appVersion, o, q + 1);
                }
                if (m.mcc != null && $Object.hasOwnProperty.call(m, "mcc")) {
                    d.mcc = m.mcc;
                }
                if (m.mnc != null && $Object.hasOwnProperty.call(m, "mnc")) {
                    d.mnc = m.mnc;
                }
                if (m.osVersion != null && $Object.hasOwnProperty.call(m, "osVersion")) {
                    d.osVersion = m.osVersion;
                }
                if (m.manufacturer != null && $Object.hasOwnProperty.call(m, "manufacturer")) {
                    d.manufacturer = m.manufacturer;
                }
                if (m.device != null && $Object.hasOwnProperty.call(m, "device")) {
                    d.device = m.device;
                }
                if (m.osBuildNumber != null && $Object.hasOwnProperty.call(m, "osBuildNumber")) {
                    d.osBuildNumber = m.osBuildNumber;
                }
                if (m.phoneId != null && $Object.hasOwnProperty.call(m, "phoneId")) {
                    d.phoneId = m.phoneId;
                }
                if (m.releaseChannel != null && $Object.hasOwnProperty.call(m, "releaseChannel")) {
                    d.releaseChannel = o.enums === $String ? $root.Wa6.ClientPayload.UserAgent.ReleaseChannel[m.releaseChannel] === $undefined ? m.releaseChannel : $root.Wa6.ClientPayload.UserAgent.ReleaseChannel[m.releaseChannel] : m.releaseChannel;
                }
                if (m.localeLanguageIso6391 != null && $Object.hasOwnProperty.call(m, "localeLanguageIso6391")) {
                    d.localeLanguageIso6391 = m.localeLanguageIso6391;
                }
                if (m.localeCountryIso31661Alpha2 != null && $Object.hasOwnProperty.call(m, "localeCountryIso31661Alpha2")) {
                    d.localeCountryIso31661Alpha2 = m.localeCountryIso31661Alpha2;
                }
                if (m.deviceBoard != null && $Object.hasOwnProperty.call(m, "deviceBoard")) {
                    d.deviceBoard = m.deviceBoard;
                }
                if (m.deviceExpId != null && $Object.hasOwnProperty.call(m, "deviceExpId")) {
                    d.deviceExpId = m.deviceExpId;
                }
                if (m.deviceType != null && $Object.hasOwnProperty.call(m, "deviceType")) {
                    d.deviceType = o.enums === $String ? $root.Wa6.ClientPayload.UserAgent.DeviceType[m.deviceType] === $undefined ? m.deviceType : $root.Wa6.ClientPayload.UserAgent.DeviceType[m.deviceType] : m.deviceType;
                }
                if (m.deviceModelType != null && $Object.hasOwnProperty.call(m, "deviceModelType")) {
                    d.deviceModelType = m.deviceModelType;
                }
                if (m.distributionChannel != null && $Object.hasOwnProperty.call(m, "distributionChannel")) {
                    d.distributionChannel = o.enums === $String ? $root.Wa6.ClientPayload.UserAgent.DistributionChannel[m.distributionChannel] === $undefined ? m.distributionChannel : $root.Wa6.ClientPayload.UserAgent.DistributionChannel[m.distributionChannel] : m.distributionChannel;
                }
                return d;
            };

            UserAgent.prototype.toJSON = function() {
                return UserAgent.toObject(this, $protobuf.util.toJSONOptions);
            };

            UserAgent.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.ClientPayload.UserAgent";
            };

            UserAgent.AppVersion = (function() {

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
                    m = g || new $root.Wa6.ClientPayload.UserAgent.AppVersion();
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
                    if (d instanceof $root.Wa6.ClientPayload.UserAgent.AppVersion)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".Wa6.ClientPayload.UserAgent.AppVersion: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.Wa6.ClientPayload.UserAgent.AppVersion();
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
                    return prefix + "/Wa6.ClientPayload.UserAgent.AppVersion";
                };

                return AppVersion;
            })();

            UserAgent.DeviceType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "PHONE"] = 0;
                values[valuesById[1] = "TABLET"] = 1;
                values[valuesById[2] = "DESKTOP"] = 2;
                values[valuesById[3] = "WEARABLE"] = 3;
                values[valuesById[4] = "VR"] = 4;
                return values;
            })();

            UserAgent.DistributionChannel = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "APPSTORE"] = 0;
                values[valuesById[1] = "WEBSITE"] = 1;
                values[valuesById[2] = "TESTFLIGHT"] = 2;
                values[valuesById[3] = "INTERNAL"] = 3;
                return values;
            })();

            UserAgent.Platform = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "ANDROID"] = 0;
                values[valuesById[1] = "IOS"] = 1;
                values[valuesById[2] = "WINDOWS_PHONE"] = 2;
                values[valuesById[3] = "BLACKBERRY"] = 3;
                values[valuesById[4] = "BLACKBERRYX"] = 4;
                values[valuesById[5] = "S40"] = 5;
                values[valuesById[6] = "S60"] = 6;
                values[valuesById[7] = "PYTHON_CLIENT"] = 7;
                values[valuesById[8] = "TIZEN"] = 8;
                values[valuesById[9] = "ENTERPRISE"] = 9;
                values[valuesById[10] = "SMB_ANDROID"] = 10;
                values[valuesById[11] = "KAIOS"] = 11;
                values[valuesById[12] = "SMB_IOS"] = 12;
                values[valuesById[13] = "WINDOWS"] = 13;
                values[valuesById[14] = "WEB"] = 14;
                values[valuesById[15] = "PORTAL"] = 15;
                values[valuesById[16] = "GREEN_ANDROID"] = 16;
                values[valuesById[17] = "GREEN_IPHONE"] = 17;
                values[valuesById[18] = "BLUE_ANDROID"] = 18;
                values[valuesById[19] = "BLUE_IPHONE"] = 19;
                values[valuesById[20] = "FBLITE_ANDROID"] = 20;
                values[valuesById[21] = "MLITE_ANDROID"] = 21;
                values[valuesById[22] = "IGLITE_ANDROID"] = 22;
                values[valuesById[23] = "PAGE"] = 23;
                values[valuesById[24] = "MACOS"] = 24;
                values[valuesById[25] = "OCULUS_MSG"] = 25;
                values[valuesById[26] = "OCULUS_CALL"] = 26;
                values[valuesById[27] = "MILAN"] = 27;
                values[valuesById[28] = "CAPI"] = 28;
                values[valuesById[29] = "WEAROS"] = 29;
                values[valuesById[30] = "ARDEVICE"] = 30;
                values[valuesById[31] = "VRDEVICE"] = 31;
                values[valuesById[32] = "BLUE_WEB"] = 32;
                values[valuesById[33] = "IPAD"] = 33;
                values[valuesById[34] = "TEST"] = 34;
                values[valuesById[35] = "SMART_GLASSES"] = 35;
                values[valuesById[36] = "BLUE_VR"] = 36;
                values[valuesById[37] = "AR_WRIST"] = 37;
                values[valuesById[38] = "WAIL"] = 38;
                values[valuesById[39] = "WORK_ANDROID"] = 39;
                values[valuesById[40] = "WORK_IOS"] = 40;
                return values;
            })();

            UserAgent.ReleaseChannel = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "RELEASE"] = 0;
                values[valuesById[1] = "BETA"] = 1;
                values[valuesById[2] = "ALPHA"] = 2;
                values[valuesById[3] = "DEBUG"] = 3;
                return values;
            })();

            return UserAgent;
        })();

        ClientPayload.WebInfo = (function() {

            const WebInfo = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            WebInfo.prototype.refToken = null;
            WebInfo.prototype.version = null;
            WebInfo.prototype.webdPayload = null;
            WebInfo.prototype.webSubPlatform = null;
            WebInfo.prototype.browser = null;
            WebInfo.prototype.browserVersion = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_refToken", {
                get: $util.oneOfGetter($oneOfFields = ["refToken"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_version", {
                get: $util.oneOfGetter($oneOfFields = ["version"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_webdPayload", {
                get: $util.oneOfGetter($oneOfFields = ["webdPayload"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_webSubPlatform", {
                get: $util.oneOfGetter($oneOfFields = ["webSubPlatform"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_browser", {
                get: $util.oneOfGetter($oneOfFields = ["browser"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(WebInfo.prototype, "_browserVersion", {
                get: $util.oneOfGetter($oneOfFields = ["browserVersion"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            WebInfo.create = function(properties) {
                return new WebInfo(properties);
            };

            WebInfo.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.refToken != null && $Object.hasOwnProperty.call(m, "refToken"))
                    w.uint32(10).string(m.refToken);
                if (m.version != null && $Object.hasOwnProperty.call(m, "version"))
                    w.uint32(18).string(m.version);
                if (m.webdPayload != null && $Object.hasOwnProperty.call(m, "webdPayload"))
                    $root.Wa6.ClientPayload.WebInfo.WebdPayload.encode(m.webdPayload, w.uint32(26).fork(), q + 1).ldelim();
                if (m.webSubPlatform != null && $Object.hasOwnProperty.call(m, "webSubPlatform"))
                    w.uint32(32).int32(m.webSubPlatform);
                if (m.browser != null && $Object.hasOwnProperty.call(m, "browser"))
                    w.uint32(42).string(m.browser);
                if (m.browserVersion != null && $Object.hasOwnProperty.call(m, "browserVersion"))
                    w.uint32(50).string(m.browserVersion);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            WebInfo.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.ClientPayload.WebInfo();
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
                            m.refToken = r.stringVerify();
                            m._refToken = "refToken";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.version = r.stringVerify();
                            m._version = "version";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.webdPayload = $root.Wa6.ClientPayload.WebInfo.WebdPayload.decode(r, r.uint32(), $undefined, q + 1, m.webdPayload);
                            m._webdPayload = "webdPayload";
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.webSubPlatform = r.int32();
                            m._webSubPlatform = "webSubPlatform";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.browser = r.stringVerify();
                            m._browser = "browser";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.browserVersion = r.stringVerify();
                            m._browserVersion = "browserVersion";
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

            WebInfo.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.ClientPayload.WebInfo)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.ClientPayload.WebInfo: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.ClientPayload.WebInfo();
                if (d.refToken != null) {
                    m.refToken = $String(d.refToken);
                }
                if (d.version != null) {
                    m.version = $String(d.version);
                }
                if (d.webdPayload != null) {
                    if (!$util.isObject(d.webdPayload))
                        throw $TypeError(".Wa6.ClientPayload.WebInfo.webdPayload: object expected");
                    m.webdPayload = $root.Wa6.ClientPayload.WebInfo.WebdPayload.fromObject(d.webdPayload, q + 1);
                }
                switch (d.webSubPlatform) {
                case "WEB_BROWSER":
                case 0:
                    m.webSubPlatform = 0;
                    break;
                case "APP_STORE":
                case 1:
                    m.webSubPlatform = 1;
                    break;
                case "WIN_STORE":
                case 2:
                    m.webSubPlatform = 2;
                    break;
                case "DARWIN":
                case 3:
                    m.webSubPlatform = 3;
                    break;
                case "WIN32":
                case 4:
                    m.webSubPlatform = 4;
                    break;
                case "WIN_HYBRID":
                case 5:
                    m.webSubPlatform = 5;
                    break;
                default:
                    if (typeof d.webSubPlatform === "number" && (d.webSubPlatform | 0) === d.webSubPlatform)
                        m.webSubPlatform = d.webSubPlatform;
                }
                if (d.browser != null) {
                    m.browser = $String(d.browser);
                }
                if (d.browserVersion != null) {
                    m.browserVersion = $String(d.browserVersion);
                }
                return m;
            };

            WebInfo.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.refToken != null && $Object.hasOwnProperty.call(m, "refToken")) {
                    d.refToken = m.refToken;
                }
                if (m.version != null && $Object.hasOwnProperty.call(m, "version")) {
                    d.version = m.version;
                }
                if (m.webdPayload != null && $Object.hasOwnProperty.call(m, "webdPayload")) {
                    d.webdPayload = $root.Wa6.ClientPayload.WebInfo.WebdPayload.toObject(m.webdPayload, o, q + 1);
                }
                if (m.webSubPlatform != null && $Object.hasOwnProperty.call(m, "webSubPlatform")) {
                    d.webSubPlatform = o.enums === $String ? $root.Wa6.ClientPayload.WebInfo.WebSubPlatform[m.webSubPlatform] === $undefined ? m.webSubPlatform : $root.Wa6.ClientPayload.WebInfo.WebSubPlatform[m.webSubPlatform] : m.webSubPlatform;
                }
                if (m.browser != null && $Object.hasOwnProperty.call(m, "browser")) {
                    d.browser = m.browser;
                }
                if (m.browserVersion != null && $Object.hasOwnProperty.call(m, "browserVersion")) {
                    d.browserVersion = m.browserVersion;
                }
                return d;
            };

            WebInfo.prototype.toJSON = function() {
                return WebInfo.toObject(this, $protobuf.util.toJSONOptions);
            };

            WebInfo.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.ClientPayload.WebInfo";
            };

            WebInfo.WebSubPlatform = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "WEB_BROWSER"] = 0;
                values[valuesById[1] = "APP_STORE"] = 1;
                values[valuesById[2] = "WIN_STORE"] = 2;
                values[valuesById[3] = "DARWIN"] = 3;
                values[valuesById[4] = "WIN32"] = 4;
                values[valuesById[5] = "WIN_HYBRID"] = 5;
                return values;
            })();

            WebInfo.WebdPayload = (function() {

                const WebdPayload = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                WebdPayload.prototype.usesParticipantInKey = null;
                WebdPayload.prototype.supportsStarredMessages = null;
                WebdPayload.prototype.supportsDocumentMessages = null;
                WebdPayload.prototype.supportsUrlMessages = null;
                WebdPayload.prototype.supportsMediaRetry = null;
                WebdPayload.prototype.supportsE2EImage = null;
                WebdPayload.prototype.supportsE2EVideo = null;
                WebdPayload.prototype.supportsE2EAudio = null;
                WebdPayload.prototype.supportsE2EDocument = null;
                WebdPayload.prototype.documentTypes = null;
                WebdPayload.prototype.features = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_usesParticipantInKey", {
                    get: $util.oneOfGetter($oneOfFields = ["usesParticipantInKey"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsStarredMessages", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsStarredMessages"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsDocumentMessages", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsDocumentMessages"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsUrlMessages", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsUrlMessages"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsMediaRetry", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsMediaRetry"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsE2EImage", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsE2EImage"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsE2EVideo", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsE2EVideo"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsE2EAudio", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsE2EAudio"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_supportsE2EDocument", {
                    get: $util.oneOfGetter($oneOfFields = ["supportsE2EDocument"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_documentTypes", {
                    get: $util.oneOfGetter($oneOfFields = ["documentTypes"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(WebdPayload.prototype, "_features", {
                    get: $util.oneOfGetter($oneOfFields = ["features"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                WebdPayload.create = function(properties) {
                    return new WebdPayload(properties);
                };

                WebdPayload.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.usesParticipantInKey != null && $Object.hasOwnProperty.call(m, "usesParticipantInKey"))
                        w.uint32(8).bool(m.usesParticipantInKey);
                    if (m.supportsStarredMessages != null && $Object.hasOwnProperty.call(m, "supportsStarredMessages"))
                        w.uint32(16).bool(m.supportsStarredMessages);
                    if (m.supportsDocumentMessages != null && $Object.hasOwnProperty.call(m, "supportsDocumentMessages"))
                        w.uint32(24).bool(m.supportsDocumentMessages);
                    if (m.supportsUrlMessages != null && $Object.hasOwnProperty.call(m, "supportsUrlMessages"))
                        w.uint32(32).bool(m.supportsUrlMessages);
                    if (m.supportsMediaRetry != null && $Object.hasOwnProperty.call(m, "supportsMediaRetry"))
                        w.uint32(40).bool(m.supportsMediaRetry);
                    if (m.supportsE2EImage != null && $Object.hasOwnProperty.call(m, "supportsE2EImage"))
                        w.uint32(48).bool(m.supportsE2EImage);
                    if (m.supportsE2EVideo != null && $Object.hasOwnProperty.call(m, "supportsE2EVideo"))
                        w.uint32(56).bool(m.supportsE2EVideo);
                    if (m.supportsE2EAudio != null && $Object.hasOwnProperty.call(m, "supportsE2EAudio"))
                        w.uint32(64).bool(m.supportsE2EAudio);
                    if (m.supportsE2EDocument != null && $Object.hasOwnProperty.call(m, "supportsE2EDocument"))
                        w.uint32(72).bool(m.supportsE2EDocument);
                    if (m.documentTypes != null && $Object.hasOwnProperty.call(m, "documentTypes"))
                        w.uint32(82).string(m.documentTypes);
                    if (m.features != null && $Object.hasOwnProperty.call(m, "features"))
                        w.uint32(90).bytes(m.features);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                WebdPayload.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.Wa6.ClientPayload.WebInfo.WebdPayload();
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
                                m.usesParticipantInKey = r.bool();
                                m._usesParticipantInKey = "usesParticipantInKey";
                                continue;
                            }
                        case 2: {
                                if (u !== 0)
                                    break;
                                m.supportsStarredMessages = r.bool();
                                m._supportsStarredMessages = "supportsStarredMessages";
                                continue;
                            }
                        case 3: {
                                if (u !== 0)
                                    break;
                                m.supportsDocumentMessages = r.bool();
                                m._supportsDocumentMessages = "supportsDocumentMessages";
                                continue;
                            }
                        case 4: {
                                if (u !== 0)
                                    break;
                                m.supportsUrlMessages = r.bool();
                                m._supportsUrlMessages = "supportsUrlMessages";
                                continue;
                            }
                        case 5: {
                                if (u !== 0)
                                    break;
                                m.supportsMediaRetry = r.bool();
                                m._supportsMediaRetry = "supportsMediaRetry";
                                continue;
                            }
                        case 6: {
                                if (u !== 0)
                                    break;
                                m.supportsE2EImage = r.bool();
                                m._supportsE2EImage = "supportsE2EImage";
                                continue;
                            }
                        case 7: {
                                if (u !== 0)
                                    break;
                                m.supportsE2EVideo = r.bool();
                                m._supportsE2EVideo = "supportsE2EVideo";
                                continue;
                            }
                        case 8: {
                                if (u !== 0)
                                    break;
                                m.supportsE2EAudio = r.bool();
                                m._supportsE2EAudio = "supportsE2EAudio";
                                continue;
                            }
                        case 9: {
                                if (u !== 0)
                                    break;
                                m.supportsE2EDocument = r.bool();
                                m._supportsE2EDocument = "supportsE2EDocument";
                                continue;
                            }
                        case 10: {
                                if (u !== 2)
                                    break;
                                m.documentTypes = r.stringVerify();
                                m._documentTypes = "documentTypes";
                                continue;
                            }
                        case 11: {
                                if (u !== 2)
                                    break;
                                m.features = r.bytes();
                                m._features = "features";
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

                WebdPayload.fromObject = function (d, q) {
                    if (d instanceof $root.Wa6.ClientPayload.WebInfo.WebdPayload)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".Wa6.ClientPayload.WebInfo.WebdPayload: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.Wa6.ClientPayload.WebInfo.WebdPayload();
                    if (d.usesParticipantInKey != null) {
                        m.usesParticipantInKey = $Boolean(d.usesParticipantInKey);
                    }
                    if (d.supportsStarredMessages != null) {
                        m.supportsStarredMessages = $Boolean(d.supportsStarredMessages);
                    }
                    if (d.supportsDocumentMessages != null) {
                        m.supportsDocumentMessages = $Boolean(d.supportsDocumentMessages);
                    }
                    if (d.supportsUrlMessages != null) {
                        m.supportsUrlMessages = $Boolean(d.supportsUrlMessages);
                    }
                    if (d.supportsMediaRetry != null) {
                        m.supportsMediaRetry = $Boolean(d.supportsMediaRetry);
                    }
                    if (d.supportsE2EImage != null) {
                        m.supportsE2EImage = $Boolean(d.supportsE2EImage);
                    }
                    if (d.supportsE2EVideo != null) {
                        m.supportsE2EVideo = $Boolean(d.supportsE2EVideo);
                    }
                    if (d.supportsE2EAudio != null) {
                        m.supportsE2EAudio = $Boolean(d.supportsE2EAudio);
                    }
                    if (d.supportsE2EDocument != null) {
                        m.supportsE2EDocument = $Boolean(d.supportsE2EDocument);
                    }
                    if (d.documentTypes != null) {
                        m.documentTypes = $String(d.documentTypes);
                    }
                    if (d.features != null) {
                        if (typeof d.features === "string")
                            $util.base64.decode(d.features, m.features = $util.newBuffer($util.base64.length(d.features)), 0);
                        else if (d.features.length >= 0)
                            m.features = d.features;
                    }
                    return m;
                };

                WebdPayload.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.usesParticipantInKey != null && $Object.hasOwnProperty.call(m, "usesParticipantInKey")) {
                        d.usesParticipantInKey = m.usesParticipantInKey;
                    }
                    if (m.supportsStarredMessages != null && $Object.hasOwnProperty.call(m, "supportsStarredMessages")) {
                        d.supportsStarredMessages = m.supportsStarredMessages;
                    }
                    if (m.supportsDocumentMessages != null && $Object.hasOwnProperty.call(m, "supportsDocumentMessages")) {
                        d.supportsDocumentMessages = m.supportsDocumentMessages;
                    }
                    if (m.supportsUrlMessages != null && $Object.hasOwnProperty.call(m, "supportsUrlMessages")) {
                        d.supportsUrlMessages = m.supportsUrlMessages;
                    }
                    if (m.supportsMediaRetry != null && $Object.hasOwnProperty.call(m, "supportsMediaRetry")) {
                        d.supportsMediaRetry = m.supportsMediaRetry;
                    }
                    if (m.supportsE2EImage != null && $Object.hasOwnProperty.call(m, "supportsE2EImage")) {
                        d.supportsE2EImage = m.supportsE2EImage;
                    }
                    if (m.supportsE2EVideo != null && $Object.hasOwnProperty.call(m, "supportsE2EVideo")) {
                        d.supportsE2EVideo = m.supportsE2EVideo;
                    }
                    if (m.supportsE2EAudio != null && $Object.hasOwnProperty.call(m, "supportsE2EAudio")) {
                        d.supportsE2EAudio = m.supportsE2EAudio;
                    }
                    if (m.supportsE2EDocument != null && $Object.hasOwnProperty.call(m, "supportsE2EDocument")) {
                        d.supportsE2EDocument = m.supportsE2EDocument;
                    }
                    if (m.documentTypes != null && $Object.hasOwnProperty.call(m, "documentTypes")) {
                        d.documentTypes = m.documentTypes;
                    }
                    if (m.features != null && $Object.hasOwnProperty.call(m, "features")) {
                        d.features = o.bytes === $String ? $util.base64.encode(m.features, 0, m.features.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.features) : m.features;
                    }
                    return d;
                };

                WebdPayload.prototype.toJSON = function() {
                    return WebdPayload.toObject(this, $protobuf.util.toJSONOptions);
                };

                WebdPayload.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/Wa6.ClientPayload.WebInfo.WebdPayload";
                };

                return WebdPayload;
            })();

            return WebInfo;
        })();

        return ClientPayload;
    })();

    Wa6.HandshakeMessage = (function() {

        const HandshakeMessage = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        HandshakeMessage.prototype.clientHello = null;
        HandshakeMessage.prototype.serverHello = null;
        HandshakeMessage.prototype.clientFinish = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HandshakeMessage.prototype, "_clientHello", {
            get: $util.oneOfGetter($oneOfFields = ["clientHello"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HandshakeMessage.prototype, "_serverHello", {
            get: $util.oneOfGetter($oneOfFields = ["serverHello"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HandshakeMessage.prototype, "_clientFinish", {
            get: $util.oneOfGetter($oneOfFields = ["clientFinish"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        HandshakeMessage.create = function(properties) {
            return new HandshakeMessage(properties);
        };

        HandshakeMessage.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.clientHello != null && $Object.hasOwnProperty.call(m, "clientHello"))
                $root.Wa6.HandshakeMessage.ClientHello.encode(m.clientHello, w.uint32(18).fork(), q + 1).ldelim();
            if (m.serverHello != null && $Object.hasOwnProperty.call(m, "serverHello"))
                $root.Wa6.HandshakeMessage.ServerHello.encode(m.serverHello, w.uint32(26).fork(), q + 1).ldelim();
            if (m.clientFinish != null && $Object.hasOwnProperty.call(m, "clientFinish"))
                $root.Wa6.HandshakeMessage.ClientFinish.encode(m.clientFinish, w.uint32(34).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        HandshakeMessage.decode = function (r, l, z, q, g) {
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
            m = g || new $root.Wa6.HandshakeMessage();
            while (r.pos < c) {
                var s = r.pos;
                var t = r.tag();
                if (t === z) {
                    z = $undefined;
                    break;
                }
                var u = t & 7;
                switch (t >>>= 3) {
                case 2: {
                        if (u !== 2)
                            break;
                        m.clientHello = $root.Wa6.HandshakeMessage.ClientHello.decode(r, r.uint32(), $undefined, q + 1, m.clientHello);
                        m._clientHello = "clientHello";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.serverHello = $root.Wa6.HandshakeMessage.ServerHello.decode(r, r.uint32(), $undefined, q + 1, m.serverHello);
                        m._serverHello = "serverHello";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.clientFinish = $root.Wa6.HandshakeMessage.ClientFinish.decode(r, r.uint32(), $undefined, q + 1, m.clientFinish);
                        m._clientFinish = "clientFinish";
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

        HandshakeMessage.fromObject = function (d, q) {
            if (d instanceof $root.Wa6.HandshakeMessage)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".Wa6.HandshakeMessage: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.Wa6.HandshakeMessage();
            if (d.clientHello != null) {
                if (!$util.isObject(d.clientHello))
                    throw $TypeError(".Wa6.HandshakeMessage.clientHello: object expected");
                m.clientHello = $root.Wa6.HandshakeMessage.ClientHello.fromObject(d.clientHello, q + 1);
            }
            if (d.serverHello != null) {
                if (!$util.isObject(d.serverHello))
                    throw $TypeError(".Wa6.HandshakeMessage.serverHello: object expected");
                m.serverHello = $root.Wa6.HandshakeMessage.ServerHello.fromObject(d.serverHello, q + 1);
            }
            if (d.clientFinish != null) {
                if (!$util.isObject(d.clientFinish))
                    throw $TypeError(".Wa6.HandshakeMessage.clientFinish: object expected");
                m.clientFinish = $root.Wa6.HandshakeMessage.ClientFinish.fromObject(d.clientFinish, q + 1);
            }
            return m;
        };

        HandshakeMessage.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.clientHello != null && $Object.hasOwnProperty.call(m, "clientHello")) {
                d.clientHello = $root.Wa6.HandshakeMessage.ClientHello.toObject(m.clientHello, o, q + 1);
            }
            if (m.serverHello != null && $Object.hasOwnProperty.call(m, "serverHello")) {
                d.serverHello = $root.Wa6.HandshakeMessage.ServerHello.toObject(m.serverHello, o, q + 1);
            }
            if (m.clientFinish != null && $Object.hasOwnProperty.call(m, "clientFinish")) {
                d.clientFinish = $root.Wa6.HandshakeMessage.ClientFinish.toObject(m.clientFinish, o, q + 1);
            }
            return d;
        };

        HandshakeMessage.prototype.toJSON = function() {
            return HandshakeMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        HandshakeMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/Wa6.HandshakeMessage";
        };

        HandshakeMessage.ClientFinish = (function() {

            const ClientFinish = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            ClientFinish.prototype["static"] = null;
            ClientFinish.prototype.payload = null;
            ClientFinish.prototype.extendedCiphertext = null;
            ClientFinish.prototype.paddedBytes = null;
            ClientFinish.prototype.simulateXxkemFs = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientFinish.prototype, "_static", {
                get: $util.oneOfGetter($oneOfFields = ["static"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientFinish.prototype, "_payload", {
                get: $util.oneOfGetter($oneOfFields = ["payload"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientFinish.prototype, "_extendedCiphertext", {
                get: $util.oneOfGetter($oneOfFields = ["extendedCiphertext"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientFinish.prototype, "_paddedBytes", {
                get: $util.oneOfGetter($oneOfFields = ["paddedBytes"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientFinish.prototype, "_simulateXxkemFs", {
                get: $util.oneOfGetter($oneOfFields = ["simulateXxkemFs"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            ClientFinish.create = function(properties) {
                return new ClientFinish(properties);
            };

            ClientFinish.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static"))
                    w.uint32(10).bytes(m["static"]);
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload"))
                    w.uint32(18).bytes(m.payload);
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext"))
                    w.uint32(26).bytes(m.extendedCiphertext);
                if (m.paddedBytes != null && $Object.hasOwnProperty.call(m, "paddedBytes"))
                    w.uint32(34).bytes(m.paddedBytes);
                if (m.simulateXxkemFs != null && $Object.hasOwnProperty.call(m, "simulateXxkemFs"))
                    w.uint32(40).bool(m.simulateXxkemFs);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            ClientFinish.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.HandshakeMessage.ClientFinish();
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
                            m["static"] = r.bytes();
                            m._static = "static";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.payload = r.bytes();
                            m._payload = "payload";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.extendedCiphertext = r.bytes();
                            m._extendedCiphertext = "extendedCiphertext";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.paddedBytes = r.bytes();
                            m._paddedBytes = "paddedBytes";
                            continue;
                        }
                    case 5: {
                            if (u !== 0)
                                break;
                            m.simulateXxkemFs = r.bool();
                            m._simulateXxkemFs = "simulateXxkemFs";
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

            ClientFinish.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.HandshakeMessage.ClientFinish)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.HandshakeMessage.ClientFinish: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.HandshakeMessage.ClientFinish();
                if (d["static"] != null) {
                    if (typeof d["static"] === "string")
                        $util.base64.decode(d["static"], m["static"] = $util.newBuffer($util.base64.length(d["static"])), 0);
                    else if (d["static"].length >= 0)
                        m["static"] = d["static"];
                }
                if (d.payload != null) {
                    if (typeof d.payload === "string")
                        $util.base64.decode(d.payload, m.payload = $util.newBuffer($util.base64.length(d.payload)), 0);
                    else if (d.payload.length >= 0)
                        m.payload = d.payload;
                }
                if (d.extendedCiphertext != null) {
                    if (typeof d.extendedCiphertext === "string")
                        $util.base64.decode(d.extendedCiphertext, m.extendedCiphertext = $util.newBuffer($util.base64.length(d.extendedCiphertext)), 0);
                    else if (d.extendedCiphertext.length >= 0)
                        m.extendedCiphertext = d.extendedCiphertext;
                }
                if (d.paddedBytes != null) {
                    if (typeof d.paddedBytes === "string")
                        $util.base64.decode(d.paddedBytes, m.paddedBytes = $util.newBuffer($util.base64.length(d.paddedBytes)), 0);
                    else if (d.paddedBytes.length >= 0)
                        m.paddedBytes = d.paddedBytes;
                }
                if (d.simulateXxkemFs != null) {
                    m.simulateXxkemFs = $Boolean(d.simulateXxkemFs);
                }
                return m;
            };

            ClientFinish.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static")) {
                    d["static"] = o.bytes === $String ? $util.base64.encode(m["static"], 0, m["static"].length) : o.bytes === $Array ? $Array.prototype.slice.call(m["static"]) : m["static"];
                }
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload")) {
                    d.payload = o.bytes === $String ? $util.base64.encode(m.payload, 0, m.payload.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.payload) : m.payload;
                }
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext")) {
                    d.extendedCiphertext = o.bytes === $String ? $util.base64.encode(m.extendedCiphertext, 0, m.extendedCiphertext.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.extendedCiphertext) : m.extendedCiphertext;
                }
                if (m.paddedBytes != null && $Object.hasOwnProperty.call(m, "paddedBytes")) {
                    d.paddedBytes = o.bytes === $String ? $util.base64.encode(m.paddedBytes, 0, m.paddedBytes.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.paddedBytes) : m.paddedBytes;
                }
                if (m.simulateXxkemFs != null && $Object.hasOwnProperty.call(m, "simulateXxkemFs")) {
                    d.simulateXxkemFs = m.simulateXxkemFs;
                }
                return d;
            };

            ClientFinish.prototype.toJSON = function() {
                return ClientFinish.toObject(this, $protobuf.util.toJSONOptions);
            };

            ClientFinish.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.HandshakeMessage.ClientFinish";
            };

            return ClientFinish;
        })();

        HandshakeMessage.ClientHello = (function() {

            const ClientHello = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            ClientHello.prototype.ephemeral = null;
            ClientHello.prototype["static"] = null;
            ClientHello.prototype.payload = null;
            ClientHello.prototype.useExtended = null;
            ClientHello.prototype.extendedCiphertext = null;
            ClientHello.prototype.paddedBytes = null;
            ClientHello.prototype.sendServerHelloPaddedBytes = null;
            ClientHello.prototype.simulateXxkemFs = null;
            ClientHello.prototype.pqMode = null;
            ClientHello.prototype.extendedEphemeral = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_ephemeral", {
                get: $util.oneOfGetter($oneOfFields = ["ephemeral"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_static", {
                get: $util.oneOfGetter($oneOfFields = ["static"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_payload", {
                get: $util.oneOfGetter($oneOfFields = ["payload"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_useExtended", {
                get: $util.oneOfGetter($oneOfFields = ["useExtended"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_extendedCiphertext", {
                get: $util.oneOfGetter($oneOfFields = ["extendedCiphertext"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_paddedBytes", {
                get: $util.oneOfGetter($oneOfFields = ["paddedBytes"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_sendServerHelloPaddedBytes", {
                get: $util.oneOfGetter($oneOfFields = ["sendServerHelloPaddedBytes"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_simulateXxkemFs", {
                get: $util.oneOfGetter($oneOfFields = ["simulateXxkemFs"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_pqMode", {
                get: $util.oneOfGetter($oneOfFields = ["pqMode"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ClientHello.prototype, "_extendedEphemeral", {
                get: $util.oneOfGetter($oneOfFields = ["extendedEphemeral"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            ClientHello.create = function(properties) {
                return new ClientHello(properties);
            };

            ClientHello.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.ephemeral != null && $Object.hasOwnProperty.call(m, "ephemeral"))
                    w.uint32(10).bytes(m.ephemeral);
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static"))
                    w.uint32(18).bytes(m["static"]);
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload"))
                    w.uint32(26).bytes(m.payload);
                if (m.useExtended != null && $Object.hasOwnProperty.call(m, "useExtended"))
                    w.uint32(32).bool(m.useExtended);
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext"))
                    w.uint32(42).bytes(m.extendedCiphertext);
                if (m.paddedBytes != null && $Object.hasOwnProperty.call(m, "paddedBytes"))
                    w.uint32(50).bytes(m.paddedBytes);
                if (m.sendServerHelloPaddedBytes != null && $Object.hasOwnProperty.call(m, "sendServerHelloPaddedBytes"))
                    w.uint32(56).bool(m.sendServerHelloPaddedBytes);
                if (m.simulateXxkemFs != null && $Object.hasOwnProperty.call(m, "simulateXxkemFs"))
                    w.uint32(64).bool(m.simulateXxkemFs);
                if (m.pqMode != null && $Object.hasOwnProperty.call(m, "pqMode"))
                    w.uint32(72).int32(m.pqMode);
                if (m.extendedEphemeral != null && $Object.hasOwnProperty.call(m, "extendedEphemeral"))
                    w.uint32(82).bytes(m.extendedEphemeral);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            ClientHello.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.HandshakeMessage.ClientHello();
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
                            m.ephemeral = r.bytes();
                            m._ephemeral = "ephemeral";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m["static"] = r.bytes();
                            m._static = "static";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.payload = r.bytes();
                            m._payload = "payload";
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.useExtended = r.bool();
                            m._useExtended = "useExtended";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.extendedCiphertext = r.bytes();
                            m._extendedCiphertext = "extendedCiphertext";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.paddedBytes = r.bytes();
                            m._paddedBytes = "paddedBytes";
                            continue;
                        }
                    case 7: {
                            if (u !== 0)
                                break;
                            m.sendServerHelloPaddedBytes = r.bool();
                            m._sendServerHelloPaddedBytes = "sendServerHelloPaddedBytes";
                            continue;
                        }
                    case 8: {
                            if (u !== 0)
                                break;
                            m.simulateXxkemFs = r.bool();
                            m._simulateXxkemFs = "simulateXxkemFs";
                            continue;
                        }
                    case 9: {
                            if (u !== 0)
                                break;
                            m.pqMode = r.int32();
                            m._pqMode = "pqMode";
                            continue;
                        }
                    case 10: {
                            if (u !== 2)
                                break;
                            m.extendedEphemeral = r.bytes();
                            m._extendedEphemeral = "extendedEphemeral";
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

            ClientHello.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.HandshakeMessage.ClientHello)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.HandshakeMessage.ClientHello: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.HandshakeMessage.ClientHello();
                if (d.ephemeral != null) {
                    if (typeof d.ephemeral === "string")
                        $util.base64.decode(d.ephemeral, m.ephemeral = $util.newBuffer($util.base64.length(d.ephemeral)), 0);
                    else if (d.ephemeral.length >= 0)
                        m.ephemeral = d.ephemeral;
                }
                if (d["static"] != null) {
                    if (typeof d["static"] === "string")
                        $util.base64.decode(d["static"], m["static"] = $util.newBuffer($util.base64.length(d["static"])), 0);
                    else if (d["static"].length >= 0)
                        m["static"] = d["static"];
                }
                if (d.payload != null) {
                    if (typeof d.payload === "string")
                        $util.base64.decode(d.payload, m.payload = $util.newBuffer($util.base64.length(d.payload)), 0);
                    else if (d.payload.length >= 0)
                        m.payload = d.payload;
                }
                if (d.useExtended != null) {
                    m.useExtended = $Boolean(d.useExtended);
                }
                if (d.extendedCiphertext != null) {
                    if (typeof d.extendedCiphertext === "string")
                        $util.base64.decode(d.extendedCiphertext, m.extendedCiphertext = $util.newBuffer($util.base64.length(d.extendedCiphertext)), 0);
                    else if (d.extendedCiphertext.length >= 0)
                        m.extendedCiphertext = d.extendedCiphertext;
                }
                if (d.paddedBytes != null) {
                    if (typeof d.paddedBytes === "string")
                        $util.base64.decode(d.paddedBytes, m.paddedBytes = $util.newBuffer($util.base64.length(d.paddedBytes)), 0);
                    else if (d.paddedBytes.length >= 0)
                        m.paddedBytes = d.paddedBytes;
                }
                if (d.sendServerHelloPaddedBytes != null) {
                    m.sendServerHelloPaddedBytes = $Boolean(d.sendServerHelloPaddedBytes);
                }
                if (d.simulateXxkemFs != null) {
                    m.simulateXxkemFs = $Boolean(d.simulateXxkemFs);
                }
                switch (d.pqMode) {
                case "HANDSHAKE_PQ_MODE_UNKNOWN":
                case 0:
                    m.pqMode = 0;
                    break;
                case "XXKEM":
                case 1:
                    m.pqMode = 1;
                    break;
                case "XXKEM_FS":
                case 2:
                    m.pqMode = 2;
                    break;
                case "XXKEM_EPH":
                case 9:
                    m.pqMode = 9;
                    break;
                case "WA_CLASSICAL":
                case 3:
                    m.pqMode = 3;
                    break;
                case "WA_PQ":
                case 4:
                    m.pqMode = 4;
                    break;
                case "IKKEM":
                case 5:
                    m.pqMode = 5;
                    break;
                case "IKKEM_FS":
                case 6:
                    m.pqMode = 6;
                    break;
                case "XXKEM_2":
                case 7:
                    m.pqMode = 7;
                    break;
                case "IKKEM_2":
                case 8:
                    m.pqMode = 8;
                    break;
                default:
                    if (typeof d.pqMode === "number" && (d.pqMode | 0) === d.pqMode)
                        m.pqMode = d.pqMode;
                }
                if (d.extendedEphemeral != null) {
                    if (typeof d.extendedEphemeral === "string")
                        $util.base64.decode(d.extendedEphemeral, m.extendedEphemeral = $util.newBuffer($util.base64.length(d.extendedEphemeral)), 0);
                    else if (d.extendedEphemeral.length >= 0)
                        m.extendedEphemeral = d.extendedEphemeral;
                }
                return m;
            };

            ClientHello.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.ephemeral != null && $Object.hasOwnProperty.call(m, "ephemeral")) {
                    d.ephemeral = o.bytes === $String ? $util.base64.encode(m.ephemeral, 0, m.ephemeral.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.ephemeral) : m.ephemeral;
                }
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static")) {
                    d["static"] = o.bytes === $String ? $util.base64.encode(m["static"], 0, m["static"].length) : o.bytes === $Array ? $Array.prototype.slice.call(m["static"]) : m["static"];
                }
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload")) {
                    d.payload = o.bytes === $String ? $util.base64.encode(m.payload, 0, m.payload.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.payload) : m.payload;
                }
                if (m.useExtended != null && $Object.hasOwnProperty.call(m, "useExtended")) {
                    d.useExtended = m.useExtended;
                }
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext")) {
                    d.extendedCiphertext = o.bytes === $String ? $util.base64.encode(m.extendedCiphertext, 0, m.extendedCiphertext.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.extendedCiphertext) : m.extendedCiphertext;
                }
                if (m.paddedBytes != null && $Object.hasOwnProperty.call(m, "paddedBytes")) {
                    d.paddedBytes = o.bytes === $String ? $util.base64.encode(m.paddedBytes, 0, m.paddedBytes.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.paddedBytes) : m.paddedBytes;
                }
                if (m.sendServerHelloPaddedBytes != null && $Object.hasOwnProperty.call(m, "sendServerHelloPaddedBytes")) {
                    d.sendServerHelloPaddedBytes = m.sendServerHelloPaddedBytes;
                }
                if (m.simulateXxkemFs != null && $Object.hasOwnProperty.call(m, "simulateXxkemFs")) {
                    d.simulateXxkemFs = m.simulateXxkemFs;
                }
                if (m.pqMode != null && $Object.hasOwnProperty.call(m, "pqMode")) {
                    d.pqMode = o.enums === $String ? $root.Wa6.HandshakeMessage.HandshakePqMode[m.pqMode] === $undefined ? m.pqMode : $root.Wa6.HandshakeMessage.HandshakePqMode[m.pqMode] : m.pqMode;
                }
                if (m.extendedEphemeral != null && $Object.hasOwnProperty.call(m, "extendedEphemeral")) {
                    d.extendedEphemeral = o.bytes === $String ? $util.base64.encode(m.extendedEphemeral, 0, m.extendedEphemeral.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.extendedEphemeral) : m.extendedEphemeral;
                }
                return d;
            };

            ClientHello.prototype.toJSON = function() {
                return ClientHello.toObject(this, $protobuf.util.toJSONOptions);
            };

            ClientHello.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.HandshakeMessage.ClientHello";
            };

            return ClientHello;
        })();

        HandshakeMessage.HandshakePqMode = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "HANDSHAKE_PQ_MODE_UNKNOWN"] = 0;
            values[valuesById[1] = "XXKEM"] = 1;
            values[valuesById[2] = "XXKEM_FS"] = 2;
            values[valuesById[9] = "XXKEM_EPH"] = 9;
            values[valuesById[3] = "WA_CLASSICAL"] = 3;
            values[valuesById[4] = "WA_PQ"] = 4;
            values[valuesById[5] = "IKKEM"] = 5;
            values[valuesById[6] = "IKKEM_FS"] = 6;
            values[valuesById[7] = "XXKEM_2"] = 7;
            values[valuesById[8] = "IKKEM_2"] = 8;
            return values;
        })();

        HandshakeMessage.ServerHello = (function() {

            const ServerHello = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            ServerHello.prototype.ephemeral = null;
            ServerHello.prototype["static"] = null;
            ServerHello.prototype.payload = null;
            ServerHello.prototype.extendedStatic = null;
            ServerHello.prototype.paddingBytes = null;
            ServerHello.prototype.extendedCiphertext = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_ephemeral", {
                get: $util.oneOfGetter($oneOfFields = ["ephemeral"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_static", {
                get: $util.oneOfGetter($oneOfFields = ["static"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_payload", {
                get: $util.oneOfGetter($oneOfFields = ["payload"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_extendedStatic", {
                get: $util.oneOfGetter($oneOfFields = ["extendedStatic"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_paddingBytes", {
                get: $util.oneOfGetter($oneOfFields = ["paddingBytes"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(ServerHello.prototype, "_extendedCiphertext", {
                get: $util.oneOfGetter($oneOfFields = ["extendedCiphertext"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            ServerHello.create = function(properties) {
                return new ServerHello(properties);
            };

            ServerHello.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.ephemeral != null && $Object.hasOwnProperty.call(m, "ephemeral"))
                    w.uint32(10).bytes(m.ephemeral);
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static"))
                    w.uint32(18).bytes(m["static"]);
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload"))
                    w.uint32(26).bytes(m.payload);
                if (m.extendedStatic != null && $Object.hasOwnProperty.call(m, "extendedStatic"))
                    w.uint32(34).bytes(m.extendedStatic);
                if (m.paddingBytes != null && $Object.hasOwnProperty.call(m, "paddingBytes"))
                    w.uint32(42).bytes(m.paddingBytes);
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext"))
                    w.uint32(50).bytes(m.extendedCiphertext);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            ServerHello.decode = function (r, l, z, q, g) {
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
                m = g || new $root.Wa6.HandshakeMessage.ServerHello();
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
                            m.ephemeral = r.bytes();
                            m._ephemeral = "ephemeral";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m["static"] = r.bytes();
                            m._static = "static";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.payload = r.bytes();
                            m._payload = "payload";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.extendedStatic = r.bytes();
                            m._extendedStatic = "extendedStatic";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.paddingBytes = r.bytes();
                            m._paddingBytes = "paddingBytes";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.extendedCiphertext = r.bytes();
                            m._extendedCiphertext = "extendedCiphertext";
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

            ServerHello.fromObject = function (d, q) {
                if (d instanceof $root.Wa6.HandshakeMessage.ServerHello)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".Wa6.HandshakeMessage.ServerHello: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.Wa6.HandshakeMessage.ServerHello();
                if (d.ephemeral != null) {
                    if (typeof d.ephemeral === "string")
                        $util.base64.decode(d.ephemeral, m.ephemeral = $util.newBuffer($util.base64.length(d.ephemeral)), 0);
                    else if (d.ephemeral.length >= 0)
                        m.ephemeral = d.ephemeral;
                }
                if (d["static"] != null) {
                    if (typeof d["static"] === "string")
                        $util.base64.decode(d["static"], m["static"] = $util.newBuffer($util.base64.length(d["static"])), 0);
                    else if (d["static"].length >= 0)
                        m["static"] = d["static"];
                }
                if (d.payload != null) {
                    if (typeof d.payload === "string")
                        $util.base64.decode(d.payload, m.payload = $util.newBuffer($util.base64.length(d.payload)), 0);
                    else if (d.payload.length >= 0)
                        m.payload = d.payload;
                }
                if (d.extendedStatic != null) {
                    if (typeof d.extendedStatic === "string")
                        $util.base64.decode(d.extendedStatic, m.extendedStatic = $util.newBuffer($util.base64.length(d.extendedStatic)), 0);
                    else if (d.extendedStatic.length >= 0)
                        m.extendedStatic = d.extendedStatic;
                }
                if (d.paddingBytes != null) {
                    if (typeof d.paddingBytes === "string")
                        $util.base64.decode(d.paddingBytes, m.paddingBytes = $util.newBuffer($util.base64.length(d.paddingBytes)), 0);
                    else if (d.paddingBytes.length >= 0)
                        m.paddingBytes = d.paddingBytes;
                }
                if (d.extendedCiphertext != null) {
                    if (typeof d.extendedCiphertext === "string")
                        $util.base64.decode(d.extendedCiphertext, m.extendedCiphertext = $util.newBuffer($util.base64.length(d.extendedCiphertext)), 0);
                    else if (d.extendedCiphertext.length >= 0)
                        m.extendedCiphertext = d.extendedCiphertext;
                }
                return m;
            };

            ServerHello.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.ephemeral != null && $Object.hasOwnProperty.call(m, "ephemeral")) {
                    d.ephemeral = o.bytes === $String ? $util.base64.encode(m.ephemeral, 0, m.ephemeral.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.ephemeral) : m.ephemeral;
                }
                if (m["static"] != null && $Object.hasOwnProperty.call(m, "static")) {
                    d["static"] = o.bytes === $String ? $util.base64.encode(m["static"], 0, m["static"].length) : o.bytes === $Array ? $Array.prototype.slice.call(m["static"]) : m["static"];
                }
                if (m.payload != null && $Object.hasOwnProperty.call(m, "payload")) {
                    d.payload = o.bytes === $String ? $util.base64.encode(m.payload, 0, m.payload.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.payload) : m.payload;
                }
                if (m.extendedStatic != null && $Object.hasOwnProperty.call(m, "extendedStatic")) {
                    d.extendedStatic = o.bytes === $String ? $util.base64.encode(m.extendedStatic, 0, m.extendedStatic.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.extendedStatic) : m.extendedStatic;
                }
                if (m.paddingBytes != null && $Object.hasOwnProperty.call(m, "paddingBytes")) {
                    d.paddingBytes = o.bytes === $String ? $util.base64.encode(m.paddingBytes, 0, m.paddingBytes.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.paddingBytes) : m.paddingBytes;
                }
                if (m.extendedCiphertext != null && $Object.hasOwnProperty.call(m, "extendedCiphertext")) {
                    d.extendedCiphertext = o.bytes === $String ? $util.base64.encode(m.extendedCiphertext, 0, m.extendedCiphertext.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.extendedCiphertext) : m.extendedCiphertext;
                }
                return d;
            };

            ServerHello.prototype.toJSON = function() {
                return ServerHello.toObject(this, $protobuf.util.toJSONOptions);
            };

            ServerHello.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/Wa6.HandshakeMessage.ServerHello";
            };

            return ServerHello;
        })();

        return HandshakeMessage;
    })();

    return Wa6;
})();

export {
  $root as default
};
