/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array, $Number = $util.global.Number, $Boolean = $util.global.Boolean, $isFinite = $util.global.isFinite, $parseInt = $util.global.parseInt, $BigInt = $util.global.BigInt;

const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const AICommonDeprecated = $root.AICommonDeprecated = (() => {

    const AICommonDeprecated = {};

    AICommonDeprecated.AIRichResponseSubMessage = (function() {

        const AIRichResponseSubMessage = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseSubMessage.prototype.messageType = null;
        AIRichResponseSubMessage.prototype.gridImageMetadata = null;
        AIRichResponseSubMessage.prototype.messageText = null;
        AIRichResponseSubMessage.prototype.imageMetadata = null;
        AIRichResponseSubMessage.prototype.codeMetadata = null;
        AIRichResponseSubMessage.prototype.tableMetadata = null;
        AIRichResponseSubMessage.prototype.dynamicMetadata = null;
        AIRichResponseSubMessage.prototype.latexMetadata = null;
        AIRichResponseSubMessage.prototype.mapMetadata = null;
        AIRichResponseSubMessage.prototype.contentItemsMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_messageType", {
            get: $util.oneOfGetter($oneOfFields = ["messageType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_gridImageMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["gridImageMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_messageText", {
            get: $util.oneOfGetter($oneOfFields = ["messageText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_imageMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["imageMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_codeMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["codeMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_tableMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["tableMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_dynamicMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["dynamicMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_latexMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["latexMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_mapMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["mapMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseSubMessage.prototype, "_contentItemsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["contentItemsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseSubMessage.create = function(properties) {
            return new AIRichResponseSubMessage(properties);
        };

        AIRichResponseSubMessage.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.messageType != null && $Object.hasOwnProperty.call(m, "messageType"))
                w.uint32(8).int32(m.messageType);
            if (m.gridImageMetadata != null && $Object.hasOwnProperty.call(m, "gridImageMetadata"))
                $root.AICommonDeprecated.AIRichResponseGridImageMetadata.encode(m.gridImageMetadata, w.uint32(18).fork(), q + 1).ldelim();
            if (m.messageText != null && $Object.hasOwnProperty.call(m, "messageText"))
                w.uint32(26).string(m.messageText);
            if (m.imageMetadata != null && $Object.hasOwnProperty.call(m, "imageMetadata"))
                $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.encode(m.imageMetadata, w.uint32(34).fork(), q + 1).ldelim();
            if (m.codeMetadata != null && $Object.hasOwnProperty.call(m, "codeMetadata"))
                $root.AICommonDeprecated.AIRichResponseCodeMetadata.encode(m.codeMetadata, w.uint32(42).fork(), q + 1).ldelim();
            if (m.tableMetadata != null && $Object.hasOwnProperty.call(m, "tableMetadata"))
                $root.AICommonDeprecated.AIRichResponseTableMetadata.encode(m.tableMetadata, w.uint32(50).fork(), q + 1).ldelim();
            if (m.dynamicMetadata != null && $Object.hasOwnProperty.call(m, "dynamicMetadata"))
                $root.AICommonDeprecated.AIRichResponseDynamicMetadata.encode(m.dynamicMetadata, w.uint32(58).fork(), q + 1).ldelim();
            if (m.latexMetadata != null && $Object.hasOwnProperty.call(m, "latexMetadata"))
                $root.AICommonDeprecated.AIRichResponseLatexMetadata.encode(m.latexMetadata, w.uint32(66).fork(), q + 1).ldelim();
            if (m.mapMetadata != null && $Object.hasOwnProperty.call(m, "mapMetadata"))
                $root.AICommonDeprecated.AIRichResponseMapMetadata.encode(m.mapMetadata, w.uint32(74).fork(), q + 1).ldelim();
            if (m.contentItemsMetadata != null && $Object.hasOwnProperty.call(m, "contentItemsMetadata"))
                $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.encode(m.contentItemsMetadata, w.uint32(82).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseSubMessage.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseSubMessage();
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
                        m.messageType = r.int32();
                        m._messageType = "messageType";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.gridImageMetadata = $root.AICommonDeprecated.AIRichResponseGridImageMetadata.decode(r, r.uint32(), $undefined, q + 1, m.gridImageMetadata);
                        m._gridImageMetadata = "gridImageMetadata";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.messageText = r.stringVerify();
                        m._messageText = "messageText";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.imageMetadata = $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.decode(r, r.uint32(), $undefined, q + 1, m.imageMetadata);
                        m._imageMetadata = "imageMetadata";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.codeMetadata = $root.AICommonDeprecated.AIRichResponseCodeMetadata.decode(r, r.uint32(), $undefined, q + 1, m.codeMetadata);
                        m._codeMetadata = "codeMetadata";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.tableMetadata = $root.AICommonDeprecated.AIRichResponseTableMetadata.decode(r, r.uint32(), $undefined, q + 1, m.tableMetadata);
                        m._tableMetadata = "tableMetadata";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.dynamicMetadata = $root.AICommonDeprecated.AIRichResponseDynamicMetadata.decode(r, r.uint32(), $undefined, q + 1, m.dynamicMetadata);
                        m._dynamicMetadata = "dynamicMetadata";
                        continue;
                    }
                case 8: {
                        if (u !== 2)
                            break;
                        m.latexMetadata = $root.AICommonDeprecated.AIRichResponseLatexMetadata.decode(r, r.uint32(), $undefined, q + 1, m.latexMetadata);
                        m._latexMetadata = "latexMetadata";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.mapMetadata = $root.AICommonDeprecated.AIRichResponseMapMetadata.decode(r, r.uint32(), $undefined, q + 1, m.mapMetadata);
                        m._mapMetadata = "mapMetadata";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.contentItemsMetadata = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.decode(r, r.uint32(), $undefined, q + 1, m.contentItemsMetadata);
                        m._contentItemsMetadata = "contentItemsMetadata";
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

        AIRichResponseSubMessage.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseSubMessage)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseSubMessage();
            switch (d.messageType) {
            case "AI_RICH_RESPONSE_UNKNOWN":
            case 0:
                m.messageType = 0;
                break;
            case "AI_RICH_RESPONSE_GRID_IMAGE":
            case 1:
                m.messageType = 1;
                break;
            case "AI_RICH_RESPONSE_TEXT":
            case 2:
                m.messageType = 2;
                break;
            case "AI_RICH_RESPONSE_INLINE_IMAGE":
            case 3:
                m.messageType = 3;
                break;
            case "AI_RICH_RESPONSE_TABLE":
            case 4:
                m.messageType = 4;
                break;
            case "AI_RICH_RESPONSE_CODE":
            case 5:
                m.messageType = 5;
                break;
            case "AI_RICH_RESPONSE_DYNAMIC":
            case 6:
                m.messageType = 6;
                break;
            case "AI_RICH_RESPONSE_MAP":
            case 7:
                m.messageType = 7;
                break;
            case "AI_RICH_RESPONSE_LATEX":
            case 8:
                m.messageType = 8;
                break;
            case "AI_RICH_RESPONSE_CONTENT_ITEMS":
            case 9:
                m.messageType = 9;
                break;
            default:
                if (typeof d.messageType === "number" && (d.messageType | 0) === d.messageType)
                    m.messageType = d.messageType;
            }
            if (d.gridImageMetadata != null) {
                if (!$util.isObject(d.gridImageMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.gridImageMetadata: object expected");
                m.gridImageMetadata = $root.AICommonDeprecated.AIRichResponseGridImageMetadata.fromObject(d.gridImageMetadata, q + 1);
            }
            if (d.messageText != null) {
                m.messageText = $String(d.messageText);
            }
            if (d.imageMetadata != null) {
                if (!$util.isObject(d.imageMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.imageMetadata: object expected");
                m.imageMetadata = $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.fromObject(d.imageMetadata, q + 1);
            }
            if (d.codeMetadata != null) {
                if (!$util.isObject(d.codeMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.codeMetadata: object expected");
                m.codeMetadata = $root.AICommonDeprecated.AIRichResponseCodeMetadata.fromObject(d.codeMetadata, q + 1);
            }
            if (d.tableMetadata != null) {
                if (!$util.isObject(d.tableMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.tableMetadata: object expected");
                m.tableMetadata = $root.AICommonDeprecated.AIRichResponseTableMetadata.fromObject(d.tableMetadata, q + 1);
            }
            if (d.dynamicMetadata != null) {
                if (!$util.isObject(d.dynamicMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.dynamicMetadata: object expected");
                m.dynamicMetadata = $root.AICommonDeprecated.AIRichResponseDynamicMetadata.fromObject(d.dynamicMetadata, q + 1);
            }
            if (d.latexMetadata != null) {
                if (!$util.isObject(d.latexMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.latexMetadata: object expected");
                m.latexMetadata = $root.AICommonDeprecated.AIRichResponseLatexMetadata.fromObject(d.latexMetadata, q + 1);
            }
            if (d.mapMetadata != null) {
                if (!$util.isObject(d.mapMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.mapMetadata: object expected");
                m.mapMetadata = $root.AICommonDeprecated.AIRichResponseMapMetadata.fromObject(d.mapMetadata, q + 1);
            }
            if (d.contentItemsMetadata != null) {
                if (!$util.isObject(d.contentItemsMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseSubMessage.contentItemsMetadata: object expected");
                m.contentItemsMetadata = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.fromObject(d.contentItemsMetadata, q + 1);
            }
            return m;
        };

        AIRichResponseSubMessage.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.messageType != null && $Object.hasOwnProperty.call(m, "messageType")) {
                d.messageType = o.enums === $String ? $root.AICommonDeprecated.AIRichResponseSubMessageType[m.messageType] === $undefined ? m.messageType : $root.AICommonDeprecated.AIRichResponseSubMessageType[m.messageType] : m.messageType;
            }
            if (m.gridImageMetadata != null && $Object.hasOwnProperty.call(m, "gridImageMetadata")) {
                d.gridImageMetadata = $root.AICommonDeprecated.AIRichResponseGridImageMetadata.toObject(m.gridImageMetadata, o, q + 1);
            }
            if (m.messageText != null && $Object.hasOwnProperty.call(m, "messageText")) {
                d.messageText = m.messageText;
            }
            if (m.imageMetadata != null && $Object.hasOwnProperty.call(m, "imageMetadata")) {
                d.imageMetadata = $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.toObject(m.imageMetadata, o, q + 1);
            }
            if (m.codeMetadata != null && $Object.hasOwnProperty.call(m, "codeMetadata")) {
                d.codeMetadata = $root.AICommonDeprecated.AIRichResponseCodeMetadata.toObject(m.codeMetadata, o, q + 1);
            }
            if (m.tableMetadata != null && $Object.hasOwnProperty.call(m, "tableMetadata")) {
                d.tableMetadata = $root.AICommonDeprecated.AIRichResponseTableMetadata.toObject(m.tableMetadata, o, q + 1);
            }
            if (m.dynamicMetadata != null && $Object.hasOwnProperty.call(m, "dynamicMetadata")) {
                d.dynamicMetadata = $root.AICommonDeprecated.AIRichResponseDynamicMetadata.toObject(m.dynamicMetadata, o, q + 1);
            }
            if (m.latexMetadata != null && $Object.hasOwnProperty.call(m, "latexMetadata")) {
                d.latexMetadata = $root.AICommonDeprecated.AIRichResponseLatexMetadata.toObject(m.latexMetadata, o, q + 1);
            }
            if (m.mapMetadata != null && $Object.hasOwnProperty.call(m, "mapMetadata")) {
                d.mapMetadata = $root.AICommonDeprecated.AIRichResponseMapMetadata.toObject(m.mapMetadata, o, q + 1);
            }
            if (m.contentItemsMetadata != null && $Object.hasOwnProperty.call(m, "contentItemsMetadata")) {
                d.contentItemsMetadata = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.toObject(m.contentItemsMetadata, o, q + 1);
            }
            return d;
        };

        AIRichResponseSubMessage.prototype.toJSON = function() {
            return AIRichResponseSubMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseSubMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseSubMessage";
        };

        return AIRichResponseSubMessage;
    })();

    AICommonDeprecated.AIRichResponseContentItemsMetadata = (function() {

        const AIRichResponseContentItemsMetadata = function (p) {
            this.itemsMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseContentItemsMetadata.prototype.itemsMetadata = $util.emptyArray;
        AIRichResponseContentItemsMetadata.prototype.contentType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseContentItemsMetadata.prototype, "_contentType", {
            get: $util.oneOfGetter($oneOfFields = ["contentType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseContentItemsMetadata.create = function(properties) {
            return new AIRichResponseContentItemsMetadata(properties);
        };

        AIRichResponseContentItemsMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.itemsMetadata != null && m.itemsMetadata.length) {
                for (var i = 0; i < m.itemsMetadata.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.encode(m.itemsMetadata[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.contentType != null && $Object.hasOwnProperty.call(m, "contentType"))
                w.uint32(16).int32(m.contentType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseContentItemsMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata();
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
                        if (!(m.itemsMetadata && m.itemsMetadata.length))
                            m.itemsMetadata = [];
                        m.itemsMetadata.push($root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.contentType = r.int32();
                        m._contentType = "contentType";
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

        AIRichResponseContentItemsMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseContentItemsMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata();
            if (d.itemsMetadata) {
                if (!$Array.isArray(d.itemsMetadata))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata.itemsMetadata: array expected");
                m.itemsMetadata = $Array(d.itemsMetadata.length);
                for (var i = 0; i < d.itemsMetadata.length; ++i) {
                    if (!$util.isObject(d.itemsMetadata[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata.itemsMetadata: object expected");
                    m.itemsMetadata[i] = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.fromObject(d.itemsMetadata[i], q + 1);
                }
            }
            switch (d.contentType) {
            case "DEFAULT":
            case 0:
                m.contentType = 0;
                break;
            case "CAROUSEL":
            case 1:
                m.contentType = 1;
                break;
            default:
                if (typeof d.contentType === "number" && (d.contentType | 0) === d.contentType)
                    m.contentType = d.contentType;
            }
            return m;
        };

        AIRichResponseContentItemsMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.itemsMetadata = [];
            }
            if (m.itemsMetadata && m.itemsMetadata.length) {
                d.itemsMetadata = $Array(m.itemsMetadata.length);
                for (var j = 0; j < m.itemsMetadata.length; ++j) {
                    d.itemsMetadata[j] = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.toObject(m.itemsMetadata[j], o, q + 1);
                }
            }
            if (m.contentType != null && $Object.hasOwnProperty.call(m, "contentType")) {
                d.contentType = o.enums === $String ? $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.ContentType[m.contentType] === $undefined ? m.contentType : $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.ContentType[m.contentType] : m.contentType;
            }
            return d;
        };

        AIRichResponseContentItemsMetadata.prototype.toJSON = function() {
            return AIRichResponseContentItemsMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseContentItemsMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseContentItemsMetadata";
        };

        AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata = (function() {

            const AIRichResponseContentItemMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseContentItemMetadata.prototype.reelItem = null;

            let $oneOfFields;

            $Object.defineProperty(AIRichResponseContentItemMetadata.prototype, "aiRichResponseContentItem", {
                get: $util.oneOfGetter($oneOfFields = ["reelItem"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseContentItemMetadata.create = function(properties) {
                return new AIRichResponseContentItemMetadata(properties);
            };

            AIRichResponseContentItemMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.reelItem != null && $Object.hasOwnProperty.call(m, "reelItem"))
                    $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.encode(m.reelItem, w.uint32(10).fork(), q + 1).ldelim();
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseContentItemMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata();
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
                            m.reelItem = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.decode(r, r.uint32(), $undefined, q + 1, m.reelItem);
                            m.aiRichResponseContentItem = "reelItem";
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

            AIRichResponseContentItemMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata();
                if (d.reelItem != null) {
                    if (!$util.isObject(d.reelItem))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata.reelItem: object expected");
                    m.reelItem = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.fromObject(d.reelItem, q + 1);
                }
                return m;
            };

            AIRichResponseContentItemMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.reelItem != null && $Object.hasOwnProperty.call(m, "reelItem")) {
                    d.reelItem = $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem.toObject(m.reelItem, o, q + 1);
                    if (o.oneofs)
                        d.aiRichResponseContentItem = "reelItem";
                }
                return d;
            };

            AIRichResponseContentItemMetadata.prototype.toJSON = function() {
                return AIRichResponseContentItemMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseContentItemMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseContentItemMetadata";
            };

            return AIRichResponseContentItemMetadata;
        })();

        AIRichResponseContentItemsMetadata.AIRichResponseReelItem = (function() {

            const AIRichResponseReelItem = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseReelItem.prototype.title = null;
            AIRichResponseReelItem.prototype.profileIconUrl = null;
            AIRichResponseReelItem.prototype.thumbnailUrl = null;
            AIRichResponseReelItem.prototype.videoUrl = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseReelItem.prototype, "_title", {
                get: $util.oneOfGetter($oneOfFields = ["title"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseReelItem.prototype, "_profileIconUrl", {
                get: $util.oneOfGetter($oneOfFields = ["profileIconUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseReelItem.prototype, "_thumbnailUrl", {
                get: $util.oneOfGetter($oneOfFields = ["thumbnailUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseReelItem.prototype, "_videoUrl", {
                get: $util.oneOfGetter($oneOfFields = ["videoUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseReelItem.create = function(properties) {
                return new AIRichResponseReelItem(properties);
            };

            AIRichResponseReelItem.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                    w.uint32(10).string(m.title);
                if (m.profileIconUrl != null && $Object.hasOwnProperty.call(m, "profileIconUrl"))
                    w.uint32(18).string(m.profileIconUrl);
                if (m.thumbnailUrl != null && $Object.hasOwnProperty.call(m, "thumbnailUrl"))
                    w.uint32(26).string(m.thumbnailUrl);
                if (m.videoUrl != null && $Object.hasOwnProperty.call(m, "videoUrl"))
                    w.uint32(34).string(m.videoUrl);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseReelItem.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem();
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
                            m.title = r.stringVerify();
                            m._title = "title";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.profileIconUrl = r.stringVerify();
                            m._profileIconUrl = "profileIconUrl";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.thumbnailUrl = r.stringVerify();
                            m._thumbnailUrl = "thumbnailUrl";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.videoUrl = r.stringVerify();
                            m._videoUrl = "videoUrl";
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

            AIRichResponseReelItem.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem();
                if (d.title != null) {
                    m.title = $String(d.title);
                }
                if (d.profileIconUrl != null) {
                    m.profileIconUrl = $String(d.profileIconUrl);
                }
                if (d.thumbnailUrl != null) {
                    m.thumbnailUrl = $String(d.thumbnailUrl);
                }
                if (d.videoUrl != null) {
                    m.videoUrl = $String(d.videoUrl);
                }
                return m;
            };

            AIRichResponseReelItem.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                    d.title = m.title;
                }
                if (m.profileIconUrl != null && $Object.hasOwnProperty.call(m, "profileIconUrl")) {
                    d.profileIconUrl = m.profileIconUrl;
                }
                if (m.thumbnailUrl != null && $Object.hasOwnProperty.call(m, "thumbnailUrl")) {
                    d.thumbnailUrl = m.thumbnailUrl;
                }
                if (m.videoUrl != null && $Object.hasOwnProperty.call(m, "videoUrl")) {
                    d.videoUrl = m.videoUrl;
                }
                return d;
            };

            AIRichResponseReelItem.prototype.toJSON = function() {
                return AIRichResponseReelItem.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseReelItem.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseContentItemsMetadata.AIRichResponseReelItem";
            };

            return AIRichResponseReelItem;
        })();

        AIRichResponseContentItemsMetadata.ContentType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "DEFAULT"] = 0;
            values[valuesById[1] = "CAROUSEL"] = 1;
            return values;
        })();

        return AIRichResponseContentItemsMetadata;
    })();

    AICommonDeprecated.AIRichResponseMapMetadata = (function() {

        const AIRichResponseMapMetadata = function (p) {
            this.annotations = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseMapMetadata.prototype.centerLatitude = null;
        AIRichResponseMapMetadata.prototype.centerLongitude = null;
        AIRichResponseMapMetadata.prototype.latitudeDelta = null;
        AIRichResponseMapMetadata.prototype.longitudeDelta = null;
        AIRichResponseMapMetadata.prototype.annotations = $util.emptyArray;
        AIRichResponseMapMetadata.prototype.showInfoList = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseMapMetadata.prototype, "_centerLatitude", {
            get: $util.oneOfGetter($oneOfFields = ["centerLatitude"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseMapMetadata.prototype, "_centerLongitude", {
            get: $util.oneOfGetter($oneOfFields = ["centerLongitude"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseMapMetadata.prototype, "_latitudeDelta", {
            get: $util.oneOfGetter($oneOfFields = ["latitudeDelta"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseMapMetadata.prototype, "_longitudeDelta", {
            get: $util.oneOfGetter($oneOfFields = ["longitudeDelta"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseMapMetadata.prototype, "_showInfoList", {
            get: $util.oneOfGetter($oneOfFields = ["showInfoList"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseMapMetadata.create = function(properties) {
            return new AIRichResponseMapMetadata(properties);
        };

        AIRichResponseMapMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.centerLatitude != null && $Object.hasOwnProperty.call(m, "centerLatitude"))
                w.uint32(9).double(m.centerLatitude);
            if (m.centerLongitude != null && $Object.hasOwnProperty.call(m, "centerLongitude"))
                w.uint32(17).double(m.centerLongitude);
            if (m.latitudeDelta != null && $Object.hasOwnProperty.call(m, "latitudeDelta"))
                w.uint32(25).double(m.latitudeDelta);
            if (m.longitudeDelta != null && $Object.hasOwnProperty.call(m, "longitudeDelta"))
                w.uint32(33).double(m.longitudeDelta);
            if (m.annotations != null && m.annotations.length) {
                for (var i = 0; i < m.annotations.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.encode(m.annotations[i], w.uint32(42).fork(), q + 1).ldelim();
            }
            if (m.showInfoList != null && $Object.hasOwnProperty.call(m, "showInfoList"))
                w.uint32(48).bool(m.showInfoList);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseMapMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseMapMetadata();
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
                        if (u !== 1)
                            break;
                        m.centerLatitude = r.double();
                        m._centerLatitude = "centerLatitude";
                        continue;
                    }
                case 2: {
                        if (u !== 1)
                            break;
                        m.centerLongitude = r.double();
                        m._centerLongitude = "centerLongitude";
                        continue;
                    }
                case 3: {
                        if (u !== 1)
                            break;
                        m.latitudeDelta = r.double();
                        m._latitudeDelta = "latitudeDelta";
                        continue;
                    }
                case 4: {
                        if (u !== 1)
                            break;
                        m.longitudeDelta = r.double();
                        m._longitudeDelta = "longitudeDelta";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        if (!(m.annotations && m.annotations.length))
                            m.annotations = [];
                        m.annotations.push($root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 6: {
                        if (u !== 0)
                            break;
                        m.showInfoList = r.bool();
                        m._showInfoList = "showInfoList";
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

        AIRichResponseMapMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseMapMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseMapMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseMapMetadata();
            if (d.centerLatitude != null) {
                m.centerLatitude = $Number(d.centerLatitude);
            }
            if (d.centerLongitude != null) {
                m.centerLongitude = $Number(d.centerLongitude);
            }
            if (d.latitudeDelta != null) {
                m.latitudeDelta = $Number(d.latitudeDelta);
            }
            if (d.longitudeDelta != null) {
                m.longitudeDelta = $Number(d.longitudeDelta);
            }
            if (d.annotations) {
                if (!$Array.isArray(d.annotations))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseMapMetadata.annotations: array expected");
                m.annotations = $Array(d.annotations.length);
                for (var i = 0; i < d.annotations.length; ++i) {
                    if (!$util.isObject(d.annotations[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseMapMetadata.annotations: object expected");
                    m.annotations[i] = $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.fromObject(d.annotations[i], q + 1);
                }
            }
            if (d.showInfoList != null) {
                m.showInfoList = $Boolean(d.showInfoList);
            }
            return m;
        };

        AIRichResponseMapMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.annotations = [];
            }
            if (m.centerLatitude != null && $Object.hasOwnProperty.call(m, "centerLatitude")) {
                d.centerLatitude = o.json && !$isFinite(m.centerLatitude) ? $String(m.centerLatitude) : m.centerLatitude;
            }
            if (m.centerLongitude != null && $Object.hasOwnProperty.call(m, "centerLongitude")) {
                d.centerLongitude = o.json && !$isFinite(m.centerLongitude) ? $String(m.centerLongitude) : m.centerLongitude;
            }
            if (m.latitudeDelta != null && $Object.hasOwnProperty.call(m, "latitudeDelta")) {
                d.latitudeDelta = o.json && !$isFinite(m.latitudeDelta) ? $String(m.latitudeDelta) : m.latitudeDelta;
            }
            if (m.longitudeDelta != null && $Object.hasOwnProperty.call(m, "longitudeDelta")) {
                d.longitudeDelta = o.json && !$isFinite(m.longitudeDelta) ? $String(m.longitudeDelta) : m.longitudeDelta;
            }
            if (m.annotations && m.annotations.length) {
                d.annotations = $Array(m.annotations.length);
                for (var j = 0; j < m.annotations.length; ++j) {
                    d.annotations[j] = $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation.toObject(m.annotations[j], o, q + 1);
                }
            }
            if (m.showInfoList != null && $Object.hasOwnProperty.call(m, "showInfoList")) {
                d.showInfoList = m.showInfoList;
            }
            return d;
        };

        AIRichResponseMapMetadata.prototype.toJSON = function() {
            return AIRichResponseMapMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseMapMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseMapMetadata";
        };

        AIRichResponseMapMetadata.AIRichResponseMapAnnotation = (function() {

            const AIRichResponseMapAnnotation = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseMapAnnotation.prototype.annotationNumber = null;
            AIRichResponseMapAnnotation.prototype.latitude = null;
            AIRichResponseMapAnnotation.prototype.longitude = null;
            AIRichResponseMapAnnotation.prototype.title = null;
            AIRichResponseMapAnnotation.prototype.body = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_annotationNumber", {
                get: $util.oneOfGetter($oneOfFields = ["annotationNumber"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_latitude", {
                get: $util.oneOfGetter($oneOfFields = ["latitude"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_longitude", {
                get: $util.oneOfGetter($oneOfFields = ["longitude"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_title", {
                get: $util.oneOfGetter($oneOfFields = ["title"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseMapAnnotation.prototype, "_body", {
                get: $util.oneOfGetter($oneOfFields = ["body"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseMapAnnotation.create = function(properties) {
                return new AIRichResponseMapAnnotation(properties);
            };

            AIRichResponseMapAnnotation.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.annotationNumber != null && $Object.hasOwnProperty.call(m, "annotationNumber"))
                    w.uint32(8).uint32(m.annotationNumber);
                if (m.latitude != null && $Object.hasOwnProperty.call(m, "latitude"))
                    w.uint32(17).double(m.latitude);
                if (m.longitude != null && $Object.hasOwnProperty.call(m, "longitude"))
                    w.uint32(25).double(m.longitude);
                if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                    w.uint32(34).string(m.title);
                if (m.body != null && $Object.hasOwnProperty.call(m, "body"))
                    w.uint32(42).string(m.body);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseMapAnnotation.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation();
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
                            m.annotationNumber = r.uint32();
                            m._annotationNumber = "annotationNumber";
                            continue;
                        }
                    case 2: {
                            if (u !== 1)
                                break;
                            m.latitude = r.double();
                            m._latitude = "latitude";
                            continue;
                        }
                    case 3: {
                            if (u !== 1)
                                break;
                            m.longitude = r.double();
                            m._longitude = "longitude";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.title = r.stringVerify();
                            m._title = "title";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.body = r.stringVerify();
                            m._body = "body";
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

            AIRichResponseMapAnnotation.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation();
                if (d.annotationNumber != null) {
                    m.annotationNumber = d.annotationNumber >>> 0;
                }
                if (d.latitude != null) {
                    m.latitude = $Number(d.latitude);
                }
                if (d.longitude != null) {
                    m.longitude = $Number(d.longitude);
                }
                if (d.title != null) {
                    m.title = $String(d.title);
                }
                if (d.body != null) {
                    m.body = $String(d.body);
                }
                return m;
            };

            AIRichResponseMapAnnotation.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.annotationNumber != null && $Object.hasOwnProperty.call(m, "annotationNumber")) {
                    d.annotationNumber = m.annotationNumber;
                }
                if (m.latitude != null && $Object.hasOwnProperty.call(m, "latitude")) {
                    d.latitude = o.json && !$isFinite(m.latitude) ? $String(m.latitude) : m.latitude;
                }
                if (m.longitude != null && $Object.hasOwnProperty.call(m, "longitude")) {
                    d.longitude = o.json && !$isFinite(m.longitude) ? $String(m.longitude) : m.longitude;
                }
                if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                    d.title = m.title;
                }
                if (m.body != null && $Object.hasOwnProperty.call(m, "body")) {
                    d.body = m.body;
                }
                return d;
            };

            AIRichResponseMapAnnotation.prototype.toJSON = function() {
                return AIRichResponseMapAnnotation.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseMapAnnotation.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseMapMetadata.AIRichResponseMapAnnotation";
            };

            return AIRichResponseMapAnnotation;
        })();

        return AIRichResponseMapMetadata;
    })();

    AICommonDeprecated.AIRichResponseLatexMetadata = (function() {

        const AIRichResponseLatexMetadata = function (p) {
            this.expressions = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseLatexMetadata.prototype.text = null;
        AIRichResponseLatexMetadata.prototype.expressions = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseLatexMetadata.prototype, "_text", {
            get: $util.oneOfGetter($oneOfFields = ["text"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseLatexMetadata.create = function(properties) {
            return new AIRichResponseLatexMetadata(properties);
        };

        AIRichResponseLatexMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.text != null && $Object.hasOwnProperty.call(m, "text"))
                w.uint32(10).string(m.text);
            if (m.expressions != null && m.expressions.length) {
                for (var i = 0; i < m.expressions.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.encode(m.expressions[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseLatexMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseLatexMetadata();
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
                        m.text = r.stringVerify();
                        m._text = "text";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.expressions && m.expressions.length))
                            m.expressions = [];
                        m.expressions.push($root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.decode(r, r.uint32(), $undefined, q + 1));
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

        AIRichResponseLatexMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseLatexMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseLatexMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseLatexMetadata();
            if (d.text != null) {
                m.text = $String(d.text);
            }
            if (d.expressions) {
                if (!$Array.isArray(d.expressions))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseLatexMetadata.expressions: array expected");
                m.expressions = $Array(d.expressions.length);
                for (var i = 0; i < d.expressions.length; ++i) {
                    if (!$util.isObject(d.expressions[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseLatexMetadata.expressions: object expected");
                    m.expressions[i] = $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.fromObject(d.expressions[i], q + 1);
                }
            }
            return m;
        };

        AIRichResponseLatexMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.expressions = [];
            }
            if (m.text != null && $Object.hasOwnProperty.call(m, "text")) {
                d.text = m.text;
            }
            if (m.expressions && m.expressions.length) {
                d.expressions = $Array(m.expressions.length);
                for (var j = 0; j < m.expressions.length; ++j) {
                    d.expressions[j] = $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression.toObject(m.expressions[j], o, q + 1);
                }
            }
            return d;
        };

        AIRichResponseLatexMetadata.prototype.toJSON = function() {
            return AIRichResponseLatexMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseLatexMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseLatexMetadata";
        };

        AIRichResponseLatexMetadata.AIRichResponseLatexExpression = (function() {

            const AIRichResponseLatexExpression = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseLatexExpression.prototype.latexExpression = null;
            AIRichResponseLatexExpression.prototype.url = null;
            AIRichResponseLatexExpression.prototype.width = null;
            AIRichResponseLatexExpression.prototype.height = null;
            AIRichResponseLatexExpression.prototype.fontHeight = null;
            AIRichResponseLatexExpression.prototype.imageTopPadding = null;
            AIRichResponseLatexExpression.prototype.imageLeadingPadding = null;
            AIRichResponseLatexExpression.prototype.imageBottomPadding = null;
            AIRichResponseLatexExpression.prototype.imageTrailingPadding = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_latexExpression", {
                get: $util.oneOfGetter($oneOfFields = ["latexExpression"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_url", {
                get: $util.oneOfGetter($oneOfFields = ["url"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_width", {
                get: $util.oneOfGetter($oneOfFields = ["width"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_height", {
                get: $util.oneOfGetter($oneOfFields = ["height"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_fontHeight", {
                get: $util.oneOfGetter($oneOfFields = ["fontHeight"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageTopPadding", {
                get: $util.oneOfGetter($oneOfFields = ["imageTopPadding"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageLeadingPadding", {
                get: $util.oneOfGetter($oneOfFields = ["imageLeadingPadding"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageBottomPadding", {
                get: $util.oneOfGetter($oneOfFields = ["imageBottomPadding"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseLatexExpression.prototype, "_imageTrailingPadding", {
                get: $util.oneOfGetter($oneOfFields = ["imageTrailingPadding"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseLatexExpression.create = function(properties) {
                return new AIRichResponseLatexExpression(properties);
            };

            AIRichResponseLatexExpression.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.latexExpression != null && $Object.hasOwnProperty.call(m, "latexExpression"))
                    w.uint32(10).string(m.latexExpression);
                if (m.url != null && $Object.hasOwnProperty.call(m, "url"))
                    w.uint32(18).string(m.url);
                if (m.width != null && $Object.hasOwnProperty.call(m, "width"))
                    w.uint32(25).double(m.width);
                if (m.height != null && $Object.hasOwnProperty.call(m, "height"))
                    w.uint32(33).double(m.height);
                if (m.fontHeight != null && $Object.hasOwnProperty.call(m, "fontHeight"))
                    w.uint32(41).double(m.fontHeight);
                if (m.imageTopPadding != null && $Object.hasOwnProperty.call(m, "imageTopPadding"))
                    w.uint32(49).double(m.imageTopPadding);
                if (m.imageLeadingPadding != null && $Object.hasOwnProperty.call(m, "imageLeadingPadding"))
                    w.uint32(57).double(m.imageLeadingPadding);
                if (m.imageBottomPadding != null && $Object.hasOwnProperty.call(m, "imageBottomPadding"))
                    w.uint32(65).double(m.imageBottomPadding);
                if (m.imageTrailingPadding != null && $Object.hasOwnProperty.call(m, "imageTrailingPadding"))
                    w.uint32(73).double(m.imageTrailingPadding);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseLatexExpression.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression();
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
                            m.latexExpression = r.stringVerify();
                            m._latexExpression = "latexExpression";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.url = r.stringVerify();
                            m._url = "url";
                            continue;
                        }
                    case 3: {
                            if (u !== 1)
                                break;
                            m.width = r.double();
                            m._width = "width";
                            continue;
                        }
                    case 4: {
                            if (u !== 1)
                                break;
                            m.height = r.double();
                            m._height = "height";
                            continue;
                        }
                    case 5: {
                            if (u !== 1)
                                break;
                            m.fontHeight = r.double();
                            m._fontHeight = "fontHeight";
                            continue;
                        }
                    case 6: {
                            if (u !== 1)
                                break;
                            m.imageTopPadding = r.double();
                            m._imageTopPadding = "imageTopPadding";
                            continue;
                        }
                    case 7: {
                            if (u !== 1)
                                break;
                            m.imageLeadingPadding = r.double();
                            m._imageLeadingPadding = "imageLeadingPadding";
                            continue;
                        }
                    case 8: {
                            if (u !== 1)
                                break;
                            m.imageBottomPadding = r.double();
                            m._imageBottomPadding = "imageBottomPadding";
                            continue;
                        }
                    case 9: {
                            if (u !== 1)
                                break;
                            m.imageTrailingPadding = r.double();
                            m._imageTrailingPadding = "imageTrailingPadding";
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

            AIRichResponseLatexExpression.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression();
                if (d.latexExpression != null) {
                    m.latexExpression = $String(d.latexExpression);
                }
                if (d.url != null) {
                    m.url = $String(d.url);
                }
                if (d.width != null) {
                    m.width = $Number(d.width);
                }
                if (d.height != null) {
                    m.height = $Number(d.height);
                }
                if (d.fontHeight != null) {
                    m.fontHeight = $Number(d.fontHeight);
                }
                if (d.imageTopPadding != null) {
                    m.imageTopPadding = $Number(d.imageTopPadding);
                }
                if (d.imageLeadingPadding != null) {
                    m.imageLeadingPadding = $Number(d.imageLeadingPadding);
                }
                if (d.imageBottomPadding != null) {
                    m.imageBottomPadding = $Number(d.imageBottomPadding);
                }
                if (d.imageTrailingPadding != null) {
                    m.imageTrailingPadding = $Number(d.imageTrailingPadding);
                }
                return m;
            };

            AIRichResponseLatexExpression.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.latexExpression != null && $Object.hasOwnProperty.call(m, "latexExpression")) {
                    d.latexExpression = m.latexExpression;
                }
                if (m.url != null && $Object.hasOwnProperty.call(m, "url")) {
                    d.url = m.url;
                }
                if (m.width != null && $Object.hasOwnProperty.call(m, "width")) {
                    d.width = o.json && !$isFinite(m.width) ? $String(m.width) : m.width;
                }
                if (m.height != null && $Object.hasOwnProperty.call(m, "height")) {
                    d.height = o.json && !$isFinite(m.height) ? $String(m.height) : m.height;
                }
                if (m.fontHeight != null && $Object.hasOwnProperty.call(m, "fontHeight")) {
                    d.fontHeight = o.json && !$isFinite(m.fontHeight) ? $String(m.fontHeight) : m.fontHeight;
                }
                if (m.imageTopPadding != null && $Object.hasOwnProperty.call(m, "imageTopPadding")) {
                    d.imageTopPadding = o.json && !$isFinite(m.imageTopPadding) ? $String(m.imageTopPadding) : m.imageTopPadding;
                }
                if (m.imageLeadingPadding != null && $Object.hasOwnProperty.call(m, "imageLeadingPadding")) {
                    d.imageLeadingPadding = o.json && !$isFinite(m.imageLeadingPadding) ? $String(m.imageLeadingPadding) : m.imageLeadingPadding;
                }
                if (m.imageBottomPadding != null && $Object.hasOwnProperty.call(m, "imageBottomPadding")) {
                    d.imageBottomPadding = o.json && !$isFinite(m.imageBottomPadding) ? $String(m.imageBottomPadding) : m.imageBottomPadding;
                }
                if (m.imageTrailingPadding != null && $Object.hasOwnProperty.call(m, "imageTrailingPadding")) {
                    d.imageTrailingPadding = o.json && !$isFinite(m.imageTrailingPadding) ? $String(m.imageTrailingPadding) : m.imageTrailingPadding;
                }
                return d;
            };

            AIRichResponseLatexExpression.prototype.toJSON = function() {
                return AIRichResponseLatexExpression.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseLatexExpression.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseLatexMetadata.AIRichResponseLatexExpression";
            };

            return AIRichResponseLatexExpression;
        })();

        return AIRichResponseLatexMetadata;
    })();

    AICommonDeprecated.AIRichResponseDynamicMetadata = (function() {

        const AIRichResponseDynamicMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseDynamicMetadata.prototype.type = null;
        AIRichResponseDynamicMetadata.prototype.version = null;
        AIRichResponseDynamicMetadata.prototype.url = null;
        AIRichResponseDynamicMetadata.prototype.loopCount = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_type", {
            get: $util.oneOfGetter($oneOfFields = ["type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_version", {
            get: $util.oneOfGetter($oneOfFields = ["version"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_url", {
            get: $util.oneOfGetter($oneOfFields = ["url"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseDynamicMetadata.prototype, "_loopCount", {
            get: $util.oneOfGetter($oneOfFields = ["loopCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseDynamicMetadata.create = function(properties) {
            return new AIRichResponseDynamicMetadata(properties);
        };

        AIRichResponseDynamicMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                w.uint32(8).int32(m.type);
            if (m.version != null && $Object.hasOwnProperty.call(m, "version"))
                w.uint32(16).uint64(m.version);
            if (m.url != null && $Object.hasOwnProperty.call(m, "url"))
                w.uint32(26).string(m.url);
            if (m.loopCount != null && $Object.hasOwnProperty.call(m, "loopCount"))
                w.uint32(32).uint32(m.loopCount);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseDynamicMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseDynamicMetadata();
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
                        m.type = r.int32();
                        m._type = "type";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.version = r.uint64();
                        m._version = "version";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.url = r.stringVerify();
                        m._url = "url";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.loopCount = r.uint32();
                        m._loopCount = "loopCount";
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

        AIRichResponseDynamicMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseDynamicMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseDynamicMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseDynamicMetadata();
            switch (d.type) {
            case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN":
            case 0:
                m.type = 0;
                break;
            case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE":
            case 1:
                m.type = 1;
                break;
            case "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF":
            case 2:
                m.type = 2;
                break;
            default:
                if (typeof d.type === "number" && (d.type | 0) === d.type)
                    m.type = d.type;
            }
            if (d.version != null) {
                if ($util.Long)
                    m.version = $util.Long.fromValue(d.version, true);
                else if (typeof d.version === "string")
                    m.version = $parseInt(d.version, 10);
                else if (typeof d.version === "number")
                    m.version = d.version;
                else if (typeof d.version === "object")
                    m.version = new $util.LongBits(d.version.low >>> 0, d.version.high >>> 0).toNumber(true);
            }
            if (d.url != null) {
                m.url = $String(d.url);
            }
            if (d.loopCount != null) {
                m.loopCount = d.loopCount >>> 0;
            }
            return m;
        };

        AIRichResponseDynamicMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                d.type = o.enums === $String ? $root.AICommonDeprecated.AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType[m.type] === $undefined ? m.type : $root.AICommonDeprecated.AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType[m.type] : m.type;
            }
            if (m.version != null && $Object.hasOwnProperty.call(m, "version")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.version = typeof m.version === "number" ? $BigInt(m.version) : $util.Long.fromBits(m.version.low >>> 0, m.version.high >>> 0, true).toBigInt();
                else if (typeof m.version === "number")
                    d.version = o.longs === $String ? $String(m.version) : m.version;
                else
                    d.version = o.longs === $String ? $util.Long.prototype.toString.call(m.version) : o.longs === $Number ? new $util.LongBits(m.version.low >>> 0, m.version.high >>> 0).toNumber(true) : m.version;
            }
            if (m.url != null && $Object.hasOwnProperty.call(m, "url")) {
                d.url = m.url;
            }
            if (m.loopCount != null && $Object.hasOwnProperty.call(m, "loopCount")) {
                d.loopCount = m.loopCount;
            }
            return d;
        };

        AIRichResponseDynamicMetadata.prototype.toJSON = function() {
            return AIRichResponseDynamicMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseDynamicMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseDynamicMetadata";
        };

        AIRichResponseDynamicMetadata.AIRichResponseDynamicMetadataType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_UNKNOWN"] = 0;
            values[valuesById[1] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_IMAGE"] = 1;
            values[valuesById[2] = "AI_RICH_RESPONSE_DYNAMIC_METADATA_TYPE_GIF"] = 2;
            return values;
        })();

        return AIRichResponseDynamicMetadata;
    })();

    AICommonDeprecated.AIRichResponseTableMetadata = (function() {

        const AIRichResponseTableMetadata = function (p) {
            this.rows = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseTableMetadata.prototype.rows = $util.emptyArray;
        AIRichResponseTableMetadata.prototype.title = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseTableMetadata.prototype, "_title", {
            get: $util.oneOfGetter($oneOfFields = ["title"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseTableMetadata.create = function(properties) {
            return new AIRichResponseTableMetadata(properties);
        };

        AIRichResponseTableMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.rows != null && m.rows.length) {
                for (var i = 0; i < m.rows.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.encode(m.rows[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                w.uint32(18).string(m.title);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseTableMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseTableMetadata();
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
                        if (!(m.rows && m.rows.length))
                            m.rows = [];
                        m.rows.push($root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.title = r.stringVerify();
                        m._title = "title";
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

        AIRichResponseTableMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseTableMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseTableMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseTableMetadata();
            if (d.rows) {
                if (!$Array.isArray(d.rows))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseTableMetadata.rows: array expected");
                m.rows = $Array(d.rows.length);
                for (var i = 0; i < d.rows.length; ++i) {
                    if (!$util.isObject(d.rows[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseTableMetadata.rows: object expected");
                    m.rows[i] = $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.fromObject(d.rows[i], q + 1);
                }
            }
            if (d.title != null) {
                m.title = $String(d.title);
            }
            return m;
        };

        AIRichResponseTableMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.rows = [];
            }
            if (m.rows && m.rows.length) {
                d.rows = $Array(m.rows.length);
                for (var j = 0; j < m.rows.length; ++j) {
                    d.rows[j] = $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.toObject(m.rows[j], o, q + 1);
                }
            }
            if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                d.title = m.title;
            }
            return d;
        };

        AIRichResponseTableMetadata.prototype.toJSON = function() {
            return AIRichResponseTableMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseTableMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseTableMetadata";
        };

        AIRichResponseTableMetadata.AIRichResponseTableRow = (function() {

            const AIRichResponseTableRow = function (p) {
                this.items = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseTableRow.prototype.items = $util.emptyArray;
            AIRichResponseTableRow.prototype.isHeading = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseTableRow.prototype, "_isHeading", {
                get: $util.oneOfGetter($oneOfFields = ["isHeading"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseTableRow.create = function(properties) {
                return new AIRichResponseTableRow(properties);
            };

            AIRichResponseTableRow.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.items != null && m.items.length) {
                    for (var i = 0; i < m.items.length; ++i)
                        w.uint32(10).string(m.items[i]);
                }
                if (m.isHeading != null && $Object.hasOwnProperty.call(m, "isHeading"))
                    w.uint32(16).bool(m.isHeading);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseTableRow.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow();
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
                            if (!(m.items && m.items.length))
                                m.items = [];
                            m.items.push(r.stringVerify());
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.isHeading = r.bool();
                            m._isHeading = "isHeading";
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

            AIRichResponseTableRow.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow();
                if (d.items) {
                    if (!$Array.isArray(d.items))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow.items: array expected");
                    m.items = $Array(d.items.length);
                    for (var i = 0; i < d.items.length; ++i) {
                        m.items[i] = $String(d.items[i]);
                    }
                }
                if (d.isHeading != null) {
                    m.isHeading = $Boolean(d.isHeading);
                }
                return m;
            };

            AIRichResponseTableRow.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.items = [];
                }
                if (m.items && m.items.length) {
                    d.items = $Array(m.items.length);
                    for (var j = 0; j < m.items.length; ++j) {
                        d.items[j] = m.items[j];
                    }
                }
                if (m.isHeading != null && $Object.hasOwnProperty.call(m, "isHeading")) {
                    d.isHeading = m.isHeading;
                }
                return d;
            };

            AIRichResponseTableRow.prototype.toJSON = function() {
                return AIRichResponseTableRow.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseTableRow.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseTableMetadata.AIRichResponseTableRow";
            };

            return AIRichResponseTableRow;
        })();

        return AIRichResponseTableMetadata;
    })();

    AICommonDeprecated.AIRichResponseCodeMetadata = (function() {

        const AIRichResponseCodeMetadata = function (p) {
            this.codeBlocks = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseCodeMetadata.prototype.codeLanguage = null;
        AIRichResponseCodeMetadata.prototype.codeBlocks = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseCodeMetadata.prototype, "_codeLanguage", {
            get: $util.oneOfGetter($oneOfFields = ["codeLanguage"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseCodeMetadata.create = function(properties) {
            return new AIRichResponseCodeMetadata(properties);
        };

        AIRichResponseCodeMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.codeLanguage != null && $Object.hasOwnProperty.call(m, "codeLanguage"))
                w.uint32(10).string(m.codeLanguage);
            if (m.codeBlocks != null && m.codeBlocks.length) {
                for (var i = 0; i < m.codeBlocks.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.encode(m.codeBlocks[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseCodeMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseCodeMetadata();
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
                        m.codeLanguage = r.stringVerify();
                        m._codeLanguage = "codeLanguage";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.codeBlocks && m.codeBlocks.length))
                            m.codeBlocks = [];
                        m.codeBlocks.push($root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.decode(r, r.uint32(), $undefined, q + 1));
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

        AIRichResponseCodeMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseCodeMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseCodeMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseCodeMetadata();
            if (d.codeLanguage != null) {
                m.codeLanguage = $String(d.codeLanguage);
            }
            if (d.codeBlocks) {
                if (!$Array.isArray(d.codeBlocks))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseCodeMetadata.codeBlocks: array expected");
                m.codeBlocks = $Array(d.codeBlocks.length);
                for (var i = 0; i < d.codeBlocks.length; ++i) {
                    if (!$util.isObject(d.codeBlocks[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseCodeMetadata.codeBlocks: object expected");
                    m.codeBlocks[i] = $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.fromObject(d.codeBlocks[i], q + 1);
                }
            }
            return m;
        };

        AIRichResponseCodeMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.codeBlocks = [];
            }
            if (m.codeLanguage != null && $Object.hasOwnProperty.call(m, "codeLanguage")) {
                d.codeLanguage = m.codeLanguage;
            }
            if (m.codeBlocks && m.codeBlocks.length) {
                d.codeBlocks = $Array(m.codeBlocks.length);
                for (var j = 0; j < m.codeBlocks.length; ++j) {
                    d.codeBlocks[j] = $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock.toObject(m.codeBlocks[j], o, q + 1);
                }
            }
            return d;
        };

        AIRichResponseCodeMetadata.prototype.toJSON = function() {
            return AIRichResponseCodeMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseCodeMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseCodeMetadata";
        };

        AIRichResponseCodeMetadata.AIRichResponseCodeBlock = (function() {

            const AIRichResponseCodeBlock = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIRichResponseCodeBlock.prototype.highlightType = null;
            AIRichResponseCodeBlock.prototype.codeContent = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseCodeBlock.prototype, "_highlightType", {
                get: $util.oneOfGetter($oneOfFields = ["highlightType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIRichResponseCodeBlock.prototype, "_codeContent", {
                get: $util.oneOfGetter($oneOfFields = ["codeContent"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIRichResponseCodeBlock.create = function(properties) {
                return new AIRichResponseCodeBlock(properties);
            };

            AIRichResponseCodeBlock.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.highlightType != null && $Object.hasOwnProperty.call(m, "highlightType"))
                    w.uint32(8).int32(m.highlightType);
                if (m.codeContent != null && $Object.hasOwnProperty.call(m, "codeContent"))
                    w.uint32(18).string(m.codeContent);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIRichResponseCodeBlock.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock();
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
                            m.highlightType = r.int32();
                            m._highlightType = "highlightType";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.codeContent = r.stringVerify();
                            m._codeContent = "codeContent";
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

            AIRichResponseCodeBlock.fromObject = function (d, q) {
                if (d instanceof $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock();
                switch (d.highlightType) {
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT":
                case 0:
                    m.highlightType = 0;
                    break;
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD":
                case 1:
                    m.highlightType = 1;
                    break;
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD":
                case 2:
                    m.highlightType = 2;
                    break;
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING":
                case 3:
                    m.highlightType = 3;
                    break;
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER":
                case 4:
                    m.highlightType = 4;
                    break;
                case "AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT":
                case 5:
                    m.highlightType = 5;
                    break;
                default:
                    if (typeof d.highlightType === "number" && (d.highlightType | 0) === d.highlightType)
                        m.highlightType = d.highlightType;
                }
                if (d.codeContent != null) {
                    m.codeContent = $String(d.codeContent);
                }
                return m;
            };

            AIRichResponseCodeBlock.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.highlightType != null && $Object.hasOwnProperty.call(m, "highlightType")) {
                    d.highlightType = o.enums === $String ? $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType[m.highlightType] === $undefined ? m.highlightType : $root.AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType[m.highlightType] : m.highlightType;
                }
                if (m.codeContent != null && $Object.hasOwnProperty.call(m, "codeContent")) {
                    d.codeContent = m.codeContent;
                }
                return d;
            };

            AIRichResponseCodeBlock.prototype.toJSON = function() {
                return AIRichResponseCodeBlock.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIRichResponseCodeBlock.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommonDeprecated.AIRichResponseCodeMetadata.AIRichResponseCodeBlock";
            };

            return AIRichResponseCodeBlock;
        })();

        AIRichResponseCodeMetadata.AIRichResponseCodeHighlightType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_DEFAULT"] = 0;
            values[valuesById[1] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_KEYWORD"] = 1;
            values[valuesById[2] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_METHOD"] = 2;
            values[valuesById[3] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_STRING"] = 3;
            values[valuesById[4] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_NUMBER"] = 4;
            values[valuesById[5] = "AI_RICH_RESPONSE_CODE_HIGHLIGHT_COMMENT"] = 5;
            return values;
        })();

        return AIRichResponseCodeMetadata;
    })();

    AICommonDeprecated.AIRichResponseInlineImageMetadata = (function() {

        const AIRichResponseInlineImageMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseInlineImageMetadata.prototype.imageUrl = null;
        AIRichResponseInlineImageMetadata.prototype.imageText = null;
        AIRichResponseInlineImageMetadata.prototype.alignment = null;
        AIRichResponseInlineImageMetadata.prototype.tapLinkUrl = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_imageUrl", {
            get: $util.oneOfGetter($oneOfFields = ["imageUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_imageText", {
            get: $util.oneOfGetter($oneOfFields = ["imageText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_alignment", {
            get: $util.oneOfGetter($oneOfFields = ["alignment"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseInlineImageMetadata.prototype, "_tapLinkUrl", {
            get: $util.oneOfGetter($oneOfFields = ["tapLinkUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseInlineImageMetadata.create = function(properties) {
            return new AIRichResponseInlineImageMetadata(properties);
        };

        AIRichResponseInlineImageMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.imageUrl != null && $Object.hasOwnProperty.call(m, "imageUrl"))
                $root.AICommonDeprecated.AIRichResponseImageURL.encode(m.imageUrl, w.uint32(10).fork(), q + 1).ldelim();
            if (m.imageText != null && $Object.hasOwnProperty.call(m, "imageText"))
                w.uint32(18).string(m.imageText);
            if (m.alignment != null && $Object.hasOwnProperty.call(m, "alignment"))
                w.uint32(24).int32(m.alignment);
            if (m.tapLinkUrl != null && $Object.hasOwnProperty.call(m, "tapLinkUrl"))
                w.uint32(34).string(m.tapLinkUrl);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseInlineImageMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseInlineImageMetadata();
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
                        m.imageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.decode(r, r.uint32(), $undefined, q + 1, m.imageUrl);
                        m._imageUrl = "imageUrl";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.imageText = r.stringVerify();
                        m._imageText = "imageText";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.alignment = r.int32();
                        m._alignment = "alignment";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.tapLinkUrl = r.stringVerify();
                        m._tapLinkUrl = "tapLinkUrl";
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

        AIRichResponseInlineImageMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseInlineImageMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseInlineImageMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseInlineImageMetadata();
            if (d.imageUrl != null) {
                if (!$util.isObject(d.imageUrl))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseInlineImageMetadata.imageUrl: object expected");
                m.imageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.fromObject(d.imageUrl, q + 1);
            }
            if (d.imageText != null) {
                m.imageText = $String(d.imageText);
            }
            switch (d.alignment) {
            case "AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED":
            case 0:
                m.alignment = 0;
                break;
            case "AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED":
            case 1:
                m.alignment = 1;
                break;
            case "AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED":
            case 2:
                m.alignment = 2;
                break;
            default:
                if (typeof d.alignment === "number" && (d.alignment | 0) === d.alignment)
                    m.alignment = d.alignment;
            }
            if (d.tapLinkUrl != null) {
                m.tapLinkUrl = $String(d.tapLinkUrl);
            }
            return m;
        };

        AIRichResponseInlineImageMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.imageUrl != null && $Object.hasOwnProperty.call(m, "imageUrl")) {
                d.imageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.toObject(m.imageUrl, o, q + 1);
            }
            if (m.imageText != null && $Object.hasOwnProperty.call(m, "imageText")) {
                d.imageText = m.imageText;
            }
            if (m.alignment != null && $Object.hasOwnProperty.call(m, "alignment")) {
                d.alignment = o.enums === $String ? $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment[m.alignment] === $undefined ? m.alignment : $root.AICommonDeprecated.AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment[m.alignment] : m.alignment;
            }
            if (m.tapLinkUrl != null && $Object.hasOwnProperty.call(m, "tapLinkUrl")) {
                d.tapLinkUrl = m.tapLinkUrl;
            }
            return d;
        };

        AIRichResponseInlineImageMetadata.prototype.toJSON = function() {
            return AIRichResponseInlineImageMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseInlineImageMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseInlineImageMetadata";
        };

        AIRichResponseInlineImageMetadata.AIRichResponseImageAlignment = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_LEADING_ALIGNED"] = 0;
            values[valuesById[1] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_TRAILING_ALIGNED"] = 1;
            values[valuesById[2] = "AI_RICH_RESPONSE_IMAGE_LAYOUT_CENTER_ALIGNED"] = 2;
            return values;
        })();

        return AIRichResponseInlineImageMetadata;
    })();

    AICommonDeprecated.AIRichResponseGridImageMetadata = (function() {

        const AIRichResponseGridImageMetadata = function (p) {
            this.imageUrls = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseGridImageMetadata.prototype.gridImageUrl = null;
        AIRichResponseGridImageMetadata.prototype.imageUrls = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseGridImageMetadata.prototype, "_gridImageUrl", {
            get: $util.oneOfGetter($oneOfFields = ["gridImageUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseGridImageMetadata.create = function(properties) {
            return new AIRichResponseGridImageMetadata(properties);
        };

        AIRichResponseGridImageMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.gridImageUrl != null && $Object.hasOwnProperty.call(m, "gridImageUrl"))
                $root.AICommonDeprecated.AIRichResponseImageURL.encode(m.gridImageUrl, w.uint32(10).fork(), q + 1).ldelim();
            if (m.imageUrls != null && m.imageUrls.length) {
                for (var i = 0; i < m.imageUrls.length; ++i)
                    $root.AICommonDeprecated.AIRichResponseImageURL.encode(m.imageUrls[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseGridImageMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseGridImageMetadata();
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
                        m.gridImageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.decode(r, r.uint32(), $undefined, q + 1, m.gridImageUrl);
                        m._gridImageUrl = "gridImageUrl";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.imageUrls && m.imageUrls.length))
                            m.imageUrls = [];
                        m.imageUrls.push($root.AICommonDeprecated.AIRichResponseImageURL.decode(r, r.uint32(), $undefined, q + 1));
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

        AIRichResponseGridImageMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseGridImageMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseGridImageMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseGridImageMetadata();
            if (d.gridImageUrl != null) {
                if (!$util.isObject(d.gridImageUrl))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseGridImageMetadata.gridImageUrl: object expected");
                m.gridImageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.fromObject(d.gridImageUrl, q + 1);
            }
            if (d.imageUrls) {
                if (!$Array.isArray(d.imageUrls))
                    throw $TypeError(".AICommonDeprecated.AIRichResponseGridImageMetadata.imageUrls: array expected");
                m.imageUrls = $Array(d.imageUrls.length);
                for (var i = 0; i < d.imageUrls.length; ++i) {
                    if (!$util.isObject(d.imageUrls[i]))
                        throw $TypeError(".AICommonDeprecated.AIRichResponseGridImageMetadata.imageUrls: object expected");
                    m.imageUrls[i] = $root.AICommonDeprecated.AIRichResponseImageURL.fromObject(d.imageUrls[i], q + 1);
                }
            }
            return m;
        };

        AIRichResponseGridImageMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.imageUrls = [];
            }
            if (m.gridImageUrl != null && $Object.hasOwnProperty.call(m, "gridImageUrl")) {
                d.gridImageUrl = $root.AICommonDeprecated.AIRichResponseImageURL.toObject(m.gridImageUrl, o, q + 1);
            }
            if (m.imageUrls && m.imageUrls.length) {
                d.imageUrls = $Array(m.imageUrls.length);
                for (var j = 0; j < m.imageUrls.length; ++j) {
                    d.imageUrls[j] = $root.AICommonDeprecated.AIRichResponseImageURL.toObject(m.imageUrls[j], o, q + 1);
                }
            }
            return d;
        };

        AIRichResponseGridImageMetadata.prototype.toJSON = function() {
            return AIRichResponseGridImageMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseGridImageMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseGridImageMetadata";
        };

        return AIRichResponseGridImageMetadata;
    })();

    AICommonDeprecated.AIRichResponseImageURL = (function() {

        const AIRichResponseImageURL = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseImageURL.prototype.imagePreviewUrl = null;
        AIRichResponseImageURL.prototype.imageHighResUrl = null;
        AIRichResponseImageURL.prototype.sourceUrl = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseImageURL.prototype, "_imagePreviewUrl", {
            get: $util.oneOfGetter($oneOfFields = ["imagePreviewUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseImageURL.prototype, "_imageHighResUrl", {
            get: $util.oneOfGetter($oneOfFields = ["imageHighResUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseImageURL.prototype, "_sourceUrl", {
            get: $util.oneOfGetter($oneOfFields = ["sourceUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseImageURL.create = function(properties) {
            return new AIRichResponseImageURL(properties);
        };

        AIRichResponseImageURL.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.imagePreviewUrl != null && $Object.hasOwnProperty.call(m, "imagePreviewUrl"))
                w.uint32(10).string(m.imagePreviewUrl);
            if (m.imageHighResUrl != null && $Object.hasOwnProperty.call(m, "imageHighResUrl"))
                w.uint32(18).string(m.imageHighResUrl);
            if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl"))
                w.uint32(26).string(m.sourceUrl);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseImageURL.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommonDeprecated.AIRichResponseImageURL();
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
                        m.imagePreviewUrl = r.stringVerify();
                        m._imagePreviewUrl = "imagePreviewUrl";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.imageHighResUrl = r.stringVerify();
                        m._imageHighResUrl = "imageHighResUrl";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.sourceUrl = r.stringVerify();
                        m._sourceUrl = "sourceUrl";
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

        AIRichResponseImageURL.fromObject = function (d, q) {
            if (d instanceof $root.AICommonDeprecated.AIRichResponseImageURL)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommonDeprecated.AIRichResponseImageURL: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommonDeprecated.AIRichResponseImageURL();
            if (d.imagePreviewUrl != null) {
                m.imagePreviewUrl = $String(d.imagePreviewUrl);
            }
            if (d.imageHighResUrl != null) {
                m.imageHighResUrl = $String(d.imageHighResUrl);
            }
            if (d.sourceUrl != null) {
                m.sourceUrl = $String(d.sourceUrl);
            }
            return m;
        };

        AIRichResponseImageURL.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.imagePreviewUrl != null && $Object.hasOwnProperty.call(m, "imagePreviewUrl")) {
                d.imagePreviewUrl = m.imagePreviewUrl;
            }
            if (m.imageHighResUrl != null && $Object.hasOwnProperty.call(m, "imageHighResUrl")) {
                d.imageHighResUrl = m.imageHighResUrl;
            }
            if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl")) {
                d.sourceUrl = m.sourceUrl;
            }
            return d;
        };

        AIRichResponseImageURL.prototype.toJSON = function() {
            return AIRichResponseImageURL.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseImageURL.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommonDeprecated.AIRichResponseImageURL";
        };

        return AIRichResponseImageURL;
    })();

    AICommonDeprecated.AIRichResponseSubMessageType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "AI_RICH_RESPONSE_UNKNOWN"] = 0;
        values[valuesById[1] = "AI_RICH_RESPONSE_GRID_IMAGE"] = 1;
        values[valuesById[2] = "AI_RICH_RESPONSE_TEXT"] = 2;
        values[valuesById[3] = "AI_RICH_RESPONSE_INLINE_IMAGE"] = 3;
        values[valuesById[4] = "AI_RICH_RESPONSE_TABLE"] = 4;
        values[valuesById[5] = "AI_RICH_RESPONSE_CODE"] = 5;
        values[valuesById[6] = "AI_RICH_RESPONSE_DYNAMIC"] = 6;
        values[valuesById[7] = "AI_RICH_RESPONSE_MAP"] = 7;
        values[valuesById[8] = "AI_RICH_RESPONSE_LATEX"] = 8;
        values[valuesById[9] = "AI_RICH_RESPONSE_CONTENT_ITEMS"] = 9;
        return values;
    })();

    AICommonDeprecated.AIRichResponseMessageType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "AI_RICH_RESPONSE_TYPE_UNKNOWN"] = 0;
        values[valuesById[1] = "AI_RICH_RESPONSE_TYPE_STANDARD"] = 1;
        return values;
    })();

    return AICommonDeprecated;
})();

export const AICommon = $root.AICommon = (() => {

    const AICommon = {};

    AICommon.BizAIMetadataSync = (function() {

        const BizAIMetadataSync = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BizAIMetadataSync.prototype.serverEvent = null;

        let $oneOfFields;

        $Object.defineProperty(BizAIMetadataSync.prototype, "operation", {
            get: $util.oneOfGetter($oneOfFields = ["serverEvent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BizAIMetadataSync.create = function(properties) {
            return new BizAIMetadataSync(properties);
        };

        BizAIMetadataSync.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.serverEvent != null && $Object.hasOwnProperty.call(m, "serverEvent"))
                $root.AICommon.BizAIMetadataSync.ServerEvent.encode(m.serverEvent, w.uint32(10).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BizAIMetadataSync.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BizAIMetadataSync();
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
                        m.serverEvent = $root.AICommon.BizAIMetadataSync.ServerEvent.decode(r, r.uint32(), $undefined, q + 1, m.serverEvent);
                        m.operation = "serverEvent";
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

        BizAIMetadataSync.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BizAIMetadataSync)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BizAIMetadataSync: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BizAIMetadataSync();
            if (d.serverEvent != null) {
                if (!$util.isObject(d.serverEvent))
                    throw $TypeError(".AICommon.BizAIMetadataSync.serverEvent: object expected");
                m.serverEvent = $root.AICommon.BizAIMetadataSync.ServerEvent.fromObject(d.serverEvent, q + 1);
            }
            return m;
        };

        BizAIMetadataSync.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.serverEvent != null && $Object.hasOwnProperty.call(m, "serverEvent")) {
                d.serverEvent = $root.AICommon.BizAIMetadataSync.ServerEvent.toObject(m.serverEvent, o, q + 1);
                if (o.oneofs)
                    d.operation = "serverEvent";
            }
            return d;
        };

        BizAIMetadataSync.prototype.toJSON = function() {
            return BizAIMetadataSync.toObject(this, $protobuf.util.toJSONOptions);
        };

        BizAIMetadataSync.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BizAIMetadataSync";
        };

        BizAIMetadataSync.ServerEvent = (function() {

            const ServerEvent = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            ServerEvent.prototype.protocolEvent = null;
            ServerEvent.prototype.agentOnboardingStarted = null;

            let $oneOfFields;

            $Object.defineProperty(ServerEvent.prototype, "event", {
                get: $util.oneOfGetter($oneOfFields = ["protocolEvent", "agentOnboardingStarted"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            ServerEvent.create = function(properties) {
                return new ServerEvent(properties);
            };

            ServerEvent.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.protocolEvent != null && $Object.hasOwnProperty.call(m, "protocolEvent"))
                    w.uint32(8).int32(m.protocolEvent);
                if (m.agentOnboardingStarted != null && $Object.hasOwnProperty.call(m, "agentOnboardingStarted"))
                    $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.encode(m.agentOnboardingStarted, w.uint32(18).fork(), q + 1).ldelim();
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            ServerEvent.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BizAIMetadataSync.ServerEvent();
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
                            m.protocolEvent = r.int32();
                            m.event = "protocolEvent";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.agentOnboardingStarted = $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.decode(r, r.uint32(), $undefined, q + 1, m.agentOnboardingStarted);
                            m.event = "agentOnboardingStarted";
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

            ServerEvent.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BizAIMetadataSync.ServerEvent)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BizAIMetadataSync.ServerEvent: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BizAIMetadataSync.ServerEvent();
                switch (d.protocolEvent) {
                case "UNSPECIFIED":
                case 0:
                    m.protocolEvent = 0;
                    break;
                case "AGENT_CHAT_READY":
                case 1:
                    m.protocolEvent = 1;
                    break;
                default:
                    if (typeof d.protocolEvent === "number" && (d.protocolEvent | 0) === d.protocolEvent)
                        m.protocolEvent = d.protocolEvent;
                }
                if (d.agentOnboardingStarted != null) {
                    if (!$util.isObject(d.agentOnboardingStarted))
                        throw $TypeError(".AICommon.BizAIMetadataSync.ServerEvent.agentOnboardingStarted: object expected");
                    m.agentOnboardingStarted = $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.fromObject(d.agentOnboardingStarted, q + 1);
                }
                return m;
            };

            ServerEvent.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.protocolEvent != null && $Object.hasOwnProperty.call(m, "protocolEvent")) {
                    d.protocolEvent = o.enums === $String ? $root.AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent[m.protocolEvent] === $undefined ? m.protocolEvent : $root.AICommon.BizAIMetadataSync.ServerEvent.ProtocolEvent[m.protocolEvent] : m.protocolEvent;
                    if (o.oneofs)
                        d.event = "protocolEvent";
                }
                if (m.agentOnboardingStarted != null && $Object.hasOwnProperty.call(m, "agentOnboardingStarted")) {
                    d.agentOnboardingStarted = $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted.toObject(m.agentOnboardingStarted, o, q + 1);
                    if (o.oneofs)
                        d.event = "agentOnboardingStarted";
                }
                return d;
            };

            ServerEvent.prototype.toJSON = function() {
                return ServerEvent.toObject(this, $protobuf.util.toJSONOptions);
            };

            ServerEvent.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BizAIMetadataSync.ServerEvent";
            };

            ServerEvent.AgentOnboardingStarted = (function() {

                const AgentOnboardingStarted = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                AgentOnboardingStarted.prototype.composerBlockDurationSecs = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(AgentOnboardingStarted.prototype, "_composerBlockDurationSecs", {
                    get: $util.oneOfGetter($oneOfFields = ["composerBlockDurationSecs"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                AgentOnboardingStarted.create = function(properties) {
                    return new AgentOnboardingStarted(properties);
                };

                AgentOnboardingStarted.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.composerBlockDurationSecs != null && $Object.hasOwnProperty.call(m, "composerBlockDurationSecs"))
                        w.uint32(8).int64(m.composerBlockDurationSecs);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                AgentOnboardingStarted.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted();
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
                                m.composerBlockDurationSecs = r.int64();
                                m._composerBlockDurationSecs = "composerBlockDurationSecs";
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

                AgentOnboardingStarted.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted();
                    if (d.composerBlockDurationSecs != null) {
                        if ($util.Long)
                            m.composerBlockDurationSecs = $util.Long.fromValue(d.composerBlockDurationSecs, false);
                        else if (typeof d.composerBlockDurationSecs === "string")
                            m.composerBlockDurationSecs = $parseInt(d.composerBlockDurationSecs, 10);
                        else if (typeof d.composerBlockDurationSecs === "number")
                            m.composerBlockDurationSecs = d.composerBlockDurationSecs;
                        else if (typeof d.composerBlockDurationSecs === "object")
                            m.composerBlockDurationSecs = new $util.LongBits(d.composerBlockDurationSecs.low >>> 0, d.composerBlockDurationSecs.high >>> 0).toNumber();
                    }
                    return m;
                };

                AgentOnboardingStarted.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.composerBlockDurationSecs != null && $Object.hasOwnProperty.call(m, "composerBlockDurationSecs")) {
                        if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                            d.composerBlockDurationSecs = typeof m.composerBlockDurationSecs === "number" ? $BigInt(m.composerBlockDurationSecs) : $util.Long.fromBits(m.composerBlockDurationSecs.low >>> 0, m.composerBlockDurationSecs.high >>> 0, false).toBigInt();
                        else if (typeof m.composerBlockDurationSecs === "number")
                            d.composerBlockDurationSecs = o.longs === $String ? $String(m.composerBlockDurationSecs) : m.composerBlockDurationSecs;
                        else
                            d.composerBlockDurationSecs = o.longs === $String ? $util.Long.prototype.toString.call(m.composerBlockDurationSecs) : o.longs === $Number ? new $util.LongBits(m.composerBlockDurationSecs.low >>> 0, m.composerBlockDurationSecs.high >>> 0).toNumber() : m.composerBlockDurationSecs;
                    }
                    return d;
                };

                AgentOnboardingStarted.prototype.toJSON = function() {
                    return AgentOnboardingStarted.toObject(this, $protobuf.util.toJSONOptions);
                };

                AgentOnboardingStarted.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BizAIMetadataSync.ServerEvent.AgentOnboardingStarted";
                };

                return AgentOnboardingStarted;
            })();

            ServerEvent.ProtocolEvent = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNSPECIFIED"] = 0;
                values[valuesById[1] = "AGENT_CHAT_READY"] = 1;
                return values;
            })();

            return ServerEvent;
        })();

        return BizAIMetadataSync;
    })();

    AICommon.AIProvenance = (function() {

        const AIProvenance = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIProvenance.prototype.c2PaMetadata = null;
        AIProvenance.prototype.iptcMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIProvenance.prototype, "_c2PaMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["c2PaMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIProvenance.prototype, "_iptcMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["iptcMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIProvenance.create = function(properties) {
            return new AIProvenance(properties);
        };

        AIProvenance.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.c2PaMetadata != null && $Object.hasOwnProperty.call(m, "c2PaMetadata"))
                $root.AICommon.AIProvenance.Metadata.encode(m.c2PaMetadata, w.uint32(10).fork(), q + 1).ldelim();
            if (m.iptcMetadata != null && $Object.hasOwnProperty.call(m, "iptcMetadata"))
                $root.AICommon.AIProvenance.Metadata.encode(m.iptcMetadata, w.uint32(18).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIProvenance.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIProvenance();
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
                        m.c2PaMetadata = $root.AICommon.AIProvenance.Metadata.decode(r, r.uint32(), $undefined, q + 1, m.c2PaMetadata);
                        m._c2PaMetadata = "c2PaMetadata";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.iptcMetadata = $root.AICommon.AIProvenance.Metadata.decode(r, r.uint32(), $undefined, q + 1, m.iptcMetadata);
                        m._iptcMetadata = "iptcMetadata";
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

        AIProvenance.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIProvenance)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIProvenance: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIProvenance();
            if (d.c2PaMetadata != null) {
                if (!$util.isObject(d.c2PaMetadata))
                    throw $TypeError(".AICommon.AIProvenance.c2PaMetadata: object expected");
                m.c2PaMetadata = $root.AICommon.AIProvenance.Metadata.fromObject(d.c2PaMetadata, q + 1);
            }
            if (d.iptcMetadata != null) {
                if (!$util.isObject(d.iptcMetadata))
                    throw $TypeError(".AICommon.AIProvenance.iptcMetadata: object expected");
                m.iptcMetadata = $root.AICommon.AIProvenance.Metadata.fromObject(d.iptcMetadata, q + 1);
            }
            return m;
        };

        AIProvenance.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.c2PaMetadata != null && $Object.hasOwnProperty.call(m, "c2PaMetadata")) {
                d.c2PaMetadata = $root.AICommon.AIProvenance.Metadata.toObject(m.c2PaMetadata, o, q + 1);
            }
            if (m.iptcMetadata != null && $Object.hasOwnProperty.call(m, "iptcMetadata")) {
                d.iptcMetadata = $root.AICommon.AIProvenance.Metadata.toObject(m.iptcMetadata, o, q + 1);
            }
            return d;
        };

        AIProvenance.prototype.toJSON = function() {
            return AIProvenance.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIProvenance.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIProvenance";
        };

        AIProvenance.Metadata = (function() {

            const Metadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            Metadata.prototype.createdWithGenAi = null;
            Metadata.prototype.editedWithGenAi = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(Metadata.prototype, "_createdWithGenAi", {
                get: $util.oneOfGetter($oneOfFields = ["createdWithGenAi"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(Metadata.prototype, "_editedWithGenAi", {
                get: $util.oneOfGetter($oneOfFields = ["editedWithGenAi"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            Metadata.create = function(properties) {
                return new Metadata(properties);
            };

            Metadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.createdWithGenAi != null && $Object.hasOwnProperty.call(m, "createdWithGenAi"))
                    w.uint32(8).bool(m.createdWithGenAi);
                if (m.editedWithGenAi != null && $Object.hasOwnProperty.call(m, "editedWithGenAi"))
                    w.uint32(16).bool(m.editedWithGenAi);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            Metadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.AIProvenance.Metadata();
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
                            m.createdWithGenAi = r.bool();
                            m._createdWithGenAi = "createdWithGenAi";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.editedWithGenAi = r.bool();
                            m._editedWithGenAi = "editedWithGenAi";
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

            Metadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.AIProvenance.Metadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.AIProvenance.Metadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.AIProvenance.Metadata();
                if (d.createdWithGenAi != null) {
                    m.createdWithGenAi = $Boolean(d.createdWithGenAi);
                }
                if (d.editedWithGenAi != null) {
                    m.editedWithGenAi = $Boolean(d.editedWithGenAi);
                }
                return m;
            };

            Metadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.createdWithGenAi != null && $Object.hasOwnProperty.call(m, "createdWithGenAi")) {
                    d.createdWithGenAi = m.createdWithGenAi;
                }
                if (m.editedWithGenAi != null && $Object.hasOwnProperty.call(m, "editedWithGenAi")) {
                    d.editedWithGenAi = m.editedWithGenAi;
                }
                return d;
            };

            Metadata.prototype.toJSON = function() {
                return Metadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            Metadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.AIProvenance.Metadata";
            };

            return Metadata;
        })();

        return AIProvenance;
    })();

    AICommon.BotAgentDeepLinkMetadata = (function() {

        const BotAgentDeepLinkMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotAgentDeepLinkMetadata.prototype.token = null;
        BotAgentDeepLinkMetadata.prototype.clientPublicKey = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgentDeepLinkMetadata.prototype, "_token", {
            get: $util.oneOfGetter($oneOfFields = ["token"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgentDeepLinkMetadata.prototype, "_clientPublicKey", {
            get: $util.oneOfGetter($oneOfFields = ["clientPublicKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotAgentDeepLinkMetadata.create = function(properties) {
            return new BotAgentDeepLinkMetadata(properties);
        };

        BotAgentDeepLinkMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.token != null && $Object.hasOwnProperty.call(m, "token"))
                w.uint32(10).string(m.token);
            if (m.clientPublicKey != null && $Object.hasOwnProperty.call(m, "clientPublicKey"))
                w.uint32(18).bytes(m.clientPublicKey);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotAgentDeepLinkMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotAgentDeepLinkMetadata();
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
                        m.token = r.stringVerify();
                        m._token = "token";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.clientPublicKey = r.bytes();
                        m._clientPublicKey = "clientPublicKey";
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

        BotAgentDeepLinkMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotAgentDeepLinkMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotAgentDeepLinkMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotAgentDeepLinkMetadata();
            if (d.token != null) {
                m.token = $String(d.token);
            }
            if (d.clientPublicKey != null) {
                if (typeof d.clientPublicKey === "string")
                    $util.base64.decode(d.clientPublicKey, m.clientPublicKey = $util.newBuffer($util.base64.length(d.clientPublicKey)), 0);
                else if (d.clientPublicKey.length >= 0)
                    m.clientPublicKey = d.clientPublicKey;
            }
            return m;
        };

        BotAgentDeepLinkMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.token != null && $Object.hasOwnProperty.call(m, "token")) {
                d.token = m.token;
            }
            if (m.clientPublicKey != null && $Object.hasOwnProperty.call(m, "clientPublicKey")) {
                d.clientPublicKey = o.bytes === $String ? $util.base64.encode(m.clientPublicKey, 0, m.clientPublicKey.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.clientPublicKey) : m.clientPublicKey;
            }
            return d;
        };

        BotAgentDeepLinkMetadata.prototype.toJSON = function() {
            return BotAgentDeepLinkMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotAgentDeepLinkMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotAgentDeepLinkMetadata";
        };

        return BotAgentDeepLinkMetadata;
    })();

    AICommon.BotAgentMetadata = (function() {

        const BotAgentMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotAgentMetadata.prototype.deepLinkMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgentMetadata.prototype, "_deepLinkMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["deepLinkMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotAgentMetadata.create = function(properties) {
            return new BotAgentMetadata(properties);
        };

        BotAgentMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.deepLinkMetadata != null && $Object.hasOwnProperty.call(m, "deepLinkMetadata"))
                $root.AICommon.BotAgentDeepLinkMetadata.encode(m.deepLinkMetadata, w.uint32(10).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotAgentMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotAgentMetadata();
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
                        m.deepLinkMetadata = $root.AICommon.BotAgentDeepLinkMetadata.decode(r, r.uint32(), $undefined, q + 1, m.deepLinkMetadata);
                        m._deepLinkMetadata = "deepLinkMetadata";
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

        BotAgentMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotAgentMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotAgentMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotAgentMetadata();
            if (d.deepLinkMetadata != null) {
                if (!$util.isObject(d.deepLinkMetadata))
                    throw $TypeError(".AICommon.BotAgentMetadata.deepLinkMetadata: object expected");
                m.deepLinkMetadata = $root.AICommon.BotAgentDeepLinkMetadata.fromObject(d.deepLinkMetadata, q + 1);
            }
            return m;
        };

        BotAgentMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.deepLinkMetadata != null && $Object.hasOwnProperty.call(m, "deepLinkMetadata")) {
                d.deepLinkMetadata = $root.AICommon.BotAgentDeepLinkMetadata.toObject(m.deepLinkMetadata, o, q + 1);
            }
            return d;
        };

        BotAgentMetadata.prototype.toJSON = function() {
            return BotAgentMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotAgentMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotAgentMetadata";
        };

        return BotAgentMetadata;
    })();

    AICommon.BotInfrastructureDiagnostics = (function() {

        const BotInfrastructureDiagnostics = function (p) {
            this.toolsUsed = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotInfrastructureDiagnostics.prototype.botBackend = null;
        BotInfrastructureDiagnostics.prototype.toolsUsed = $util.emptyArray;
        BotInfrastructureDiagnostics.prototype.isThinking = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotInfrastructureDiagnostics.prototype, "_botBackend", {
            get: $util.oneOfGetter($oneOfFields = ["botBackend"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotInfrastructureDiagnostics.prototype, "_isThinking", {
            get: $util.oneOfGetter($oneOfFields = ["isThinking"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotInfrastructureDiagnostics.create = function(properties) {
            return new BotInfrastructureDiagnostics(properties);
        };

        BotInfrastructureDiagnostics.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botBackend != null && $Object.hasOwnProperty.call(m, "botBackend"))
                w.uint32(8).int32(m.botBackend);
            if (m.toolsUsed != null && m.toolsUsed.length) {
                for (var i = 0; i < m.toolsUsed.length; ++i)
                    w.uint32(18).string(m.toolsUsed[i]);
            }
            if (m.isThinking != null && $Object.hasOwnProperty.call(m, "isThinking"))
                w.uint32(24).bool(m.isThinking);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotInfrastructureDiagnostics.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotInfrastructureDiagnostics();
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
                        m.botBackend = r.int32();
                        m._botBackend = "botBackend";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.toolsUsed && m.toolsUsed.length))
                            m.toolsUsed = [];
                        m.toolsUsed.push(r.stringVerify());
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.isThinking = r.bool();
                        m._isThinking = "isThinking";
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

        BotInfrastructureDiagnostics.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotInfrastructureDiagnostics)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotInfrastructureDiagnostics: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotInfrastructureDiagnostics();
            switch (d.botBackend) {
            case "AAPI":
            case 0:
                m.botBackend = 0;
                break;
            case "CLIPPY":
            case 1:
                m.botBackend = 1;
                break;
            default:
                if (typeof d.botBackend === "number" && (d.botBackend | 0) === d.botBackend)
                    m.botBackend = d.botBackend;
            }
            if (d.toolsUsed) {
                if (!$Array.isArray(d.toolsUsed))
                    throw $TypeError(".AICommon.BotInfrastructureDiagnostics.toolsUsed: array expected");
                m.toolsUsed = $Array(d.toolsUsed.length);
                for (var i = 0; i < d.toolsUsed.length; ++i) {
                    m.toolsUsed[i] = $String(d.toolsUsed[i]);
                }
            }
            if (d.isThinking != null) {
                m.isThinking = $Boolean(d.isThinking);
            }
            return m;
        };

        BotInfrastructureDiagnostics.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.toolsUsed = [];
            }
            if (m.botBackend != null && $Object.hasOwnProperty.call(m, "botBackend")) {
                d.botBackend = o.enums === $String ? $root.AICommon.BotInfrastructureDiagnostics.BotBackend[m.botBackend] === $undefined ? m.botBackend : $root.AICommon.BotInfrastructureDiagnostics.BotBackend[m.botBackend] : m.botBackend;
            }
            if (m.toolsUsed && m.toolsUsed.length) {
                d.toolsUsed = $Array(m.toolsUsed.length);
                for (var j = 0; j < m.toolsUsed.length; ++j) {
                    d.toolsUsed[j] = m.toolsUsed[j];
                }
            }
            if (m.isThinking != null && $Object.hasOwnProperty.call(m, "isThinking")) {
                d.isThinking = m.isThinking;
            }
            return d;
        };

        BotInfrastructureDiagnostics.prototype.toJSON = function() {
            return BotInfrastructureDiagnostics.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotInfrastructureDiagnostics.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotInfrastructureDiagnostics";
        };

        BotInfrastructureDiagnostics.BotBackend = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "AAPI"] = 0;
            values[valuesById[1] = "CLIPPY"] = 1;
            return values;
        })();

        return BotInfrastructureDiagnostics;
    })();

    AICommon.AIHomeState = (function() {

        const AIHomeState = function (p) {
            this.capabilityOptions = [];
            this.conversationOptions = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIHomeState.prototype.lastFetchTime = null;
        AIHomeState.prototype.capabilityOptions = $util.emptyArray;
        AIHomeState.prototype.conversationOptions = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIHomeState.prototype, "_lastFetchTime", {
            get: $util.oneOfGetter($oneOfFields = ["lastFetchTime"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIHomeState.create = function(properties) {
            return new AIHomeState(properties);
        };

        AIHomeState.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.lastFetchTime != null && $Object.hasOwnProperty.call(m, "lastFetchTime"))
                w.uint32(8).int64(m.lastFetchTime);
            if (m.capabilityOptions != null && m.capabilityOptions.length) {
                for (var i = 0; i < m.capabilityOptions.length; ++i)
                    $root.AICommon.AIHomeState.AIHomeOption.encode(m.capabilityOptions[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.conversationOptions != null && m.conversationOptions.length) {
                for (var i = 0; i < m.conversationOptions.length; ++i)
                    $root.AICommon.AIHomeState.AIHomeOption.encode(m.conversationOptions[i], w.uint32(26).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIHomeState.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIHomeState();
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
                        m.lastFetchTime = r.int64();
                        m._lastFetchTime = "lastFetchTime";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.capabilityOptions && m.capabilityOptions.length))
                            m.capabilityOptions = [];
                        m.capabilityOptions.push($root.AICommon.AIHomeState.AIHomeOption.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        if (!(m.conversationOptions && m.conversationOptions.length))
                            m.conversationOptions = [];
                        m.conversationOptions.push($root.AICommon.AIHomeState.AIHomeOption.decode(r, r.uint32(), $undefined, q + 1));
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

        AIHomeState.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIHomeState)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIHomeState: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIHomeState();
            if (d.lastFetchTime != null) {
                if ($util.Long)
                    m.lastFetchTime = $util.Long.fromValue(d.lastFetchTime, false);
                else if (typeof d.lastFetchTime === "string")
                    m.lastFetchTime = $parseInt(d.lastFetchTime, 10);
                else if (typeof d.lastFetchTime === "number")
                    m.lastFetchTime = d.lastFetchTime;
                else if (typeof d.lastFetchTime === "object")
                    m.lastFetchTime = new $util.LongBits(d.lastFetchTime.low >>> 0, d.lastFetchTime.high >>> 0).toNumber();
            }
            if (d.capabilityOptions) {
                if (!$Array.isArray(d.capabilityOptions))
                    throw $TypeError(".AICommon.AIHomeState.capabilityOptions: array expected");
                m.capabilityOptions = $Array(d.capabilityOptions.length);
                for (var i = 0; i < d.capabilityOptions.length; ++i) {
                    if (!$util.isObject(d.capabilityOptions[i]))
                        throw $TypeError(".AICommon.AIHomeState.capabilityOptions: object expected");
                    m.capabilityOptions[i] = $root.AICommon.AIHomeState.AIHomeOption.fromObject(d.capabilityOptions[i], q + 1);
                }
            }
            if (d.conversationOptions) {
                if (!$Array.isArray(d.conversationOptions))
                    throw $TypeError(".AICommon.AIHomeState.conversationOptions: array expected");
                m.conversationOptions = $Array(d.conversationOptions.length);
                for (var i = 0; i < d.conversationOptions.length; ++i) {
                    if (!$util.isObject(d.conversationOptions[i]))
                        throw $TypeError(".AICommon.AIHomeState.conversationOptions: object expected");
                    m.conversationOptions[i] = $root.AICommon.AIHomeState.AIHomeOption.fromObject(d.conversationOptions[i], q + 1);
                }
            }
            return m;
        };

        AIHomeState.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.capabilityOptions = [];
                d.conversationOptions = [];
            }
            if (m.lastFetchTime != null && $Object.hasOwnProperty.call(m, "lastFetchTime")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.lastFetchTime = typeof m.lastFetchTime === "number" ? $BigInt(m.lastFetchTime) : $util.Long.fromBits(m.lastFetchTime.low >>> 0, m.lastFetchTime.high >>> 0, false).toBigInt();
                else if (typeof m.lastFetchTime === "number")
                    d.lastFetchTime = o.longs === $String ? $String(m.lastFetchTime) : m.lastFetchTime;
                else
                    d.lastFetchTime = o.longs === $String ? $util.Long.prototype.toString.call(m.lastFetchTime) : o.longs === $Number ? new $util.LongBits(m.lastFetchTime.low >>> 0, m.lastFetchTime.high >>> 0).toNumber() : m.lastFetchTime;
            }
            if (m.capabilityOptions && m.capabilityOptions.length) {
                d.capabilityOptions = $Array(m.capabilityOptions.length);
                for (var j = 0; j < m.capabilityOptions.length; ++j) {
                    d.capabilityOptions[j] = $root.AICommon.AIHomeState.AIHomeOption.toObject(m.capabilityOptions[j], o, q + 1);
                }
            }
            if (m.conversationOptions && m.conversationOptions.length) {
                d.conversationOptions = $Array(m.conversationOptions.length);
                for (var j = 0; j < m.conversationOptions.length; ++j) {
                    d.conversationOptions[j] = $root.AICommon.AIHomeState.AIHomeOption.toObject(m.conversationOptions[j], o, q + 1);
                }
            }
            return d;
        };

        AIHomeState.prototype.toJSON = function() {
            return AIHomeState.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIHomeState.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIHomeState";
        };

        AIHomeState.AIHomeOption = (function() {

            const AIHomeOption = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIHomeOption.prototype.type = null;
            AIHomeOption.prototype.title = null;
            AIHomeOption.prototype.promptText = null;
            AIHomeOption.prototype.sessionId = null;
            AIHomeOption.prototype.imageWdsIdentifier = null;
            AIHomeOption.prototype.imageTintColor = null;
            AIHomeOption.prototype.imageBackgroundColor = null;
            AIHomeOption.prototype.cardTypeId = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_type", {
                get: $util.oneOfGetter($oneOfFields = ["type"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_title", {
                get: $util.oneOfGetter($oneOfFields = ["title"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_promptText", {
                get: $util.oneOfGetter($oneOfFields = ["promptText"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_sessionId", {
                get: $util.oneOfGetter($oneOfFields = ["sessionId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_imageWdsIdentifier", {
                get: $util.oneOfGetter($oneOfFields = ["imageWdsIdentifier"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_imageTintColor", {
                get: $util.oneOfGetter($oneOfFields = ["imageTintColor"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_imageBackgroundColor", {
                get: $util.oneOfGetter($oneOfFields = ["imageBackgroundColor"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIHomeOption.prototype, "_cardTypeId", {
                get: $util.oneOfGetter($oneOfFields = ["cardTypeId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIHomeOption.create = function(properties) {
                return new AIHomeOption(properties);
            };

            AIHomeOption.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                    w.uint32(8).int32(m.type);
                if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                    w.uint32(18).string(m.title);
                if (m.promptText != null && $Object.hasOwnProperty.call(m, "promptText"))
                    w.uint32(26).string(m.promptText);
                if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId"))
                    w.uint32(34).string(m.sessionId);
                if (m.imageWdsIdentifier != null && $Object.hasOwnProperty.call(m, "imageWdsIdentifier"))
                    w.uint32(42).string(m.imageWdsIdentifier);
                if (m.imageTintColor != null && $Object.hasOwnProperty.call(m, "imageTintColor"))
                    w.uint32(50).string(m.imageTintColor);
                if (m.imageBackgroundColor != null && $Object.hasOwnProperty.call(m, "imageBackgroundColor"))
                    w.uint32(58).string(m.imageBackgroundColor);
                if (m.cardTypeId != null && $Object.hasOwnProperty.call(m, "cardTypeId"))
                    w.uint32(66).string(m.cardTypeId);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIHomeOption.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.AIHomeState.AIHomeOption();
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
                            m.type = r.int32();
                            m._type = "type";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.title = r.stringVerify();
                            m._title = "title";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.promptText = r.stringVerify();
                            m._promptText = "promptText";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.sessionId = r.stringVerify();
                            m._sessionId = "sessionId";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.imageWdsIdentifier = r.stringVerify();
                            m._imageWdsIdentifier = "imageWdsIdentifier";
                            continue;
                        }
                    case 6: {
                            if (u !== 2)
                                break;
                            m.imageTintColor = r.stringVerify();
                            m._imageTintColor = "imageTintColor";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.imageBackgroundColor = r.stringVerify();
                            m._imageBackgroundColor = "imageBackgroundColor";
                            continue;
                        }
                    case 8: {
                            if (u !== 2)
                                break;
                            m.cardTypeId = r.stringVerify();
                            m._cardTypeId = "cardTypeId";
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

            AIHomeOption.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.AIHomeState.AIHomeOption)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.AIHomeState.AIHomeOption: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.AIHomeState.AIHomeOption();
                switch (d.type) {
                case "PROMPT":
                case 0:
                    m.type = 0;
                    break;
                case "CREATE_IMAGE":
                case 1:
                    m.type = 1;
                    break;
                case "ANIMATE_PHOTO":
                case 2:
                    m.type = 2;
                    break;
                case "ANALYZE_FILE":
                case 3:
                    m.type = 3;
                    break;
                case "COLLABORATE":
                case 4:
                    m.type = 4;
                    break;
                case "OPEN_GREETING_CARD":
                case 5:
                    m.type = 5;
                    break;
                default:
                    if (typeof d.type === "number" && (d.type | 0) === d.type)
                        m.type = d.type;
                }
                if (d.title != null) {
                    m.title = $String(d.title);
                }
                if (d.promptText != null) {
                    m.promptText = $String(d.promptText);
                }
                if (d.sessionId != null) {
                    m.sessionId = $String(d.sessionId);
                }
                if (d.imageWdsIdentifier != null) {
                    m.imageWdsIdentifier = $String(d.imageWdsIdentifier);
                }
                if (d.imageTintColor != null) {
                    m.imageTintColor = $String(d.imageTintColor);
                }
                if (d.imageBackgroundColor != null) {
                    m.imageBackgroundColor = $String(d.imageBackgroundColor);
                }
                if (d.cardTypeId != null) {
                    m.cardTypeId = $String(d.cardTypeId);
                }
                return m;
            };

            AIHomeOption.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                    d.type = o.enums === $String ? $root.AICommon.AIHomeState.AIHomeOption.AIHomeActionType[m.type] === $undefined ? m.type : $root.AICommon.AIHomeState.AIHomeOption.AIHomeActionType[m.type] : m.type;
                }
                if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                    d.title = m.title;
                }
                if (m.promptText != null && $Object.hasOwnProperty.call(m, "promptText")) {
                    d.promptText = m.promptText;
                }
                if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId")) {
                    d.sessionId = m.sessionId;
                }
                if (m.imageWdsIdentifier != null && $Object.hasOwnProperty.call(m, "imageWdsIdentifier")) {
                    d.imageWdsIdentifier = m.imageWdsIdentifier;
                }
                if (m.imageTintColor != null && $Object.hasOwnProperty.call(m, "imageTintColor")) {
                    d.imageTintColor = m.imageTintColor;
                }
                if (m.imageBackgroundColor != null && $Object.hasOwnProperty.call(m, "imageBackgroundColor")) {
                    d.imageBackgroundColor = m.imageBackgroundColor;
                }
                if (m.cardTypeId != null && $Object.hasOwnProperty.call(m, "cardTypeId")) {
                    d.cardTypeId = m.cardTypeId;
                }
                return d;
            };

            AIHomeOption.prototype.toJSON = function() {
                return AIHomeOption.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIHomeOption.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.AIHomeState.AIHomeOption";
            };

            AIHomeOption.AIHomeActionType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "PROMPT"] = 0;
                values[valuesById[1] = "CREATE_IMAGE"] = 1;
                values[valuesById[2] = "ANIMATE_PHOTO"] = 2;
                values[valuesById[3] = "ANALYZE_FILE"] = 3;
                values[valuesById[4] = "COLLABORATE"] = 4;
                values[valuesById[5] = "OPEN_GREETING_CARD"] = 5;
                return values;
            })();

            return AIHomeOption;
        })();

        return AIHomeState;
    })();

    AICommon.BotDocumentMessageMetadata = (function() {

        const BotDocumentMessageMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotDocumentMessageMetadata.prototype.pluginType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotDocumentMessageMetadata.prototype, "_pluginType", {
            get: $util.oneOfGetter($oneOfFields = ["pluginType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotDocumentMessageMetadata.create = function(properties) {
            return new BotDocumentMessageMetadata(properties);
        };

        BotDocumentMessageMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType"))
                w.uint32(8).int32(m.pluginType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotDocumentMessageMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotDocumentMessageMetadata();
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
                        m.pluginType = r.int32();
                        m._pluginType = "pluginType";
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

        BotDocumentMessageMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotDocumentMessageMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotDocumentMessageMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotDocumentMessageMetadata();
            switch (d.pluginType) {
            case "TEXT_EXTRACTION":
            case 0:
                m.pluginType = 0;
                break;
            case "OCR_AND_IMAGES":
            case 1:
                m.pluginType = 1;
                break;
            default:
                if (typeof d.pluginType === "number" && (d.pluginType | 0) === d.pluginType)
                    m.pluginType = d.pluginType;
            }
            return m;
        };

        BotDocumentMessageMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType")) {
                d.pluginType = o.enums === $String ? $root.AICommon.BotDocumentMessageMetadata.DocumentPluginType[m.pluginType] === $undefined ? m.pluginType : $root.AICommon.BotDocumentMessageMetadata.DocumentPluginType[m.pluginType] : m.pluginType;
            }
            return d;
        };

        BotDocumentMessageMetadata.prototype.toJSON = function() {
            return BotDocumentMessageMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotDocumentMessageMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotDocumentMessageMetadata";
        };

        BotDocumentMessageMetadata.DocumentPluginType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "TEXT_EXTRACTION"] = 0;
            values[valuesById[1] = "OCR_AND_IMAGES"] = 1;
            return values;
        })();

        return BotDocumentMessageMetadata;
    })();

    AICommon.SessionTransparencyMetadata = (function() {

        const SessionTransparencyMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        SessionTransparencyMetadata.prototype.disclaimerText = null;
        SessionTransparencyMetadata.prototype.hcaId = null;
        SessionTransparencyMetadata.prototype.sessionTransparencyType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SessionTransparencyMetadata.prototype, "_disclaimerText", {
            get: $util.oneOfGetter($oneOfFields = ["disclaimerText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SessionTransparencyMetadata.prototype, "_hcaId", {
            get: $util.oneOfGetter($oneOfFields = ["hcaId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SessionTransparencyMetadata.prototype, "_sessionTransparencyType", {
            get: $util.oneOfGetter($oneOfFields = ["sessionTransparencyType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        SessionTransparencyMetadata.create = function(properties) {
            return new SessionTransparencyMetadata(properties);
        };

        SessionTransparencyMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.disclaimerText != null && $Object.hasOwnProperty.call(m, "disclaimerText"))
                w.uint32(10).string(m.disclaimerText);
            if (m.hcaId != null && $Object.hasOwnProperty.call(m, "hcaId"))
                w.uint32(18).string(m.hcaId);
            if (m.sessionTransparencyType != null && $Object.hasOwnProperty.call(m, "sessionTransparencyType"))
                w.uint32(24).int32(m.sessionTransparencyType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        SessionTransparencyMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.SessionTransparencyMetadata();
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
                        m.disclaimerText = r.stringVerify();
                        m._disclaimerText = "disclaimerText";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.hcaId = r.stringVerify();
                        m._hcaId = "hcaId";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.sessionTransparencyType = r.int32();
                        m._sessionTransparencyType = "sessionTransparencyType";
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

        SessionTransparencyMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.SessionTransparencyMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.SessionTransparencyMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.SessionTransparencyMetadata();
            if (d.disclaimerText != null) {
                m.disclaimerText = $String(d.disclaimerText);
            }
            if (d.hcaId != null) {
                m.hcaId = $String(d.hcaId);
            }
            switch (d.sessionTransparencyType) {
            case "UNKNOWN_TYPE":
            case 0:
                m.sessionTransparencyType = 0;
                break;
            case "NY_AI_SAFETY_DISCLAIMER":
            case 1:
                m.sessionTransparencyType = 1;
                break;
            default:
                if (typeof d.sessionTransparencyType === "number" && (d.sessionTransparencyType | 0) === d.sessionTransparencyType)
                    m.sessionTransparencyType = d.sessionTransparencyType;
            }
            return m;
        };

        SessionTransparencyMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.disclaimerText != null && $Object.hasOwnProperty.call(m, "disclaimerText")) {
                d.disclaimerText = m.disclaimerText;
            }
            if (m.hcaId != null && $Object.hasOwnProperty.call(m, "hcaId")) {
                d.hcaId = m.hcaId;
            }
            if (m.sessionTransparencyType != null && $Object.hasOwnProperty.call(m, "sessionTransparencyType")) {
                d.sessionTransparencyType = o.enums === $String ? $root.AICommon.SessionTransparencyType[m.sessionTransparencyType] === $undefined ? m.sessionTransparencyType : $root.AICommon.SessionTransparencyType[m.sessionTransparencyType] : m.sessionTransparencyType;
            }
            return d;
        };

        SessionTransparencyMetadata.prototype.toJSON = function() {
            return SessionTransparencyMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        SessionTransparencyMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.SessionTransparencyMetadata";
        };

        return SessionTransparencyMetadata;
    })();

    AICommon.AIRegenerateMetadata = (function() {

        const AIRegenerateMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRegenerateMetadata.prototype.messageKey = null;
        AIRegenerateMetadata.prototype.responseTimestampMs = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRegenerateMetadata.prototype, "_messageKey", {
            get: $util.oneOfGetter($oneOfFields = ["messageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRegenerateMetadata.prototype, "_responseTimestampMs", {
            get: $util.oneOfGetter($oneOfFields = ["responseTimestampMs"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRegenerateMetadata.create = function(properties) {
            return new AIRegenerateMetadata(properties);
        };

        AIRegenerateMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.messageKey != null && $Object.hasOwnProperty.call(m, "messageKey"))
                $root.Protocol.MessageKey.encode(m.messageKey, w.uint32(10).fork(), q + 1).ldelim();
            if (m.responseTimestampMs != null && $Object.hasOwnProperty.call(m, "responseTimestampMs"))
                w.uint32(16).int64(m.responseTimestampMs);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRegenerateMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIRegenerateMetadata();
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
                        m.messageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.messageKey);
                        m._messageKey = "messageKey";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.responseTimestampMs = r.int64();
                        m._responseTimestampMs = "responseTimestampMs";
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

        AIRegenerateMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIRegenerateMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIRegenerateMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIRegenerateMetadata();
            if (d.messageKey != null) {
                if (!$util.isObject(d.messageKey))
                    throw $TypeError(".AICommon.AIRegenerateMetadata.messageKey: object expected");
                m.messageKey = $root.Protocol.MessageKey.fromObject(d.messageKey, q + 1);
            }
            if (d.responseTimestampMs != null) {
                if ($util.Long)
                    m.responseTimestampMs = $util.Long.fromValue(d.responseTimestampMs, false);
                else if (typeof d.responseTimestampMs === "string")
                    m.responseTimestampMs = $parseInt(d.responseTimestampMs, 10);
                else if (typeof d.responseTimestampMs === "number")
                    m.responseTimestampMs = d.responseTimestampMs;
                else if (typeof d.responseTimestampMs === "object")
                    m.responseTimestampMs = new $util.LongBits(d.responseTimestampMs.low >>> 0, d.responseTimestampMs.high >>> 0).toNumber();
            }
            return m;
        };

        AIRegenerateMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.messageKey != null && $Object.hasOwnProperty.call(m, "messageKey")) {
                d.messageKey = $root.Protocol.MessageKey.toObject(m.messageKey, o, q + 1);
            }
            if (m.responseTimestampMs != null && $Object.hasOwnProperty.call(m, "responseTimestampMs")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.responseTimestampMs = typeof m.responseTimestampMs === "number" ? $BigInt(m.responseTimestampMs) : $util.Long.fromBits(m.responseTimestampMs.low >>> 0, m.responseTimestampMs.high >>> 0, false).toBigInt();
                else if (typeof m.responseTimestampMs === "number")
                    d.responseTimestampMs = o.longs === $String ? $String(m.responseTimestampMs) : m.responseTimestampMs;
                else
                    d.responseTimestampMs = o.longs === $String ? $util.Long.prototype.toString.call(m.responseTimestampMs) : o.longs === $Number ? new $util.LongBits(m.responseTimestampMs.low >>> 0, m.responseTimestampMs.high >>> 0).toNumber() : m.responseTimestampMs;
            }
            return d;
        };

        AIRegenerateMetadata.prototype.toJSON = function() {
            return AIRegenerateMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRegenerateMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIRegenerateMetadata";
        };

        return AIRegenerateMetadata;
    })();

    AICommon.AIRichResponseUnifiedResponse = (function() {

        const AIRichResponseUnifiedResponse = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIRichResponseUnifiedResponse.prototype.data = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIRichResponseUnifiedResponse.prototype, "_data", {
            get: $util.oneOfGetter($oneOfFields = ["data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIRichResponseUnifiedResponse.create = function(properties) {
            return new AIRichResponseUnifiedResponse(properties);
        };

        AIRichResponseUnifiedResponse.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.data != null && $Object.hasOwnProperty.call(m, "data"))
                w.uint32(10).bytes(m.data);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIRichResponseUnifiedResponse.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIRichResponseUnifiedResponse();
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
                        m.data = r.bytes();
                        m._data = "data";
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

        AIRichResponseUnifiedResponse.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIRichResponseUnifiedResponse)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIRichResponseUnifiedResponse: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIRichResponseUnifiedResponse();
            if (d.data != null) {
                if (typeof d.data === "string")
                    $util.base64.decode(d.data, m.data = $util.newBuffer($util.base64.length(d.data)), 0);
                else if (d.data.length >= 0)
                    m.data = d.data;
            }
            return m;
        };

        AIRichResponseUnifiedResponse.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.data != null && $Object.hasOwnProperty.call(m, "data")) {
                d.data = o.bytes === $String ? $util.base64.encode(m.data, 0, m.data.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.data) : m.data;
            }
            return d;
        };

        AIRichResponseUnifiedResponse.prototype.toJSON = function() {
            return AIRichResponseUnifiedResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIRichResponseUnifiedResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIRichResponseUnifiedResponse";
        };

        return AIRichResponseUnifiedResponse;
    })();

    AICommon.BotMessageSharingInfo = (function() {

        const BotMessageSharingInfo = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMessageSharingInfo.prototype.botEntryPointOrigin = null;
        BotMessageSharingInfo.prototype.forwardScore = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMessageSharingInfo.prototype, "_botEntryPointOrigin", {
            get: $util.oneOfGetter($oneOfFields = ["botEntryPointOrigin"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMessageSharingInfo.prototype, "_forwardScore", {
            get: $util.oneOfGetter($oneOfFields = ["forwardScore"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMessageSharingInfo.create = function(properties) {
            return new BotMessageSharingInfo(properties);
        };

        BotMessageSharingInfo.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botEntryPointOrigin != null && $Object.hasOwnProperty.call(m, "botEntryPointOrigin"))
                w.uint32(8).int32(m.botEntryPointOrigin);
            if (m.forwardScore != null && $Object.hasOwnProperty.call(m, "forwardScore"))
                w.uint32(16).uint32(m.forwardScore);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMessageSharingInfo.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMessageSharingInfo();
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
                        m.botEntryPointOrigin = r.int32();
                        m._botEntryPointOrigin = "botEntryPointOrigin";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.forwardScore = r.uint32();
                        m._forwardScore = "forwardScore";
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

        BotMessageSharingInfo.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMessageSharingInfo)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMessageSharingInfo: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMessageSharingInfo();
            switch (d.botEntryPointOrigin) {
            case "UNDEFINED_ENTRY_POINT":
            case 0:
                m.botEntryPointOrigin = 0;
                break;
            case "FAVICON":
            case 1:
                m.botEntryPointOrigin = 1;
                break;
            case "CHATLIST":
            case 2:
                m.botEntryPointOrigin = 2;
                break;
            case "AISEARCH_NULL_STATE_PAPER_PLANE":
            case 3:
                m.botEntryPointOrigin = 3;
                break;
            case "AISEARCH_NULL_STATE_SUGGESTION":
            case 4:
                m.botEntryPointOrigin = 4;
                break;
            case "AISEARCH_TYPE_AHEAD_SUGGESTION":
            case 5:
                m.botEntryPointOrigin = 5;
                break;
            case "AISEARCH_TYPE_AHEAD_PAPER_PLANE":
            case 6:
                m.botEntryPointOrigin = 6;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST":
            case 7:
                m.botEntryPointOrigin = 7;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES":
            case 8:
                m.botEntryPointOrigin = 8;
                break;
            case "AIVOICE_SEARCH_BAR":
            case 9:
                m.botEntryPointOrigin = 9;
                break;
            case "AIVOICE_FAVICON":
            case 10:
                m.botEntryPointOrigin = 10;
                break;
            case "AISTUDIO":
            case 11:
                m.botEntryPointOrigin = 11;
                break;
            case "DEEPLINK":
            case 12:
                m.botEntryPointOrigin = 12;
                break;
            case "NOTIFICATION":
            case 13:
                m.botEntryPointOrigin = 13;
                break;
            case "PROFILE_MESSAGE_BUTTON":
            case 14:
                m.botEntryPointOrigin = 14;
                break;
            case "FORWARD":
            case 15:
                m.botEntryPointOrigin = 15;
                break;
            case "APP_SHORTCUT":
            case 16:
                m.botEntryPointOrigin = 16;
                break;
            case "FF_FAMILY":
            case 17:
                m.botEntryPointOrigin = 17;
                break;
            case "AI_TAB":
            case 18:
                m.botEntryPointOrigin = 18;
                break;
            case "AI_HOME":
            case 19:
                m.botEntryPointOrigin = 19;
                break;
            case "AI_DEEPLINK_IMMERSIVE":
            case 20:
                m.botEntryPointOrigin = 20;
                break;
            case "AI_DEEPLINK":
            case 21:
                m.botEntryPointOrigin = 21;
                break;
            case "META_AI_CHAT_SHORTCUT_AI_STUDIO":
            case 22:
                m.botEntryPointOrigin = 22;
                break;
            case "UGC_CHAT_SHORTCUT_AI_STUDIO":
            case 23:
                m.botEntryPointOrigin = 23;
                break;
            case "NEW_CHAT_AI_STUDIO":
            case 24:
                m.botEntryPointOrigin = 24;
                break;
            case "AIVOICE_FAVICON_CALL_HISTORY":
            case 25:
                m.botEntryPointOrigin = 25;
                break;
            case "ASK_META_AI_CONTEXT_MENU":
            case 26:
                m.botEntryPointOrigin = 26;
                break;
            case "ASK_META_AI_CONTEXT_MENU_1ON1":
            case 27:
                m.botEntryPointOrigin = 27;
                break;
            case "ASK_META_AI_CONTEXT_MENU_GROUP":
            case 28:
                m.botEntryPointOrigin = 28;
                break;
            case "INVOKE_META_AI_1ON1":
            case 29:
                m.botEntryPointOrigin = 29;
                break;
            case "INVOKE_META_AI_GROUP":
            case 30:
                m.botEntryPointOrigin = 30;
                break;
            case "META_AI_FORWARD":
            case 31:
                m.botEntryPointOrigin = 31;
                break;
            case "NEW_CHAT_AI_CONTACT":
            case 32:
                m.botEntryPointOrigin = 32;
                break;
            case "MESSAGE_QUICK_ACTION_1_ON_1_CHAT":
            case 33:
                m.botEntryPointOrigin = 33;
                break;
            case "MESSAGE_QUICK_ACTION_GROUP_CHAT":
            case 34:
                m.botEntryPointOrigin = 34;
                break;
            case "ATTACHMENT_TRAY_1_ON_1_CHAT":
            case 35:
                m.botEntryPointOrigin = 35;
                break;
            case "ATTACHMENT_TRAY_GROUP_CHAT":
            case 36:
                m.botEntryPointOrigin = 36;
                break;
            case "ASK_META_AI_MEDIA_VIEWER_1ON1":
            case 37:
                m.botEntryPointOrigin = 37;
                break;
            case "ASK_META_AI_MEDIA_VIEWER_GROUP":
            case 38:
                m.botEntryPointOrigin = 38;
                break;
            case "MEDIA_PICKER_1_ON_1_CHAT":
            case 39:
                m.botEntryPointOrigin = 39;
                break;
            case "MEDIA_PICKER_GROUP_CHAT":
            case 40:
                m.botEntryPointOrigin = 40;
                break;
            case "ASK_META_AI_NO_SEARCH_RESULTS":
            case 41:
                m.botEntryPointOrigin = 41;
                break;
            case "META_AI_SETTINGS":
            case 45:
                m.botEntryPointOrigin = 45;
                break;
            case "WEB_INTRO_PANEL":
            case 46:
                m.botEntryPointOrigin = 46;
                break;
            case "WEB_NAVIGATION_BAR":
            case 47:
                m.botEntryPointOrigin = 47;
                break;
            case "GROUP_MEMBER":
            case 54:
                m.botEntryPointOrigin = 54;
                break;
            case "CHATLIST_SEARCH":
            case 55:
                m.botEntryPointOrigin = 55;
                break;
            case "NEW_CHAT_LIST":
            case 56:
                m.botEntryPointOrigin = 56;
                break;
            case "CONTACTS_TAB":
            case 57:
                m.botEntryPointOrigin = 57;
                break;
            case "NEW_3P_AGENT_CREATION":
            case 58:
                m.botEntryPointOrigin = 58;
                break;
            default:
                if (typeof d.botEntryPointOrigin === "number" && (d.botEntryPointOrigin | 0) === d.botEntryPointOrigin)
                    m.botEntryPointOrigin = d.botEntryPointOrigin;
            }
            if (d.forwardScore != null) {
                m.forwardScore = d.forwardScore >>> 0;
            }
            return m;
        };

        BotMessageSharingInfo.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.botEntryPointOrigin != null && $Object.hasOwnProperty.call(m, "botEntryPointOrigin")) {
                d.botEntryPointOrigin = o.enums === $String ? $root.AICommon.BotMetricsEntryPoint[m.botEntryPointOrigin] === $undefined ? m.botEntryPointOrigin : $root.AICommon.BotMetricsEntryPoint[m.botEntryPointOrigin] : m.botEntryPointOrigin;
            }
            if (m.forwardScore != null && $Object.hasOwnProperty.call(m, "forwardScore")) {
                d.forwardScore = m.forwardScore;
            }
            return d;
        };

        BotMessageSharingInfo.prototype.toJSON = function() {
            return BotMessageSharingInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMessageSharingInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMessageSharingInfo";
        };

        return BotMessageSharingInfo;
    })();

    AICommon.ForwardedAIBotMessageInfo = (function() {

        const ForwardedAIBotMessageInfo = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        ForwardedAIBotMessageInfo.prototype.botName = null;
        ForwardedAIBotMessageInfo.prototype.botJid = null;
        ForwardedAIBotMessageInfo.prototype.creatorName = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_botName", {
            get: $util.oneOfGetter($oneOfFields = ["botName"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_botJid", {
            get: $util.oneOfGetter($oneOfFields = ["botJid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(ForwardedAIBotMessageInfo.prototype, "_creatorName", {
            get: $util.oneOfGetter($oneOfFields = ["creatorName"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        ForwardedAIBotMessageInfo.create = function(properties) {
            return new ForwardedAIBotMessageInfo(properties);
        };

        ForwardedAIBotMessageInfo.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botName != null && $Object.hasOwnProperty.call(m, "botName"))
                w.uint32(10).string(m.botName);
            if (m.botJid != null && $Object.hasOwnProperty.call(m, "botJid"))
                w.uint32(18).string(m.botJid);
            if (m.creatorName != null && $Object.hasOwnProperty.call(m, "creatorName"))
                w.uint32(26).string(m.creatorName);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        ForwardedAIBotMessageInfo.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.ForwardedAIBotMessageInfo();
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
                        m.botName = r.stringVerify();
                        m._botName = "botName";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.botJid = r.stringVerify();
                        m._botJid = "botJid";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.creatorName = r.stringVerify();
                        m._creatorName = "creatorName";
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

        ForwardedAIBotMessageInfo.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.ForwardedAIBotMessageInfo)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.ForwardedAIBotMessageInfo: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.ForwardedAIBotMessageInfo();
            if (d.botName != null) {
                m.botName = $String(d.botName);
            }
            if (d.botJid != null) {
                m.botJid = $String(d.botJid);
            }
            if (d.creatorName != null) {
                m.creatorName = $String(d.creatorName);
            }
            return m;
        };

        ForwardedAIBotMessageInfo.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.botName != null && $Object.hasOwnProperty.call(m, "botName")) {
                d.botName = m.botName;
            }
            if (m.botJid != null && $Object.hasOwnProperty.call(m, "botJid")) {
                d.botJid = m.botJid;
            }
            if (m.creatorName != null && $Object.hasOwnProperty.call(m, "creatorName")) {
                d.creatorName = m.creatorName;
            }
            return d;
        };

        ForwardedAIBotMessageInfo.prototype.toJSON = function() {
            return ForwardedAIBotMessageInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        ForwardedAIBotMessageInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.ForwardedAIBotMessageInfo";
        };

        return ForwardedAIBotMessageInfo;
    })();

    AICommon.BotFeedbackMessage = (function() {

        const BotFeedbackMessage = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotFeedbackMessage.prototype.messageKey = null;
        BotFeedbackMessage.prototype.kind = null;
        BotFeedbackMessage.prototype.text = null;
        BotFeedbackMessage.prototype.kindNegative = null;
        BotFeedbackMessage.prototype.kindPositive = null;
        BotFeedbackMessage.prototype.kindReport = null;
        BotFeedbackMessage.prototype.sideBySideSurveyMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_messageKey", {
            get: $util.oneOfGetter($oneOfFields = ["messageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_kind", {
            get: $util.oneOfGetter($oneOfFields = ["kind"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_text", {
            get: $util.oneOfGetter($oneOfFields = ["text"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_kindNegative", {
            get: $util.oneOfGetter($oneOfFields = ["kindNegative"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_kindPositive", {
            get: $util.oneOfGetter($oneOfFields = ["kindPositive"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_kindReport", {
            get: $util.oneOfGetter($oneOfFields = ["kindReport"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotFeedbackMessage.prototype, "_sideBySideSurveyMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sideBySideSurveyMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotFeedbackMessage.create = function(properties) {
            return new BotFeedbackMessage(properties);
        };

        BotFeedbackMessage.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.messageKey != null && $Object.hasOwnProperty.call(m, "messageKey"))
                $root.Protocol.MessageKey.encode(m.messageKey, w.uint32(10).fork(), q + 1).ldelim();
            if (m.kind != null && $Object.hasOwnProperty.call(m, "kind"))
                w.uint32(16).int32(m.kind);
            if (m.text != null && $Object.hasOwnProperty.call(m, "text"))
                w.uint32(26).string(m.text);
            if (m.kindNegative != null && $Object.hasOwnProperty.call(m, "kindNegative"))
                w.uint32(32).uint64(m.kindNegative);
            if (m.kindPositive != null && $Object.hasOwnProperty.call(m, "kindPositive"))
                w.uint32(40).uint64(m.kindPositive);
            if (m.kindReport != null && $Object.hasOwnProperty.call(m, "kindReport"))
                w.uint32(48).int32(m.kindReport);
            if (m.sideBySideSurveyMetadata != null && $Object.hasOwnProperty.call(m, "sideBySideSurveyMetadata"))
                $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.encode(m.sideBySideSurveyMetadata, w.uint32(58).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotFeedbackMessage.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotFeedbackMessage();
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
                        m.messageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.messageKey);
                        m._messageKey = "messageKey";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.kind = r.int32();
                        m._kind = "kind";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.text = r.stringVerify();
                        m._text = "text";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.kindNegative = r.uint64();
                        m._kindNegative = "kindNegative";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.kindPositive = r.uint64();
                        m._kindPositive = "kindPositive";
                        continue;
                    }
                case 6: {
                        if (u !== 0)
                            break;
                        m.kindReport = r.int32();
                        m._kindReport = "kindReport";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.sideBySideSurveyMetadata = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sideBySideSurveyMetadata);
                        m._sideBySideSurveyMetadata = "sideBySideSurveyMetadata";
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

        BotFeedbackMessage.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotFeedbackMessage)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotFeedbackMessage: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotFeedbackMessage();
            if (d.messageKey != null) {
                if (!$util.isObject(d.messageKey))
                    throw $TypeError(".AICommon.BotFeedbackMessage.messageKey: object expected");
                m.messageKey = $root.Protocol.MessageKey.fromObject(d.messageKey, q + 1);
            }
            switch (d.kind) {
            case "BOT_FEEDBACK_POSITIVE":
            case 0:
                m.kind = 0;
                break;
            case "BOT_FEEDBACK_NEGATIVE_GENERIC":
            case 1:
                m.kind = 1;
                break;
            case "BOT_FEEDBACK_NEGATIVE_HELPFUL":
            case 2:
                m.kind = 2;
                break;
            case "BOT_FEEDBACK_NEGATIVE_INTERESTING":
            case 3:
                m.kind = 3;
                break;
            case "BOT_FEEDBACK_NEGATIVE_ACCURATE":
            case 4:
                m.kind = 4;
                break;
            case "BOT_FEEDBACK_NEGATIVE_SAFE":
            case 5:
                m.kind = 5;
                break;
            case "BOT_FEEDBACK_NEGATIVE_OTHER":
            case 6:
                m.kind = 6;
                break;
            case "BOT_FEEDBACK_NEGATIVE_REFUSED":
            case 7:
                m.kind = 7;
                break;
            case "BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING":
            case 8:
                m.kind = 8;
                break;
            case "BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT":
            case 9:
                m.kind = 9;
                break;
            case "BOT_FEEDBACK_NEGATIVE_PERSONALIZED":
            case 10:
                m.kind = 10;
                break;
            case "BOT_FEEDBACK_NEGATIVE_CLARITY":
            case 11:
                m.kind = 11;
                break;
            case "BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON":
            case 12:
                m.kind = 12;
                break;
            case "BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY":
            case 13:
                m.kind = 13;
                break;
            case "BOT_FEEDBACK_NEGATIVE":
            case 14:
                m.kind = 14;
                break;
            default:
                if (typeof d.kind === "number" && (d.kind | 0) === d.kind)
                    m.kind = d.kind;
            }
            if (d.text != null) {
                m.text = $String(d.text);
            }
            if (d.kindNegative != null) {
                if ($util.Long)
                    m.kindNegative = $util.Long.fromValue(d.kindNegative, true);
                else if (typeof d.kindNegative === "string")
                    m.kindNegative = $parseInt(d.kindNegative, 10);
                else if (typeof d.kindNegative === "number")
                    m.kindNegative = d.kindNegative;
                else if (typeof d.kindNegative === "object")
                    m.kindNegative = new $util.LongBits(d.kindNegative.low >>> 0, d.kindNegative.high >>> 0).toNumber(true);
            }
            if (d.kindPositive != null) {
                if ($util.Long)
                    m.kindPositive = $util.Long.fromValue(d.kindPositive, true);
                else if (typeof d.kindPositive === "string")
                    m.kindPositive = $parseInt(d.kindPositive, 10);
                else if (typeof d.kindPositive === "number")
                    m.kindPositive = d.kindPositive;
                else if (typeof d.kindPositive === "object")
                    m.kindPositive = new $util.LongBits(d.kindPositive.low >>> 0, d.kindPositive.high >>> 0).toNumber(true);
            }
            switch (d.kindReport) {
            case "NONE":
            case 0:
                m.kindReport = 0;
                break;
            case "GENERIC":
            case 1:
                m.kindReport = 1;
                break;
            default:
                if (typeof d.kindReport === "number" && (d.kindReport | 0) === d.kindReport)
                    m.kindReport = d.kindReport;
            }
            if (d.sideBySideSurveyMetadata != null) {
                if (!$util.isObject(d.sideBySideSurveyMetadata))
                    throw $TypeError(".AICommon.BotFeedbackMessage.sideBySideSurveyMetadata: object expected");
                m.sideBySideSurveyMetadata = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.fromObject(d.sideBySideSurveyMetadata, q + 1);
            }
            return m;
        };

        BotFeedbackMessage.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.messageKey != null && $Object.hasOwnProperty.call(m, "messageKey")) {
                d.messageKey = $root.Protocol.MessageKey.toObject(m.messageKey, o, q + 1);
            }
            if (m.kind != null && $Object.hasOwnProperty.call(m, "kind")) {
                d.kind = o.enums === $String ? $root.AICommon.BotFeedbackMessage.BotFeedbackKind[m.kind] === $undefined ? m.kind : $root.AICommon.BotFeedbackMessage.BotFeedbackKind[m.kind] : m.kind;
            }
            if (m.text != null && $Object.hasOwnProperty.call(m, "text")) {
                d.text = m.text;
            }
            if (m.kindNegative != null && $Object.hasOwnProperty.call(m, "kindNegative")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.kindNegative = typeof m.kindNegative === "number" ? $BigInt(m.kindNegative) : $util.Long.fromBits(m.kindNegative.low >>> 0, m.kindNegative.high >>> 0, true).toBigInt();
                else if (typeof m.kindNegative === "number")
                    d.kindNegative = o.longs === $String ? $String(m.kindNegative) : m.kindNegative;
                else
                    d.kindNegative = o.longs === $String ? $util.Long.prototype.toString.call(m.kindNegative) : o.longs === $Number ? new $util.LongBits(m.kindNegative.low >>> 0, m.kindNegative.high >>> 0).toNumber(true) : m.kindNegative;
            }
            if (m.kindPositive != null && $Object.hasOwnProperty.call(m, "kindPositive")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.kindPositive = typeof m.kindPositive === "number" ? $BigInt(m.kindPositive) : $util.Long.fromBits(m.kindPositive.low >>> 0, m.kindPositive.high >>> 0, true).toBigInt();
                else if (typeof m.kindPositive === "number")
                    d.kindPositive = o.longs === $String ? $String(m.kindPositive) : m.kindPositive;
                else
                    d.kindPositive = o.longs === $String ? $util.Long.prototype.toString.call(m.kindPositive) : o.longs === $Number ? new $util.LongBits(m.kindPositive.low >>> 0, m.kindPositive.high >>> 0).toNumber(true) : m.kindPositive;
            }
            if (m.kindReport != null && $Object.hasOwnProperty.call(m, "kindReport")) {
                d.kindReport = o.enums === $String ? $root.AICommon.BotFeedbackMessage.ReportKind[m.kindReport] === $undefined ? m.kindReport : $root.AICommon.BotFeedbackMessage.ReportKind[m.kindReport] : m.kindReport;
            }
            if (m.sideBySideSurveyMetadata != null && $Object.hasOwnProperty.call(m, "sideBySideSurveyMetadata")) {
                d.sideBySideSurveyMetadata = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.toObject(m.sideBySideSurveyMetadata, o, q + 1);
            }
            return d;
        };

        BotFeedbackMessage.prototype.toJSON = function() {
            return BotFeedbackMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotFeedbackMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotFeedbackMessage";
        };

        BotFeedbackMessage.BotFeedbackKind = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "BOT_FEEDBACK_POSITIVE"] = 0;
            values[valuesById[1] = "BOT_FEEDBACK_NEGATIVE_GENERIC"] = 1;
            values[valuesById[2] = "BOT_FEEDBACK_NEGATIVE_HELPFUL"] = 2;
            values[valuesById[3] = "BOT_FEEDBACK_NEGATIVE_INTERESTING"] = 3;
            values[valuesById[4] = "BOT_FEEDBACK_NEGATIVE_ACCURATE"] = 4;
            values[valuesById[5] = "BOT_FEEDBACK_NEGATIVE_SAFE"] = 5;
            values[valuesById[6] = "BOT_FEEDBACK_NEGATIVE_OTHER"] = 6;
            values[valuesById[7] = "BOT_FEEDBACK_NEGATIVE_REFUSED"] = 7;
            values[valuesById[8] = "BOT_FEEDBACK_NEGATIVE_NOT_VISUALLY_APPEALING"] = 8;
            values[valuesById[9] = "BOT_FEEDBACK_NEGATIVE_NOT_RELEVANT_TO_TEXT"] = 9;
            values[valuesById[10] = "BOT_FEEDBACK_NEGATIVE_PERSONALIZED"] = 10;
            values[valuesById[11] = "BOT_FEEDBACK_NEGATIVE_CLARITY"] = 11;
            values[valuesById[12] = "BOT_FEEDBACK_NEGATIVE_DOESNT_LOOK_LIKE_THE_PERSON"] = 12;
            values[valuesById[13] = "BOT_FEEDBACK_NEGATIVE_HALLUCINATION_INTERNAL_ONLY"] = 13;
            values[valuesById[14] = "BOT_FEEDBACK_NEGATIVE"] = 14;
            return values;
        })();

        BotFeedbackMessage.BotFeedbackKindMultipleNegative = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_GENERIC"] = 1;
            values[valuesById[2] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_HELPFUL"] = 2;
            values[valuesById[4] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_INTERESTING"] = 4;
            values[valuesById[8] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_ACCURATE"] = 8;
            values[valuesById[16] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_SAFE"] = 16;
            values[valuesById[32] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_OTHER"] = 32;
            values[valuesById[64] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_REFUSED"] = 64;
            values[valuesById[128] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_VISUALLY_APPEALING"] = 128;
            values[valuesById[256] = "BOT_FEEDBACK_MULTIPLE_NEGATIVE_NOT_RELEVANT_TO_TEXT"] = 256;
            return values;
        })();

        BotFeedbackMessage.BotFeedbackKindMultiplePositive = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "BOT_FEEDBACK_MULTIPLE_POSITIVE_GENERIC"] = 1;
            return values;
        })();

        BotFeedbackMessage.ReportKind = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "GENERIC"] = 1;
            return values;
        })();

        BotFeedbackMessage.SideBySideSurveyMetadata = (function() {

            const SideBySideSurveyMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            SideBySideSurveyMetadata.prototype.selectedRequestId = null;
            SideBySideSurveyMetadata.prototype.surveyId = null;
            SideBySideSurveyMetadata.prototype.simonSessionFbid = null;
            SideBySideSurveyMetadata.prototype.responseOtid = null;
            SideBySideSurveyMetadata.prototype.responseTimestampMsString = null;
            SideBySideSurveyMetadata.prototype.isSelectedResponsePrimary = null;
            SideBySideSurveyMetadata.prototype.messageIdToEdit = null;
            SideBySideSurveyMetadata.prototype.analyticsData = null;
            SideBySideSurveyMetadata.prototype.metaAiAnalyticsData = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_selectedRequestId", {
                get: $util.oneOfGetter($oneOfFields = ["selectedRequestId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_surveyId", {
                get: $util.oneOfGetter($oneOfFields = ["surveyId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_simonSessionFbid", {
                get: $util.oneOfGetter($oneOfFields = ["simonSessionFbid"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_responseOtid", {
                get: $util.oneOfGetter($oneOfFields = ["responseOtid"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_responseTimestampMsString", {
                get: $util.oneOfGetter($oneOfFields = ["responseTimestampMsString"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_isSelectedResponsePrimary", {
                get: $util.oneOfGetter($oneOfFields = ["isSelectedResponsePrimary"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_messageIdToEdit", {
                get: $util.oneOfGetter($oneOfFields = ["messageIdToEdit"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_analyticsData", {
                get: $util.oneOfGetter($oneOfFields = ["analyticsData"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideSurveyMetadata.prototype, "_metaAiAnalyticsData", {
                get: $util.oneOfGetter($oneOfFields = ["metaAiAnalyticsData"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            SideBySideSurveyMetadata.create = function(properties) {
                return new SideBySideSurveyMetadata(properties);
            };

            SideBySideSurveyMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.selectedRequestId != null && $Object.hasOwnProperty.call(m, "selectedRequestId"))
                    w.uint32(10).string(m.selectedRequestId);
                if (m.surveyId != null && $Object.hasOwnProperty.call(m, "surveyId"))
                    w.uint32(16).uint32(m.surveyId);
                if (m.simonSessionFbid != null && $Object.hasOwnProperty.call(m, "simonSessionFbid"))
                    w.uint32(26).string(m.simonSessionFbid);
                if (m.responseOtid != null && $Object.hasOwnProperty.call(m, "responseOtid"))
                    w.uint32(34).string(m.responseOtid);
                if (m.responseTimestampMsString != null && $Object.hasOwnProperty.call(m, "responseTimestampMsString"))
                    w.uint32(42).string(m.responseTimestampMsString);
                if (m.isSelectedResponsePrimary != null && $Object.hasOwnProperty.call(m, "isSelectedResponsePrimary"))
                    w.uint32(48).bool(m.isSelectedResponsePrimary);
                if (m.messageIdToEdit != null && $Object.hasOwnProperty.call(m, "messageIdToEdit"))
                    w.uint32(58).string(m.messageIdToEdit);
                if (m.analyticsData != null && $Object.hasOwnProperty.call(m, "analyticsData"))
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.encode(m.analyticsData, w.uint32(66).fork(), q + 1).ldelim();
                if (m.metaAiAnalyticsData != null && $Object.hasOwnProperty.call(m, "metaAiAnalyticsData"))
                    $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.encode(m.metaAiAnalyticsData, w.uint32(74).fork(), q + 1).ldelim();
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            SideBySideSurveyMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata();
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
                            m.selectedRequestId = r.stringVerify();
                            m._selectedRequestId = "selectedRequestId";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.surveyId = r.uint32();
                            m._surveyId = "surveyId";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.simonSessionFbid = r.stringVerify();
                            m._simonSessionFbid = "simonSessionFbid";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.responseOtid = r.stringVerify();
                            m._responseOtid = "responseOtid";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.responseTimestampMsString = r.stringVerify();
                            m._responseTimestampMsString = "responseTimestampMsString";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.isSelectedResponsePrimary = r.bool();
                            m._isSelectedResponsePrimary = "isSelectedResponsePrimary";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.messageIdToEdit = r.stringVerify();
                            m._messageIdToEdit = "messageIdToEdit";
                            continue;
                        }
                    case 8: {
                            if (u !== 2)
                                break;
                            m.analyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.decode(r, r.uint32(), $undefined, q + 1, m.analyticsData);
                            m._analyticsData = "analyticsData";
                            continue;
                        }
                    case 9: {
                            if (u !== 2)
                                break;
                            m.metaAiAnalyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.decode(r, r.uint32(), $undefined, q + 1, m.metaAiAnalyticsData);
                            m._metaAiAnalyticsData = "metaAiAnalyticsData";
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

            SideBySideSurveyMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata();
                if (d.selectedRequestId != null) {
                    m.selectedRequestId = $String(d.selectedRequestId);
                }
                if (d.surveyId != null) {
                    m.surveyId = d.surveyId >>> 0;
                }
                if (d.simonSessionFbid != null) {
                    m.simonSessionFbid = $String(d.simonSessionFbid);
                }
                if (d.responseOtid != null) {
                    m.responseOtid = $String(d.responseOtid);
                }
                if (d.responseTimestampMsString != null) {
                    m.responseTimestampMsString = $String(d.responseTimestampMsString);
                }
                if (d.isSelectedResponsePrimary != null) {
                    m.isSelectedResponsePrimary = $Boolean(d.isSelectedResponsePrimary);
                }
                if (d.messageIdToEdit != null) {
                    m.messageIdToEdit = $String(d.messageIdToEdit);
                }
                if (d.analyticsData != null) {
                    if (!$util.isObject(d.analyticsData))
                        throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.analyticsData: object expected");
                    m.analyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.fromObject(d.analyticsData, q + 1);
                }
                if (d.metaAiAnalyticsData != null) {
                    if (!$util.isObject(d.metaAiAnalyticsData))
                        throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.metaAiAnalyticsData: object expected");
                    m.metaAiAnalyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.fromObject(d.metaAiAnalyticsData, q + 1);
                }
                return m;
            };

            SideBySideSurveyMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.selectedRequestId != null && $Object.hasOwnProperty.call(m, "selectedRequestId")) {
                    d.selectedRequestId = m.selectedRequestId;
                }
                if (m.surveyId != null && $Object.hasOwnProperty.call(m, "surveyId")) {
                    d.surveyId = m.surveyId;
                }
                if (m.simonSessionFbid != null && $Object.hasOwnProperty.call(m, "simonSessionFbid")) {
                    d.simonSessionFbid = m.simonSessionFbid;
                }
                if (m.responseOtid != null && $Object.hasOwnProperty.call(m, "responseOtid")) {
                    d.responseOtid = m.responseOtid;
                }
                if (m.responseTimestampMsString != null && $Object.hasOwnProperty.call(m, "responseTimestampMsString")) {
                    d.responseTimestampMsString = m.responseTimestampMsString;
                }
                if (m.isSelectedResponsePrimary != null && $Object.hasOwnProperty.call(m, "isSelectedResponsePrimary")) {
                    d.isSelectedResponsePrimary = m.isSelectedResponsePrimary;
                }
                if (m.messageIdToEdit != null && $Object.hasOwnProperty.call(m, "messageIdToEdit")) {
                    d.messageIdToEdit = m.messageIdToEdit;
                }
                if (m.analyticsData != null && $Object.hasOwnProperty.call(m, "analyticsData")) {
                    d.analyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData.toObject(m.analyticsData, o, q + 1);
                }
                if (m.metaAiAnalyticsData != null && $Object.hasOwnProperty.call(m, "metaAiAnalyticsData")) {
                    d.metaAiAnalyticsData = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.toObject(m.metaAiAnalyticsData, o, q + 1);
                }
                return d;
            };

            SideBySideSurveyMetadata.prototype.toJSON = function() {
                return SideBySideSurveyMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            SideBySideSurveyMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata";
            };

            SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData = (function() {

                const SideBySideSurveyAnalyticsData = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                SideBySideSurveyAnalyticsData.prototype.tessaEvent = null;
                SideBySideSurveyAnalyticsData.prototype.tessaSessionFbid = null;
                SideBySideSurveyAnalyticsData.prototype.simonSessionFbid = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SideBySideSurveyAnalyticsData.prototype, "_tessaEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["tessaEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SideBySideSurveyAnalyticsData.prototype, "_tessaSessionFbid", {
                    get: $util.oneOfGetter($oneOfFields = ["tessaSessionFbid"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SideBySideSurveyAnalyticsData.prototype, "_simonSessionFbid", {
                    get: $util.oneOfGetter($oneOfFields = ["simonSessionFbid"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                SideBySideSurveyAnalyticsData.create = function(properties) {
                    return new SideBySideSurveyAnalyticsData(properties);
                };

                SideBySideSurveyAnalyticsData.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent"))
                        w.uint32(10).string(m.tessaEvent);
                    if (m.tessaSessionFbid != null && $Object.hasOwnProperty.call(m, "tessaSessionFbid"))
                        w.uint32(18).string(m.tessaSessionFbid);
                    if (m.simonSessionFbid != null && $Object.hasOwnProperty.call(m, "simonSessionFbid"))
                        w.uint32(26).string(m.simonSessionFbid);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                SideBySideSurveyAnalyticsData.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData();
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
                                m.tessaEvent = r.stringVerify();
                                m._tessaEvent = "tessaEvent";
                                continue;
                            }
                        case 2: {
                                if (u !== 2)
                                    break;
                                m.tessaSessionFbid = r.stringVerify();
                                m._tessaSessionFbid = "tessaSessionFbid";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.simonSessionFbid = r.stringVerify();
                                m._simonSessionFbid = "simonSessionFbid";
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

                SideBySideSurveyAnalyticsData.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData();
                    if (d.tessaEvent != null) {
                        m.tessaEvent = $String(d.tessaEvent);
                    }
                    if (d.tessaSessionFbid != null) {
                        m.tessaSessionFbid = $String(d.tessaSessionFbid);
                    }
                    if (d.simonSessionFbid != null) {
                        m.simonSessionFbid = $String(d.simonSessionFbid);
                    }
                    return m;
                };

                SideBySideSurveyAnalyticsData.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent")) {
                        d.tessaEvent = m.tessaEvent;
                    }
                    if (m.tessaSessionFbid != null && $Object.hasOwnProperty.call(m, "tessaSessionFbid")) {
                        d.tessaSessionFbid = m.tessaSessionFbid;
                    }
                    if (m.simonSessionFbid != null && $Object.hasOwnProperty.call(m, "simonSessionFbid")) {
                        d.simonSessionFbid = m.simonSessionFbid;
                    }
                    return d;
                };

                SideBySideSurveyAnalyticsData.prototype.toJSON = function() {
                    return SideBySideSurveyAnalyticsData.toObject(this, $protobuf.util.toJSONOptions);
                };

                SideBySideSurveyAnalyticsData.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SideBySideSurveyAnalyticsData";
                };

                return SideBySideSurveyAnalyticsData;
            })();

            SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData = (function() {

                const SidebySideSurveyMetaAiAnalyticsData = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                SidebySideSurveyMetaAiAnalyticsData.prototype.surveyId = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.primaryResponseId = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.testArmName = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.timestampMsString = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.ctaImpressionEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.ctaClickEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.cardImpressionEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.responseEvent = null;
                SidebySideSurveyMetaAiAnalyticsData.prototype.abandonEvent = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_surveyId", {
                    get: $util.oneOfGetter($oneOfFields = ["surveyId"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_primaryResponseId", {
                    get: $util.oneOfGetter($oneOfFields = ["primaryResponseId"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_testArmName", {
                    get: $util.oneOfGetter($oneOfFields = ["testArmName"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_timestampMsString", {
                    get: $util.oneOfGetter($oneOfFields = ["timestampMsString"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_ctaImpressionEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["ctaImpressionEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_ctaClickEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["ctaClickEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_cardImpressionEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["cardImpressionEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_responseEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["responseEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(SidebySideSurveyMetaAiAnalyticsData.prototype, "_abandonEvent", {
                    get: $util.oneOfGetter($oneOfFields = ["abandonEvent"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                SidebySideSurveyMetaAiAnalyticsData.create = function(properties) {
                    return new SidebySideSurveyMetaAiAnalyticsData(properties);
                };

                SidebySideSurveyMetaAiAnalyticsData.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.surveyId != null && $Object.hasOwnProperty.call(m, "surveyId"))
                        w.uint32(8).uint32(m.surveyId);
                    if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId"))
                        w.uint32(18).string(m.primaryResponseId);
                    if (m.testArmName != null && $Object.hasOwnProperty.call(m, "testArmName"))
                        w.uint32(26).string(m.testArmName);
                    if (m.timestampMsString != null && $Object.hasOwnProperty.call(m, "timestampMsString"))
                        w.uint32(34).string(m.timestampMsString);
                    if (m.ctaImpressionEvent != null && $Object.hasOwnProperty.call(m, "ctaImpressionEvent"))
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.encode(m.ctaImpressionEvent, w.uint32(42).fork(), q + 1).ldelim();
                    if (m.ctaClickEvent != null && $Object.hasOwnProperty.call(m, "ctaClickEvent"))
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.encode(m.ctaClickEvent, w.uint32(50).fork(), q + 1).ldelim();
                    if (m.cardImpressionEvent != null && $Object.hasOwnProperty.call(m, "cardImpressionEvent"))
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.encode(m.cardImpressionEvent, w.uint32(58).fork(), q + 1).ldelim();
                    if (m.responseEvent != null && $Object.hasOwnProperty.call(m, "responseEvent"))
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.encode(m.responseEvent, w.uint32(66).fork(), q + 1).ldelim();
                    if (m.abandonEvent != null && $Object.hasOwnProperty.call(m, "abandonEvent"))
                        $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.encode(m.abandonEvent, w.uint32(74).fork(), q + 1).ldelim();
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                SidebySideSurveyMetaAiAnalyticsData.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData();
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
                                m.surveyId = r.uint32();
                                m._surveyId = "surveyId";
                                continue;
                            }
                        case 2: {
                                if (u !== 2)
                                    break;
                                m.primaryResponseId = r.stringVerify();
                                m._primaryResponseId = "primaryResponseId";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.testArmName = r.stringVerify();
                                m._testArmName = "testArmName";
                                continue;
                            }
                        case 4: {
                                if (u !== 2)
                                    break;
                                m.timestampMsString = r.stringVerify();
                                m._timestampMsString = "timestampMsString";
                                continue;
                            }
                        case 5: {
                                if (u !== 2)
                                    break;
                                m.ctaImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.decode(r, r.uint32(), $undefined, q + 1, m.ctaImpressionEvent);
                                m._ctaImpressionEvent = "ctaImpressionEvent";
                                continue;
                            }
                        case 6: {
                                if (u !== 2)
                                    break;
                                m.ctaClickEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.decode(r, r.uint32(), $undefined, q + 1, m.ctaClickEvent);
                                m._ctaClickEvent = "ctaClickEvent";
                                continue;
                            }
                        case 7: {
                                if (u !== 2)
                                    break;
                                m.cardImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.decode(r, r.uint32(), $undefined, q + 1, m.cardImpressionEvent);
                                m._cardImpressionEvent = "cardImpressionEvent";
                                continue;
                            }
                        case 8: {
                                if (u !== 2)
                                    break;
                                m.responseEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.decode(r, r.uint32(), $undefined, q + 1, m.responseEvent);
                                m._responseEvent = "responseEvent";
                                continue;
                            }
                        case 9: {
                                if (u !== 2)
                                    break;
                                m.abandonEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.decode(r, r.uint32(), $undefined, q + 1, m.abandonEvent);
                                m._abandonEvent = "abandonEvent";
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

                SidebySideSurveyMetaAiAnalyticsData.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData();
                    if (d.surveyId != null) {
                        m.surveyId = d.surveyId >>> 0;
                    }
                    if (d.primaryResponseId != null) {
                        m.primaryResponseId = $String(d.primaryResponseId);
                    }
                    if (d.testArmName != null) {
                        m.testArmName = $String(d.testArmName);
                    }
                    if (d.timestampMsString != null) {
                        m.timestampMsString = $String(d.timestampMsString);
                    }
                    if (d.ctaImpressionEvent != null) {
                        if (!$util.isObject(d.ctaImpressionEvent))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ctaImpressionEvent: object expected");
                        m.ctaImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.fromObject(d.ctaImpressionEvent, q + 1);
                    }
                    if (d.ctaClickEvent != null) {
                        if (!$util.isObject(d.ctaClickEvent))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.ctaClickEvent: object expected");
                        m.ctaClickEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.fromObject(d.ctaClickEvent, q + 1);
                    }
                    if (d.cardImpressionEvent != null) {
                        if (!$util.isObject(d.cardImpressionEvent))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.cardImpressionEvent: object expected");
                        m.cardImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.fromObject(d.cardImpressionEvent, q + 1);
                    }
                    if (d.responseEvent != null) {
                        if (!$util.isObject(d.responseEvent))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.responseEvent: object expected");
                        m.responseEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.fromObject(d.responseEvent, q + 1);
                    }
                    if (d.abandonEvent != null) {
                        if (!$util.isObject(d.abandonEvent))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.abandonEvent: object expected");
                        m.abandonEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.fromObject(d.abandonEvent, q + 1);
                    }
                    return m;
                };

                SidebySideSurveyMetaAiAnalyticsData.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.surveyId != null && $Object.hasOwnProperty.call(m, "surveyId")) {
                        d.surveyId = m.surveyId;
                    }
                    if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId")) {
                        d.primaryResponseId = m.primaryResponseId;
                    }
                    if (m.testArmName != null && $Object.hasOwnProperty.call(m, "testArmName")) {
                        d.testArmName = m.testArmName;
                    }
                    if (m.timestampMsString != null && $Object.hasOwnProperty.call(m, "timestampMsString")) {
                        d.timestampMsString = m.timestampMsString;
                    }
                    if (m.ctaImpressionEvent != null && $Object.hasOwnProperty.call(m, "ctaImpressionEvent")) {
                        d.ctaImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData.toObject(m.ctaImpressionEvent, o, q + 1);
                    }
                    if (m.ctaClickEvent != null && $Object.hasOwnProperty.call(m, "ctaClickEvent")) {
                        d.ctaClickEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData.toObject(m.ctaClickEvent, o, q + 1);
                    }
                    if (m.cardImpressionEvent != null && $Object.hasOwnProperty.call(m, "cardImpressionEvent")) {
                        d.cardImpressionEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData.toObject(m.cardImpressionEvent, o, q + 1);
                    }
                    if (m.responseEvent != null && $Object.hasOwnProperty.call(m, "responseEvent")) {
                        d.responseEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData.toObject(m.responseEvent, o, q + 1);
                    }
                    if (m.abandonEvent != null && $Object.hasOwnProperty.call(m, "abandonEvent")) {
                        d.abandonEvent = $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData.toObject(m.abandonEvent, o, q + 1);
                    }
                    return d;
                };

                SidebySideSurveyMetaAiAnalyticsData.prototype.toJSON = function() {
                    return SidebySideSurveyMetaAiAnalyticsData.toObject(this, $protobuf.util.toJSONOptions);
                };

                SidebySideSurveyMetaAiAnalyticsData.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData";
                };

                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData = (function() {

                    const SideBySideSurveyAbandonEventData = function (p) {
                        if (p)
                            for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null && ks[i] !== "__proto__")
                                    this[ks[i]] = p[ks[i]];
                    };

                    SideBySideSurveyAbandonEventData.prototype.abandonDwellTimeMsString = null;

                    let $oneOfFields;

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyAbandonEventData.prototype, "_abandonDwellTimeMsString", {
                        get: $util.oneOfGetter($oneOfFields = ["abandonDwellTimeMsString"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    SideBySideSurveyAbandonEventData.create = function(properties) {
                        return new SideBySideSurveyAbandonEventData(properties);
                    };

                    SideBySideSurveyAbandonEventData.encode = function (m, w, q) {
                        if (!w)
                            w = $Writer.create();
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (m.abandonDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "abandonDwellTimeMsString"))
                            w.uint32(10).string(m.abandonDwellTimeMsString);
                        if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                            for (var i = 0; i < m.$unknowns.length; ++i)
                                w.raw(m.$unknowns[i]);
                        return w;
                    };

                    SideBySideSurveyAbandonEventData.decode = function (r, l, z, q, g) {
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
                        m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData();
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
                                    m.abandonDwellTimeMsString = r.stringVerify();
                                    m._abandonDwellTimeMsString = "abandonDwellTimeMsString";
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

                    SideBySideSurveyAbandonEventData.fromObject = function (d, q) {
                        if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData)
                            return d;
                        if (!$util.isObject(d))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData: object expected");
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData();
                        if (d.abandonDwellTimeMsString != null) {
                            m.abandonDwellTimeMsString = $String(d.abandonDwellTimeMsString);
                        }
                        return m;
                    };

                    SideBySideSurveyAbandonEventData.toObject = function (m, o, q) {
                        if (!o)
                            o = {};
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var d = {};
                        if (m.abandonDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "abandonDwellTimeMsString")) {
                            d.abandonDwellTimeMsString = m.abandonDwellTimeMsString;
                        }
                        return d;
                    };

                    SideBySideSurveyAbandonEventData.prototype.toJSON = function() {
                        return SideBySideSurveyAbandonEventData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    SideBySideSurveyAbandonEventData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyAbandonEventData";
                    };

                    return SideBySideSurveyAbandonEventData;
                })();

                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData = (function() {

                    const SideBySideSurveyCTAClickEventData = function (p) {
                        if (p)
                            for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null && ks[i] !== "__proto__")
                                    this[ks[i]] = p[ks[i]];
                    };

                    SideBySideSurveyCTAClickEventData.prototype.isSurveyExpired = null;
                    SideBySideSurveyCTAClickEventData.prototype.clickDwellTimeMsString = null;

                    let $oneOfFields;

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyCTAClickEventData.prototype, "_isSurveyExpired", {
                        get: $util.oneOfGetter($oneOfFields = ["isSurveyExpired"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyCTAClickEventData.prototype, "_clickDwellTimeMsString", {
                        get: $util.oneOfGetter($oneOfFields = ["clickDwellTimeMsString"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    SideBySideSurveyCTAClickEventData.create = function(properties) {
                        return new SideBySideSurveyCTAClickEventData(properties);
                    };

                    SideBySideSurveyCTAClickEventData.encode = function (m, w, q) {
                        if (!w)
                            w = $Writer.create();
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (m.isSurveyExpired != null && $Object.hasOwnProperty.call(m, "isSurveyExpired"))
                            w.uint32(8).bool(m.isSurveyExpired);
                        if (m.clickDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "clickDwellTimeMsString"))
                            w.uint32(18).string(m.clickDwellTimeMsString);
                        if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                            for (var i = 0; i < m.$unknowns.length; ++i)
                                w.raw(m.$unknowns[i]);
                        return w;
                    };

                    SideBySideSurveyCTAClickEventData.decode = function (r, l, z, q, g) {
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
                        m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData();
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
                                    m.isSurveyExpired = r.bool();
                                    m._isSurveyExpired = "isSurveyExpired";
                                    continue;
                                }
                            case 2: {
                                    if (u !== 2)
                                        break;
                                    m.clickDwellTimeMsString = r.stringVerify();
                                    m._clickDwellTimeMsString = "clickDwellTimeMsString";
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

                    SideBySideSurveyCTAClickEventData.fromObject = function (d, q) {
                        if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData)
                            return d;
                        if (!$util.isObject(d))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData: object expected");
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData();
                        if (d.isSurveyExpired != null) {
                            m.isSurveyExpired = $Boolean(d.isSurveyExpired);
                        }
                        if (d.clickDwellTimeMsString != null) {
                            m.clickDwellTimeMsString = $String(d.clickDwellTimeMsString);
                        }
                        return m;
                    };

                    SideBySideSurveyCTAClickEventData.toObject = function (m, o, q) {
                        if (!o)
                            o = {};
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var d = {};
                        if (m.isSurveyExpired != null && $Object.hasOwnProperty.call(m, "isSurveyExpired")) {
                            d.isSurveyExpired = m.isSurveyExpired;
                        }
                        if (m.clickDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "clickDwellTimeMsString")) {
                            d.clickDwellTimeMsString = m.clickDwellTimeMsString;
                        }
                        return d;
                    };

                    SideBySideSurveyCTAClickEventData.prototype.toJSON = function() {
                        return SideBySideSurveyCTAClickEventData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    SideBySideSurveyCTAClickEventData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAClickEventData";
                    };

                    return SideBySideSurveyCTAClickEventData;
                })();

                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData = (function() {

                    const SideBySideSurveyCTAImpressionEventData = function (p) {
                        if (p)
                            for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null && ks[i] !== "__proto__")
                                    this[ks[i]] = p[ks[i]];
                    };

                    SideBySideSurveyCTAImpressionEventData.prototype.isSurveyExpired = null;

                    let $oneOfFields;

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyCTAImpressionEventData.prototype, "_isSurveyExpired", {
                        get: $util.oneOfGetter($oneOfFields = ["isSurveyExpired"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    SideBySideSurveyCTAImpressionEventData.create = function(properties) {
                        return new SideBySideSurveyCTAImpressionEventData(properties);
                    };

                    SideBySideSurveyCTAImpressionEventData.encode = function (m, w, q) {
                        if (!w)
                            w = $Writer.create();
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (m.isSurveyExpired != null && $Object.hasOwnProperty.call(m, "isSurveyExpired"))
                            w.uint32(8).bool(m.isSurveyExpired);
                        if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                            for (var i = 0; i < m.$unknowns.length; ++i)
                                w.raw(m.$unknowns[i]);
                        return w;
                    };

                    SideBySideSurveyCTAImpressionEventData.decode = function (r, l, z, q, g) {
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
                        m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData();
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
                                    m.isSurveyExpired = r.bool();
                                    m._isSurveyExpired = "isSurveyExpired";
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

                    SideBySideSurveyCTAImpressionEventData.fromObject = function (d, q) {
                        if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData)
                            return d;
                        if (!$util.isObject(d))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData: object expected");
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData();
                        if (d.isSurveyExpired != null) {
                            m.isSurveyExpired = $Boolean(d.isSurveyExpired);
                        }
                        return m;
                    };

                    SideBySideSurveyCTAImpressionEventData.toObject = function (m, o, q) {
                        if (!o)
                            o = {};
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var d = {};
                        if (m.isSurveyExpired != null && $Object.hasOwnProperty.call(m, "isSurveyExpired")) {
                            d.isSurveyExpired = m.isSurveyExpired;
                        }
                        return d;
                    };

                    SideBySideSurveyCTAImpressionEventData.prototype.toJSON = function() {
                        return SideBySideSurveyCTAImpressionEventData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    SideBySideSurveyCTAImpressionEventData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCTAImpressionEventData";
                    };

                    return SideBySideSurveyCTAImpressionEventData;
                })();

                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData = (function() {

                    const SideBySideSurveyCardImpressionEventData = function (p) {
                        if (p)
                            for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null && ks[i] !== "__proto__")
                                    this[ks[i]] = p[ks[i]];
                    };

                    SideBySideSurveyCardImpressionEventData.create = function(properties) {
                        return new SideBySideSurveyCardImpressionEventData(properties);
                    };

                    SideBySideSurveyCardImpressionEventData.encode = function (m, w, q) {
                        if (!w)
                            w = $Writer.create();
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                            for (var i = 0; i < m.$unknowns.length; ++i)
                                w.raw(m.$unknowns[i]);
                        return w;
                    };

                    SideBySideSurveyCardImpressionEventData.decode = function (r, l, z, q, g) {
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
                        m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData();
                        while (r.pos < c) {
                            var s = r.pos;
                            var t = r.tag();
                            if (t === z) {
                                z = $undefined;
                                break;
                            }
                            r.skipType(t & 7, q, t);
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

                    SideBySideSurveyCardImpressionEventData.fromObject = function (d, q) {
                        if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData)
                            return d;
                        if (!$util.isObject(d))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData: object expected");
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        return new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData();
                    };

                    SideBySideSurveyCardImpressionEventData.toObject = function () {
                        return {};
                    };

                    SideBySideSurveyCardImpressionEventData.prototype.toJSON = function() {
                        return SideBySideSurveyCardImpressionEventData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    SideBySideSurveyCardImpressionEventData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyCardImpressionEventData";
                    };

                    return SideBySideSurveyCardImpressionEventData;
                })();

                SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData = (function() {

                    const SideBySideSurveyResponseEventData = function (p) {
                        if (p)
                            for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null && ks[i] !== "__proto__")
                                    this[ks[i]] = p[ks[i]];
                    };

                    SideBySideSurveyResponseEventData.prototype.responseDwellTimeMsString = null;
                    SideBySideSurveyResponseEventData.prototype.selectedResponseId = null;

                    let $oneOfFields;

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyResponseEventData.prototype, "_responseDwellTimeMsString", {
                        get: $util.oneOfGetter($oneOfFields = ["responseDwellTimeMsString"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    // Virtual OneOf for proto3 optional field
                    $Object.defineProperty(SideBySideSurveyResponseEventData.prototype, "_selectedResponseId", {
                        get: $util.oneOfGetter($oneOfFields = ["selectedResponseId"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    SideBySideSurveyResponseEventData.create = function(properties) {
                        return new SideBySideSurveyResponseEventData(properties);
                    };

                    SideBySideSurveyResponseEventData.encode = function (m, w, q) {
                        if (!w)
                            w = $Writer.create();
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (m.responseDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "responseDwellTimeMsString"))
                            w.uint32(10).string(m.responseDwellTimeMsString);
                        if (m.selectedResponseId != null && $Object.hasOwnProperty.call(m, "selectedResponseId"))
                            w.uint32(18).string(m.selectedResponseId);
                        if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                            for (var i = 0; i < m.$unknowns.length; ++i)
                                w.raw(m.$unknowns[i]);
                        return w;
                    };

                    SideBySideSurveyResponseEventData.decode = function (r, l, z, q, g) {
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
                        m = g || new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData();
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
                                    m.responseDwellTimeMsString = r.stringVerify();
                                    m._responseDwellTimeMsString = "responseDwellTimeMsString";
                                    continue;
                                }
                            case 2: {
                                    if (u !== 2)
                                        break;
                                    m.selectedResponseId = r.stringVerify();
                                    m._selectedResponseId = "selectedResponseId";
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

                    SideBySideSurveyResponseEventData.fromObject = function (d, q) {
                        if (d instanceof $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData)
                            return d;
                        if (!$util.isObject(d))
                            throw $TypeError(".AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData: object expected");
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var m = new $root.AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData();
                        if (d.responseDwellTimeMsString != null) {
                            m.responseDwellTimeMsString = $String(d.responseDwellTimeMsString);
                        }
                        if (d.selectedResponseId != null) {
                            m.selectedResponseId = $String(d.selectedResponseId);
                        }
                        return m;
                    };

                    SideBySideSurveyResponseEventData.toObject = function (m, o, q) {
                        if (!o)
                            o = {};
                        if (q === $undefined)
                            q = 0;
                        if (q > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var d = {};
                        if (m.responseDwellTimeMsString != null && $Object.hasOwnProperty.call(m, "responseDwellTimeMsString")) {
                            d.responseDwellTimeMsString = m.responseDwellTimeMsString;
                        }
                        if (m.selectedResponseId != null && $Object.hasOwnProperty.call(m, "selectedResponseId")) {
                            d.selectedResponseId = m.selectedResponseId;
                        }
                        return d;
                    };

                    SideBySideSurveyResponseEventData.prototype.toJSON = function() {
                        return SideBySideSurveyResponseEventData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    SideBySideSurveyResponseEventData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/AICommon.BotFeedbackMessage.SideBySideSurveyMetadata.SidebySideSurveyMetaAiAnalyticsData.SideBySideSurveyResponseEventData";
                    };

                    return SideBySideSurveyResponseEventData;
                })();

                return SidebySideSurveyMetaAiAnalyticsData;
            })();

            return SideBySideSurveyMetadata;
        })();

        return BotFeedbackMessage;
    })();

    AICommon.BotGroupParticipantMetadata = (function() {

        const BotGroupParticipantMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotGroupParticipantMetadata.prototype.botFbid = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotGroupParticipantMetadata.prototype, "_botFbid", {
            get: $util.oneOfGetter($oneOfFields = ["botFbid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotGroupParticipantMetadata.create = function(properties) {
            return new BotGroupParticipantMetadata(properties);
        };

        BotGroupParticipantMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botFbid != null && $Object.hasOwnProperty.call(m, "botFbid"))
                w.uint32(10).string(m.botFbid);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotGroupParticipantMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotGroupParticipantMetadata();
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
                        m.botFbid = r.stringVerify();
                        m._botFbid = "botFbid";
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

        BotGroupParticipantMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotGroupParticipantMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotGroupParticipantMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotGroupParticipantMetadata();
            if (d.botFbid != null) {
                m.botFbid = $String(d.botFbid);
            }
            return m;
        };

        BotGroupParticipantMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.botFbid != null && $Object.hasOwnProperty.call(m, "botFbid")) {
                d.botFbid = m.botFbid;
            }
            return d;
        };

        BotGroupParticipantMetadata.prototype.toJSON = function() {
            return BotGroupParticipantMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotGroupParticipantMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotGroupParticipantMetadata";
        };

        return BotGroupParticipantMetadata;
    })();

    AICommon.BotRenderingConfigMetadata = (function() {

        const BotRenderingConfigMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotRenderingConfigMetadata.prototype.bloksVersioningId = null;
        BotRenderingConfigMetadata.prototype.pixelDensity = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotRenderingConfigMetadata.prototype, "_bloksVersioningId", {
            get: $util.oneOfGetter($oneOfFields = ["bloksVersioningId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotRenderingConfigMetadata.prototype, "_pixelDensity", {
            get: $util.oneOfGetter($oneOfFields = ["pixelDensity"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotRenderingConfigMetadata.create = function(properties) {
            return new BotRenderingConfigMetadata(properties);
        };

        BotRenderingConfigMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.bloksVersioningId != null && $Object.hasOwnProperty.call(m, "bloksVersioningId"))
                w.uint32(10).string(m.bloksVersioningId);
            if (m.pixelDensity != null && $Object.hasOwnProperty.call(m, "pixelDensity"))
                w.uint32(17).double(m.pixelDensity);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotRenderingConfigMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotRenderingConfigMetadata();
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
                        m.bloksVersioningId = r.stringVerify();
                        m._bloksVersioningId = "bloksVersioningId";
                        continue;
                    }
                case 2: {
                        if (u !== 1)
                            break;
                        m.pixelDensity = r.double();
                        m._pixelDensity = "pixelDensity";
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

        BotRenderingConfigMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotRenderingConfigMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotRenderingConfigMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotRenderingConfigMetadata();
            if (d.bloksVersioningId != null) {
                m.bloksVersioningId = $String(d.bloksVersioningId);
            }
            if (d.pixelDensity != null) {
                m.pixelDensity = $Number(d.pixelDensity);
            }
            return m;
        };

        BotRenderingConfigMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.bloksVersioningId != null && $Object.hasOwnProperty.call(m, "bloksVersioningId")) {
                d.bloksVersioningId = m.bloksVersioningId;
            }
            if (m.pixelDensity != null && $Object.hasOwnProperty.call(m, "pixelDensity")) {
                d.pixelDensity = o.json && !$isFinite(m.pixelDensity) ? $String(m.pixelDensity) : m.pixelDensity;
            }
            return d;
        };

        BotRenderingConfigMetadata.prototype.toJSON = function() {
            return BotRenderingConfigMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotRenderingConfigMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotRenderingConfigMetadata";
        };

        return BotRenderingConfigMetadata;
    })();

    AICommon.BotHistoryShareMetadata = (function() {

        const BotHistoryShareMetadata = function (p) {
            this.participantsMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotHistoryShareMetadata.prototype.participantsMetadata = $util.emptyArray;

        BotHistoryShareMetadata.create = function(properties) {
            return new BotHistoryShareMetadata(properties);
        };

        BotHistoryShareMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.participantsMetadata != null && m.participantsMetadata.length) {
                for (var i = 0; i < m.participantsMetadata.length; ++i)
                    $root.AICommon.BotGroupParticipantMetadata.encode(m.participantsMetadata[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotHistoryShareMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotHistoryShareMetadata();
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
                        if (!(m.participantsMetadata && m.participantsMetadata.length))
                            m.participantsMetadata = [];
                        m.participantsMetadata.push($root.AICommon.BotGroupParticipantMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

        BotHistoryShareMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotHistoryShareMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotHistoryShareMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotHistoryShareMetadata();
            if (d.participantsMetadata) {
                if (!$Array.isArray(d.participantsMetadata))
                    throw $TypeError(".AICommon.BotHistoryShareMetadata.participantsMetadata: array expected");
                m.participantsMetadata = $Array(d.participantsMetadata.length);
                for (var i = 0; i < d.participantsMetadata.length; ++i) {
                    if (!$util.isObject(d.participantsMetadata[i]))
                        throw $TypeError(".AICommon.BotHistoryShareMetadata.participantsMetadata: object expected");
                    m.participantsMetadata[i] = $root.AICommon.BotGroupParticipantMetadata.fromObject(d.participantsMetadata[i], q + 1);
                }
            }
            return m;
        };

        BotHistoryShareMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.participantsMetadata = [];
            }
            if (m.participantsMetadata && m.participantsMetadata.length) {
                d.participantsMetadata = $Array(m.participantsMetadata.length);
                for (var j = 0; j < m.participantsMetadata.length; ++j) {
                    d.participantsMetadata[j] = $root.AICommon.BotGroupParticipantMetadata.toObject(m.participantsMetadata[j], o, q + 1);
                }
            }
            return d;
        };

        BotHistoryShareMetadata.prototype.toJSON = function() {
            return BotHistoryShareMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotHistoryShareMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotHistoryShareMetadata";
        };

        return BotHistoryShareMetadata;
    })();

    AICommon.BotGroupMetadata = (function() {

        const BotGroupMetadata = function (p) {
            this.participantsMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotGroupMetadata.prototype.participantsMetadata = $util.emptyArray;

        BotGroupMetadata.create = function(properties) {
            return new BotGroupMetadata(properties);
        };

        BotGroupMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.participantsMetadata != null && m.participantsMetadata.length) {
                for (var i = 0; i < m.participantsMetadata.length; ++i)
                    $root.AICommon.BotGroupParticipantMetadata.encode(m.participantsMetadata[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotGroupMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotGroupMetadata();
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
                        if (!(m.participantsMetadata && m.participantsMetadata.length))
                            m.participantsMetadata = [];
                        m.participantsMetadata.push($root.AICommon.BotGroupParticipantMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

        BotGroupMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotGroupMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotGroupMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotGroupMetadata();
            if (d.participantsMetadata) {
                if (!$Array.isArray(d.participantsMetadata))
                    throw $TypeError(".AICommon.BotGroupMetadata.participantsMetadata: array expected");
                m.participantsMetadata = $Array(d.participantsMetadata.length);
                for (var i = 0; i < d.participantsMetadata.length; ++i) {
                    if (!$util.isObject(d.participantsMetadata[i]))
                        throw $TypeError(".AICommon.BotGroupMetadata.participantsMetadata: object expected");
                    m.participantsMetadata[i] = $root.AICommon.BotGroupParticipantMetadata.fromObject(d.participantsMetadata[i], q + 1);
                }
            }
            return m;
        };

        BotGroupMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.participantsMetadata = [];
            }
            if (m.participantsMetadata && m.participantsMetadata.length) {
                d.participantsMetadata = $Array(m.participantsMetadata.length);
                for (var j = 0; j < m.participantsMetadata.length; ++j) {
                    d.participantsMetadata[j] = $root.AICommon.BotGroupParticipantMetadata.toObject(m.participantsMetadata[j], o, q + 1);
                }
            }
            return d;
        };

        BotGroupMetadata.prototype.toJSON = function() {
            return BotGroupMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotGroupMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotGroupMetadata";
        };

        return BotGroupMetadata;
    })();

    AICommon.AISubscriptionUpsellMetadata = (function() {

        const AISubscriptionUpsellMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AISubscriptionUpsellMetadata.prototype.requestType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AISubscriptionUpsellMetadata.prototype, "_requestType", {
            get: $util.oneOfGetter($oneOfFields = ["requestType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AISubscriptionUpsellMetadata.create = function(properties) {
            return new AISubscriptionUpsellMetadata(properties);
        };

        AISubscriptionUpsellMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.requestType != null && $Object.hasOwnProperty.call(m, "requestType"))
                w.uint32(8).int32(m.requestType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AISubscriptionUpsellMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AISubscriptionUpsellMetadata();
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
                        m.requestType = r.int32();
                        m._requestType = "requestType";
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

        AISubscriptionUpsellMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AISubscriptionUpsellMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AISubscriptionUpsellMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AISubscriptionUpsellMetadata();
            switch (d.requestType) {
            case "UNSPECIFIED":
            case 0:
                m.requestType = 0;
                break;
            case "THINK_HARD":
            case 1:
                m.requestType = 1;
                break;
            case "IMAGE_GEN":
            case 2:
                m.requestType = 2;
                break;
            case "VIDEO_GEN":
            case 3:
                m.requestType = 3;
                break;
            default:
                if (typeof d.requestType === "number" && (d.requestType | 0) === d.requestType)
                    m.requestType = d.requestType;
            }
            return m;
        };

        AISubscriptionUpsellMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.requestType != null && $Object.hasOwnProperty.call(m, "requestType")) {
                d.requestType = o.enums === $String ? $root.AICommon.AISubscriptionRequestType[m.requestType] === $undefined ? m.requestType : $root.AICommon.AISubscriptionRequestType[m.requestType] : m.requestType;
            }
            return d;
        };

        AISubscriptionUpsellMetadata.prototype.toJSON = function() {
            return AISubscriptionUpsellMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AISubscriptionUpsellMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AISubscriptionUpsellMetadata";
        };

        return AISubscriptionUpsellMetadata;
    })();

    AICommon.BotMetadata = (function() {

        const BotMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMetadata.prototype.personaId = null;
        BotMetadata.prototype.pluginMetadata = null;
        BotMetadata.prototype.suggestedPromptMetadata = null;
        BotMetadata.prototype.invokerJid = null;
        BotMetadata.prototype.sessionMetadata = null;
        BotMetadata.prototype.memuMetadata = null;
        BotMetadata.prototype.timezone = null;
        BotMetadata.prototype.reminderMetadata = null;
        BotMetadata.prototype.modelMetadata = null;
        BotMetadata.prototype.messageDisclaimerText = null;
        BotMetadata.prototype.progressIndicatorMetadata = null;
        BotMetadata.prototype.capabilityMetadata = null;
        BotMetadata.prototype.imagineMetadata = null;
        BotMetadata.prototype.memoryMetadata = null;
        BotMetadata.prototype.renderingMetadata = null;
        BotMetadata.prototype.botMetricsMetadata = null;
        BotMetadata.prototype.botLinkedAccountsMetadata = null;
        BotMetadata.prototype.richResponseSourcesMetadata = null;
        BotMetadata.prototype.aiConversationContext = null;
        BotMetadata.prototype.botPromotionMessageMetadata = null;
        BotMetadata.prototype.botModeSelectionMetadata = null;
        BotMetadata.prototype.botQuotaMetadata = null;
        BotMetadata.prototype.botAgeCollectionMetadata = null;
        BotMetadata.prototype.conversationStarterPromptId = null;
        BotMetadata.prototype.botResponseId = null;
        BotMetadata.prototype.verificationMetadata = null;
        BotMetadata.prototype.unifiedResponseMutation = null;
        BotMetadata.prototype.botMessageOriginMetadata = null;
        BotMetadata.prototype.inThreadSurveyMetadata = null;
        BotMetadata.prototype.botThreadInfo = null;
        BotMetadata.prototype.regenerateMetadata = null;
        BotMetadata.prototype.sessionTransparencyMetadata = null;
        BotMetadata.prototype.botDocumentMessageMetadata = null;
        BotMetadata.prototype.botGroupMetadata = null;
        BotMetadata.prototype.botRenderingConfigMetadata = null;
        BotMetadata.prototype.botInfrastructureDiagnostics = null;
        BotMetadata.prototype.aiMediaCollectionMetadata = null;
        BotMetadata.prototype.commandMetadata = null;
        BotMetadata.prototype.resolvedToolCallMetadata = null;
        BotMetadata.prototype.subscriptionUpsellMetadata = null;
        BotMetadata.prototype.pttPromptMetadata = null;
        BotMetadata.prototype.botHistoryShareMetadata = null;
        BotMetadata.prototype.responseStoppedByUser = null;
        BotMetadata.prototype.internalMetadata = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_personaId", {
            get: $util.oneOfGetter($oneOfFields = ["personaId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_pluginMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["pluginMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_suggestedPromptMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["suggestedPromptMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_invokerJid", {
            get: $util.oneOfGetter($oneOfFields = ["invokerJid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_sessionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sessionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_memuMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["memuMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_timezone", {
            get: $util.oneOfGetter($oneOfFields = ["timezone"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_reminderMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["reminderMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_modelMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["modelMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_messageDisclaimerText", {
            get: $util.oneOfGetter($oneOfFields = ["messageDisclaimerText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_progressIndicatorMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["progressIndicatorMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_capabilityMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["capabilityMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_imagineMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["imagineMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_memoryMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["memoryMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_renderingMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["renderingMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botMetricsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botMetricsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botLinkedAccountsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botLinkedAccountsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_richResponseSourcesMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["richResponseSourcesMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_aiConversationContext", {
            get: $util.oneOfGetter($oneOfFields = ["aiConversationContext"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botPromotionMessageMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botPromotionMessageMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botModeSelectionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botModeSelectionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botQuotaMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botQuotaMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botAgeCollectionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botAgeCollectionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_conversationStarterPromptId", {
            get: $util.oneOfGetter($oneOfFields = ["conversationStarterPromptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botResponseId", {
            get: $util.oneOfGetter($oneOfFields = ["botResponseId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_verificationMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["verificationMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_unifiedResponseMutation", {
            get: $util.oneOfGetter($oneOfFields = ["unifiedResponseMutation"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botMessageOriginMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botMessageOriginMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_inThreadSurveyMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["inThreadSurveyMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botThreadInfo", {
            get: $util.oneOfGetter($oneOfFields = ["botThreadInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_regenerateMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["regenerateMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_sessionTransparencyMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sessionTransparencyMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botDocumentMessageMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botDocumentMessageMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botGroupMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botGroupMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botRenderingConfigMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botRenderingConfigMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botInfrastructureDiagnostics", {
            get: $util.oneOfGetter($oneOfFields = ["botInfrastructureDiagnostics"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_aiMediaCollectionMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["aiMediaCollectionMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_commandMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["commandMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_resolvedToolCallMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["resolvedToolCallMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_subscriptionUpsellMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["subscriptionUpsellMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_pttPromptMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["pttPromptMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_botHistoryShareMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["botHistoryShareMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_responseStoppedByUser", {
            get: $util.oneOfGetter($oneOfFields = ["responseStoppedByUser"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetadata.prototype, "_internalMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["internalMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMetadata.create = function(properties) {
            return new BotMetadata(properties);
        };

        BotMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.personaId != null && $Object.hasOwnProperty.call(m, "personaId"))
                w.uint32(18).string(m.personaId);
            if (m.pluginMetadata != null && $Object.hasOwnProperty.call(m, "pluginMetadata"))
                $root.AICommon.BotPluginMetadata.encode(m.pluginMetadata, w.uint32(26).fork(), q + 1).ldelim();
            if (m.suggestedPromptMetadata != null && $Object.hasOwnProperty.call(m, "suggestedPromptMetadata"))
                $root.AICommon.BotSuggestedPromptMetadata.encode(m.suggestedPromptMetadata, w.uint32(34).fork(), q + 1).ldelim();
            if (m.invokerJid != null && $Object.hasOwnProperty.call(m, "invokerJid"))
                w.uint32(42).string(m.invokerJid);
            if (m.sessionMetadata != null && $Object.hasOwnProperty.call(m, "sessionMetadata"))
                $root.AICommon.BotSessionMetadata.encode(m.sessionMetadata, w.uint32(50).fork(), q + 1).ldelim();
            if (m.memuMetadata != null && $Object.hasOwnProperty.call(m, "memuMetadata"))
                $root.AICommon.BotMemuMetadata.encode(m.memuMetadata, w.uint32(58).fork(), q + 1).ldelim();
            if (m.timezone != null && $Object.hasOwnProperty.call(m, "timezone"))
                w.uint32(66).string(m.timezone);
            if (m.reminderMetadata != null && $Object.hasOwnProperty.call(m, "reminderMetadata"))
                $root.AICommon.BotReminderMetadata.encode(m.reminderMetadata, w.uint32(74).fork(), q + 1).ldelim();
            if (m.modelMetadata != null && $Object.hasOwnProperty.call(m, "modelMetadata"))
                $root.AICommon.BotModelMetadata.encode(m.modelMetadata, w.uint32(82).fork(), q + 1).ldelim();
            if (m.messageDisclaimerText != null && $Object.hasOwnProperty.call(m, "messageDisclaimerText"))
                w.uint32(90).string(m.messageDisclaimerText);
            if (m.progressIndicatorMetadata != null && $Object.hasOwnProperty.call(m, "progressIndicatorMetadata"))
                $root.AICommon.BotProgressIndicatorMetadata.encode(m.progressIndicatorMetadata, w.uint32(98).fork(), q + 1).ldelim();
            if (m.capabilityMetadata != null && $Object.hasOwnProperty.call(m, "capabilityMetadata"))
                $root.AICommon.BotCapabilityMetadata.encode(m.capabilityMetadata, w.uint32(106).fork(), q + 1).ldelim();
            if (m.imagineMetadata != null && $Object.hasOwnProperty.call(m, "imagineMetadata"))
                $root.AICommon.BotImagineMetadata.encode(m.imagineMetadata, w.uint32(114).fork(), q + 1).ldelim();
            if (m.memoryMetadata != null && $Object.hasOwnProperty.call(m, "memoryMetadata"))
                $root.AICommon.BotMemoryMetadata.encode(m.memoryMetadata, w.uint32(122).fork(), q + 1).ldelim();
            if (m.renderingMetadata != null && $Object.hasOwnProperty.call(m, "renderingMetadata"))
                $root.AICommon.BotRenderingMetadata.encode(m.renderingMetadata, w.uint32(130).fork(), q + 1).ldelim();
            if (m.botMetricsMetadata != null && $Object.hasOwnProperty.call(m, "botMetricsMetadata"))
                $root.AICommon.BotMetricsMetadata.encode(m.botMetricsMetadata, w.uint32(138).fork(), q + 1).ldelim();
            if (m.botLinkedAccountsMetadata != null && $Object.hasOwnProperty.call(m, "botLinkedAccountsMetadata"))
                $root.AICommon.BotLinkedAccountsMetadata.encode(m.botLinkedAccountsMetadata, w.uint32(146).fork(), q + 1).ldelim();
            if (m.richResponseSourcesMetadata != null && $Object.hasOwnProperty.call(m, "richResponseSourcesMetadata"))
                $root.AICommon.BotSourcesMetadata.encode(m.richResponseSourcesMetadata, w.uint32(154).fork(), q + 1).ldelim();
            if (m.aiConversationContext != null && $Object.hasOwnProperty.call(m, "aiConversationContext"))
                w.uint32(162).bytes(m.aiConversationContext);
            if (m.botPromotionMessageMetadata != null && $Object.hasOwnProperty.call(m, "botPromotionMessageMetadata"))
                $root.AICommon.BotPromotionMessageMetadata.encode(m.botPromotionMessageMetadata, w.uint32(170).fork(), q + 1).ldelim();
            if (m.botModeSelectionMetadata != null && $Object.hasOwnProperty.call(m, "botModeSelectionMetadata"))
                $root.AICommon.BotModeSelectionMetadata.encode(m.botModeSelectionMetadata, w.uint32(178).fork(), q + 1).ldelim();
            if (m.botQuotaMetadata != null && $Object.hasOwnProperty.call(m, "botQuotaMetadata"))
                $root.AICommon.BotQuotaMetadata.encode(m.botQuotaMetadata, w.uint32(186).fork(), q + 1).ldelim();
            if (m.botAgeCollectionMetadata != null && $Object.hasOwnProperty.call(m, "botAgeCollectionMetadata"))
                $root.AICommon.BotAgeCollectionMetadata.encode(m.botAgeCollectionMetadata, w.uint32(194).fork(), q + 1).ldelim();
            if (m.conversationStarterPromptId != null && $Object.hasOwnProperty.call(m, "conversationStarterPromptId"))
                w.uint32(202).string(m.conversationStarterPromptId);
            if (m.botResponseId != null && $Object.hasOwnProperty.call(m, "botResponseId"))
                w.uint32(210).string(m.botResponseId);
            if (m.verificationMetadata != null && $Object.hasOwnProperty.call(m, "verificationMetadata"))
                $root.AICommon.BotSignatureVerificationMetadata.encode(m.verificationMetadata, w.uint32(218).fork(), q + 1).ldelim();
            if (m.unifiedResponseMutation != null && $Object.hasOwnProperty.call(m, "unifiedResponseMutation"))
                $root.AICommon.BotUnifiedResponseMutation.encode(m.unifiedResponseMutation, w.uint32(226).fork(), q + 1).ldelim();
            if (m.botMessageOriginMetadata != null && $Object.hasOwnProperty.call(m, "botMessageOriginMetadata"))
                $root.AICommon.BotMessageOriginMetadata.encode(m.botMessageOriginMetadata, w.uint32(234).fork(), q + 1).ldelim();
            if (m.inThreadSurveyMetadata != null && $Object.hasOwnProperty.call(m, "inThreadSurveyMetadata"))
                $root.AICommon.InThreadSurveyMetadata.encode(m.inThreadSurveyMetadata, w.uint32(242).fork(), q + 1).ldelim();
            if (m.botThreadInfo != null && $Object.hasOwnProperty.call(m, "botThreadInfo"))
                $root.AICommon.AIThreadInfo.encode(m.botThreadInfo, w.uint32(250).fork(), q + 1).ldelim();
            if (m.regenerateMetadata != null && $Object.hasOwnProperty.call(m, "regenerateMetadata"))
                $root.AICommon.AIRegenerateMetadata.encode(m.regenerateMetadata, w.uint32(258).fork(), q + 1).ldelim();
            if (m.sessionTransparencyMetadata != null && $Object.hasOwnProperty.call(m, "sessionTransparencyMetadata"))
                $root.AICommon.SessionTransparencyMetadata.encode(m.sessionTransparencyMetadata, w.uint32(266).fork(), q + 1).ldelim();
            if (m.botDocumentMessageMetadata != null && $Object.hasOwnProperty.call(m, "botDocumentMessageMetadata"))
                $root.AICommon.BotDocumentMessageMetadata.encode(m.botDocumentMessageMetadata, w.uint32(274).fork(), q + 1).ldelim();
            if (m.botGroupMetadata != null && $Object.hasOwnProperty.call(m, "botGroupMetadata"))
                $root.AICommon.BotGroupMetadata.encode(m.botGroupMetadata, w.uint32(282).fork(), q + 1).ldelim();
            if (m.botRenderingConfigMetadata != null && $Object.hasOwnProperty.call(m, "botRenderingConfigMetadata"))
                $root.AICommon.BotRenderingConfigMetadata.encode(m.botRenderingConfigMetadata, w.uint32(290).fork(), q + 1).ldelim();
            if (m.botInfrastructureDiagnostics != null && $Object.hasOwnProperty.call(m, "botInfrastructureDiagnostics"))
                $root.AICommon.BotInfrastructureDiagnostics.encode(m.botInfrastructureDiagnostics, w.uint32(298).fork(), q + 1).ldelim();
            if (m.aiMediaCollectionMetadata != null && $Object.hasOwnProperty.call(m, "aiMediaCollectionMetadata"))
                $root.AICommon.AIMediaCollectionMetadata.encode(m.aiMediaCollectionMetadata, w.uint32(306).fork(), q + 1).ldelim();
            if (m.commandMetadata != null && $Object.hasOwnProperty.call(m, "commandMetadata"))
                $root.AICommon.BotCommandMetadata.encode(m.commandMetadata, w.uint32(314).fork(), q + 1).ldelim();
            if (m.resolvedToolCallMetadata != null && $Object.hasOwnProperty.call(m, "resolvedToolCallMetadata"))
                $root.AICommon.BotResolvedToolCallMetadata.encode(m.resolvedToolCallMetadata, w.uint32(322).fork(), q + 1).ldelim();
            if (m.subscriptionUpsellMetadata != null && $Object.hasOwnProperty.call(m, "subscriptionUpsellMetadata"))
                $root.AICommon.AISubscriptionUpsellMetadata.encode(m.subscriptionUpsellMetadata, w.uint32(330).fork(), q + 1).ldelim();
            if (m.pttPromptMetadata != null && $Object.hasOwnProperty.call(m, "pttPromptMetadata"))
                $root.AICommon.BotPttPromptMetadata.encode(m.pttPromptMetadata, w.uint32(338).fork(), q + 1).ldelim();
            if (m.botHistoryShareMetadata != null && $Object.hasOwnProperty.call(m, "botHistoryShareMetadata"))
                $root.AICommon.BotHistoryShareMetadata.encode(m.botHistoryShareMetadata, w.uint32(346).fork(), q + 1).ldelim();
            if (m.responseStoppedByUser != null && $Object.hasOwnProperty.call(m, "responseStoppedByUser"))
                w.uint32(352).bool(m.responseStoppedByUser);
            if (m.internalMetadata != null && $Object.hasOwnProperty.call(m, "internalMetadata"))
                w.uint32(7994).bytes(m.internalMetadata);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMetadata();
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
                        m.personaId = r.stringVerify();
                        m._personaId = "personaId";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.pluginMetadata = $root.AICommon.BotPluginMetadata.decode(r, r.uint32(), $undefined, q + 1, m.pluginMetadata);
                        m._pluginMetadata = "pluginMetadata";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.suggestedPromptMetadata = $root.AICommon.BotSuggestedPromptMetadata.decode(r, r.uint32(), $undefined, q + 1, m.suggestedPromptMetadata);
                        m._suggestedPromptMetadata = "suggestedPromptMetadata";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.invokerJid = r.stringVerify();
                        m._invokerJid = "invokerJid";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.sessionMetadata = $root.AICommon.BotSessionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sessionMetadata);
                        m._sessionMetadata = "sessionMetadata";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.memuMetadata = $root.AICommon.BotMemuMetadata.decode(r, r.uint32(), $undefined, q + 1, m.memuMetadata);
                        m._memuMetadata = "memuMetadata";
                        continue;
                    }
                case 8: {
                        if (u !== 2)
                            break;
                        m.timezone = r.stringVerify();
                        m._timezone = "timezone";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.reminderMetadata = $root.AICommon.BotReminderMetadata.decode(r, r.uint32(), $undefined, q + 1, m.reminderMetadata);
                        m._reminderMetadata = "reminderMetadata";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.modelMetadata = $root.AICommon.BotModelMetadata.decode(r, r.uint32(), $undefined, q + 1, m.modelMetadata);
                        m._modelMetadata = "modelMetadata";
                        continue;
                    }
                case 11: {
                        if (u !== 2)
                            break;
                        m.messageDisclaimerText = r.stringVerify();
                        m._messageDisclaimerText = "messageDisclaimerText";
                        continue;
                    }
                case 12: {
                        if (u !== 2)
                            break;
                        m.progressIndicatorMetadata = $root.AICommon.BotProgressIndicatorMetadata.decode(r, r.uint32(), $undefined, q + 1, m.progressIndicatorMetadata);
                        m._progressIndicatorMetadata = "progressIndicatorMetadata";
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.decode(r, r.uint32(), $undefined, q + 1, m.capabilityMetadata);
                        m._capabilityMetadata = "capabilityMetadata";
                        continue;
                    }
                case 14: {
                        if (u !== 2)
                            break;
                        m.imagineMetadata = $root.AICommon.BotImagineMetadata.decode(r, r.uint32(), $undefined, q + 1, m.imagineMetadata);
                        m._imagineMetadata = "imagineMetadata";
                        continue;
                    }
                case 15: {
                        if (u !== 2)
                            break;
                        m.memoryMetadata = $root.AICommon.BotMemoryMetadata.decode(r, r.uint32(), $undefined, q + 1, m.memoryMetadata);
                        m._memoryMetadata = "memoryMetadata";
                        continue;
                    }
                case 16: {
                        if (u !== 2)
                            break;
                        m.renderingMetadata = $root.AICommon.BotRenderingMetadata.decode(r, r.uint32(), $undefined, q + 1, m.renderingMetadata);
                        m._renderingMetadata = "renderingMetadata";
                        continue;
                    }
                case 17: {
                        if (u !== 2)
                            break;
                        m.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botMetricsMetadata);
                        m._botMetricsMetadata = "botMetricsMetadata";
                        continue;
                    }
                case 18: {
                        if (u !== 2)
                            break;
                        m.botLinkedAccountsMetadata = $root.AICommon.BotLinkedAccountsMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botLinkedAccountsMetadata);
                        m._botLinkedAccountsMetadata = "botLinkedAccountsMetadata";
                        continue;
                    }
                case 19: {
                        if (u !== 2)
                            break;
                        m.richResponseSourcesMetadata = $root.AICommon.BotSourcesMetadata.decode(r, r.uint32(), $undefined, q + 1, m.richResponseSourcesMetadata);
                        m._richResponseSourcesMetadata = "richResponseSourcesMetadata";
                        continue;
                    }
                case 20: {
                        if (u !== 2)
                            break;
                        m.aiConversationContext = r.bytes();
                        m._aiConversationContext = "aiConversationContext";
                        continue;
                    }
                case 21: {
                        if (u !== 2)
                            break;
                        m.botPromotionMessageMetadata = $root.AICommon.BotPromotionMessageMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botPromotionMessageMetadata);
                        m._botPromotionMessageMetadata = "botPromotionMessageMetadata";
                        continue;
                    }
                case 22: {
                        if (u !== 2)
                            break;
                        m.botModeSelectionMetadata = $root.AICommon.BotModeSelectionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botModeSelectionMetadata);
                        m._botModeSelectionMetadata = "botModeSelectionMetadata";
                        continue;
                    }
                case 23: {
                        if (u !== 2)
                            break;
                        m.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botQuotaMetadata);
                        m._botQuotaMetadata = "botQuotaMetadata";
                        continue;
                    }
                case 24: {
                        if (u !== 2)
                            break;
                        m.botAgeCollectionMetadata = $root.AICommon.BotAgeCollectionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botAgeCollectionMetadata);
                        m._botAgeCollectionMetadata = "botAgeCollectionMetadata";
                        continue;
                    }
                case 25: {
                        if (u !== 2)
                            break;
                        m.conversationStarterPromptId = r.stringVerify();
                        m._conversationStarterPromptId = "conversationStarterPromptId";
                        continue;
                    }
                case 26: {
                        if (u !== 2)
                            break;
                        m.botResponseId = r.stringVerify();
                        m._botResponseId = "botResponseId";
                        continue;
                    }
                case 27: {
                        if (u !== 2)
                            break;
                        m.verificationMetadata = $root.AICommon.BotSignatureVerificationMetadata.decode(r, r.uint32(), $undefined, q + 1, m.verificationMetadata);
                        m._verificationMetadata = "verificationMetadata";
                        continue;
                    }
                case 28: {
                        if (u !== 2)
                            break;
                        m.unifiedResponseMutation = $root.AICommon.BotUnifiedResponseMutation.decode(r, r.uint32(), $undefined, q + 1, m.unifiedResponseMutation);
                        m._unifiedResponseMutation = "unifiedResponseMutation";
                        continue;
                    }
                case 29: {
                        if (u !== 2)
                            break;
                        m.botMessageOriginMetadata = $root.AICommon.BotMessageOriginMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botMessageOriginMetadata);
                        m._botMessageOriginMetadata = "botMessageOriginMetadata";
                        continue;
                    }
                case 30: {
                        if (u !== 2)
                            break;
                        m.inThreadSurveyMetadata = $root.AICommon.InThreadSurveyMetadata.decode(r, r.uint32(), $undefined, q + 1, m.inThreadSurveyMetadata);
                        m._inThreadSurveyMetadata = "inThreadSurveyMetadata";
                        continue;
                    }
                case 31: {
                        if (u !== 2)
                            break;
                        m.botThreadInfo = $root.AICommon.AIThreadInfo.decode(r, r.uint32(), $undefined, q + 1, m.botThreadInfo);
                        m._botThreadInfo = "botThreadInfo";
                        continue;
                    }
                case 32: {
                        if (u !== 2)
                            break;
                        m.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.decode(r, r.uint32(), $undefined, q + 1, m.regenerateMetadata);
                        m._regenerateMetadata = "regenerateMetadata";
                        continue;
                    }
                case 33: {
                        if (u !== 2)
                            break;
                        m.sessionTransparencyMetadata = $root.AICommon.SessionTransparencyMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sessionTransparencyMetadata);
                        m._sessionTransparencyMetadata = "sessionTransparencyMetadata";
                        continue;
                    }
                case 34: {
                        if (u !== 2)
                            break;
                        m.botDocumentMessageMetadata = $root.AICommon.BotDocumentMessageMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botDocumentMessageMetadata);
                        m._botDocumentMessageMetadata = "botDocumentMessageMetadata";
                        continue;
                    }
                case 35: {
                        if (u !== 2)
                            break;
                        m.botGroupMetadata = $root.AICommon.BotGroupMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botGroupMetadata);
                        m._botGroupMetadata = "botGroupMetadata";
                        continue;
                    }
                case 36: {
                        if (u !== 2)
                            break;
                        m.botRenderingConfigMetadata = $root.AICommon.BotRenderingConfigMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botRenderingConfigMetadata);
                        m._botRenderingConfigMetadata = "botRenderingConfigMetadata";
                        continue;
                    }
                case 37: {
                        if (u !== 2)
                            break;
                        m.botInfrastructureDiagnostics = $root.AICommon.BotInfrastructureDiagnostics.decode(r, r.uint32(), $undefined, q + 1, m.botInfrastructureDiagnostics);
                        m._botInfrastructureDiagnostics = "botInfrastructureDiagnostics";
                        continue;
                    }
                case 38: {
                        if (u !== 2)
                            break;
                        m.aiMediaCollectionMetadata = $root.AICommon.AIMediaCollectionMetadata.decode(r, r.uint32(), $undefined, q + 1, m.aiMediaCollectionMetadata);
                        m._aiMediaCollectionMetadata = "aiMediaCollectionMetadata";
                        continue;
                    }
                case 39: {
                        if (u !== 2)
                            break;
                        m.commandMetadata = $root.AICommon.BotCommandMetadata.decode(r, r.uint32(), $undefined, q + 1, m.commandMetadata);
                        m._commandMetadata = "commandMetadata";
                        continue;
                    }
                case 40: {
                        if (u !== 2)
                            break;
                        m.resolvedToolCallMetadata = $root.AICommon.BotResolvedToolCallMetadata.decode(r, r.uint32(), $undefined, q + 1, m.resolvedToolCallMetadata);
                        m._resolvedToolCallMetadata = "resolvedToolCallMetadata";
                        continue;
                    }
                case 41: {
                        if (u !== 2)
                            break;
                        m.subscriptionUpsellMetadata = $root.AICommon.AISubscriptionUpsellMetadata.decode(r, r.uint32(), $undefined, q + 1, m.subscriptionUpsellMetadata);
                        m._subscriptionUpsellMetadata = "subscriptionUpsellMetadata";
                        continue;
                    }
                case 42: {
                        if (u !== 2)
                            break;
                        m.pttPromptMetadata = $root.AICommon.BotPttPromptMetadata.decode(r, r.uint32(), $undefined, q + 1, m.pttPromptMetadata);
                        m._pttPromptMetadata = "pttPromptMetadata";
                        continue;
                    }
                case 43: {
                        if (u !== 2)
                            break;
                        m.botHistoryShareMetadata = $root.AICommon.BotHistoryShareMetadata.decode(r, r.uint32(), $undefined, q + 1, m.botHistoryShareMetadata);
                        m._botHistoryShareMetadata = "botHistoryShareMetadata";
                        continue;
                    }
                case 44: {
                        if (u !== 0)
                            break;
                        m.responseStoppedByUser = r.bool();
                        m._responseStoppedByUser = "responseStoppedByUser";
                        continue;
                    }
                case 999: {
                        if (u !== 2)
                            break;
                        m.internalMetadata = r.bytes();
                        m._internalMetadata = "internalMetadata";
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

        BotMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMetadata();
            if (d.personaId != null) {
                m.personaId = $String(d.personaId);
            }
            if (d.pluginMetadata != null) {
                if (!$util.isObject(d.pluginMetadata))
                    throw $TypeError(".AICommon.BotMetadata.pluginMetadata: object expected");
                m.pluginMetadata = $root.AICommon.BotPluginMetadata.fromObject(d.pluginMetadata, q + 1);
            }
            if (d.suggestedPromptMetadata != null) {
                if (!$util.isObject(d.suggestedPromptMetadata))
                    throw $TypeError(".AICommon.BotMetadata.suggestedPromptMetadata: object expected");
                m.suggestedPromptMetadata = $root.AICommon.BotSuggestedPromptMetadata.fromObject(d.suggestedPromptMetadata, q + 1);
            }
            if (d.invokerJid != null) {
                m.invokerJid = $String(d.invokerJid);
            }
            if (d.sessionMetadata != null) {
                if (!$util.isObject(d.sessionMetadata))
                    throw $TypeError(".AICommon.BotMetadata.sessionMetadata: object expected");
                m.sessionMetadata = $root.AICommon.BotSessionMetadata.fromObject(d.sessionMetadata, q + 1);
            }
            if (d.memuMetadata != null) {
                if (!$util.isObject(d.memuMetadata))
                    throw $TypeError(".AICommon.BotMetadata.memuMetadata: object expected");
                m.memuMetadata = $root.AICommon.BotMemuMetadata.fromObject(d.memuMetadata, q + 1);
            }
            if (d.timezone != null) {
                m.timezone = $String(d.timezone);
            }
            if (d.reminderMetadata != null) {
                if (!$util.isObject(d.reminderMetadata))
                    throw $TypeError(".AICommon.BotMetadata.reminderMetadata: object expected");
                m.reminderMetadata = $root.AICommon.BotReminderMetadata.fromObject(d.reminderMetadata, q + 1);
            }
            if (d.modelMetadata != null) {
                if (!$util.isObject(d.modelMetadata))
                    throw $TypeError(".AICommon.BotMetadata.modelMetadata: object expected");
                m.modelMetadata = $root.AICommon.BotModelMetadata.fromObject(d.modelMetadata, q + 1);
            }
            if (d.messageDisclaimerText != null) {
                m.messageDisclaimerText = $String(d.messageDisclaimerText);
            }
            if (d.progressIndicatorMetadata != null) {
                if (!$util.isObject(d.progressIndicatorMetadata))
                    throw $TypeError(".AICommon.BotMetadata.progressIndicatorMetadata: object expected");
                m.progressIndicatorMetadata = $root.AICommon.BotProgressIndicatorMetadata.fromObject(d.progressIndicatorMetadata, q + 1);
            }
            if (d.capabilityMetadata != null) {
                if (!$util.isObject(d.capabilityMetadata))
                    throw $TypeError(".AICommon.BotMetadata.capabilityMetadata: object expected");
                m.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.fromObject(d.capabilityMetadata, q + 1);
            }
            if (d.imagineMetadata != null) {
                if (!$util.isObject(d.imagineMetadata))
                    throw $TypeError(".AICommon.BotMetadata.imagineMetadata: object expected");
                m.imagineMetadata = $root.AICommon.BotImagineMetadata.fromObject(d.imagineMetadata, q + 1);
            }
            if (d.memoryMetadata != null) {
                if (!$util.isObject(d.memoryMetadata))
                    throw $TypeError(".AICommon.BotMetadata.memoryMetadata: object expected");
                m.memoryMetadata = $root.AICommon.BotMemoryMetadata.fromObject(d.memoryMetadata, q + 1);
            }
            if (d.renderingMetadata != null) {
                if (!$util.isObject(d.renderingMetadata))
                    throw $TypeError(".AICommon.BotMetadata.renderingMetadata: object expected");
                m.renderingMetadata = $root.AICommon.BotRenderingMetadata.fromObject(d.renderingMetadata, q + 1);
            }
            if (d.botMetricsMetadata != null) {
                if (!$util.isObject(d.botMetricsMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botMetricsMetadata: object expected");
                m.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.fromObject(d.botMetricsMetadata, q + 1);
            }
            if (d.botLinkedAccountsMetadata != null) {
                if (!$util.isObject(d.botLinkedAccountsMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botLinkedAccountsMetadata: object expected");
                m.botLinkedAccountsMetadata = $root.AICommon.BotLinkedAccountsMetadata.fromObject(d.botLinkedAccountsMetadata, q + 1);
            }
            if (d.richResponseSourcesMetadata != null) {
                if (!$util.isObject(d.richResponseSourcesMetadata))
                    throw $TypeError(".AICommon.BotMetadata.richResponseSourcesMetadata: object expected");
                m.richResponseSourcesMetadata = $root.AICommon.BotSourcesMetadata.fromObject(d.richResponseSourcesMetadata, q + 1);
            }
            if (d.aiConversationContext != null) {
                if (typeof d.aiConversationContext === "string")
                    $util.base64.decode(d.aiConversationContext, m.aiConversationContext = $util.newBuffer($util.base64.length(d.aiConversationContext)), 0);
                else if (d.aiConversationContext.length >= 0)
                    m.aiConversationContext = d.aiConversationContext;
            }
            if (d.botPromotionMessageMetadata != null) {
                if (!$util.isObject(d.botPromotionMessageMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botPromotionMessageMetadata: object expected");
                m.botPromotionMessageMetadata = $root.AICommon.BotPromotionMessageMetadata.fromObject(d.botPromotionMessageMetadata, q + 1);
            }
            if (d.botModeSelectionMetadata != null) {
                if (!$util.isObject(d.botModeSelectionMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botModeSelectionMetadata: object expected");
                m.botModeSelectionMetadata = $root.AICommon.BotModeSelectionMetadata.fromObject(d.botModeSelectionMetadata, q + 1);
            }
            if (d.botQuotaMetadata != null) {
                if (!$util.isObject(d.botQuotaMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botQuotaMetadata: object expected");
                m.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.fromObject(d.botQuotaMetadata, q + 1);
            }
            if (d.botAgeCollectionMetadata != null) {
                if (!$util.isObject(d.botAgeCollectionMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botAgeCollectionMetadata: object expected");
                m.botAgeCollectionMetadata = $root.AICommon.BotAgeCollectionMetadata.fromObject(d.botAgeCollectionMetadata, q + 1);
            }
            if (d.conversationStarterPromptId != null) {
                m.conversationStarterPromptId = $String(d.conversationStarterPromptId);
            }
            if (d.botResponseId != null) {
                m.botResponseId = $String(d.botResponseId);
            }
            if (d.verificationMetadata != null) {
                if (!$util.isObject(d.verificationMetadata))
                    throw $TypeError(".AICommon.BotMetadata.verificationMetadata: object expected");
                m.verificationMetadata = $root.AICommon.BotSignatureVerificationMetadata.fromObject(d.verificationMetadata, q + 1);
            }
            if (d.unifiedResponseMutation != null) {
                if (!$util.isObject(d.unifiedResponseMutation))
                    throw $TypeError(".AICommon.BotMetadata.unifiedResponseMutation: object expected");
                m.unifiedResponseMutation = $root.AICommon.BotUnifiedResponseMutation.fromObject(d.unifiedResponseMutation, q + 1);
            }
            if (d.botMessageOriginMetadata != null) {
                if (!$util.isObject(d.botMessageOriginMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botMessageOriginMetadata: object expected");
                m.botMessageOriginMetadata = $root.AICommon.BotMessageOriginMetadata.fromObject(d.botMessageOriginMetadata, q + 1);
            }
            if (d.inThreadSurveyMetadata != null) {
                if (!$util.isObject(d.inThreadSurveyMetadata))
                    throw $TypeError(".AICommon.BotMetadata.inThreadSurveyMetadata: object expected");
                m.inThreadSurveyMetadata = $root.AICommon.InThreadSurveyMetadata.fromObject(d.inThreadSurveyMetadata, q + 1);
            }
            if (d.botThreadInfo != null) {
                if (!$util.isObject(d.botThreadInfo))
                    throw $TypeError(".AICommon.BotMetadata.botThreadInfo: object expected");
                m.botThreadInfo = $root.AICommon.AIThreadInfo.fromObject(d.botThreadInfo, q + 1);
            }
            if (d.regenerateMetadata != null) {
                if (!$util.isObject(d.regenerateMetadata))
                    throw $TypeError(".AICommon.BotMetadata.regenerateMetadata: object expected");
                m.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.fromObject(d.regenerateMetadata, q + 1);
            }
            if (d.sessionTransparencyMetadata != null) {
                if (!$util.isObject(d.sessionTransparencyMetadata))
                    throw $TypeError(".AICommon.BotMetadata.sessionTransparencyMetadata: object expected");
                m.sessionTransparencyMetadata = $root.AICommon.SessionTransparencyMetadata.fromObject(d.sessionTransparencyMetadata, q + 1);
            }
            if (d.botDocumentMessageMetadata != null) {
                if (!$util.isObject(d.botDocumentMessageMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botDocumentMessageMetadata: object expected");
                m.botDocumentMessageMetadata = $root.AICommon.BotDocumentMessageMetadata.fromObject(d.botDocumentMessageMetadata, q + 1);
            }
            if (d.botGroupMetadata != null) {
                if (!$util.isObject(d.botGroupMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botGroupMetadata: object expected");
                m.botGroupMetadata = $root.AICommon.BotGroupMetadata.fromObject(d.botGroupMetadata, q + 1);
            }
            if (d.botRenderingConfigMetadata != null) {
                if (!$util.isObject(d.botRenderingConfigMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botRenderingConfigMetadata: object expected");
                m.botRenderingConfigMetadata = $root.AICommon.BotRenderingConfigMetadata.fromObject(d.botRenderingConfigMetadata, q + 1);
            }
            if (d.botInfrastructureDiagnostics != null) {
                if (!$util.isObject(d.botInfrastructureDiagnostics))
                    throw $TypeError(".AICommon.BotMetadata.botInfrastructureDiagnostics: object expected");
                m.botInfrastructureDiagnostics = $root.AICommon.BotInfrastructureDiagnostics.fromObject(d.botInfrastructureDiagnostics, q + 1);
            }
            if (d.aiMediaCollectionMetadata != null) {
                if (!$util.isObject(d.aiMediaCollectionMetadata))
                    throw $TypeError(".AICommon.BotMetadata.aiMediaCollectionMetadata: object expected");
                m.aiMediaCollectionMetadata = $root.AICommon.AIMediaCollectionMetadata.fromObject(d.aiMediaCollectionMetadata, q + 1);
            }
            if (d.commandMetadata != null) {
                if (!$util.isObject(d.commandMetadata))
                    throw $TypeError(".AICommon.BotMetadata.commandMetadata: object expected");
                m.commandMetadata = $root.AICommon.BotCommandMetadata.fromObject(d.commandMetadata, q + 1);
            }
            if (d.resolvedToolCallMetadata != null) {
                if (!$util.isObject(d.resolvedToolCallMetadata))
                    throw $TypeError(".AICommon.BotMetadata.resolvedToolCallMetadata: object expected");
                m.resolvedToolCallMetadata = $root.AICommon.BotResolvedToolCallMetadata.fromObject(d.resolvedToolCallMetadata, q + 1);
            }
            if (d.subscriptionUpsellMetadata != null) {
                if (!$util.isObject(d.subscriptionUpsellMetadata))
                    throw $TypeError(".AICommon.BotMetadata.subscriptionUpsellMetadata: object expected");
                m.subscriptionUpsellMetadata = $root.AICommon.AISubscriptionUpsellMetadata.fromObject(d.subscriptionUpsellMetadata, q + 1);
            }
            if (d.pttPromptMetadata != null) {
                if (!$util.isObject(d.pttPromptMetadata))
                    throw $TypeError(".AICommon.BotMetadata.pttPromptMetadata: object expected");
                m.pttPromptMetadata = $root.AICommon.BotPttPromptMetadata.fromObject(d.pttPromptMetadata, q + 1);
            }
            if (d.botHistoryShareMetadata != null) {
                if (!$util.isObject(d.botHistoryShareMetadata))
                    throw $TypeError(".AICommon.BotMetadata.botHistoryShareMetadata: object expected");
                m.botHistoryShareMetadata = $root.AICommon.BotHistoryShareMetadata.fromObject(d.botHistoryShareMetadata, q + 1);
            }
            if (d.responseStoppedByUser != null) {
                m.responseStoppedByUser = $Boolean(d.responseStoppedByUser);
            }
            if (d.internalMetadata != null) {
                if (typeof d.internalMetadata === "string")
                    $util.base64.decode(d.internalMetadata, m.internalMetadata = $util.newBuffer($util.base64.length(d.internalMetadata)), 0);
                else if (d.internalMetadata.length >= 0)
                    m.internalMetadata = d.internalMetadata;
            }
            return m;
        };

        BotMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.personaId != null && $Object.hasOwnProperty.call(m, "personaId")) {
                d.personaId = m.personaId;
            }
            if (m.pluginMetadata != null && $Object.hasOwnProperty.call(m, "pluginMetadata")) {
                d.pluginMetadata = $root.AICommon.BotPluginMetadata.toObject(m.pluginMetadata, o, q + 1);
            }
            if (m.suggestedPromptMetadata != null && $Object.hasOwnProperty.call(m, "suggestedPromptMetadata")) {
                d.suggestedPromptMetadata = $root.AICommon.BotSuggestedPromptMetadata.toObject(m.suggestedPromptMetadata, o, q + 1);
            }
            if (m.invokerJid != null && $Object.hasOwnProperty.call(m, "invokerJid")) {
                d.invokerJid = m.invokerJid;
            }
            if (m.sessionMetadata != null && $Object.hasOwnProperty.call(m, "sessionMetadata")) {
                d.sessionMetadata = $root.AICommon.BotSessionMetadata.toObject(m.sessionMetadata, o, q + 1);
            }
            if (m.memuMetadata != null && $Object.hasOwnProperty.call(m, "memuMetadata")) {
                d.memuMetadata = $root.AICommon.BotMemuMetadata.toObject(m.memuMetadata, o, q + 1);
            }
            if (m.timezone != null && $Object.hasOwnProperty.call(m, "timezone")) {
                d.timezone = m.timezone;
            }
            if (m.reminderMetadata != null && $Object.hasOwnProperty.call(m, "reminderMetadata")) {
                d.reminderMetadata = $root.AICommon.BotReminderMetadata.toObject(m.reminderMetadata, o, q + 1);
            }
            if (m.modelMetadata != null && $Object.hasOwnProperty.call(m, "modelMetadata")) {
                d.modelMetadata = $root.AICommon.BotModelMetadata.toObject(m.modelMetadata, o, q + 1);
            }
            if (m.messageDisclaimerText != null && $Object.hasOwnProperty.call(m, "messageDisclaimerText")) {
                d.messageDisclaimerText = m.messageDisclaimerText;
            }
            if (m.progressIndicatorMetadata != null && $Object.hasOwnProperty.call(m, "progressIndicatorMetadata")) {
                d.progressIndicatorMetadata = $root.AICommon.BotProgressIndicatorMetadata.toObject(m.progressIndicatorMetadata, o, q + 1);
            }
            if (m.capabilityMetadata != null && $Object.hasOwnProperty.call(m, "capabilityMetadata")) {
                d.capabilityMetadata = $root.AICommon.BotCapabilityMetadata.toObject(m.capabilityMetadata, o, q + 1);
            }
            if (m.imagineMetadata != null && $Object.hasOwnProperty.call(m, "imagineMetadata")) {
                d.imagineMetadata = $root.AICommon.BotImagineMetadata.toObject(m.imagineMetadata, o, q + 1);
            }
            if (m.memoryMetadata != null && $Object.hasOwnProperty.call(m, "memoryMetadata")) {
                d.memoryMetadata = $root.AICommon.BotMemoryMetadata.toObject(m.memoryMetadata, o, q + 1);
            }
            if (m.renderingMetadata != null && $Object.hasOwnProperty.call(m, "renderingMetadata")) {
                d.renderingMetadata = $root.AICommon.BotRenderingMetadata.toObject(m.renderingMetadata, o, q + 1);
            }
            if (m.botMetricsMetadata != null && $Object.hasOwnProperty.call(m, "botMetricsMetadata")) {
                d.botMetricsMetadata = $root.AICommon.BotMetricsMetadata.toObject(m.botMetricsMetadata, o, q + 1);
            }
            if (m.botLinkedAccountsMetadata != null && $Object.hasOwnProperty.call(m, "botLinkedAccountsMetadata")) {
                d.botLinkedAccountsMetadata = $root.AICommon.BotLinkedAccountsMetadata.toObject(m.botLinkedAccountsMetadata, o, q + 1);
            }
            if (m.richResponseSourcesMetadata != null && $Object.hasOwnProperty.call(m, "richResponseSourcesMetadata")) {
                d.richResponseSourcesMetadata = $root.AICommon.BotSourcesMetadata.toObject(m.richResponseSourcesMetadata, o, q + 1);
            }
            if (m.aiConversationContext != null && $Object.hasOwnProperty.call(m, "aiConversationContext")) {
                d.aiConversationContext = o.bytes === $String ? $util.base64.encode(m.aiConversationContext, 0, m.aiConversationContext.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.aiConversationContext) : m.aiConversationContext;
            }
            if (m.botPromotionMessageMetadata != null && $Object.hasOwnProperty.call(m, "botPromotionMessageMetadata")) {
                d.botPromotionMessageMetadata = $root.AICommon.BotPromotionMessageMetadata.toObject(m.botPromotionMessageMetadata, o, q + 1);
            }
            if (m.botModeSelectionMetadata != null && $Object.hasOwnProperty.call(m, "botModeSelectionMetadata")) {
                d.botModeSelectionMetadata = $root.AICommon.BotModeSelectionMetadata.toObject(m.botModeSelectionMetadata, o, q + 1);
            }
            if (m.botQuotaMetadata != null && $Object.hasOwnProperty.call(m, "botQuotaMetadata")) {
                d.botQuotaMetadata = $root.AICommon.BotQuotaMetadata.toObject(m.botQuotaMetadata, o, q + 1);
            }
            if (m.botAgeCollectionMetadata != null && $Object.hasOwnProperty.call(m, "botAgeCollectionMetadata")) {
                d.botAgeCollectionMetadata = $root.AICommon.BotAgeCollectionMetadata.toObject(m.botAgeCollectionMetadata, o, q + 1);
            }
            if (m.conversationStarterPromptId != null && $Object.hasOwnProperty.call(m, "conversationStarterPromptId")) {
                d.conversationStarterPromptId = m.conversationStarterPromptId;
            }
            if (m.botResponseId != null && $Object.hasOwnProperty.call(m, "botResponseId")) {
                d.botResponseId = m.botResponseId;
            }
            if (m.verificationMetadata != null && $Object.hasOwnProperty.call(m, "verificationMetadata")) {
                d.verificationMetadata = $root.AICommon.BotSignatureVerificationMetadata.toObject(m.verificationMetadata, o, q + 1);
            }
            if (m.unifiedResponseMutation != null && $Object.hasOwnProperty.call(m, "unifiedResponseMutation")) {
                d.unifiedResponseMutation = $root.AICommon.BotUnifiedResponseMutation.toObject(m.unifiedResponseMutation, o, q + 1);
            }
            if (m.botMessageOriginMetadata != null && $Object.hasOwnProperty.call(m, "botMessageOriginMetadata")) {
                d.botMessageOriginMetadata = $root.AICommon.BotMessageOriginMetadata.toObject(m.botMessageOriginMetadata, o, q + 1);
            }
            if (m.inThreadSurveyMetadata != null && $Object.hasOwnProperty.call(m, "inThreadSurveyMetadata")) {
                d.inThreadSurveyMetadata = $root.AICommon.InThreadSurveyMetadata.toObject(m.inThreadSurveyMetadata, o, q + 1);
            }
            if (m.botThreadInfo != null && $Object.hasOwnProperty.call(m, "botThreadInfo")) {
                d.botThreadInfo = $root.AICommon.AIThreadInfo.toObject(m.botThreadInfo, o, q + 1);
            }
            if (m.regenerateMetadata != null && $Object.hasOwnProperty.call(m, "regenerateMetadata")) {
                d.regenerateMetadata = $root.AICommon.AIRegenerateMetadata.toObject(m.regenerateMetadata, o, q + 1);
            }
            if (m.sessionTransparencyMetadata != null && $Object.hasOwnProperty.call(m, "sessionTransparencyMetadata")) {
                d.sessionTransparencyMetadata = $root.AICommon.SessionTransparencyMetadata.toObject(m.sessionTransparencyMetadata, o, q + 1);
            }
            if (m.botDocumentMessageMetadata != null && $Object.hasOwnProperty.call(m, "botDocumentMessageMetadata")) {
                d.botDocumentMessageMetadata = $root.AICommon.BotDocumentMessageMetadata.toObject(m.botDocumentMessageMetadata, o, q + 1);
            }
            if (m.botGroupMetadata != null && $Object.hasOwnProperty.call(m, "botGroupMetadata")) {
                d.botGroupMetadata = $root.AICommon.BotGroupMetadata.toObject(m.botGroupMetadata, o, q + 1);
            }
            if (m.botRenderingConfigMetadata != null && $Object.hasOwnProperty.call(m, "botRenderingConfigMetadata")) {
                d.botRenderingConfigMetadata = $root.AICommon.BotRenderingConfigMetadata.toObject(m.botRenderingConfigMetadata, o, q + 1);
            }
            if (m.botInfrastructureDiagnostics != null && $Object.hasOwnProperty.call(m, "botInfrastructureDiagnostics")) {
                d.botInfrastructureDiagnostics = $root.AICommon.BotInfrastructureDiagnostics.toObject(m.botInfrastructureDiagnostics, o, q + 1);
            }
            if (m.aiMediaCollectionMetadata != null && $Object.hasOwnProperty.call(m, "aiMediaCollectionMetadata")) {
                d.aiMediaCollectionMetadata = $root.AICommon.AIMediaCollectionMetadata.toObject(m.aiMediaCollectionMetadata, o, q + 1);
            }
            if (m.commandMetadata != null && $Object.hasOwnProperty.call(m, "commandMetadata")) {
                d.commandMetadata = $root.AICommon.BotCommandMetadata.toObject(m.commandMetadata, o, q + 1);
            }
            if (m.resolvedToolCallMetadata != null && $Object.hasOwnProperty.call(m, "resolvedToolCallMetadata")) {
                d.resolvedToolCallMetadata = $root.AICommon.BotResolvedToolCallMetadata.toObject(m.resolvedToolCallMetadata, o, q + 1);
            }
            if (m.subscriptionUpsellMetadata != null && $Object.hasOwnProperty.call(m, "subscriptionUpsellMetadata")) {
                d.subscriptionUpsellMetadata = $root.AICommon.AISubscriptionUpsellMetadata.toObject(m.subscriptionUpsellMetadata, o, q + 1);
            }
            if (m.pttPromptMetadata != null && $Object.hasOwnProperty.call(m, "pttPromptMetadata")) {
                d.pttPromptMetadata = $root.AICommon.BotPttPromptMetadata.toObject(m.pttPromptMetadata, o, q + 1);
            }
            if (m.botHistoryShareMetadata != null && $Object.hasOwnProperty.call(m, "botHistoryShareMetadata")) {
                d.botHistoryShareMetadata = $root.AICommon.BotHistoryShareMetadata.toObject(m.botHistoryShareMetadata, o, q + 1);
            }
            if (m.responseStoppedByUser != null && $Object.hasOwnProperty.call(m, "responseStoppedByUser")) {
                d.responseStoppedByUser = m.responseStoppedByUser;
            }
            if (m.internalMetadata != null && $Object.hasOwnProperty.call(m, "internalMetadata")) {
                d.internalMetadata = o.bytes === $String ? $util.base64.encode(m.internalMetadata, 0, m.internalMetadata.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.internalMetadata) : m.internalMetadata;
            }
            return d;
        };

        BotMetadata.prototype.toJSON = function() {
            return BotMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMetadata";
        };

        return BotMetadata;
    })();

    AICommon.BotPttPromptMetadata = (function() {

        const BotPttPromptMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPttPromptMetadata.prototype.transcript = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPttPromptMetadata.prototype, "_transcript", {
            get: $util.oneOfGetter($oneOfFields = ["transcript"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPttPromptMetadata.create = function(properties) {
            return new BotPttPromptMetadata(properties);
        };

        BotPttPromptMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.transcript != null && $Object.hasOwnProperty.call(m, "transcript"))
                w.uint32(10).string(m.transcript);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPttPromptMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotPttPromptMetadata();
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
                        m.transcript = r.stringVerify();
                        m._transcript = "transcript";
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

        BotPttPromptMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotPttPromptMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotPttPromptMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotPttPromptMetadata();
            if (d.transcript != null) {
                m.transcript = $String(d.transcript);
            }
            return m;
        };

        BotPttPromptMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.transcript != null && $Object.hasOwnProperty.call(m, "transcript")) {
                d.transcript = m.transcript;
            }
            return d;
        };

        BotPttPromptMetadata.prototype.toJSON = function() {
            return BotPttPromptMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPttPromptMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotPttPromptMetadata";
        };

        return BotPttPromptMetadata;
    })();

    AICommon.BotResolvedToolCallMetadata = (function() {

        const BotResolvedToolCallMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotResolvedToolCallMetadata.prototype.toolCallId = null;
        BotResolvedToolCallMetadata.prototype.resolutionDataSerialized = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotResolvedToolCallMetadata.prototype, "_toolCallId", {
            get: $util.oneOfGetter($oneOfFields = ["toolCallId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotResolvedToolCallMetadata.prototype, "_resolutionDataSerialized", {
            get: $util.oneOfGetter($oneOfFields = ["resolutionDataSerialized"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotResolvedToolCallMetadata.create = function(properties) {
            return new BotResolvedToolCallMetadata(properties);
        };

        BotResolvedToolCallMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.toolCallId != null && $Object.hasOwnProperty.call(m, "toolCallId"))
                w.uint32(10).string(m.toolCallId);
            if (m.resolutionDataSerialized != null && $Object.hasOwnProperty.call(m, "resolutionDataSerialized"))
                w.uint32(18).string(m.resolutionDataSerialized);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotResolvedToolCallMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotResolvedToolCallMetadata();
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
                        m.toolCallId = r.stringVerify();
                        m._toolCallId = "toolCallId";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.resolutionDataSerialized = r.stringVerify();
                        m._resolutionDataSerialized = "resolutionDataSerialized";
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

        BotResolvedToolCallMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotResolvedToolCallMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotResolvedToolCallMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotResolvedToolCallMetadata();
            if (d.toolCallId != null) {
                m.toolCallId = $String(d.toolCallId);
            }
            if (d.resolutionDataSerialized != null) {
                m.resolutionDataSerialized = $String(d.resolutionDataSerialized);
            }
            return m;
        };

        BotResolvedToolCallMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.toolCallId != null && $Object.hasOwnProperty.call(m, "toolCallId")) {
                d.toolCallId = m.toolCallId;
            }
            if (m.resolutionDataSerialized != null && $Object.hasOwnProperty.call(m, "resolutionDataSerialized")) {
                d.resolutionDataSerialized = m.resolutionDataSerialized;
            }
            return d;
        };

        BotResolvedToolCallMetadata.prototype.toJSON = function() {
            return BotResolvedToolCallMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotResolvedToolCallMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotResolvedToolCallMetadata";
        };

        return BotResolvedToolCallMetadata;
    })();

    AICommon.BotCommandMetadata = (function() {

        const BotCommandMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotCommandMetadata.prototype.commandName = null;
        BotCommandMetadata.prototype.commandDescription = null;
        BotCommandMetadata.prototype.commandPrompt = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotCommandMetadata.prototype, "_commandName", {
            get: $util.oneOfGetter($oneOfFields = ["commandName"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotCommandMetadata.prototype, "_commandDescription", {
            get: $util.oneOfGetter($oneOfFields = ["commandDescription"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotCommandMetadata.prototype, "_commandPrompt", {
            get: $util.oneOfGetter($oneOfFields = ["commandPrompt"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotCommandMetadata.create = function(properties) {
            return new BotCommandMetadata(properties);
        };

        BotCommandMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.commandName != null && $Object.hasOwnProperty.call(m, "commandName"))
                w.uint32(10).string(m.commandName);
            if (m.commandDescription != null && $Object.hasOwnProperty.call(m, "commandDescription"))
                w.uint32(18).string(m.commandDescription);
            if (m.commandPrompt != null && $Object.hasOwnProperty.call(m, "commandPrompt"))
                w.uint32(26).string(m.commandPrompt);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotCommandMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotCommandMetadata();
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
                        m.commandName = r.stringVerify();
                        m._commandName = "commandName";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.commandDescription = r.stringVerify();
                        m._commandDescription = "commandDescription";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.commandPrompt = r.stringVerify();
                        m._commandPrompt = "commandPrompt";
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

        BotCommandMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotCommandMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotCommandMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotCommandMetadata();
            if (d.commandName != null) {
                m.commandName = $String(d.commandName);
            }
            if (d.commandDescription != null) {
                m.commandDescription = $String(d.commandDescription);
            }
            if (d.commandPrompt != null) {
                m.commandPrompt = $String(d.commandPrompt);
            }
            return m;
        };

        BotCommandMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.commandName != null && $Object.hasOwnProperty.call(m, "commandName")) {
                d.commandName = m.commandName;
            }
            if (m.commandDescription != null && $Object.hasOwnProperty.call(m, "commandDescription")) {
                d.commandDescription = m.commandDescription;
            }
            if (m.commandPrompt != null && $Object.hasOwnProperty.call(m, "commandPrompt")) {
                d.commandPrompt = m.commandPrompt;
            }
            return d;
        };

        BotCommandMetadata.prototype.toJSON = function() {
            return BotCommandMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotCommandMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotCommandMetadata";
        };

        return BotCommandMetadata;
    })();

    AICommon.AIMetadataOperation = (function() {

        const AIMetadataOperation = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIMetadataOperation.prototype.hatchMetadataSync = null;
        AIMetadataOperation.prototype.bizAiMetadataSync = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMetadataOperation.prototype, "_hatchMetadataSync", {
            get: $util.oneOfGetter($oneOfFields = ["hatchMetadataSync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMetadataOperation.prototype, "_bizAiMetadataSync", {
            get: $util.oneOfGetter($oneOfFields = ["bizAiMetadataSync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIMetadataOperation.create = function(properties) {
            return new AIMetadataOperation(properties);
        };

        AIMetadataOperation.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.hatchMetadataSync != null && $Object.hasOwnProperty.call(m, "hatchMetadataSync"))
                $root.AICommon.HatchMetadataSync.encode(m.hatchMetadataSync, w.uint32(10).fork(), q + 1).ldelim();
            if (m.bizAiMetadataSync != null && $Object.hasOwnProperty.call(m, "bizAiMetadataSync"))
                $root.AICommon.BizAIMetadataSync.encode(m.bizAiMetadataSync, w.uint32(18).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIMetadataOperation.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIMetadataOperation();
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
                        m.hatchMetadataSync = $root.AICommon.HatchMetadataSync.decode(r, r.uint32(), $undefined, q + 1, m.hatchMetadataSync);
                        m._hatchMetadataSync = "hatchMetadataSync";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.bizAiMetadataSync = $root.AICommon.BizAIMetadataSync.decode(r, r.uint32(), $undefined, q + 1, m.bizAiMetadataSync);
                        m._bizAiMetadataSync = "bizAiMetadataSync";
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

        AIMetadataOperation.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIMetadataOperation)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIMetadataOperation: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIMetadataOperation();
            if (d.hatchMetadataSync != null) {
                if (!$util.isObject(d.hatchMetadataSync))
                    throw $TypeError(".AICommon.AIMetadataOperation.hatchMetadataSync: object expected");
                m.hatchMetadataSync = $root.AICommon.HatchMetadataSync.fromObject(d.hatchMetadataSync, q + 1);
            }
            if (d.bizAiMetadataSync != null) {
                if (!$util.isObject(d.bizAiMetadataSync))
                    throw $TypeError(".AICommon.AIMetadataOperation.bizAiMetadataSync: object expected");
                m.bizAiMetadataSync = $root.AICommon.BizAIMetadataSync.fromObject(d.bizAiMetadataSync, q + 1);
            }
            return m;
        };

        AIMetadataOperation.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.hatchMetadataSync != null && $Object.hasOwnProperty.call(m, "hatchMetadataSync")) {
                d.hatchMetadataSync = $root.AICommon.HatchMetadataSync.toObject(m.hatchMetadataSync, o, q + 1);
            }
            if (m.bizAiMetadataSync != null && $Object.hasOwnProperty.call(m, "bizAiMetadataSync")) {
                d.bizAiMetadataSync = $root.AICommon.BizAIMetadataSync.toObject(m.bizAiMetadataSync, o, q + 1);
            }
            return d;
        };

        AIMetadataOperation.prototype.toJSON = function() {
            return AIMetadataOperation.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIMetadataOperation.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIMetadataOperation";
        };

        return AIMetadataOperation;
    })();

    AICommon.HatchMetadataSync = (function() {

        const HatchMetadataSync = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        HatchMetadataSync.prototype.data = null;
        HatchMetadataSync.prototype.timestampMs = null;
        HatchMetadataSync.prototype.requestId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HatchMetadataSync.prototype, "_data", {
            get: $util.oneOfGetter($oneOfFields = ["data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HatchMetadataSync.prototype, "_timestampMs", {
            get: $util.oneOfGetter($oneOfFields = ["timestampMs"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(HatchMetadataSync.prototype, "_requestId", {
            get: $util.oneOfGetter($oneOfFields = ["requestId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        HatchMetadataSync.create = function(properties) {
            return new HatchMetadataSync(properties);
        };

        HatchMetadataSync.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.data != null && $Object.hasOwnProperty.call(m, "data"))
                w.uint32(10).bytes(m.data);
            if (m.timestampMs != null && $Object.hasOwnProperty.call(m, "timestampMs"))
                w.uint32(16).int64(m.timestampMs);
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId"))
                w.uint32(26).string(m.requestId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        HatchMetadataSync.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.HatchMetadataSync();
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
                        m.data = r.bytes();
                        m._data = "data";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.timestampMs = r.int64();
                        m._timestampMs = "timestampMs";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.requestId = r.stringVerify();
                        m._requestId = "requestId";
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

        HatchMetadataSync.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.HatchMetadataSync)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.HatchMetadataSync: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.HatchMetadataSync();
            if (d.data != null) {
                if (typeof d.data === "string")
                    $util.base64.decode(d.data, m.data = $util.newBuffer($util.base64.length(d.data)), 0);
                else if (d.data.length >= 0)
                    m.data = d.data;
            }
            if (d.timestampMs != null) {
                if ($util.Long)
                    m.timestampMs = $util.Long.fromValue(d.timestampMs, false);
                else if (typeof d.timestampMs === "string")
                    m.timestampMs = $parseInt(d.timestampMs, 10);
                else if (typeof d.timestampMs === "number")
                    m.timestampMs = d.timestampMs;
                else if (typeof d.timestampMs === "object")
                    m.timestampMs = new $util.LongBits(d.timestampMs.low >>> 0, d.timestampMs.high >>> 0).toNumber();
            }
            if (d.requestId != null) {
                m.requestId = $String(d.requestId);
            }
            return m;
        };

        HatchMetadataSync.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.data != null && $Object.hasOwnProperty.call(m, "data")) {
                d.data = o.bytes === $String ? $util.base64.encode(m.data, 0, m.data.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.data) : m.data;
            }
            if (m.timestampMs != null && $Object.hasOwnProperty.call(m, "timestampMs")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.timestampMs = typeof m.timestampMs === "number" ? $BigInt(m.timestampMs) : $util.Long.fromBits(m.timestampMs.low >>> 0, m.timestampMs.high >>> 0, false).toBigInt();
                else if (typeof m.timestampMs === "number")
                    d.timestampMs = o.longs === $String ? $String(m.timestampMs) : m.timestampMs;
                else
                    d.timestampMs = o.longs === $String ? $util.Long.prototype.toString.call(m.timestampMs) : o.longs === $Number ? new $util.LongBits(m.timestampMs.low >>> 0, m.timestampMs.high >>> 0).toNumber() : m.timestampMs;
            }
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId")) {
                d.requestId = m.requestId;
            }
            return d;
        };

        HatchMetadataSync.prototype.toJSON = function() {
            return HatchMetadataSync.toObject(this, $protobuf.util.toJSONOptions);
        };

        HatchMetadataSync.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.HatchMetadataSync";
        };

        return HatchMetadataSync;
    })();

    AICommon.AIMediaCollectionMessage = (function() {

        const AIMediaCollectionMessage = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIMediaCollectionMessage.prototype.collectionId = null;
        AIMediaCollectionMessage.prototype.expectedMediaCount = null;
        AIMediaCollectionMessage.prototype.hasGlobalCaption = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMediaCollectionMessage.prototype, "_collectionId", {
            get: $util.oneOfGetter($oneOfFields = ["collectionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMediaCollectionMessage.prototype, "_expectedMediaCount", {
            get: $util.oneOfGetter($oneOfFields = ["expectedMediaCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMediaCollectionMessage.prototype, "_hasGlobalCaption", {
            get: $util.oneOfGetter($oneOfFields = ["hasGlobalCaption"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIMediaCollectionMessage.create = function(properties) {
            return new AIMediaCollectionMessage(properties);
        };

        AIMediaCollectionMessage.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.collectionId != null && $Object.hasOwnProperty.call(m, "collectionId"))
                w.uint32(10).string(m.collectionId);
            if (m.expectedMediaCount != null && $Object.hasOwnProperty.call(m, "expectedMediaCount"))
                w.uint32(16).uint32(m.expectedMediaCount);
            if (m.hasGlobalCaption != null && $Object.hasOwnProperty.call(m, "hasGlobalCaption"))
                w.uint32(24).bool(m.hasGlobalCaption);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIMediaCollectionMessage.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIMediaCollectionMessage();
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
                        m.collectionId = r.stringVerify();
                        m._collectionId = "collectionId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.expectedMediaCount = r.uint32();
                        m._expectedMediaCount = "expectedMediaCount";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.hasGlobalCaption = r.bool();
                        m._hasGlobalCaption = "hasGlobalCaption";
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

        AIMediaCollectionMessage.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIMediaCollectionMessage)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIMediaCollectionMessage: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIMediaCollectionMessage();
            if (d.collectionId != null) {
                m.collectionId = $String(d.collectionId);
            }
            if (d.expectedMediaCount != null) {
                m.expectedMediaCount = d.expectedMediaCount >>> 0;
            }
            if (d.hasGlobalCaption != null) {
                m.hasGlobalCaption = $Boolean(d.hasGlobalCaption);
            }
            return m;
        };

        AIMediaCollectionMessage.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.collectionId != null && $Object.hasOwnProperty.call(m, "collectionId")) {
                d.collectionId = m.collectionId;
            }
            if (m.expectedMediaCount != null && $Object.hasOwnProperty.call(m, "expectedMediaCount")) {
                d.expectedMediaCount = m.expectedMediaCount;
            }
            if (m.hasGlobalCaption != null && $Object.hasOwnProperty.call(m, "hasGlobalCaption")) {
                d.hasGlobalCaption = m.hasGlobalCaption;
            }
            return d;
        };

        AIMediaCollectionMessage.prototype.toJSON = function() {
            return AIMediaCollectionMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIMediaCollectionMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIMediaCollectionMessage";
        };

        return AIMediaCollectionMessage;
    })();

    AICommon.AIMediaCollectionMetadata = (function() {

        const AIMediaCollectionMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIMediaCollectionMetadata.prototype.collectionId = null;
        AIMediaCollectionMetadata.prototype.uploadOrderIndex = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMediaCollectionMetadata.prototype, "_collectionId", {
            get: $util.oneOfGetter($oneOfFields = ["collectionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIMediaCollectionMetadata.prototype, "_uploadOrderIndex", {
            get: $util.oneOfGetter($oneOfFields = ["uploadOrderIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIMediaCollectionMetadata.create = function(properties) {
            return new AIMediaCollectionMetadata(properties);
        };

        AIMediaCollectionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.collectionId != null && $Object.hasOwnProperty.call(m, "collectionId"))
                w.uint32(10).string(m.collectionId);
            if (m.uploadOrderIndex != null && $Object.hasOwnProperty.call(m, "uploadOrderIndex"))
                w.uint32(16).uint32(m.uploadOrderIndex);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIMediaCollectionMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIMediaCollectionMetadata();
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
                        m.collectionId = r.stringVerify();
                        m._collectionId = "collectionId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.uploadOrderIndex = r.uint32();
                        m._uploadOrderIndex = "uploadOrderIndex";
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

        AIMediaCollectionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIMediaCollectionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIMediaCollectionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIMediaCollectionMetadata();
            if (d.collectionId != null) {
                m.collectionId = $String(d.collectionId);
            }
            if (d.uploadOrderIndex != null) {
                m.uploadOrderIndex = d.uploadOrderIndex >>> 0;
            }
            return m;
        };

        AIMediaCollectionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.collectionId != null && $Object.hasOwnProperty.call(m, "collectionId")) {
                d.collectionId = m.collectionId;
            }
            if (m.uploadOrderIndex != null && $Object.hasOwnProperty.call(m, "uploadOrderIndex")) {
                d.uploadOrderIndex = m.uploadOrderIndex;
            }
            return d;
        };

        AIMediaCollectionMetadata.prototype.toJSON = function() {
            return AIMediaCollectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIMediaCollectionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIMediaCollectionMetadata";
        };

        return AIMediaCollectionMetadata;
    })();

    AICommon.AIThreadInfo = (function() {

        const AIThreadInfo = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        AIThreadInfo.prototype.serverInfo = null;
        AIThreadInfo.prototype.clientInfo = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIThreadInfo.prototype, "_serverInfo", {
            get: $util.oneOfGetter($oneOfFields = ["serverInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AIThreadInfo.prototype, "_clientInfo", {
            get: $util.oneOfGetter($oneOfFields = ["clientInfo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        AIThreadInfo.create = function(properties) {
            return new AIThreadInfo(properties);
        };

        AIThreadInfo.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.serverInfo != null && $Object.hasOwnProperty.call(m, "serverInfo"))
                $root.AICommon.AIThreadInfo.AIThreadServerInfo.encode(m.serverInfo, w.uint32(10).fork(), q + 1).ldelim();
            if (m.clientInfo != null && $Object.hasOwnProperty.call(m, "clientInfo"))
                $root.AICommon.AIThreadInfo.AIThreadClientInfo.encode(m.clientInfo, w.uint32(18).fork(), q + 1).ldelim();
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        AIThreadInfo.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.AIThreadInfo();
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
                        m.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.decode(r, r.uint32(), $undefined, q + 1, m.serverInfo);
                        m._serverInfo = "serverInfo";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.decode(r, r.uint32(), $undefined, q + 1, m.clientInfo);
                        m._clientInfo = "clientInfo";
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

        AIThreadInfo.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.AIThreadInfo)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.AIThreadInfo: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.AIThreadInfo();
            if (d.serverInfo != null) {
                if (!$util.isObject(d.serverInfo))
                    throw $TypeError(".AICommon.AIThreadInfo.serverInfo: object expected");
                m.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.fromObject(d.serverInfo, q + 1);
            }
            if (d.clientInfo != null) {
                if (!$util.isObject(d.clientInfo))
                    throw $TypeError(".AICommon.AIThreadInfo.clientInfo: object expected");
                m.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.fromObject(d.clientInfo, q + 1);
            }
            return m;
        };

        AIThreadInfo.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.serverInfo != null && $Object.hasOwnProperty.call(m, "serverInfo")) {
                d.serverInfo = $root.AICommon.AIThreadInfo.AIThreadServerInfo.toObject(m.serverInfo, o, q + 1);
            }
            if (m.clientInfo != null && $Object.hasOwnProperty.call(m, "clientInfo")) {
                d.clientInfo = $root.AICommon.AIThreadInfo.AIThreadClientInfo.toObject(m.clientInfo, o, q + 1);
            }
            return d;
        };

        AIThreadInfo.prototype.toJSON = function() {
            return AIThreadInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        AIThreadInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.AIThreadInfo";
        };

        AIThreadInfo.AIThreadClientInfo = (function() {

            const AIThreadClientInfo = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIThreadClientInfo.prototype.type = null;
            AIThreadClientInfo.prototype.sourceChatJid = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIThreadClientInfo.prototype, "_type", {
                get: $util.oneOfGetter($oneOfFields = ["type"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIThreadClientInfo.prototype, "_sourceChatJid", {
                get: $util.oneOfGetter($oneOfFields = ["sourceChatJid"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIThreadClientInfo.create = function(properties) {
                return new AIThreadClientInfo(properties);
            };

            AIThreadClientInfo.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                    w.uint32(8).int32(m.type);
                if (m.sourceChatJid != null && $Object.hasOwnProperty.call(m, "sourceChatJid"))
                    w.uint32(18).string(m.sourceChatJid);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIThreadClientInfo.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.AIThreadInfo.AIThreadClientInfo();
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
                            m.type = r.int32();
                            m._type = "type";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.sourceChatJid = r.stringVerify();
                            m._sourceChatJid = "sourceChatJid";
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

            AIThreadClientInfo.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.AIThreadInfo.AIThreadClientInfo)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.AIThreadInfo.AIThreadClientInfo: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.AIThreadInfo.AIThreadClientInfo();
                switch (d.type) {
                case "UNKNOWN":
                case 0:
                    m.type = 0;
                    break;
                case "DEFAULT":
                case 1:
                    m.type = 1;
                    break;
                case "INCOGNITO":
                case 2:
                    m.type = 2;
                    break;
                case "SIDE_CHAT":
                case 3:
                    m.type = 3;
                    break;
                default:
                    if (typeof d.type === "number" && (d.type | 0) === d.type)
                        m.type = d.type;
                }
                if (d.sourceChatJid != null) {
                    m.sourceChatJid = $String(d.sourceChatJid);
                }
                return m;
            };

            AIThreadClientInfo.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                    d.type = o.enums === $String ? $root.AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType[m.type] === $undefined ? m.type : $root.AICommon.AIThreadInfo.AIThreadClientInfo.AIThreadType[m.type] : m.type;
                }
                if (m.sourceChatJid != null && $Object.hasOwnProperty.call(m, "sourceChatJid")) {
                    d.sourceChatJid = m.sourceChatJid;
                }
                return d;
            };

            AIThreadClientInfo.prototype.toJSON = function() {
                return AIThreadClientInfo.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIThreadClientInfo.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.AIThreadInfo.AIThreadClientInfo";
            };

            AIThreadClientInfo.AIThreadType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "DEFAULT"] = 1;
                values[valuesById[2] = "INCOGNITO"] = 2;
                values[valuesById[3] = "SIDE_CHAT"] = 3;
                return values;
            })();

            return AIThreadClientInfo;
        })();

        AIThreadInfo.AIThreadServerInfo = (function() {

            const AIThreadServerInfo = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            AIThreadServerInfo.prototype.title = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(AIThreadServerInfo.prototype, "_title", {
                get: $util.oneOfGetter($oneOfFields = ["title"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            AIThreadServerInfo.create = function(properties) {
                return new AIThreadServerInfo(properties);
            };

            AIThreadServerInfo.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                    w.uint32(10).string(m.title);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            AIThreadServerInfo.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.AIThreadInfo.AIThreadServerInfo();
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
                            m.title = r.stringVerify();
                            m._title = "title";
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

            AIThreadServerInfo.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.AIThreadInfo.AIThreadServerInfo)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.AIThreadInfo.AIThreadServerInfo: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.AIThreadInfo.AIThreadServerInfo();
                if (d.title != null) {
                    m.title = $String(d.title);
                }
                return m;
            };

            AIThreadServerInfo.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                    d.title = m.title;
                }
                return d;
            };

            AIThreadServerInfo.prototype.toJSON = function() {
                return AIThreadServerInfo.toObject(this, $protobuf.util.toJSONOptions);
            };

            AIThreadServerInfo.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.AIThreadInfo.AIThreadServerInfo";
            };

            return AIThreadServerInfo;
        })();

        return AIThreadInfo;
    })();

    AICommon.BotUnifiedResponseMutation = (function() {

        const BotUnifiedResponseMutation = function (p) {
            this.mediaDetailsMetadataList = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotUnifiedResponseMutation.prototype.sbsMetadata = null;
        BotUnifiedResponseMutation.prototype.mediaDetailsMetadataList = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotUnifiedResponseMutation.prototype, "_sbsMetadata", {
            get: $util.oneOfGetter($oneOfFields = ["sbsMetadata"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotUnifiedResponseMutation.create = function(properties) {
            return new BotUnifiedResponseMutation(properties);
        };

        BotUnifiedResponseMutation.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sbsMetadata != null && $Object.hasOwnProperty.call(m, "sbsMetadata"))
                $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.encode(m.sbsMetadata, w.uint32(10).fork(), q + 1).ldelim();
            if (m.mediaDetailsMetadataList != null && m.mediaDetailsMetadataList.length) {
                for (var i = 0; i < m.mediaDetailsMetadataList.length; ++i)
                    $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.encode(m.mediaDetailsMetadataList[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotUnifiedResponseMutation.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotUnifiedResponseMutation();
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
                        m.sbsMetadata = $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.decode(r, r.uint32(), $undefined, q + 1, m.sbsMetadata);
                        m._sbsMetadata = "sbsMetadata";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.mediaDetailsMetadataList && m.mediaDetailsMetadataList.length))
                            m.mediaDetailsMetadataList = [];
                        m.mediaDetailsMetadataList.push($root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

        BotUnifiedResponseMutation.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotUnifiedResponseMutation)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotUnifiedResponseMutation: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotUnifiedResponseMutation();
            if (d.sbsMetadata != null) {
                if (!$util.isObject(d.sbsMetadata))
                    throw $TypeError(".AICommon.BotUnifiedResponseMutation.sbsMetadata: object expected");
                m.sbsMetadata = $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.fromObject(d.sbsMetadata, q + 1);
            }
            if (d.mediaDetailsMetadataList) {
                if (!$Array.isArray(d.mediaDetailsMetadataList))
                    throw $TypeError(".AICommon.BotUnifiedResponseMutation.mediaDetailsMetadataList: array expected");
                m.mediaDetailsMetadataList = $Array(d.mediaDetailsMetadataList.length);
                for (var i = 0; i < d.mediaDetailsMetadataList.length; ++i) {
                    if (!$util.isObject(d.mediaDetailsMetadataList[i]))
                        throw $TypeError(".AICommon.BotUnifiedResponseMutation.mediaDetailsMetadataList: object expected");
                    m.mediaDetailsMetadataList[i] = $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.fromObject(d.mediaDetailsMetadataList[i], q + 1);
                }
            }
            return m;
        };

        BotUnifiedResponseMutation.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.mediaDetailsMetadataList = [];
            }
            if (m.sbsMetadata != null && $Object.hasOwnProperty.call(m, "sbsMetadata")) {
                d.sbsMetadata = $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata.toObject(m.sbsMetadata, o, q + 1);
            }
            if (m.mediaDetailsMetadataList && m.mediaDetailsMetadataList.length) {
                d.mediaDetailsMetadataList = $Array(m.mediaDetailsMetadataList.length);
                for (var j = 0; j < m.mediaDetailsMetadataList.length; ++j) {
                    d.mediaDetailsMetadataList[j] = $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.toObject(m.mediaDetailsMetadataList[j], o, q + 1);
                }
            }
            return d;
        };

        BotUnifiedResponseMutation.prototype.toJSON = function() {
            return BotUnifiedResponseMutation.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotUnifiedResponseMutation.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotUnifiedResponseMutation";
        };

        BotUnifiedResponseMutation.MediaDetailsMetadata = (function() {

            const MediaDetailsMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            MediaDetailsMetadata.prototype.id = null;
            MediaDetailsMetadata.prototype.highResMedia = null;
            MediaDetailsMetadata.prototype.previewMedia = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(MediaDetailsMetadata.prototype, "_id", {
                get: $util.oneOfGetter($oneOfFields = ["id"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(MediaDetailsMetadata.prototype, "_highResMedia", {
                get: $util.oneOfGetter($oneOfFields = ["highResMedia"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(MediaDetailsMetadata.prototype, "_previewMedia", {
                get: $util.oneOfGetter($oneOfFields = ["previewMedia"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            MediaDetailsMetadata.create = function(properties) {
                return new MediaDetailsMetadata(properties);
            };

            MediaDetailsMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.id != null && $Object.hasOwnProperty.call(m, "id"))
                    w.uint32(10).string(m.id);
                if (m.highResMedia != null && $Object.hasOwnProperty.call(m, "highResMedia"))
                    $root.AICommon.BotMediaMetadata.encode(m.highResMedia, w.uint32(18).fork(), q + 1).ldelim();
                if (m.previewMedia != null && $Object.hasOwnProperty.call(m, "previewMedia"))
                    $root.AICommon.BotMediaMetadata.encode(m.previewMedia, w.uint32(26).fork(), q + 1).ldelim();
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            MediaDetailsMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata();
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
                            m.id = r.stringVerify();
                            m._id = "id";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.highResMedia = $root.AICommon.BotMediaMetadata.decode(r, r.uint32(), $undefined, q + 1, m.highResMedia);
                            m._highResMedia = "highResMedia";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.previewMedia = $root.AICommon.BotMediaMetadata.decode(r, r.uint32(), $undefined, q + 1, m.previewMedia);
                            m._previewMedia = "previewMedia";
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

            MediaDetailsMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata();
                if (d.id != null) {
                    m.id = $String(d.id);
                }
                if (d.highResMedia != null) {
                    if (!$util.isObject(d.highResMedia))
                        throw $TypeError(".AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.highResMedia: object expected");
                    m.highResMedia = $root.AICommon.BotMediaMetadata.fromObject(d.highResMedia, q + 1);
                }
                if (d.previewMedia != null) {
                    if (!$util.isObject(d.previewMedia))
                        throw $TypeError(".AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata.previewMedia: object expected");
                    m.previewMedia = $root.AICommon.BotMediaMetadata.fromObject(d.previewMedia, q + 1);
                }
                return m;
            };

            MediaDetailsMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.id != null && $Object.hasOwnProperty.call(m, "id")) {
                    d.id = m.id;
                }
                if (m.highResMedia != null && $Object.hasOwnProperty.call(m, "highResMedia")) {
                    d.highResMedia = $root.AICommon.BotMediaMetadata.toObject(m.highResMedia, o, q + 1);
                }
                if (m.previewMedia != null && $Object.hasOwnProperty.call(m, "previewMedia")) {
                    d.previewMedia = $root.AICommon.BotMediaMetadata.toObject(m.previewMedia, o, q + 1);
                }
                return d;
            };

            MediaDetailsMetadata.prototype.toJSON = function() {
                return MediaDetailsMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            MediaDetailsMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotUnifiedResponseMutation.MediaDetailsMetadata";
            };

            return MediaDetailsMetadata;
        })();

        BotUnifiedResponseMutation.SideBySideMetadata = (function() {

            const SideBySideMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            SideBySideMetadata.prototype.primaryResponseId = null;
            SideBySideMetadata.prototype.surveyCtaHasRendered = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideMetadata.prototype, "_primaryResponseId", {
                get: $util.oneOfGetter($oneOfFields = ["primaryResponseId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(SideBySideMetadata.prototype, "_surveyCtaHasRendered", {
                get: $util.oneOfGetter($oneOfFields = ["surveyCtaHasRendered"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            SideBySideMetadata.create = function(properties) {
                return new SideBySideMetadata(properties);
            };

            SideBySideMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId"))
                    w.uint32(10).string(m.primaryResponseId);
                if (m.surveyCtaHasRendered != null && $Object.hasOwnProperty.call(m, "surveyCtaHasRendered"))
                    w.uint32(16).bool(m.surveyCtaHasRendered);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            SideBySideMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata();
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
                            m.primaryResponseId = r.stringVerify();
                            m._primaryResponseId = "primaryResponseId";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.surveyCtaHasRendered = r.bool();
                            m._surveyCtaHasRendered = "surveyCtaHasRendered";
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

            SideBySideMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotUnifiedResponseMutation.SideBySideMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotUnifiedResponseMutation.SideBySideMetadata();
                if (d.primaryResponseId != null) {
                    m.primaryResponseId = $String(d.primaryResponseId);
                }
                if (d.surveyCtaHasRendered != null) {
                    m.surveyCtaHasRendered = $Boolean(d.surveyCtaHasRendered);
                }
                return m;
            };

            SideBySideMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.primaryResponseId != null && $Object.hasOwnProperty.call(m, "primaryResponseId")) {
                    d.primaryResponseId = m.primaryResponseId;
                }
                if (m.surveyCtaHasRendered != null && $Object.hasOwnProperty.call(m, "surveyCtaHasRendered")) {
                    d.surveyCtaHasRendered = m.surveyCtaHasRendered;
                }
                return d;
            };

            SideBySideMetadata.prototype.toJSON = function() {
                return SideBySideMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            SideBySideMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotUnifiedResponseMutation.SideBySideMetadata";
            };

            return SideBySideMetadata;
        })();

        return BotUnifiedResponseMutation;
    })();

    AICommon.BotMessageOrigin = (function() {

        const BotMessageOrigin = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMessageOrigin.prototype.type = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMessageOrigin.prototype, "_type", {
            get: $util.oneOfGetter($oneOfFields = ["type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMessageOrigin.create = function(properties) {
            return new BotMessageOrigin(properties);
        };

        BotMessageOrigin.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                w.uint32(8).int32(m.type);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMessageOrigin.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMessageOrigin();
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
                        m.type = r.int32();
                        m._type = "type";
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

        BotMessageOrigin.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMessageOrigin)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMessageOrigin: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMessageOrigin();
            switch (d.type) {
            case "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED":
            case 0:
                m.type = 0;
                break;
            default:
                if (typeof d.type === "number" && (d.type | 0) === d.type)
                    m.type = d.type;
            }
            return m;
        };

        BotMessageOrigin.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                d.type = o.enums === $String ? $root.AICommon.BotMessageOrigin.BotMessageOriginType[m.type] === $undefined ? m.type : $root.AICommon.BotMessageOrigin.BotMessageOriginType[m.type] : m.type;
            }
            return d;
        };

        BotMessageOrigin.prototype.toJSON = function() {
            return BotMessageOrigin.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMessageOrigin.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMessageOrigin";
        };

        BotMessageOrigin.BotMessageOriginType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "BOT_MESSAGE_ORIGIN_TYPE_AI_INITIATED"] = 0;
            return values;
        })();

        return BotMessageOrigin;
    })();

    AICommon.BotMessageOriginMetadata = (function() {

        const BotMessageOriginMetadata = function (p) {
            this.origins = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMessageOriginMetadata.prototype.origins = $util.emptyArray;

        BotMessageOriginMetadata.create = function(properties) {
            return new BotMessageOriginMetadata(properties);
        };

        BotMessageOriginMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.origins != null && m.origins.length) {
                for (var i = 0; i < m.origins.length; ++i)
                    $root.AICommon.BotMessageOrigin.encode(m.origins[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMessageOriginMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMessageOriginMetadata();
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
                        if (!(m.origins && m.origins.length))
                            m.origins = [];
                        m.origins.push($root.AICommon.BotMessageOrigin.decode(r, r.uint32(), $undefined, q + 1));
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

        BotMessageOriginMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMessageOriginMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMessageOriginMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMessageOriginMetadata();
            if (d.origins) {
                if (!$Array.isArray(d.origins))
                    throw $TypeError(".AICommon.BotMessageOriginMetadata.origins: array expected");
                m.origins = $Array(d.origins.length);
                for (var i = 0; i < d.origins.length; ++i) {
                    if (!$util.isObject(d.origins[i]))
                        throw $TypeError(".AICommon.BotMessageOriginMetadata.origins: object expected");
                    m.origins[i] = $root.AICommon.BotMessageOrigin.fromObject(d.origins[i], q + 1);
                }
            }
            return m;
        };

        BotMessageOriginMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.origins = [];
            }
            if (m.origins && m.origins.length) {
                d.origins = $Array(m.origins.length);
                for (var j = 0; j < m.origins.length; ++j) {
                    d.origins[j] = $root.AICommon.BotMessageOrigin.toObject(m.origins[j], o, q + 1);
                }
            }
            return d;
        };

        BotMessageOriginMetadata.prototype.toJSON = function() {
            return BotMessageOriginMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMessageOriginMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMessageOriginMetadata";
        };

        return BotMessageOriginMetadata;
    })();

    AICommon.InThreadSurveyMetadata = (function() {

        const InThreadSurveyMetadata = function (p) {
            this.questions = [];
            this.privacyStatementParts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        InThreadSurveyMetadata.prototype.tessaSessionId = null;
        InThreadSurveyMetadata.prototype.simonSessionId = null;
        InThreadSurveyMetadata.prototype.simonSurveyId = null;
        InThreadSurveyMetadata.prototype.tessaRootId = null;
        InThreadSurveyMetadata.prototype.requestId = null;
        InThreadSurveyMetadata.prototype.tessaEvent = null;
        InThreadSurveyMetadata.prototype.invitationHeaderText = null;
        InThreadSurveyMetadata.prototype.invitationBodyText = null;
        InThreadSurveyMetadata.prototype.invitationCtaText = null;
        InThreadSurveyMetadata.prototype.invitationCtaUrl = null;
        InThreadSurveyMetadata.prototype.surveyTitle = null;
        InThreadSurveyMetadata.prototype.questions = $util.emptyArray;
        InThreadSurveyMetadata.prototype.surveyContinueButtonText = null;
        InThreadSurveyMetadata.prototype.surveySubmitButtonText = null;
        InThreadSurveyMetadata.prototype.privacyStatementFull = null;
        InThreadSurveyMetadata.prototype.privacyStatementParts = $util.emptyArray;
        InThreadSurveyMetadata.prototype.feedbackToastText = null;
        InThreadSurveyMetadata.prototype.startQuestionIndex = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaSessionId", {
            get: $util.oneOfGetter($oneOfFields = ["tessaSessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSessionId", {
            get: $util.oneOfGetter($oneOfFields = ["simonSessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_simonSurveyId", {
            get: $util.oneOfGetter($oneOfFields = ["simonSurveyId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaRootId", {
            get: $util.oneOfGetter($oneOfFields = ["tessaRootId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_requestId", {
            get: $util.oneOfGetter($oneOfFields = ["requestId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_tessaEvent", {
            get: $util.oneOfGetter($oneOfFields = ["tessaEvent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationHeaderText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationHeaderText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationBodyText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationBodyText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaText", {
            get: $util.oneOfGetter($oneOfFields = ["invitationCtaText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_invitationCtaUrl", {
            get: $util.oneOfGetter($oneOfFields = ["invitationCtaUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyTitle", {
            get: $util.oneOfGetter($oneOfFields = ["surveyTitle"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveyContinueButtonText", {
            get: $util.oneOfGetter($oneOfFields = ["surveyContinueButtonText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_surveySubmitButtonText", {
            get: $util.oneOfGetter($oneOfFields = ["surveySubmitButtonText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_privacyStatementFull", {
            get: $util.oneOfGetter($oneOfFields = ["privacyStatementFull"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_feedbackToastText", {
            get: $util.oneOfGetter($oneOfFields = ["feedbackToastText"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(InThreadSurveyMetadata.prototype, "_startQuestionIndex", {
            get: $util.oneOfGetter($oneOfFields = ["startQuestionIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        InThreadSurveyMetadata.create = function(properties) {
            return new InThreadSurveyMetadata(properties);
        };

        InThreadSurveyMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.tessaSessionId != null && $Object.hasOwnProperty.call(m, "tessaSessionId"))
                w.uint32(10).string(m.tessaSessionId);
            if (m.simonSessionId != null && $Object.hasOwnProperty.call(m, "simonSessionId"))
                w.uint32(18).string(m.simonSessionId);
            if (m.simonSurveyId != null && $Object.hasOwnProperty.call(m, "simonSurveyId"))
                w.uint32(26).string(m.simonSurveyId);
            if (m.tessaRootId != null && $Object.hasOwnProperty.call(m, "tessaRootId"))
                w.uint32(34).string(m.tessaRootId);
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId"))
                w.uint32(42).string(m.requestId);
            if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent"))
                w.uint32(50).string(m.tessaEvent);
            if (m.invitationHeaderText != null && $Object.hasOwnProperty.call(m, "invitationHeaderText"))
                w.uint32(58).string(m.invitationHeaderText);
            if (m.invitationBodyText != null && $Object.hasOwnProperty.call(m, "invitationBodyText"))
                w.uint32(66).string(m.invitationBodyText);
            if (m.invitationCtaText != null && $Object.hasOwnProperty.call(m, "invitationCtaText"))
                w.uint32(74).string(m.invitationCtaText);
            if (m.invitationCtaUrl != null && $Object.hasOwnProperty.call(m, "invitationCtaUrl"))
                w.uint32(82).string(m.invitationCtaUrl);
            if (m.surveyTitle != null && $Object.hasOwnProperty.call(m, "surveyTitle"))
                w.uint32(90).string(m.surveyTitle);
            if (m.questions != null && m.questions.length) {
                for (var i = 0; i < m.questions.length; ++i)
                    $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.encode(m.questions[i], w.uint32(98).fork(), q + 1).ldelim();
            }
            if (m.surveyContinueButtonText != null && $Object.hasOwnProperty.call(m, "surveyContinueButtonText"))
                w.uint32(106).string(m.surveyContinueButtonText);
            if (m.surveySubmitButtonText != null && $Object.hasOwnProperty.call(m, "surveySubmitButtonText"))
                w.uint32(114).string(m.surveySubmitButtonText);
            if (m.privacyStatementFull != null && $Object.hasOwnProperty.call(m, "privacyStatementFull"))
                w.uint32(122).string(m.privacyStatementFull);
            if (m.privacyStatementParts != null && m.privacyStatementParts.length) {
                for (var i = 0; i < m.privacyStatementParts.length; ++i)
                    $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.encode(m.privacyStatementParts[i], w.uint32(130).fork(), q + 1).ldelim();
            }
            if (m.feedbackToastText != null && $Object.hasOwnProperty.call(m, "feedbackToastText"))
                w.uint32(138).string(m.feedbackToastText);
            if (m.startQuestionIndex != null && $Object.hasOwnProperty.call(m, "startQuestionIndex"))
                w.uint32(144).int32(m.startQuestionIndex);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        InThreadSurveyMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.InThreadSurveyMetadata();
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
                        m.tessaSessionId = r.stringVerify();
                        m._tessaSessionId = "tessaSessionId";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.simonSessionId = r.stringVerify();
                        m._simonSessionId = "simonSessionId";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.simonSurveyId = r.stringVerify();
                        m._simonSurveyId = "simonSurveyId";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.tessaRootId = r.stringVerify();
                        m._tessaRootId = "tessaRootId";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.requestId = r.stringVerify();
                        m._requestId = "requestId";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.tessaEvent = r.stringVerify();
                        m._tessaEvent = "tessaEvent";
                        continue;
                    }
                case 7: {
                        if (u !== 2)
                            break;
                        m.invitationHeaderText = r.stringVerify();
                        m._invitationHeaderText = "invitationHeaderText";
                        continue;
                    }
                case 8: {
                        if (u !== 2)
                            break;
                        m.invitationBodyText = r.stringVerify();
                        m._invitationBodyText = "invitationBodyText";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.invitationCtaText = r.stringVerify();
                        m._invitationCtaText = "invitationCtaText";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.invitationCtaUrl = r.stringVerify();
                        m._invitationCtaUrl = "invitationCtaUrl";
                        continue;
                    }
                case 11: {
                        if (u !== 2)
                            break;
                        m.surveyTitle = r.stringVerify();
                        m._surveyTitle = "surveyTitle";
                        continue;
                    }
                case 12: {
                        if (u !== 2)
                            break;
                        if (!(m.questions && m.questions.length))
                            m.questions = [];
                        m.questions.push($root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.surveyContinueButtonText = r.stringVerify();
                        m._surveyContinueButtonText = "surveyContinueButtonText";
                        continue;
                    }
                case 14: {
                        if (u !== 2)
                            break;
                        m.surveySubmitButtonText = r.stringVerify();
                        m._surveySubmitButtonText = "surveySubmitButtonText";
                        continue;
                    }
                case 15: {
                        if (u !== 2)
                            break;
                        m.privacyStatementFull = r.stringVerify();
                        m._privacyStatementFull = "privacyStatementFull";
                        continue;
                    }
                case 16: {
                        if (u !== 2)
                            break;
                        if (!(m.privacyStatementParts && m.privacyStatementParts.length))
                            m.privacyStatementParts = [];
                        m.privacyStatementParts.push($root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 17: {
                        if (u !== 2)
                            break;
                        m.feedbackToastText = r.stringVerify();
                        m._feedbackToastText = "feedbackToastText";
                        continue;
                    }
                case 18: {
                        if (u !== 0)
                            break;
                        m.startQuestionIndex = r.int32();
                        m._startQuestionIndex = "startQuestionIndex";
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

        InThreadSurveyMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.InThreadSurveyMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.InThreadSurveyMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.InThreadSurveyMetadata();
            if (d.tessaSessionId != null) {
                m.tessaSessionId = $String(d.tessaSessionId);
            }
            if (d.simonSessionId != null) {
                m.simonSessionId = $String(d.simonSessionId);
            }
            if (d.simonSurveyId != null) {
                m.simonSurveyId = $String(d.simonSurveyId);
            }
            if (d.tessaRootId != null) {
                m.tessaRootId = $String(d.tessaRootId);
            }
            if (d.requestId != null) {
                m.requestId = $String(d.requestId);
            }
            if (d.tessaEvent != null) {
                m.tessaEvent = $String(d.tessaEvent);
            }
            if (d.invitationHeaderText != null) {
                m.invitationHeaderText = $String(d.invitationHeaderText);
            }
            if (d.invitationBodyText != null) {
                m.invitationBodyText = $String(d.invitationBodyText);
            }
            if (d.invitationCtaText != null) {
                m.invitationCtaText = $String(d.invitationCtaText);
            }
            if (d.invitationCtaUrl != null) {
                m.invitationCtaUrl = $String(d.invitationCtaUrl);
            }
            if (d.surveyTitle != null) {
                m.surveyTitle = $String(d.surveyTitle);
            }
            if (d.questions) {
                if (!$Array.isArray(d.questions))
                    throw $TypeError(".AICommon.InThreadSurveyMetadata.questions: array expected");
                m.questions = $Array(d.questions.length);
                for (var i = 0; i < d.questions.length; ++i) {
                    if (!$util.isObject(d.questions[i]))
                        throw $TypeError(".AICommon.InThreadSurveyMetadata.questions: object expected");
                    m.questions[i] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.fromObject(d.questions[i], q + 1);
                }
            }
            if (d.surveyContinueButtonText != null) {
                m.surveyContinueButtonText = $String(d.surveyContinueButtonText);
            }
            if (d.surveySubmitButtonText != null) {
                m.surveySubmitButtonText = $String(d.surveySubmitButtonText);
            }
            if (d.privacyStatementFull != null) {
                m.privacyStatementFull = $String(d.privacyStatementFull);
            }
            if (d.privacyStatementParts) {
                if (!$Array.isArray(d.privacyStatementParts))
                    throw $TypeError(".AICommon.InThreadSurveyMetadata.privacyStatementParts: array expected");
                m.privacyStatementParts = $Array(d.privacyStatementParts.length);
                for (var i = 0; i < d.privacyStatementParts.length; ++i) {
                    if (!$util.isObject(d.privacyStatementParts[i]))
                        throw $TypeError(".AICommon.InThreadSurveyMetadata.privacyStatementParts: object expected");
                    m.privacyStatementParts[i] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.fromObject(d.privacyStatementParts[i], q + 1);
                }
            }
            if (d.feedbackToastText != null) {
                m.feedbackToastText = $String(d.feedbackToastText);
            }
            if (d.startQuestionIndex != null) {
                m.startQuestionIndex = d.startQuestionIndex | 0;
            }
            return m;
        };

        InThreadSurveyMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.questions = [];
                d.privacyStatementParts = [];
            }
            if (m.tessaSessionId != null && $Object.hasOwnProperty.call(m, "tessaSessionId")) {
                d.tessaSessionId = m.tessaSessionId;
            }
            if (m.simonSessionId != null && $Object.hasOwnProperty.call(m, "simonSessionId")) {
                d.simonSessionId = m.simonSessionId;
            }
            if (m.simonSurveyId != null && $Object.hasOwnProperty.call(m, "simonSurveyId")) {
                d.simonSurveyId = m.simonSurveyId;
            }
            if (m.tessaRootId != null && $Object.hasOwnProperty.call(m, "tessaRootId")) {
                d.tessaRootId = m.tessaRootId;
            }
            if (m.requestId != null && $Object.hasOwnProperty.call(m, "requestId")) {
                d.requestId = m.requestId;
            }
            if (m.tessaEvent != null && $Object.hasOwnProperty.call(m, "tessaEvent")) {
                d.tessaEvent = m.tessaEvent;
            }
            if (m.invitationHeaderText != null && $Object.hasOwnProperty.call(m, "invitationHeaderText")) {
                d.invitationHeaderText = m.invitationHeaderText;
            }
            if (m.invitationBodyText != null && $Object.hasOwnProperty.call(m, "invitationBodyText")) {
                d.invitationBodyText = m.invitationBodyText;
            }
            if (m.invitationCtaText != null && $Object.hasOwnProperty.call(m, "invitationCtaText")) {
                d.invitationCtaText = m.invitationCtaText;
            }
            if (m.invitationCtaUrl != null && $Object.hasOwnProperty.call(m, "invitationCtaUrl")) {
                d.invitationCtaUrl = m.invitationCtaUrl;
            }
            if (m.surveyTitle != null && $Object.hasOwnProperty.call(m, "surveyTitle")) {
                d.surveyTitle = m.surveyTitle;
            }
            if (m.questions && m.questions.length) {
                d.questions = $Array(m.questions.length);
                for (var j = 0; j < m.questions.length; ++j) {
                    d.questions[j] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.toObject(m.questions[j], o, q + 1);
                }
            }
            if (m.surveyContinueButtonText != null && $Object.hasOwnProperty.call(m, "surveyContinueButtonText")) {
                d.surveyContinueButtonText = m.surveyContinueButtonText;
            }
            if (m.surveySubmitButtonText != null && $Object.hasOwnProperty.call(m, "surveySubmitButtonText")) {
                d.surveySubmitButtonText = m.surveySubmitButtonText;
            }
            if (m.privacyStatementFull != null && $Object.hasOwnProperty.call(m, "privacyStatementFull")) {
                d.privacyStatementFull = m.privacyStatementFull;
            }
            if (m.privacyStatementParts && m.privacyStatementParts.length) {
                d.privacyStatementParts = $Array(m.privacyStatementParts.length);
                for (var j = 0; j < m.privacyStatementParts.length; ++j) {
                    d.privacyStatementParts[j] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart.toObject(m.privacyStatementParts[j], o, q + 1);
                }
            }
            if (m.feedbackToastText != null && $Object.hasOwnProperty.call(m, "feedbackToastText")) {
                d.feedbackToastText = m.feedbackToastText;
            }
            if (m.startQuestionIndex != null && $Object.hasOwnProperty.call(m, "startQuestionIndex")) {
                d.startQuestionIndex = m.startQuestionIndex;
            }
            return d;
        };

        InThreadSurveyMetadata.prototype.toJSON = function() {
            return InThreadSurveyMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        InThreadSurveyMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.InThreadSurveyMetadata";
        };

        InThreadSurveyMetadata.InThreadSurveyOption = (function() {

            const InThreadSurveyOption = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyOption.prototype.stringValue = null;
            InThreadSurveyOption.prototype.numericValue = null;
            InThreadSurveyOption.prototype.textTranslated = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_stringValue", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_numericValue", {
                get: $util.oneOfGetter($oneOfFields = ["numericValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyOption.prototype, "_textTranslated", {
                get: $util.oneOfGetter($oneOfFields = ["textTranslated"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyOption.create = function(properties) {
                return new InThreadSurveyOption(properties);
            };

            InThreadSurveyOption.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.stringValue != null && $Object.hasOwnProperty.call(m, "stringValue"))
                    w.uint32(10).string(m.stringValue);
                if (m.numericValue != null && $Object.hasOwnProperty.call(m, "numericValue"))
                    w.uint32(16).uint32(m.numericValue);
                if (m.textTranslated != null && $Object.hasOwnProperty.call(m, "textTranslated"))
                    w.uint32(26).string(m.textTranslated);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyOption.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption();
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
                            m.stringValue = r.stringVerify();
                            m._stringValue = "stringValue";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.numericValue = r.uint32();
                            m._numericValue = "numericValue";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.textTranslated = r.stringVerify();
                            m._textTranslated = "textTranslated";
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

            InThreadSurveyOption.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.InThreadSurveyMetadata.InThreadSurveyOption: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption();
                if (d.stringValue != null) {
                    m.stringValue = $String(d.stringValue);
                }
                if (d.numericValue != null) {
                    m.numericValue = d.numericValue >>> 0;
                }
                if (d.textTranslated != null) {
                    m.textTranslated = $String(d.textTranslated);
                }
                return m;
            };

            InThreadSurveyOption.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.stringValue != null && $Object.hasOwnProperty.call(m, "stringValue")) {
                    d.stringValue = m.stringValue;
                }
                if (m.numericValue != null && $Object.hasOwnProperty.call(m, "numericValue")) {
                    d.numericValue = m.numericValue;
                }
                if (m.textTranslated != null && $Object.hasOwnProperty.call(m, "textTranslated")) {
                    d.textTranslated = m.textTranslated;
                }
                return d;
            };

            InThreadSurveyOption.prototype.toJSON = function() {
                return InThreadSurveyOption.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyOption.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.InThreadSurveyMetadata.InThreadSurveyOption";
            };

            return InThreadSurveyOption;
        })();

        InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart = (function() {

            const InThreadSurveyPrivacyStatementPart = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyPrivacyStatementPart.prototype.text = null;
            InThreadSurveyPrivacyStatementPart.prototype.url = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_text", {
                get: $util.oneOfGetter($oneOfFields = ["text"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyPrivacyStatementPart.prototype, "_url", {
                get: $util.oneOfGetter($oneOfFields = ["url"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyPrivacyStatementPart.create = function(properties) {
                return new InThreadSurveyPrivacyStatementPart(properties);
            };

            InThreadSurveyPrivacyStatementPart.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.text != null && $Object.hasOwnProperty.call(m, "text"))
                    w.uint32(10).string(m.text);
                if (m.url != null && $Object.hasOwnProperty.call(m, "url"))
                    w.uint32(18).string(m.url);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyPrivacyStatementPart.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
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
                            m.text = r.stringVerify();
                            m._text = "text";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.url = r.stringVerify();
                            m._url = "url";
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

            InThreadSurveyPrivacyStatementPart.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart();
                if (d.text != null) {
                    m.text = $String(d.text);
                }
                if (d.url != null) {
                    m.url = $String(d.url);
                }
                return m;
            };

            InThreadSurveyPrivacyStatementPart.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.text != null && $Object.hasOwnProperty.call(m, "text")) {
                    d.text = m.text;
                }
                if (m.url != null && $Object.hasOwnProperty.call(m, "url")) {
                    d.url = m.url;
                }
                return d;
            };

            InThreadSurveyPrivacyStatementPart.prototype.toJSON = function() {
                return InThreadSurveyPrivacyStatementPart.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyPrivacyStatementPart.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.InThreadSurveyMetadata.InThreadSurveyPrivacyStatementPart";
            };

            return InThreadSurveyPrivacyStatementPart;
        })();

        InThreadSurveyMetadata.InThreadSurveyQuestion = (function() {

            const InThreadSurveyQuestion = function (p) {
                this.questionOptions = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            InThreadSurveyQuestion.prototype.questionText = null;
            InThreadSurveyQuestion.prototype.questionId = null;
            InThreadSurveyQuestion.prototype.questionOptions = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionText", {
                get: $util.oneOfGetter($oneOfFields = ["questionText"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(InThreadSurveyQuestion.prototype, "_questionId", {
                get: $util.oneOfGetter($oneOfFields = ["questionId"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            InThreadSurveyQuestion.create = function(properties) {
                return new InThreadSurveyQuestion(properties);
            };

            InThreadSurveyQuestion.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.questionText != null && $Object.hasOwnProperty.call(m, "questionText"))
                    w.uint32(10).string(m.questionText);
                if (m.questionId != null && $Object.hasOwnProperty.call(m, "questionId"))
                    w.uint32(18).string(m.questionId);
                if (m.questionOptions != null && m.questionOptions.length) {
                    for (var i = 0; i < m.questionOptions.length; ++i)
                        $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.encode(m.questionOptions[i], w.uint32(26).fork(), q + 1).ldelim();
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            InThreadSurveyQuestion.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion();
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
                            m.questionText = r.stringVerify();
                            m._questionText = "questionText";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.questionId = r.stringVerify();
                            m._questionId = "questionId";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            if (!(m.questionOptions && m.questionOptions.length))
                                m.questionOptions = [];
                            m.questionOptions.push($root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.decode(r, r.uint32(), $undefined, q + 1));
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

            InThreadSurveyQuestion.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion();
                if (d.questionText != null) {
                    m.questionText = $String(d.questionText);
                }
                if (d.questionId != null) {
                    m.questionId = $String(d.questionId);
                }
                if (d.questionOptions) {
                    if (!$Array.isArray(d.questionOptions))
                        throw $TypeError(".AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: array expected");
                    m.questionOptions = $Array(d.questionOptions.length);
                    for (var i = 0; i < d.questionOptions.length; ++i) {
                        if (!$util.isObject(d.questionOptions[i]))
                            throw $TypeError(".AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion.questionOptions: object expected");
                        m.questionOptions[i] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.fromObject(d.questionOptions[i], q + 1);
                    }
                }
                return m;
            };

            InThreadSurveyQuestion.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.questionOptions = [];
                }
                if (m.questionText != null && $Object.hasOwnProperty.call(m, "questionText")) {
                    d.questionText = m.questionText;
                }
                if (m.questionId != null && $Object.hasOwnProperty.call(m, "questionId")) {
                    d.questionId = m.questionId;
                }
                if (m.questionOptions && m.questionOptions.length) {
                    d.questionOptions = $Array(m.questionOptions.length);
                    for (var j = 0; j < m.questionOptions.length; ++j) {
                        d.questionOptions[j] = $root.AICommon.InThreadSurveyMetadata.InThreadSurveyOption.toObject(m.questionOptions[j], o, q + 1);
                    }
                }
                return d;
            };

            InThreadSurveyQuestion.prototype.toJSON = function() {
                return InThreadSurveyQuestion.toObject(this, $protobuf.util.toJSONOptions);
            };

            InThreadSurveyQuestion.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.InThreadSurveyMetadata.InThreadSurveyQuestion";
            };

            return InThreadSurveyQuestion;
        })();

        return InThreadSurveyMetadata;
    })();

    AICommon.BotSourcesMetadata = (function() {

        const BotSourcesMetadata = function (p) {
            this.sources = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSourcesMetadata.prototype.sources = $util.emptyArray;

        BotSourcesMetadata.create = function(properties) {
            return new BotSourcesMetadata(properties);
        };

        BotSourcesMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sources != null && m.sources.length) {
                for (var i = 0; i < m.sources.length; ++i)
                    $root.AICommon.BotSourcesMetadata.BotSourceItem.encode(m.sources[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSourcesMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotSourcesMetadata();
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
                        if (!(m.sources && m.sources.length))
                            m.sources = [];
                        m.sources.push($root.AICommon.BotSourcesMetadata.BotSourceItem.decode(r, r.uint32(), $undefined, q + 1));
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

        BotSourcesMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotSourcesMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotSourcesMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotSourcesMetadata();
            if (d.sources) {
                if (!$Array.isArray(d.sources))
                    throw $TypeError(".AICommon.BotSourcesMetadata.sources: array expected");
                m.sources = $Array(d.sources.length);
                for (var i = 0; i < d.sources.length; ++i) {
                    if (!$util.isObject(d.sources[i]))
                        throw $TypeError(".AICommon.BotSourcesMetadata.sources: object expected");
                    m.sources[i] = $root.AICommon.BotSourcesMetadata.BotSourceItem.fromObject(d.sources[i], q + 1);
                }
            }
            return m;
        };

        BotSourcesMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.sources = [];
            }
            if (m.sources && m.sources.length) {
                d.sources = $Array(m.sources.length);
                for (var j = 0; j < m.sources.length; ++j) {
                    d.sources[j] = $root.AICommon.BotSourcesMetadata.BotSourceItem.toObject(m.sources[j], o, q + 1);
                }
            }
            return d;
        };

        BotSourcesMetadata.prototype.toJSON = function() {
            return BotSourcesMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSourcesMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotSourcesMetadata";
        };

        BotSourcesMetadata.BotSourceItem = (function() {

            const BotSourceItem = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotSourceItem.prototype.provider = null;
            BotSourceItem.prototype.thumbnailCdnUrl = null;
            BotSourceItem.prototype.sourceProviderUrl = null;
            BotSourceItem.prototype.sourceQuery = null;
            BotSourceItem.prototype.faviconCdnUrl = null;
            BotSourceItem.prototype.citationNumber = null;
            BotSourceItem.prototype.sourceTitle = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_provider", {
                get: $util.oneOfGetter($oneOfFields = ["provider"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_thumbnailCdnUrl", {
                get: $util.oneOfGetter($oneOfFields = ["thumbnailCdnUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceProviderUrl", {
                get: $util.oneOfGetter($oneOfFields = ["sourceProviderUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceQuery", {
                get: $util.oneOfGetter($oneOfFields = ["sourceQuery"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_faviconCdnUrl", {
                get: $util.oneOfGetter($oneOfFields = ["faviconCdnUrl"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_citationNumber", {
                get: $util.oneOfGetter($oneOfFields = ["citationNumber"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotSourceItem.prototype, "_sourceTitle", {
                get: $util.oneOfGetter($oneOfFields = ["sourceTitle"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotSourceItem.create = function(properties) {
                return new BotSourceItem(properties);
            };

            BotSourceItem.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                    w.uint32(8).int32(m.provider);
                if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl"))
                    w.uint32(18).string(m.thumbnailCdnUrl);
                if (m.sourceProviderUrl != null && $Object.hasOwnProperty.call(m, "sourceProviderUrl"))
                    w.uint32(26).string(m.sourceProviderUrl);
                if (m.sourceQuery != null && $Object.hasOwnProperty.call(m, "sourceQuery"))
                    w.uint32(34).string(m.sourceQuery);
                if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl"))
                    w.uint32(42).string(m.faviconCdnUrl);
                if (m.citationNumber != null && $Object.hasOwnProperty.call(m, "citationNumber"))
                    w.uint32(48).uint32(m.citationNumber);
                if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle"))
                    w.uint32(58).string(m.sourceTitle);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotSourceItem.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotSourcesMetadata.BotSourceItem();
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
                            m.provider = r.int32();
                            m._provider = "provider";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.thumbnailCdnUrl = r.stringVerify();
                            m._thumbnailCdnUrl = "thumbnailCdnUrl";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            m.sourceProviderUrl = r.stringVerify();
                            m._sourceProviderUrl = "sourceProviderUrl";
                            continue;
                        }
                    case 4: {
                            if (u !== 2)
                                break;
                            m.sourceQuery = r.stringVerify();
                            m._sourceQuery = "sourceQuery";
                            continue;
                        }
                    case 5: {
                            if (u !== 2)
                                break;
                            m.faviconCdnUrl = r.stringVerify();
                            m._faviconCdnUrl = "faviconCdnUrl";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.citationNumber = r.uint32();
                            m._citationNumber = "citationNumber";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            m.sourceTitle = r.stringVerify();
                            m._sourceTitle = "sourceTitle";
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

            BotSourceItem.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotSourcesMetadata.BotSourceItem)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotSourcesMetadata.BotSourceItem: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotSourcesMetadata.BotSourceItem();
                switch (d.provider) {
                case "UNKNOWN":
                case 0:
                    m.provider = 0;
                    break;
                case "BING":
                case 1:
                    m.provider = 1;
                    break;
                case "GOOGLE":
                case 2:
                    m.provider = 2;
                    break;
                case "SUPPORT":
                case 3:
                    m.provider = 3;
                    break;
                case "OTHER":
                case 4:
                    m.provider = 4;
                    break;
                default:
                    if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                        m.provider = d.provider;
                }
                if (d.thumbnailCdnUrl != null) {
                    m.thumbnailCdnUrl = $String(d.thumbnailCdnUrl);
                }
                if (d.sourceProviderUrl != null) {
                    m.sourceProviderUrl = $String(d.sourceProviderUrl);
                }
                if (d.sourceQuery != null) {
                    m.sourceQuery = $String(d.sourceQuery);
                }
                if (d.faviconCdnUrl != null) {
                    m.faviconCdnUrl = $String(d.faviconCdnUrl);
                }
                if (d.citationNumber != null) {
                    m.citationNumber = d.citationNumber >>> 0;
                }
                if (d.sourceTitle != null) {
                    m.sourceTitle = $String(d.sourceTitle);
                }
                return m;
            };

            BotSourceItem.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                    d.provider = o.enums === $String ? $root.AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider[m.provider] === $undefined ? m.provider : $root.AICommon.BotSourcesMetadata.BotSourceItem.SourceProvider[m.provider] : m.provider;
                }
                if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl")) {
                    d.thumbnailCdnUrl = m.thumbnailCdnUrl;
                }
                if (m.sourceProviderUrl != null && $Object.hasOwnProperty.call(m, "sourceProviderUrl")) {
                    d.sourceProviderUrl = m.sourceProviderUrl;
                }
                if (m.sourceQuery != null && $Object.hasOwnProperty.call(m, "sourceQuery")) {
                    d.sourceQuery = m.sourceQuery;
                }
                if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl")) {
                    d.faviconCdnUrl = m.faviconCdnUrl;
                }
                if (m.citationNumber != null && $Object.hasOwnProperty.call(m, "citationNumber")) {
                    d.citationNumber = m.citationNumber;
                }
                if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle")) {
                    d.sourceTitle = m.sourceTitle;
                }
                return d;
            };

            BotSourceItem.prototype.toJSON = function() {
                return BotSourceItem.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotSourceItem.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotSourcesMetadata.BotSourceItem";
            };

            BotSourceItem.SourceProvider = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "BING"] = 1;
                values[valuesById[2] = "GOOGLE"] = 2;
                values[valuesById[3] = "SUPPORT"] = 3;
                values[valuesById[4] = "OTHER"] = 4;
                return values;
            })();

            return BotSourceItem;
        })();

        return BotSourcesMetadata;
    })();

    AICommon.BotAgeCollectionMetadata = (function() {

        const BotAgeCollectionMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotAgeCollectionMetadata.prototype.ageCollectionEligible = null;
        BotAgeCollectionMetadata.prototype.shouldTriggerAgeCollectionOnClient = null;
        BotAgeCollectionMetadata.prototype.ageCollectionType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgeCollectionMetadata.prototype, "_ageCollectionEligible", {
            get: $util.oneOfGetter($oneOfFields = ["ageCollectionEligible"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgeCollectionMetadata.prototype, "_shouldTriggerAgeCollectionOnClient", {
            get: $util.oneOfGetter($oneOfFields = ["shouldTriggerAgeCollectionOnClient"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotAgeCollectionMetadata.prototype, "_ageCollectionType", {
            get: $util.oneOfGetter($oneOfFields = ["ageCollectionType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotAgeCollectionMetadata.create = function(properties) {
            return new BotAgeCollectionMetadata(properties);
        };

        BotAgeCollectionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.ageCollectionEligible != null && $Object.hasOwnProperty.call(m, "ageCollectionEligible"))
                w.uint32(8).bool(m.ageCollectionEligible);
            if (m.shouldTriggerAgeCollectionOnClient != null && $Object.hasOwnProperty.call(m, "shouldTriggerAgeCollectionOnClient"))
                w.uint32(16).bool(m.shouldTriggerAgeCollectionOnClient);
            if (m.ageCollectionType != null && $Object.hasOwnProperty.call(m, "ageCollectionType"))
                w.uint32(24).int32(m.ageCollectionType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotAgeCollectionMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotAgeCollectionMetadata();
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
                        m.ageCollectionEligible = r.bool();
                        m._ageCollectionEligible = "ageCollectionEligible";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.shouldTriggerAgeCollectionOnClient = r.bool();
                        m._shouldTriggerAgeCollectionOnClient = "shouldTriggerAgeCollectionOnClient";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.ageCollectionType = r.int32();
                        m._ageCollectionType = "ageCollectionType";
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

        BotAgeCollectionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotAgeCollectionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotAgeCollectionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotAgeCollectionMetadata();
            if (d.ageCollectionEligible != null) {
                m.ageCollectionEligible = $Boolean(d.ageCollectionEligible);
            }
            if (d.shouldTriggerAgeCollectionOnClient != null) {
                m.shouldTriggerAgeCollectionOnClient = $Boolean(d.shouldTriggerAgeCollectionOnClient);
            }
            switch (d.ageCollectionType) {
            case "O18_BINARY":
            case 0:
                m.ageCollectionType = 0;
                break;
            case "WAFFLE":
            case 1:
                m.ageCollectionType = 1;
                break;
            default:
                if (typeof d.ageCollectionType === "number" && (d.ageCollectionType | 0) === d.ageCollectionType)
                    m.ageCollectionType = d.ageCollectionType;
            }
            return m;
        };

        BotAgeCollectionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.ageCollectionEligible != null && $Object.hasOwnProperty.call(m, "ageCollectionEligible")) {
                d.ageCollectionEligible = m.ageCollectionEligible;
            }
            if (m.shouldTriggerAgeCollectionOnClient != null && $Object.hasOwnProperty.call(m, "shouldTriggerAgeCollectionOnClient")) {
                d.shouldTriggerAgeCollectionOnClient = m.shouldTriggerAgeCollectionOnClient;
            }
            if (m.ageCollectionType != null && $Object.hasOwnProperty.call(m, "ageCollectionType")) {
                d.ageCollectionType = o.enums === $String ? $root.AICommon.BotAgeCollectionMetadata.AgeCollectionType[m.ageCollectionType] === $undefined ? m.ageCollectionType : $root.AICommon.BotAgeCollectionMetadata.AgeCollectionType[m.ageCollectionType] : m.ageCollectionType;
            }
            return d;
        };

        BotAgeCollectionMetadata.prototype.toJSON = function() {
            return BotAgeCollectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotAgeCollectionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotAgeCollectionMetadata";
        };

        BotAgeCollectionMetadata.AgeCollectionType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "O18_BINARY"] = 0;
            values[valuesById[1] = "WAFFLE"] = 1;
            return values;
        })();

        return BotAgeCollectionMetadata;
    })();

    AICommon.BotImagineMetadata = (function() {

        const BotImagineMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotImagineMetadata.prototype.imagineType = null;
        BotImagineMetadata.prototype.shortPrompt = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotImagineMetadata.prototype, "_imagineType", {
            get: $util.oneOfGetter($oneOfFields = ["imagineType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotImagineMetadata.prototype, "_shortPrompt", {
            get: $util.oneOfGetter($oneOfFields = ["shortPrompt"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotImagineMetadata.create = function(properties) {
            return new BotImagineMetadata(properties);
        };

        BotImagineMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.imagineType != null && $Object.hasOwnProperty.call(m, "imagineType"))
                w.uint32(8).int32(m.imagineType);
            if (m.shortPrompt != null && $Object.hasOwnProperty.call(m, "shortPrompt"))
                w.uint32(18).string(m.shortPrompt);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotImagineMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotImagineMetadata();
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
                        m.imagineType = r.int32();
                        m._imagineType = "imagineType";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.shortPrompt = r.stringVerify();
                        m._shortPrompt = "shortPrompt";
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

        BotImagineMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotImagineMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotImagineMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotImagineMetadata();
            switch (d.imagineType) {
            case "UNKNOWN":
            case 0:
                m.imagineType = 0;
                break;
            case "IMAGINE":
            case 1:
                m.imagineType = 1;
                break;
            case "MEMU":
            case 2:
                m.imagineType = 2;
                break;
            case "FLASH":
            case 3:
                m.imagineType = 3;
                break;
            case "EDIT":
            case 4:
                m.imagineType = 4;
                break;
            default:
                if (typeof d.imagineType === "number" && (d.imagineType | 0) === d.imagineType)
                    m.imagineType = d.imagineType;
            }
            if (d.shortPrompt != null) {
                m.shortPrompt = $String(d.shortPrompt);
            }
            return m;
        };

        BotImagineMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.imagineType != null && $Object.hasOwnProperty.call(m, "imagineType")) {
                d.imagineType = o.enums === $String ? $root.AICommon.BotImagineMetadata.ImagineType[m.imagineType] === $undefined ? m.imagineType : $root.AICommon.BotImagineMetadata.ImagineType[m.imagineType] : m.imagineType;
            }
            if (m.shortPrompt != null && $Object.hasOwnProperty.call(m, "shortPrompt")) {
                d.shortPrompt = m.shortPrompt;
            }
            return d;
        };

        BotImagineMetadata.prototype.toJSON = function() {
            return BotImagineMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotImagineMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotImagineMetadata";
        };

        BotImagineMetadata.ImagineType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "IMAGINE"] = 1;
            values[valuesById[2] = "MEMU"] = 2;
            values[valuesById[3] = "FLASH"] = 3;
            values[valuesById[4] = "EDIT"] = 4;
            return values;
        })();

        return BotImagineMetadata;
    })();

    AICommon.BotQuotaMetadata = (function() {

        const BotQuotaMetadata = function (p) {
            this.botFeatureQuotaMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotQuotaMetadata.prototype.botFeatureQuotaMetadata = $util.emptyArray;

        BotQuotaMetadata.create = function(properties) {
            return new BotQuotaMetadata(properties);
        };

        BotQuotaMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.botFeatureQuotaMetadata != null && m.botFeatureQuotaMetadata.length) {
                for (var i = 0; i < m.botFeatureQuotaMetadata.length; ++i)
                    $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.encode(m.botFeatureQuotaMetadata[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotQuotaMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotQuotaMetadata();
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
                        if (!(m.botFeatureQuotaMetadata && m.botFeatureQuotaMetadata.length))
                            m.botFeatureQuotaMetadata = [];
                        m.botFeatureQuotaMetadata.push($root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

        BotQuotaMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotQuotaMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotQuotaMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotQuotaMetadata();
            if (d.botFeatureQuotaMetadata) {
                if (!$Array.isArray(d.botFeatureQuotaMetadata))
                    throw $TypeError(".AICommon.BotQuotaMetadata.botFeatureQuotaMetadata: array expected");
                m.botFeatureQuotaMetadata = $Array(d.botFeatureQuotaMetadata.length);
                for (var i = 0; i < d.botFeatureQuotaMetadata.length; ++i) {
                    if (!$util.isObject(d.botFeatureQuotaMetadata[i]))
                        throw $TypeError(".AICommon.BotQuotaMetadata.botFeatureQuotaMetadata: object expected");
                    m.botFeatureQuotaMetadata[i] = $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.fromObject(d.botFeatureQuotaMetadata[i], q + 1);
                }
            }
            return m;
        };

        BotQuotaMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.botFeatureQuotaMetadata = [];
            }
            if (m.botFeatureQuotaMetadata && m.botFeatureQuotaMetadata.length) {
                d.botFeatureQuotaMetadata = $Array(m.botFeatureQuotaMetadata.length);
                for (var j = 0; j < m.botFeatureQuotaMetadata.length; ++j) {
                    d.botFeatureQuotaMetadata[j] = $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.toObject(m.botFeatureQuotaMetadata[j], o, q + 1);
                }
            }
            return d;
        };

        BotQuotaMetadata.prototype.toJSON = function() {
            return BotQuotaMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotQuotaMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotQuotaMetadata";
        };

        BotQuotaMetadata.BotFeatureQuotaMetadata = (function() {

            const BotFeatureQuotaMetadata = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotFeatureQuotaMetadata.prototype.featureType = null;
            BotFeatureQuotaMetadata.prototype.remainingQuota = null;
            BotFeatureQuotaMetadata.prototype.expirationTimestamp = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_featureType", {
                get: $util.oneOfGetter($oneOfFields = ["featureType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_remainingQuota", {
                get: $util.oneOfGetter($oneOfFields = ["remainingQuota"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotFeatureQuotaMetadata.prototype, "_expirationTimestamp", {
                get: $util.oneOfGetter($oneOfFields = ["expirationTimestamp"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotFeatureQuotaMetadata.create = function(properties) {
                return new BotFeatureQuotaMetadata(properties);
            };

            BotFeatureQuotaMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.featureType != null && $Object.hasOwnProperty.call(m, "featureType"))
                    w.uint32(8).int32(m.featureType);
                if (m.remainingQuota != null && $Object.hasOwnProperty.call(m, "remainingQuota"))
                    w.uint32(16).uint32(m.remainingQuota);
                if (m.expirationTimestamp != null && $Object.hasOwnProperty.call(m, "expirationTimestamp"))
                    w.uint32(24).uint64(m.expirationTimestamp);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotFeatureQuotaMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata();
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
                            m.featureType = r.int32();
                            m._featureType = "featureType";
                            continue;
                        }
                    case 2: {
                            if (u !== 0)
                                break;
                            m.remainingQuota = r.uint32();
                            m._remainingQuota = "remainingQuota";
                            continue;
                        }
                    case 3: {
                            if (u !== 0)
                                break;
                            m.expirationTimestamp = r.uint64();
                            m._expirationTimestamp = "expirationTimestamp";
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

            BotFeatureQuotaMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata();
                switch (d.featureType) {
                case "UNKNOWN_FEATURE":
                case 0:
                    m.featureType = 0;
                    break;
                case "REASONING_FEATURE":
                case 1:
                    m.featureType = 1;
                    break;
                default:
                    if (typeof d.featureType === "number" && (d.featureType | 0) === d.featureType)
                        m.featureType = d.featureType;
                }
                if (d.remainingQuota != null) {
                    m.remainingQuota = d.remainingQuota >>> 0;
                }
                if (d.expirationTimestamp != null) {
                    if ($util.Long)
                        m.expirationTimestamp = $util.Long.fromValue(d.expirationTimestamp, true);
                    else if (typeof d.expirationTimestamp === "string")
                        m.expirationTimestamp = $parseInt(d.expirationTimestamp, 10);
                    else if (typeof d.expirationTimestamp === "number")
                        m.expirationTimestamp = d.expirationTimestamp;
                    else if (typeof d.expirationTimestamp === "object")
                        m.expirationTimestamp = new $util.LongBits(d.expirationTimestamp.low >>> 0, d.expirationTimestamp.high >>> 0).toNumber(true);
                }
                return m;
            };

            BotFeatureQuotaMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.featureType != null && $Object.hasOwnProperty.call(m, "featureType")) {
                    d.featureType = o.enums === $String ? $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType[m.featureType] === $undefined ? m.featureType : $root.AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata.BotFeatureType[m.featureType] : m.featureType;
                }
                if (m.remainingQuota != null && $Object.hasOwnProperty.call(m, "remainingQuota")) {
                    d.remainingQuota = m.remainingQuota;
                }
                if (m.expirationTimestamp != null && $Object.hasOwnProperty.call(m, "expirationTimestamp")) {
                    if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                        d.expirationTimestamp = typeof m.expirationTimestamp === "number" ? $BigInt(m.expirationTimestamp) : $util.Long.fromBits(m.expirationTimestamp.low >>> 0, m.expirationTimestamp.high >>> 0, true).toBigInt();
                    else if (typeof m.expirationTimestamp === "number")
                        d.expirationTimestamp = o.longs === $String ? $String(m.expirationTimestamp) : m.expirationTimestamp;
                    else
                        d.expirationTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.expirationTimestamp) : o.longs === $Number ? new $util.LongBits(m.expirationTimestamp.low >>> 0, m.expirationTimestamp.high >>> 0).toNumber(true) : m.expirationTimestamp;
                }
                return d;
            };

            BotFeatureQuotaMetadata.prototype.toJSON = function() {
                return BotFeatureQuotaMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotFeatureQuotaMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotQuotaMetadata.BotFeatureQuotaMetadata";
            };

            BotFeatureQuotaMetadata.BotFeatureType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_FEATURE"] = 0;
                values[valuesById[1] = "REASONING_FEATURE"] = 1;
                return values;
            })();

            return BotFeatureQuotaMetadata;
        })();

        return BotQuotaMetadata;
    })();

    AICommon.BotModeSelectionMetadata = (function() {

        const BotModeSelectionMetadata = function (p) {
            this.mode = [];
            this.overrideMode = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotModeSelectionMetadata.prototype.mode = $util.emptyArray;
        BotModeSelectionMetadata.prototype.overrideMode = $util.emptyArray;

        BotModeSelectionMetadata.create = function(properties) {
            return new BotModeSelectionMetadata(properties);
        };

        BotModeSelectionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.mode != null && m.mode.length) {
                w.uint32(10).int32s(m.mode);
            }
            if (m.overrideMode != null && m.overrideMode.length) {
                w.uint32(18).uint32s(m.overrideMode);
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotModeSelectionMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotModeSelectionMetadata();
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
                        if (u === 2) {
                            if (!(m.mode && m.mode.length))
                                m.mode = [];
                            r.int32s(m.mode);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.mode && m.mode.length))
                            m.mode = [];
                        m.mode.push(r.int32());
                        continue;
                    }
                case 2: {
                        if (u === 2) {
                            if (!(m.overrideMode && m.overrideMode.length))
                                m.overrideMode = [];
                            r.uint32s(m.overrideMode);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.overrideMode && m.overrideMode.length))
                            m.overrideMode = [];
                        m.overrideMode.push(r.uint32());
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

        BotModeSelectionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotModeSelectionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotModeSelectionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotModeSelectionMetadata();
            if (d.mode) {
                if (!$Array.isArray(d.mode))
                    throw $TypeError(".AICommon.BotModeSelectionMetadata.mode: array expected");
                m.mode = [];
                for (var i = 0; i < d.mode.length; ++i) {
                    switch (d.mode[i]) {
                    case "DEFAULT_MODE":
                    case 0:
                        m.mode[m.mode.length] = 0;
                        break;
                    case "THINK_HARD_MODE":
                    case 1:
                        m.mode[m.mode.length] = 1;
                        break;
                    default:
                        if (typeof d.mode[i] === "number" && (d.mode[i] | 0) === d.mode[i])
                            m.mode[m.mode.length] = d.mode[i];
                    }
                }
            }
            if (d.overrideMode) {
                if (!$Array.isArray(d.overrideMode))
                    throw $TypeError(".AICommon.BotModeSelectionMetadata.overrideMode: array expected");
                m.overrideMode = $Array(d.overrideMode.length);
                for (var i = 0; i < d.overrideMode.length; ++i) {
                    m.overrideMode[i] = d.overrideMode[i] >>> 0;
                }
            }
            return m;
        };

        BotModeSelectionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.mode = [];
                d.overrideMode = [];
            }
            if (m.mode && m.mode.length) {
                d.mode = $Array(m.mode.length);
                for (var j = 0; j < m.mode.length; ++j) {
                    d.mode[j] = o.enums === $String ? $root.AICommon.BotModeSelectionMetadata.BotUserSelectionMode[m.mode[j]] === $undefined ? m.mode[j] : $root.AICommon.BotModeSelectionMetadata.BotUserSelectionMode[m.mode[j]] : m.mode[j];
                }
            }
            if (m.overrideMode && m.overrideMode.length) {
                d.overrideMode = $Array(m.overrideMode.length);
                for (var j = 0; j < m.overrideMode.length; ++j) {
                    d.overrideMode[j] = m.overrideMode[j];
                }
            }
            return d;
        };

        BotModeSelectionMetadata.prototype.toJSON = function() {
            return BotModeSelectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotModeSelectionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotModeSelectionMetadata";
        };

        BotModeSelectionMetadata.BotUserSelectionMode = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "DEFAULT_MODE"] = 0;
            values[valuesById[1] = "THINK_HARD_MODE"] = 1;
            return values;
        })();

        return BotModeSelectionMetadata;
    })();

    AICommon.BotCapabilityMetadata = (function() {

        const BotCapabilityMetadata = function (p) {
            this.capabilities = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotCapabilityMetadata.prototype.capabilities = $util.emptyArray;

        BotCapabilityMetadata.create = function(properties) {
            return new BotCapabilityMetadata(properties);
        };

        BotCapabilityMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.capabilities != null && m.capabilities.length) {
                w.uint32(10).int32s(m.capabilities);
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotCapabilityMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotCapabilityMetadata();
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
                        if (u === 2) {
                            if (!(m.capabilities && m.capabilities.length))
                                m.capabilities = [];
                            r.int32s(m.capabilities);
                            continue;
                        }
                        if (u !== 0)
                            break;
                        if (!(m.capabilities && m.capabilities.length))
                            m.capabilities = [];
                        m.capabilities.push(r.int32());
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

        BotCapabilityMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotCapabilityMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotCapabilityMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotCapabilityMetadata();
            if (d.capabilities) {
                if (!$Array.isArray(d.capabilities))
                    throw $TypeError(".AICommon.BotCapabilityMetadata.capabilities: array expected");
                m.capabilities = [];
                for (var i = 0; i < d.capabilities.length; ++i) {
                    switch (d.capabilities[i]) {
                    case "UNKNOWN":
                    case 0:
                        m.capabilities[m.capabilities.length] = 0;
                        break;
                    case "PROGRESS_INDICATOR":
                    case 1:
                        m.capabilities[m.capabilities.length] = 1;
                        break;
                    case "RICH_RESPONSE_HEADING":
                    case 2:
                        m.capabilities[m.capabilities.length] = 2;
                        break;
                    case "RICH_RESPONSE_NESTED_LIST":
                    case 3:
                        m.capabilities[m.capabilities.length] = 3;
                        break;
                    case "AI_MEMORY":
                    case 4:
                        m.capabilities[m.capabilities.length] = 4;
                        break;
                    case "RICH_RESPONSE_THREAD_SURFING":
                    case 5:
                        m.capabilities[m.capabilities.length] = 5;
                        break;
                    case "RICH_RESPONSE_TABLE":
                    case 6:
                        m.capabilities[m.capabilities.length] = 6;
                        break;
                    case "RICH_RESPONSE_CODE":
                    case 7:
                        m.capabilities[m.capabilities.length] = 7;
                        break;
                    case "RICH_RESPONSE_STRUCTURED_RESPONSE":
                    case 8:
                        m.capabilities[m.capabilities.length] = 8;
                        break;
                    case "RICH_RESPONSE_INLINE_IMAGE":
                    case 9:
                        m.capabilities[m.capabilities.length] = 9;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_CONTROL":
                    case 10:
                        m.capabilities[m.capabilities.length] = 10;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_1":
                    case 11:
                        m.capabilities[m.capabilities.length] = 11;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_2":
                    case 12:
                        m.capabilities[m.capabilities.length] = 12;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_3":
                    case 13:
                        m.capabilities[m.capabilities.length] = 13;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_4":
                    case 14:
                        m.capabilities[m.capabilities.length] = 14;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_5":
                    case 15:
                        m.capabilities[m.capabilities.length] = 15;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_6":
                    case 16:
                        m.capabilities[m.capabilities.length] = 16;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_7":
                    case 17:
                        m.capabilities[m.capabilities.length] = 17;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_8":
                    case 18:
                        m.capabilities[m.capabilities.length] = 18;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_9":
                    case 19:
                        m.capabilities[m.capabilities.length] = 19;
                        break;
                    case "WA_IG_1P_PLUGIN_RANKING_UPDATE_10":
                    case 20:
                        m.capabilities[m.capabilities.length] = 20;
                        break;
                    case "RICH_RESPONSE_SUB_HEADING":
                    case 21:
                        m.capabilities[m.capabilities.length] = 21;
                        break;
                    case "RICH_RESPONSE_GRID_IMAGE":
                    case 22:
                        m.capabilities[m.capabilities.length] = 22;
                        break;
                    case "AI_STUDIO_UGC_MEMORY":
                    case 23:
                        m.capabilities[m.capabilities.length] = 23;
                        break;
                    case "RICH_RESPONSE_LATEX":
                    case 24:
                        m.capabilities[m.capabilities.length] = 24;
                        break;
                    case "RICH_RESPONSE_MAPS":
                    case 25:
                        m.capabilities[m.capabilities.length] = 25;
                        break;
                    case "RICH_RESPONSE_INLINE_REELS":
                    case 26:
                        m.capabilities[m.capabilities.length] = 26;
                        break;
                    case "AGENTIC_PLANNING":
                    case 27:
                        m.capabilities[m.capabilities.length] = 27;
                        break;
                    case "ACCOUNT_LINKING":
                    case 28:
                        m.capabilities[m.capabilities.length] = 28;
                        break;
                    case "STREAMING_DISAGGREGATION":
                    case 29:
                        m.capabilities[m.capabilities.length] = 29;
                        break;
                    case "RICH_RESPONSE_GRID_IMAGE_3P":
                    case 30:
                        m.capabilities[m.capabilities.length] = 30;
                        break;
                    case "RICH_RESPONSE_LATEX_INLINE":
                    case 31:
                        m.capabilities[m.capabilities.length] = 31;
                        break;
                    case "QUERY_PLAN":
                    case 32:
                        m.capabilities[m.capabilities.length] = 32;
                        break;
                    case "PROACTIVE_MESSAGE":
                    case 33:
                        m.capabilities[m.capabilities.length] = 33;
                        break;
                    case "RICH_RESPONSE_UNIFIED_RESPONSE":
                    case 34:
                        m.capabilities[m.capabilities.length] = 34;
                        break;
                    case "PROMOTION_MESSAGE":
                    case 35:
                        m.capabilities[m.capabilities.length] = 35;
                        break;
                    case "SIMPLIFIED_PROFILE_PAGE":
                    case 36:
                        m.capabilities[m.capabilities.length] = 36;
                        break;
                    case "RICH_RESPONSE_SOURCES_IN_MESSAGE":
                    case 37:
                        m.capabilities[m.capabilities.length] = 37;
                        break;
                    case "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY":
                    case 38:
                        m.capabilities[m.capabilities.length] = 38;
                        break;
                    case "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT":
                    case 39:
                        m.capabilities[m.capabilities.length] = 39;
                        break;
                    case "AI_SHARED_MEMORY":
                    case 40:
                        m.capabilities[m.capabilities.length] = 40;
                        break;
                    case "RICH_RESPONSE_UNIFIED_SOURCES":
                    case 41:
                        m.capabilities[m.capabilities.length] = 41;
                        break;
                    case "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS":
                    case 42:
                        m.capabilities[m.capabilities.length] = 42;
                        break;
                    case "RICH_RESPONSE_UR_INLINE_REELS_ENABLED":
                    case 43:
                        m.capabilities[m.capabilities.length] = 43;
                        break;
                    case "RICH_RESPONSE_UR_MEDIA_GRID_ENABLED":
                    case 44:
                        m.capabilities[m.capabilities.length] = 44;
                        break;
                    case "RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER":
                    case 45:
                        m.capabilities[m.capabilities.length] = 45;
                        break;
                    case "RICH_RESPONSE_IN_APP_SURVEY":
                    case 46:
                        m.capabilities[m.capabilities.length] = 46;
                        break;
                    case "AI_RESPONSE_MODEL_BRANDING":
                    case 47:
                        m.capabilities[m.capabilities.length] = 47;
                        break;
                    case "SESSION_TRANSPARENCY_SYSTEM_MESSAGE":
                    case 48:
                        m.capabilities[m.capabilities.length] = 48;
                        break;
                    case "RICH_RESPONSE_UR_REASONING":
                    case 49:
                        m.capabilities[m.capabilities.length] = 49;
                        break;
                    case "RICH_RESPONSE_UR_ZEITGEIST_CITATIONS":
                    case 50:
                        m.capabilities[m.capabilities.length] = 50;
                        break;
                    case "RICH_RESPONSE_UR_ZEITGEIST_CAROUSEL":
                    case 51:
                        m.capabilities[m.capabilities.length] = 51;
                        break;
                    case "AI_IMAGINE_LOADING_INDICATOR":
                    case 52:
                        m.capabilities[m.capabilities.length] = 52;
                        break;
                    case "RICH_RESPONSE_UR_IMAGINE":
                    case 53:
                        m.capabilities[m.capabilities.length] = 53;
                        break;
                    case "AI_IMAGINE_UR_TO_NATIVE_LOADING_INDICATOR":
                    case 54:
                        m.capabilities[m.capabilities.length] = 54;
                        break;
                    case "RICH_RESPONSE_UR_BLOKS_ENABLED":
                    case 55:
                        m.capabilities[m.capabilities.length] = 55;
                        break;
                    case "RICH_RESPONSE_INLINE_LINKS_ENABLED":
                    case 56:
                        m.capabilities[m.capabilities.length] = 56;
                        break;
                    case "RICH_RESPONSE_UR_IMAGINE_VIDEO":
                    case 57:
                        m.capabilities[m.capabilities.length] = 57;
                        break;
                    case "JSON_PATCH_STREAMING":
                    case 58:
                        m.capabilities[m.capabilities.length] = 58;
                        break;
                    case "AI_TAB_FORCE_CLIPPY":
                    case 59:
                        m.capabilities[m.capabilities.length] = 59;
                        break;
                    case "UNIFIED_RESPONSE_EMBEDDED_SCREENS":
                    case 60:
                        m.capabilities[m.capabilities.length] = 60;
                        break;
                    case "AI_SUBSCRIPTION_ENABLED":
                    case 61:
                        m.capabilities[m.capabilities.length] = 61;
                        break;
                    case "UNIFIED_RESPONSE_AI_CONTENT_SEARCH_ENABLED":
                    case 62:
                        m.capabilities[m.capabilities.length] = 62;
                        break;
                    case "UNIFIED_RESPONSE_MARKDOWN_LINKS_ENABLED":
                    case 63:
                        m.capabilities[m.capabilities.length] = 63;
                        break;
                    case "AI_RICH_RESPONSE_MAPS_V2_ENABLED":
                    case 64:
                        m.capabilities[m.capabilities.length] = 64;
                        break;
                    case "AI_SUBSCRIPTION_METERING_ENABLED":
                    case 65:
                        m.capabilities[m.capabilities.length] = 65;
                        break;
                    case "RICH_RESPONSE_SPORTS_WIDGET_ENABLED":
                    case 66:
                        m.capabilities[m.capabilities.length] = 66;
                        break;
                    case "AI_RICH_RESPONSE_ARTIFACTS_ENABLED":
                    case 67:
                        m.capabilities[m.capabilities.length] = 67;
                        break;
                    case "AI_RICH_RESPONSE_EMAIL_CALENDAR_ENABLED":
                    case 68:
                        m.capabilities[m.capabilities.length] = 68;
                        break;
                    case "AI_RICH_RESPONSE_REMINDERS_ENABLED":
                    case 69:
                        m.capabilities[m.capabilities.length] = 69;
                        break;
                    case "AI_STOP_GENERATION_ENABLED":
                    case 70:
                        m.capabilities[m.capabilities.length] = 70;
                        break;
                    case "AI_RICH_RESPONSE_3P_LINKING_CARD_ENABLED":
                    case 71:
                        m.capabilities[m.capabilities.length] = 71;
                        break;
                    default:
                        if (typeof d.capabilities[i] === "number" && (d.capabilities[i] | 0) === d.capabilities[i])
                            m.capabilities[m.capabilities.length] = d.capabilities[i];
                    }
                }
            }
            return m;
        };

        BotCapabilityMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.capabilities = [];
            }
            if (m.capabilities && m.capabilities.length) {
                d.capabilities = $Array(m.capabilities.length);
                for (var j = 0; j < m.capabilities.length; ++j) {
                    d.capabilities[j] = o.enums === $String ? $root.AICommon.BotCapabilityMetadata.BotCapabilityType[m.capabilities[j]] === $undefined ? m.capabilities[j] : $root.AICommon.BotCapabilityMetadata.BotCapabilityType[m.capabilities[j]] : m.capabilities[j];
                }
            }
            return d;
        };

        BotCapabilityMetadata.prototype.toJSON = function() {
            return BotCapabilityMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotCapabilityMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotCapabilityMetadata";
        };

        BotCapabilityMetadata.BotCapabilityType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "PROGRESS_INDICATOR"] = 1;
            values[valuesById[2] = "RICH_RESPONSE_HEADING"] = 2;
            values[valuesById[3] = "RICH_RESPONSE_NESTED_LIST"] = 3;
            values[valuesById[4] = "AI_MEMORY"] = 4;
            values[valuesById[5] = "RICH_RESPONSE_THREAD_SURFING"] = 5;
            values[valuesById[6] = "RICH_RESPONSE_TABLE"] = 6;
            values[valuesById[7] = "RICH_RESPONSE_CODE"] = 7;
            values[valuesById[8] = "RICH_RESPONSE_STRUCTURED_RESPONSE"] = 8;
            values[valuesById[9] = "RICH_RESPONSE_INLINE_IMAGE"] = 9;
            values[valuesById[10] = "WA_IG_1P_PLUGIN_RANKING_CONTROL"] = 10;
            values[valuesById[11] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_1"] = 11;
            values[valuesById[12] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_2"] = 12;
            values[valuesById[13] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_3"] = 13;
            values[valuesById[14] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_4"] = 14;
            values[valuesById[15] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_5"] = 15;
            values[valuesById[16] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_6"] = 16;
            values[valuesById[17] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_7"] = 17;
            values[valuesById[18] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_8"] = 18;
            values[valuesById[19] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_9"] = 19;
            values[valuesById[20] = "WA_IG_1P_PLUGIN_RANKING_UPDATE_10"] = 20;
            values[valuesById[21] = "RICH_RESPONSE_SUB_HEADING"] = 21;
            values[valuesById[22] = "RICH_RESPONSE_GRID_IMAGE"] = 22;
            values[valuesById[23] = "AI_STUDIO_UGC_MEMORY"] = 23;
            values[valuesById[24] = "RICH_RESPONSE_LATEX"] = 24;
            values[valuesById[25] = "RICH_RESPONSE_MAPS"] = 25;
            values[valuesById[26] = "RICH_RESPONSE_INLINE_REELS"] = 26;
            values[valuesById[27] = "AGENTIC_PLANNING"] = 27;
            values[valuesById[28] = "ACCOUNT_LINKING"] = 28;
            values[valuesById[29] = "STREAMING_DISAGGREGATION"] = 29;
            values[valuesById[30] = "RICH_RESPONSE_GRID_IMAGE_3P"] = 30;
            values[valuesById[31] = "RICH_RESPONSE_LATEX_INLINE"] = 31;
            values[valuesById[32] = "QUERY_PLAN"] = 32;
            values[valuesById[33] = "PROACTIVE_MESSAGE"] = 33;
            values[valuesById[34] = "RICH_RESPONSE_UNIFIED_RESPONSE"] = 34;
            values[valuesById[35] = "PROMOTION_MESSAGE"] = 35;
            values[valuesById[36] = "SIMPLIFIED_PROFILE_PAGE"] = 36;
            values[valuesById[37] = "RICH_RESPONSE_SOURCES_IN_MESSAGE"] = 37;
            values[valuesById[38] = "RICH_RESPONSE_SIDE_BY_SIDE_SURVEY"] = 38;
            values[valuesById[39] = "RICH_RESPONSE_UNIFIED_TEXT_COMPONENT"] = 39;
            values[valuesById[40] = "AI_SHARED_MEMORY"] = 40;
            values[valuesById[41] = "RICH_RESPONSE_UNIFIED_SOURCES"] = 41;
            values[valuesById[42] = "RICH_RESPONSE_UNIFIED_DOMAIN_CITATIONS"] = 42;
            values[valuesById[43] = "RICH_RESPONSE_UR_INLINE_REELS_ENABLED"] = 43;
            values[valuesById[44] = "RICH_RESPONSE_UR_MEDIA_GRID_ENABLED"] = 44;
            values[valuesById[45] = "RICH_RESPONSE_UR_TIMESTAMP_PLACEHOLDER"] = 45;
            values[valuesById[46] = "RICH_RESPONSE_IN_APP_SURVEY"] = 46;
            values[valuesById[47] = "AI_RESPONSE_MODEL_BRANDING"] = 47;
            values[valuesById[48] = "SESSION_TRANSPARENCY_SYSTEM_MESSAGE"] = 48;
            values[valuesById[49] = "RICH_RESPONSE_UR_REASONING"] = 49;
            values[valuesById[50] = "RICH_RESPONSE_UR_ZEITGEIST_CITATIONS"] = 50;
            values[valuesById[51] = "RICH_RESPONSE_UR_ZEITGEIST_CAROUSEL"] = 51;
            values[valuesById[52] = "AI_IMAGINE_LOADING_INDICATOR"] = 52;
            values[valuesById[53] = "RICH_RESPONSE_UR_IMAGINE"] = 53;
            values[valuesById[54] = "AI_IMAGINE_UR_TO_NATIVE_LOADING_INDICATOR"] = 54;
            values[valuesById[55] = "RICH_RESPONSE_UR_BLOKS_ENABLED"] = 55;
            values[valuesById[56] = "RICH_RESPONSE_INLINE_LINKS_ENABLED"] = 56;
            values[valuesById[57] = "RICH_RESPONSE_UR_IMAGINE_VIDEO"] = 57;
            values[valuesById[58] = "JSON_PATCH_STREAMING"] = 58;
            values[valuesById[59] = "AI_TAB_FORCE_CLIPPY"] = 59;
            values[valuesById[60] = "UNIFIED_RESPONSE_EMBEDDED_SCREENS"] = 60;
            values[valuesById[61] = "AI_SUBSCRIPTION_ENABLED"] = 61;
            values[valuesById[62] = "UNIFIED_RESPONSE_AI_CONTENT_SEARCH_ENABLED"] = 62;
            values[valuesById[63] = "UNIFIED_RESPONSE_MARKDOWN_LINKS_ENABLED"] = 63;
            values[valuesById[64] = "AI_RICH_RESPONSE_MAPS_V2_ENABLED"] = 64;
            values[valuesById[65] = "AI_SUBSCRIPTION_METERING_ENABLED"] = 65;
            values[valuesById[66] = "RICH_RESPONSE_SPORTS_WIDGET_ENABLED"] = 66;
            values[valuesById[67] = "AI_RICH_RESPONSE_ARTIFACTS_ENABLED"] = 67;
            values[valuesById[68] = "AI_RICH_RESPONSE_EMAIL_CALENDAR_ENABLED"] = 68;
            values[valuesById[69] = "AI_RICH_RESPONSE_REMINDERS_ENABLED"] = 69;
            values[valuesById[70] = "AI_STOP_GENERATION_ENABLED"] = 70;
            values[valuesById[71] = "AI_RICH_RESPONSE_3P_LINKING_CARD_ENABLED"] = 71;
            return values;
        })();

        return BotCapabilityMetadata;
    })();

    AICommon.BotProgressIndicatorMetadata = (function() {

        const BotProgressIndicatorMetadata = function (p) {
            this.stepsMetadata = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotProgressIndicatorMetadata.prototype.progressDescription = null;
        BotProgressIndicatorMetadata.prototype.stepsMetadata = $util.emptyArray;
        BotProgressIndicatorMetadata.prototype.estimatedCompletionTime = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotProgressIndicatorMetadata.prototype, "_progressDescription", {
            get: $util.oneOfGetter($oneOfFields = ["progressDescription"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotProgressIndicatorMetadata.prototype, "_estimatedCompletionTime", {
            get: $util.oneOfGetter($oneOfFields = ["estimatedCompletionTime"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotProgressIndicatorMetadata.create = function(properties) {
            return new BotProgressIndicatorMetadata(properties);
        };

        BotProgressIndicatorMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.progressDescription != null && $Object.hasOwnProperty.call(m, "progressDescription"))
                w.uint32(10).string(m.progressDescription);
            if (m.stepsMetadata != null && m.stepsMetadata.length) {
                for (var i = 0; i < m.stepsMetadata.length; ++i)
                    $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.encode(m.stepsMetadata[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.estimatedCompletionTime != null && $Object.hasOwnProperty.call(m, "estimatedCompletionTime"))
                w.uint32(24).int64(m.estimatedCompletionTime);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotProgressIndicatorMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotProgressIndicatorMetadata();
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
                        m.progressDescription = r.stringVerify();
                        m._progressDescription = "progressDescription";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.stepsMetadata && m.stepsMetadata.length))
                            m.stepsMetadata = [];
                        m.stepsMetadata.push($root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.estimatedCompletionTime = r.int64();
                        m._estimatedCompletionTime = "estimatedCompletionTime";
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

        BotProgressIndicatorMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotProgressIndicatorMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotProgressIndicatorMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotProgressIndicatorMetadata();
            if (d.progressDescription != null) {
                m.progressDescription = $String(d.progressDescription);
            }
            if (d.stepsMetadata) {
                if (!$Array.isArray(d.stepsMetadata))
                    throw $TypeError(".AICommon.BotProgressIndicatorMetadata.stepsMetadata: array expected");
                m.stepsMetadata = $Array(d.stepsMetadata.length);
                for (var i = 0; i < d.stepsMetadata.length; ++i) {
                    if (!$util.isObject(d.stepsMetadata[i]))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.stepsMetadata: object expected");
                    m.stepsMetadata[i] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.fromObject(d.stepsMetadata[i], q + 1);
                }
            }
            if (d.estimatedCompletionTime != null) {
                if ($util.Long)
                    m.estimatedCompletionTime = $util.Long.fromValue(d.estimatedCompletionTime, false);
                else if (typeof d.estimatedCompletionTime === "string")
                    m.estimatedCompletionTime = $parseInt(d.estimatedCompletionTime, 10);
                else if (typeof d.estimatedCompletionTime === "number")
                    m.estimatedCompletionTime = d.estimatedCompletionTime;
                else if (typeof d.estimatedCompletionTime === "object")
                    m.estimatedCompletionTime = new $util.LongBits(d.estimatedCompletionTime.low >>> 0, d.estimatedCompletionTime.high >>> 0).toNumber();
            }
            return m;
        };

        BotProgressIndicatorMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.stepsMetadata = [];
            }
            if (m.progressDescription != null && $Object.hasOwnProperty.call(m, "progressDescription")) {
                d.progressDescription = m.progressDescription;
            }
            if (m.stepsMetadata && m.stepsMetadata.length) {
                d.stepsMetadata = $Array(m.stepsMetadata.length);
                for (var j = 0; j < m.stepsMetadata.length; ++j) {
                    d.stepsMetadata[j] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.toObject(m.stepsMetadata[j], o, q + 1);
                }
            }
            if (m.estimatedCompletionTime != null && $Object.hasOwnProperty.call(m, "estimatedCompletionTime")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.estimatedCompletionTime = typeof m.estimatedCompletionTime === "number" ? $BigInt(m.estimatedCompletionTime) : $util.Long.fromBits(m.estimatedCompletionTime.low >>> 0, m.estimatedCompletionTime.high >>> 0, false).toBigInt();
                else if (typeof m.estimatedCompletionTime === "number")
                    d.estimatedCompletionTime = o.longs === $String ? $String(m.estimatedCompletionTime) : m.estimatedCompletionTime;
                else
                    d.estimatedCompletionTime = o.longs === $String ? $util.Long.prototype.toString.call(m.estimatedCompletionTime) : o.longs === $Number ? new $util.LongBits(m.estimatedCompletionTime.low >>> 0, m.estimatedCompletionTime.high >>> 0).toNumber() : m.estimatedCompletionTime;
            }
            return d;
        };

        BotProgressIndicatorMetadata.prototype.toJSON = function() {
            return BotProgressIndicatorMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotProgressIndicatorMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotProgressIndicatorMetadata";
        };

        BotProgressIndicatorMetadata.BotPlanningStepMetadata = (function() {

            const BotPlanningStepMetadata = function (p) {
                this.sourcesMetadata = [];
                this.sections = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            BotPlanningStepMetadata.prototype.statusTitle = null;
            BotPlanningStepMetadata.prototype.statusBody = null;
            BotPlanningStepMetadata.prototype.sourcesMetadata = $util.emptyArray;
            BotPlanningStepMetadata.prototype.status = null;
            BotPlanningStepMetadata.prototype.isReasoning = null;
            BotPlanningStepMetadata.prototype.isEnhancedSearch = null;
            BotPlanningStepMetadata.prototype.sections = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusTitle", {
                get: $util.oneOfGetter($oneOfFields = ["statusTitle"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_statusBody", {
                get: $util.oneOfGetter($oneOfFields = ["statusBody"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_status", {
                get: $util.oneOfGetter($oneOfFields = ["status"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_isReasoning", {
                get: $util.oneOfGetter($oneOfFields = ["isReasoning"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(BotPlanningStepMetadata.prototype, "_isEnhancedSearch", {
                get: $util.oneOfGetter($oneOfFields = ["isEnhancedSearch"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            BotPlanningStepMetadata.create = function(properties) {
                return new BotPlanningStepMetadata(properties);
            };

            BotPlanningStepMetadata.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.statusTitle != null && $Object.hasOwnProperty.call(m, "statusTitle"))
                    w.uint32(10).string(m.statusTitle);
                if (m.statusBody != null && $Object.hasOwnProperty.call(m, "statusBody"))
                    w.uint32(18).string(m.statusBody);
                if (m.sourcesMetadata != null && m.sourcesMetadata.length) {
                    for (var i = 0; i < m.sourcesMetadata.length; ++i)
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.encode(m.sourcesMetadata[i], w.uint32(26).fork(), q + 1).ldelim();
                }
                if (m.status != null && $Object.hasOwnProperty.call(m, "status"))
                    w.uint32(32).int32(m.status);
                if (m.isReasoning != null && $Object.hasOwnProperty.call(m, "isReasoning"))
                    w.uint32(40).bool(m.isReasoning);
                if (m.isEnhancedSearch != null && $Object.hasOwnProperty.call(m, "isEnhancedSearch"))
                    w.uint32(48).bool(m.isEnhancedSearch);
                if (m.sections != null && m.sections.length) {
                    for (var i = 0; i < m.sections.length; ++i)
                        $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.encode(m.sections[i], w.uint32(58).fork(), q + 1).ldelim();
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            BotPlanningStepMetadata.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
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
                            m.statusTitle = r.stringVerify();
                            m._statusTitle = "statusTitle";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.statusBody = r.stringVerify();
                            m._statusBody = "statusBody";
                            continue;
                        }
                    case 3: {
                            if (u !== 2)
                                break;
                            if (!(m.sourcesMetadata && m.sourcesMetadata.length))
                                m.sourcesMetadata = [];
                            m.sourcesMetadata.push($root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.decode(r, r.uint32(), $undefined, q + 1));
                            continue;
                        }
                    case 4: {
                            if (u !== 0)
                                break;
                            m.status = r.int32();
                            m._status = "status";
                            continue;
                        }
                    case 5: {
                            if (u !== 0)
                                break;
                            m.isReasoning = r.bool();
                            m._isReasoning = "isReasoning";
                            continue;
                        }
                    case 6: {
                            if (u !== 0)
                                break;
                            m.isEnhancedSearch = r.bool();
                            m._isEnhancedSearch = "isEnhancedSearch";
                            continue;
                        }
                    case 7: {
                            if (u !== 2)
                                break;
                            if (!(m.sections && m.sections.length))
                                m.sections = [];
                            m.sections.push($root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

            BotPlanningStepMetadata.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata();
                if (d.statusTitle != null) {
                    m.statusTitle = $String(d.statusTitle);
                }
                if (d.statusBody != null) {
                    m.statusBody = $String(d.statusBody);
                }
                if (d.sourcesMetadata) {
                    if (!$Array.isArray(d.sourcesMetadata))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: array expected");
                    m.sourcesMetadata = $Array(d.sourcesMetadata.length);
                    for (var i = 0; i < d.sourcesMetadata.length; ++i) {
                        if (!$util.isObject(d.sourcesMetadata[i]))
                            throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sourcesMetadata: object expected");
                        m.sourcesMetadata[i] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.fromObject(d.sourcesMetadata[i], q + 1);
                    }
                }
                switch (d.status) {
                case "UNKNOWN":
                case 0:
                    m.status = 0;
                    break;
                case "PLANNED":
                case 1:
                    m.status = 1;
                    break;
                case "EXECUTING":
                case 2:
                    m.status = 2;
                    break;
                case "FINISHED":
                case 3:
                    m.status = 3;
                    break;
                default:
                    if (typeof d.status === "number" && (d.status | 0) === d.status)
                        m.status = d.status;
                }
                if (d.isReasoning != null) {
                    m.isReasoning = $Boolean(d.isReasoning);
                }
                if (d.isEnhancedSearch != null) {
                    m.isEnhancedSearch = $Boolean(d.isEnhancedSearch);
                }
                if (d.sections) {
                    if (!$Array.isArray(d.sections))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: array expected");
                    m.sections = $Array(d.sections.length);
                    for (var i = 0; i < d.sections.length; ++i) {
                        if (!$util.isObject(d.sections[i]))
                            throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.sections: object expected");
                        m.sections[i] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.fromObject(d.sections[i], q + 1);
                    }
                }
                return m;
            };

            BotPlanningStepMetadata.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.sourcesMetadata = [];
                    d.sections = [];
                }
                if (m.statusTitle != null && $Object.hasOwnProperty.call(m, "statusTitle")) {
                    d.statusTitle = m.statusTitle;
                }
                if (m.statusBody != null && $Object.hasOwnProperty.call(m, "statusBody")) {
                    d.statusBody = m.statusBody;
                }
                if (m.sourcesMetadata && m.sourcesMetadata.length) {
                    d.sourcesMetadata = $Array(m.sourcesMetadata.length);
                    for (var j = 0; j < m.sourcesMetadata.length; ++j) {
                        d.sourcesMetadata[j] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.toObject(m.sourcesMetadata[j], o, q + 1);
                    }
                }
                if (m.status != null && $Object.hasOwnProperty.call(m, "status")) {
                    d.status = o.enums === $String ? $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus[m.status] === $undefined ? m.status : $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.PlanningStepStatus[m.status] : m.status;
                }
                if (m.isReasoning != null && $Object.hasOwnProperty.call(m, "isReasoning")) {
                    d.isReasoning = m.isReasoning;
                }
                if (m.isEnhancedSearch != null && $Object.hasOwnProperty.call(m, "isEnhancedSearch")) {
                    d.isEnhancedSearch = m.isEnhancedSearch;
                }
                if (m.sections && m.sections.length) {
                    d.sections = $Array(m.sections.length);
                    for (var j = 0; j < m.sections.length; ++j) {
                        d.sections[j] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.toObject(m.sections[j], o, q + 1);
                    }
                }
                return d;
            };

            BotPlanningStepMetadata.prototype.toJSON = function() {
                return BotPlanningStepMetadata.toObject(this, $protobuf.util.toJSONOptions);
            };

            BotPlanningStepMetadata.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata";
            };

            BotPlanningStepMetadata.BotPlanningSearchSourceMetadata = (function() {

                const BotPlanningSearchSourceMetadata = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningSearchSourceMetadata.prototype.title = null;
                BotPlanningSearchSourceMetadata.prototype.provider = null;
                BotPlanningSearchSourceMetadata.prototype.sourceUrl = null;
                BotPlanningSearchSourceMetadata.prototype.favIconUrl = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_title", {
                    get: $util.oneOfGetter($oneOfFields = ["title"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter($oneOfFields = ["provider"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourceMetadata.prototype, "_favIconUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["favIconUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningSearchSourceMetadata.create = function(properties) {
                    return new BotPlanningSearchSourceMetadata(properties);
                };

                BotPlanningSearchSourceMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.title != null && $Object.hasOwnProperty.call(m, "title"))
                        w.uint32(10).string(m.title);
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                        w.uint32(16).int32(m.provider);
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl"))
                        w.uint32(26).string(m.sourceUrl);
                    if (m.favIconUrl != null && $Object.hasOwnProperty.call(m, "favIconUrl"))
                        w.uint32(34).string(m.favIconUrl);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningSearchSourceMetadata.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
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
                                m.title = r.stringVerify();
                                m._title = "title";
                                continue;
                            }
                        case 2: {
                                if (u !== 0)
                                    break;
                                m.provider = r.int32();
                                m._provider = "provider";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.sourceUrl = r.stringVerify();
                                m._sourceUrl = "sourceUrl";
                                continue;
                            }
                        case 4: {
                                if (u !== 2)
                                    break;
                                m.favIconUrl = r.stringVerify();
                                m._favIconUrl = "favIconUrl";
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

                BotPlanningSearchSourceMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata();
                    if (d.title != null) {
                        m.title = $String(d.title);
                    }
                    switch (d.provider) {
                    case "UNKNOWN_PROVIDER":
                    case 0:
                        m.provider = 0;
                        break;
                    case "OTHER":
                    case 1:
                        m.provider = 1;
                        break;
                    case "GOOGLE":
                    case 2:
                        m.provider = 2;
                        break;
                    case "BING":
                    case 3:
                        m.provider = 3;
                        break;
                    default:
                        if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                            m.provider = d.provider;
                    }
                    if (d.sourceUrl != null) {
                        m.sourceUrl = $String(d.sourceUrl);
                    }
                    if (d.favIconUrl != null) {
                        m.favIconUrl = $String(d.favIconUrl);
                    }
                    return m;
                };

                BotPlanningSearchSourceMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.title != null && $Object.hasOwnProperty.call(m, "title")) {
                        d.title = m.title;
                    }
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                        d.provider = o.enums === $String ? $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider[m.provider] === $undefined ? m.provider : $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotSearchSourceProvider[m.provider] : m.provider;
                    }
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl")) {
                        d.sourceUrl = m.sourceUrl;
                    }
                    if (m.favIconUrl != null && $Object.hasOwnProperty.call(m, "favIconUrl")) {
                        d.favIconUrl = m.favIconUrl;
                    }
                    return d;
                };

                BotPlanningSearchSourceMetadata.prototype.toJSON = function() {
                    return BotPlanningSearchSourceMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningSearchSourceMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata";
                };

                return BotPlanningSearchSourceMetadata;
            })();

            BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata = (function() {

                const BotPlanningSearchSourcesMetadata = function (p) {
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningSearchSourcesMetadata.prototype.sourceTitle = null;
                BotPlanningSearchSourcesMetadata.prototype.provider = null;
                BotPlanningSearchSourcesMetadata.prototype.sourceUrl = null;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceTitle", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceTitle"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_provider", {
                    get: $util.oneOfGetter($oneOfFields = ["provider"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningSearchSourcesMetadata.prototype, "_sourceUrl", {
                    get: $util.oneOfGetter($oneOfFields = ["sourceUrl"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningSearchSourcesMetadata.create = function(properties) {
                    return new BotPlanningSearchSourcesMetadata(properties);
                };

                BotPlanningSearchSourcesMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle"))
                        w.uint32(10).string(m.sourceTitle);
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                        w.uint32(16).int32(m.provider);
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl"))
                        w.uint32(26).string(m.sourceUrl);
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningSearchSourcesMetadata.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
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
                                m.sourceTitle = r.stringVerify();
                                m._sourceTitle = "sourceTitle";
                                continue;
                            }
                        case 2: {
                                if (u !== 0)
                                    break;
                                m.provider = r.int32();
                                m._provider = "provider";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                m.sourceUrl = r.stringVerify();
                                m._sourceUrl = "sourceUrl";
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

                BotPlanningSearchSourcesMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata();
                    if (d.sourceTitle != null) {
                        m.sourceTitle = $String(d.sourceTitle);
                    }
                    switch (d.provider) {
                    case "UNKNOWN":
                    case 0:
                        m.provider = 0;
                        break;
                    case "OTHER":
                    case 1:
                        m.provider = 1;
                        break;
                    case "GOOGLE":
                    case 2:
                        m.provider = 2;
                        break;
                    case "BING":
                    case 3:
                        m.provider = 3;
                        break;
                    default:
                        if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                            m.provider = d.provider;
                    }
                    if (d.sourceUrl != null) {
                        m.sourceUrl = $String(d.sourceUrl);
                    }
                    return m;
                };

                BotPlanningSearchSourcesMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (m.sourceTitle != null && $Object.hasOwnProperty.call(m, "sourceTitle")) {
                        d.sourceTitle = m.sourceTitle;
                    }
                    if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                        d.provider = o.enums === $String ? $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider[m.provider] === $undefined ? m.provider : $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider[m.provider] : m.provider;
                    }
                    if (m.sourceUrl != null && $Object.hasOwnProperty.call(m, "sourceUrl")) {
                        d.sourceUrl = m.sourceUrl;
                    }
                    return d;
                };

                BotPlanningSearchSourcesMetadata.prototype.toJSON = function() {
                    return BotPlanningSearchSourcesMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningSearchSourcesMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourcesMetadata";
                };

                BotPlanningSearchSourcesMetadata.BotPlanningSearchSourceProvider = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "UNKNOWN"] = 0;
                    values[valuesById[1] = "OTHER"] = 1;
                    values[valuesById[2] = "GOOGLE"] = 2;
                    values[valuesById[3] = "BING"] = 3;
                    return values;
                })();

                return BotPlanningSearchSourcesMetadata;
            })();

            BotPlanningStepMetadata.BotPlanningStepSectionMetadata = (function() {

                const BotPlanningStepSectionMetadata = function (p) {
                    this.sourcesMetadata = [];
                    if (p)
                        for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null && ks[i] !== "__proto__")
                                this[ks[i]] = p[ks[i]];
                };

                BotPlanningStepSectionMetadata.prototype.sectionTitle = null;
                BotPlanningStepSectionMetadata.prototype.sectionBody = null;
                BotPlanningStepSectionMetadata.prototype.sourcesMetadata = $util.emptyArray;

                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionTitle", {
                    get: $util.oneOfGetter($oneOfFields = ["sectionTitle"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                $Object.defineProperty(BotPlanningStepSectionMetadata.prototype, "_sectionBody", {
                    get: $util.oneOfGetter($oneOfFields = ["sectionBody"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                BotPlanningStepSectionMetadata.create = function(properties) {
                    return new BotPlanningStepSectionMetadata(properties);
                };

                BotPlanningStepSectionMetadata.encode = function (m, w, q) {
                    if (!w)
                        w = $Writer.create();
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (m.sectionTitle != null && $Object.hasOwnProperty.call(m, "sectionTitle"))
                        w.uint32(10).string(m.sectionTitle);
                    if (m.sectionBody != null && $Object.hasOwnProperty.call(m, "sectionBody"))
                        w.uint32(18).string(m.sectionBody);
                    if (m.sourcesMetadata != null && m.sourcesMetadata.length) {
                        for (var i = 0; i < m.sourcesMetadata.length; ++i)
                            $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.encode(m.sourcesMetadata[i], w.uint32(26).fork(), q + 1).ldelim();
                    }
                    if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                        for (var i = 0; i < m.$unknowns.length; ++i)
                            w.raw(m.$unknowns[i]);
                    return w;
                };

                BotPlanningStepSectionMetadata.decode = function (r, l, z, q, g) {
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
                    m = g || new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
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
                                m.sectionTitle = r.stringVerify();
                                m._sectionTitle = "sectionTitle";
                                continue;
                            }
                        case 2: {
                                if (u !== 2)
                                    break;
                                m.sectionBody = r.stringVerify();
                                m._sectionBody = "sectionBody";
                                continue;
                            }
                        case 3: {
                                if (u !== 2)
                                    break;
                                if (!(m.sourcesMetadata && m.sourcesMetadata.length))
                                    m.sourcesMetadata = [];
                                m.sourcesMetadata.push($root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

                BotPlanningStepSectionMetadata.fromObject = function (d, q) {
                    if (d instanceof $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata)
                        return d;
                    if (!$util.isObject(d))
                        throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata: object expected");
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var m = new $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata();
                    if (d.sectionTitle != null) {
                        m.sectionTitle = $String(d.sectionTitle);
                    }
                    if (d.sectionBody != null) {
                        m.sectionBody = $String(d.sectionBody);
                    }
                    if (d.sourcesMetadata) {
                        if (!$Array.isArray(d.sourcesMetadata))
                            throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: array expected");
                        m.sourcesMetadata = $Array(d.sourcesMetadata.length);
                        for (var i = 0; i < d.sourcesMetadata.length; ++i) {
                            if (!$util.isObject(d.sourcesMetadata[i]))
                                throw $TypeError(".AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata.sourcesMetadata: object expected");
                            m.sourcesMetadata[i] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.fromObject(d.sourcesMetadata[i], q + 1);
                        }
                    }
                    return m;
                };

                BotPlanningStepSectionMetadata.toObject = function (m, o, q) {
                    if (!o)
                        o = {};
                    if (q === $undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    var d = {};
                    if (o.arrays || o.defaults) {
                        d.sourcesMetadata = [];
                    }
                    if (m.sectionTitle != null && $Object.hasOwnProperty.call(m, "sectionTitle")) {
                        d.sectionTitle = m.sectionTitle;
                    }
                    if (m.sectionBody != null && $Object.hasOwnProperty.call(m, "sectionBody")) {
                        d.sectionBody = m.sectionBody;
                    }
                    if (m.sourcesMetadata && m.sourcesMetadata.length) {
                        d.sourcesMetadata = $Array(m.sourcesMetadata.length);
                        for (var j = 0; j < m.sourcesMetadata.length; ++j) {
                            d.sourcesMetadata[j] = $root.AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningSearchSourceMetadata.toObject(m.sourcesMetadata[j], o, q + 1);
                        }
                    }
                    return d;
                };

                BotPlanningStepSectionMetadata.prototype.toJSON = function() {
                    return BotPlanningStepSectionMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                BotPlanningStepSectionMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/AICommon.BotProgressIndicatorMetadata.BotPlanningStepMetadata.BotPlanningStepSectionMetadata";
                };

                return BotPlanningStepSectionMetadata;
            })();

            BotPlanningStepMetadata.BotSearchSourceProvider = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN_PROVIDER"] = 0;
                values[valuesById[1] = "OTHER"] = 1;
                values[valuesById[2] = "GOOGLE"] = 2;
                values[valuesById[3] = "BING"] = 3;
                return values;
            })();

            BotPlanningStepMetadata.PlanningStepStatus = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "PLANNED"] = 1;
                values[valuesById[2] = "EXECUTING"] = 2;
                values[valuesById[3] = "FINISHED"] = 3;
                return values;
            })();

            return BotPlanningStepMetadata;
        })();

        return BotProgressIndicatorMetadata;
    })();

    AICommon.BotModelMetadata = (function() {

        const BotModelMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotModelMetadata.prototype.modelType = null;
        BotModelMetadata.prototype.premiumModelStatus = null;
        BotModelMetadata.prototype.modelNameOverride = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotModelMetadata.prototype, "_modelType", {
            get: $util.oneOfGetter($oneOfFields = ["modelType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotModelMetadata.prototype, "_premiumModelStatus", {
            get: $util.oneOfGetter($oneOfFields = ["premiumModelStatus"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotModelMetadata.prototype, "_modelNameOverride", {
            get: $util.oneOfGetter($oneOfFields = ["modelNameOverride"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotModelMetadata.create = function(properties) {
            return new BotModelMetadata(properties);
        };

        BotModelMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.modelType != null && $Object.hasOwnProperty.call(m, "modelType"))
                w.uint32(8).int32(m.modelType);
            if (m.premiumModelStatus != null && $Object.hasOwnProperty.call(m, "premiumModelStatus"))
                w.uint32(16).int32(m.premiumModelStatus);
            if (m.modelNameOverride != null && $Object.hasOwnProperty.call(m, "modelNameOverride"))
                w.uint32(26).string(m.modelNameOverride);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotModelMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotModelMetadata();
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
                        m.modelType = r.int32();
                        m._modelType = "modelType";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.premiumModelStatus = r.int32();
                        m._premiumModelStatus = "premiumModelStatus";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.modelNameOverride = r.stringVerify();
                        m._modelNameOverride = "modelNameOverride";
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

        BotModelMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotModelMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotModelMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotModelMetadata();
            switch (d.modelType) {
            case "UNKNOWN_TYPE":
            case 0:
                m.modelType = 0;
                break;
            case "LLAMA_PROD":
            case 1:
                m.modelType = 1;
                break;
            case "LLAMA_PROD_PREMIUM":
            case 2:
                m.modelType = 2;
                break;
            default:
                if (typeof d.modelType === "number" && (d.modelType | 0) === d.modelType)
                    m.modelType = d.modelType;
            }
            switch (d.premiumModelStatus) {
            case "UNKNOWN_STATUS":
            case 0:
                m.premiumModelStatus = 0;
                break;
            case "AVAILABLE":
            case 1:
                m.premiumModelStatus = 1;
                break;
            case "QUOTA_EXCEED_LIMIT":
            case 2:
                m.premiumModelStatus = 2;
                break;
            default:
                if (typeof d.premiumModelStatus === "number" && (d.premiumModelStatus | 0) === d.premiumModelStatus)
                    m.premiumModelStatus = d.premiumModelStatus;
            }
            if (d.modelNameOverride != null) {
                m.modelNameOverride = $String(d.modelNameOverride);
            }
            return m;
        };

        BotModelMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.modelType != null && $Object.hasOwnProperty.call(m, "modelType")) {
                d.modelType = o.enums === $String ? $root.AICommon.BotModelMetadata.ModelType[m.modelType] === $undefined ? m.modelType : $root.AICommon.BotModelMetadata.ModelType[m.modelType] : m.modelType;
            }
            if (m.premiumModelStatus != null && $Object.hasOwnProperty.call(m, "premiumModelStatus")) {
                d.premiumModelStatus = o.enums === $String ? $root.AICommon.BotModelMetadata.PremiumModelStatus[m.premiumModelStatus] === $undefined ? m.premiumModelStatus : $root.AICommon.BotModelMetadata.PremiumModelStatus[m.premiumModelStatus] : m.premiumModelStatus;
            }
            if (m.modelNameOverride != null && $Object.hasOwnProperty.call(m, "modelNameOverride")) {
                d.modelNameOverride = m.modelNameOverride;
            }
            return d;
        };

        BotModelMetadata.prototype.toJSON = function() {
            return BotModelMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotModelMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotModelMetadata";
        };

        BotModelMetadata.ModelType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_TYPE"] = 0;
            values[valuesById[1] = "LLAMA_PROD"] = 1;
            values[valuesById[2] = "LLAMA_PROD_PREMIUM"] = 2;
            return values;
        })();

        BotModelMetadata.PremiumModelStatus = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_STATUS"] = 0;
            values[valuesById[1] = "AVAILABLE"] = 1;
            values[valuesById[2] = "QUOTA_EXCEED_LIMIT"] = 2;
            return values;
        })();

        return BotModelMetadata;
    })();

    AICommon.BotReminderMetadata = (function() {

        const BotReminderMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotReminderMetadata.prototype.requestMessageKey = null;
        BotReminderMetadata.prototype.action = null;
        BotReminderMetadata.prototype.name = null;
        BotReminderMetadata.prototype.nextTriggerTimestamp = null;
        BotReminderMetadata.prototype.frequency = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_requestMessageKey", {
            get: $util.oneOfGetter($oneOfFields = ["requestMessageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_action", {
            get: $util.oneOfGetter($oneOfFields = ["action"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_name", {
            get: $util.oneOfGetter($oneOfFields = ["name"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_nextTriggerTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["nextTriggerTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotReminderMetadata.prototype, "_frequency", {
            get: $util.oneOfGetter($oneOfFields = ["frequency"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotReminderMetadata.create = function(properties) {
            return new BotReminderMetadata(properties);
        };

        BotReminderMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.requestMessageKey != null && $Object.hasOwnProperty.call(m, "requestMessageKey"))
                $root.Protocol.MessageKey.encode(m.requestMessageKey, w.uint32(10).fork(), q + 1).ldelim();
            if (m.action != null && $Object.hasOwnProperty.call(m, "action"))
                w.uint32(16).int32(m.action);
            if (m.name != null && $Object.hasOwnProperty.call(m, "name"))
                w.uint32(26).string(m.name);
            if (m.nextTriggerTimestamp != null && $Object.hasOwnProperty.call(m, "nextTriggerTimestamp"))
                w.uint32(32).uint64(m.nextTriggerTimestamp);
            if (m.frequency != null && $Object.hasOwnProperty.call(m, "frequency"))
                w.uint32(40).int32(m.frequency);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotReminderMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotReminderMetadata();
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
                        m.requestMessageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.requestMessageKey);
                        m._requestMessageKey = "requestMessageKey";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.action = r.int32();
                        m._action = "action";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.name = r.stringVerify();
                        m._name = "name";
                        continue;
                    }
                case 4: {
                        if (u !== 0)
                            break;
                        m.nextTriggerTimestamp = r.uint64();
                        m._nextTriggerTimestamp = "nextTriggerTimestamp";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.frequency = r.int32();
                        m._frequency = "frequency";
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

        BotReminderMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotReminderMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotReminderMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotReminderMetadata();
            if (d.requestMessageKey != null) {
                if (!$util.isObject(d.requestMessageKey))
                    throw $TypeError(".AICommon.BotReminderMetadata.requestMessageKey: object expected");
                m.requestMessageKey = $root.Protocol.MessageKey.fromObject(d.requestMessageKey, q + 1);
            }
            switch (d.action) {
            case "NOTIFY":
            case 1:
                m.action = 1;
                break;
            case "CREATE":
            case 2:
                m.action = 2;
                break;
            case "DELETE":
            case 3:
                m.action = 3;
                break;
            case "UPDATE":
            case 4:
                m.action = 4;
                break;
            default:
                if (typeof d.action === "number" && (d.action | 0) === d.action)
                    m.action = d.action;
            }
            if (d.name != null) {
                m.name = $String(d.name);
            }
            if (d.nextTriggerTimestamp != null) {
                if ($util.Long)
                    m.nextTriggerTimestamp = $util.Long.fromValue(d.nextTriggerTimestamp, true);
                else if (typeof d.nextTriggerTimestamp === "string")
                    m.nextTriggerTimestamp = $parseInt(d.nextTriggerTimestamp, 10);
                else if (typeof d.nextTriggerTimestamp === "number")
                    m.nextTriggerTimestamp = d.nextTriggerTimestamp;
                else if (typeof d.nextTriggerTimestamp === "object")
                    m.nextTriggerTimestamp = new $util.LongBits(d.nextTriggerTimestamp.low >>> 0, d.nextTriggerTimestamp.high >>> 0).toNumber(true);
            }
            switch (d.frequency) {
            case "ONCE":
            case 1:
                m.frequency = 1;
                break;
            case "DAILY":
            case 2:
                m.frequency = 2;
                break;
            case "WEEKLY":
            case 3:
                m.frequency = 3;
                break;
            case "BIWEEKLY":
            case 4:
                m.frequency = 4;
                break;
            case "MONTHLY":
            case 5:
                m.frequency = 5;
                break;
            default:
                if (typeof d.frequency === "number" && (d.frequency | 0) === d.frequency)
                    m.frequency = d.frequency;
            }
            return m;
        };

        BotReminderMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.requestMessageKey != null && $Object.hasOwnProperty.call(m, "requestMessageKey")) {
                d.requestMessageKey = $root.Protocol.MessageKey.toObject(m.requestMessageKey, o, q + 1);
            }
            if (m.action != null && $Object.hasOwnProperty.call(m, "action")) {
                d.action = o.enums === $String ? $root.AICommon.BotReminderMetadata.ReminderAction[m.action] === $undefined ? m.action : $root.AICommon.BotReminderMetadata.ReminderAction[m.action] : m.action;
            }
            if (m.name != null && $Object.hasOwnProperty.call(m, "name")) {
                d.name = m.name;
            }
            if (m.nextTriggerTimestamp != null && $Object.hasOwnProperty.call(m, "nextTriggerTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.nextTriggerTimestamp = typeof m.nextTriggerTimestamp === "number" ? $BigInt(m.nextTriggerTimestamp) : $util.Long.fromBits(m.nextTriggerTimestamp.low >>> 0, m.nextTriggerTimestamp.high >>> 0, true).toBigInt();
                else if (typeof m.nextTriggerTimestamp === "number")
                    d.nextTriggerTimestamp = o.longs === $String ? $String(m.nextTriggerTimestamp) : m.nextTriggerTimestamp;
                else
                    d.nextTriggerTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.nextTriggerTimestamp) : o.longs === $Number ? new $util.LongBits(m.nextTriggerTimestamp.low >>> 0, m.nextTriggerTimestamp.high >>> 0).toNumber(true) : m.nextTriggerTimestamp;
            }
            if (m.frequency != null && $Object.hasOwnProperty.call(m, "frequency")) {
                d.frequency = o.enums === $String ? $root.AICommon.BotReminderMetadata.ReminderFrequency[m.frequency] === $undefined ? m.frequency : $root.AICommon.BotReminderMetadata.ReminderFrequency[m.frequency] : m.frequency;
            }
            return d;
        };

        BotReminderMetadata.prototype.toJSON = function() {
            return BotReminderMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotReminderMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotReminderMetadata";
        };

        BotReminderMetadata.ReminderAction = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "NOTIFY"] = 1;
            values[valuesById[2] = "CREATE"] = 2;
            values[valuesById[3] = "DELETE"] = 3;
            values[valuesById[4] = "UPDATE"] = 4;
            return values;
        })();

        BotReminderMetadata.ReminderFrequency = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "ONCE"] = 1;
            values[valuesById[2] = "DAILY"] = 2;
            values[valuesById[3] = "WEEKLY"] = 3;
            values[valuesById[4] = "BIWEEKLY"] = 4;
            values[valuesById[5] = "MONTHLY"] = 5;
            return values;
        })();

        return BotReminderMetadata;
    })();

    AICommon.BotMemuMetadata = (function() {

        const BotMemuMetadata = function (p) {
            this.faceImages = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemuMetadata.prototype.faceImages = $util.emptyArray;

        BotMemuMetadata.create = function(properties) {
            return new BotMemuMetadata(properties);
        };

        BotMemuMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.faceImages != null && m.faceImages.length) {
                for (var i = 0; i < m.faceImages.length; ++i)
                    $root.AICommon.BotMediaMetadata.encode(m.faceImages[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemuMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMemuMetadata();
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
                        if (!(m.faceImages && m.faceImages.length))
                            m.faceImages = [];
                        m.faceImages.push($root.AICommon.BotMediaMetadata.decode(r, r.uint32(), $undefined, q + 1));
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

        BotMemuMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMemuMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMemuMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMemuMetadata();
            if (d.faceImages) {
                if (!$Array.isArray(d.faceImages))
                    throw $TypeError(".AICommon.BotMemuMetadata.faceImages: array expected");
                m.faceImages = $Array(d.faceImages.length);
                for (var i = 0; i < d.faceImages.length; ++i) {
                    if (!$util.isObject(d.faceImages[i]))
                        throw $TypeError(".AICommon.BotMemuMetadata.faceImages: object expected");
                    m.faceImages[i] = $root.AICommon.BotMediaMetadata.fromObject(d.faceImages[i], q + 1);
                }
            }
            return m;
        };

        BotMemuMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.faceImages = [];
            }
            if (m.faceImages && m.faceImages.length) {
                d.faceImages = $Array(m.faceImages.length);
                for (var j = 0; j < m.faceImages.length; ++j) {
                    d.faceImages[j] = $root.AICommon.BotMediaMetadata.toObject(m.faceImages[j], o, q + 1);
                }
            }
            return d;
        };

        BotMemuMetadata.prototype.toJSON = function() {
            return BotMemuMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemuMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMemuMetadata";
        };

        return BotMemuMetadata;
    })();

    AICommon.BotMediaMetadata = (function() {

        const BotMediaMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMediaMetadata.prototype.fileSha256 = null;
        BotMediaMetadata.prototype.mediaKey = null;
        BotMediaMetadata.prototype.fileEncSha256 = null;
        BotMediaMetadata.prototype.directPath = null;
        BotMediaMetadata.prototype.mediaKeyTimestamp = null;
        BotMediaMetadata.prototype.mimetype = null;
        BotMediaMetadata.prototype.orientationType = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_fileSha256", {
            get: $util.oneOfGetter($oneOfFields = ["fileSha256"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mediaKey", {
            get: $util.oneOfGetter($oneOfFields = ["mediaKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_fileEncSha256", {
            get: $util.oneOfGetter($oneOfFields = ["fileEncSha256"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_directPath", {
            get: $util.oneOfGetter($oneOfFields = ["directPath"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mediaKeyTimestamp", {
            get: $util.oneOfGetter($oneOfFields = ["mediaKeyTimestamp"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_mimetype", {
            get: $util.oneOfGetter($oneOfFields = ["mimetype"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMediaMetadata.prototype, "_orientationType", {
            get: $util.oneOfGetter($oneOfFields = ["orientationType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMediaMetadata.create = function(properties) {
            return new BotMediaMetadata(properties);
        };

        BotMediaMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.fileSha256 != null && $Object.hasOwnProperty.call(m, "fileSha256"))
                w.uint32(10).string(m.fileSha256);
            if (m.mediaKey != null && $Object.hasOwnProperty.call(m, "mediaKey"))
                w.uint32(18).string(m.mediaKey);
            if (m.fileEncSha256 != null && $Object.hasOwnProperty.call(m, "fileEncSha256"))
                w.uint32(26).string(m.fileEncSha256);
            if (m.directPath != null && $Object.hasOwnProperty.call(m, "directPath"))
                w.uint32(34).string(m.directPath);
            if (m.mediaKeyTimestamp != null && $Object.hasOwnProperty.call(m, "mediaKeyTimestamp"))
                w.uint32(40).int64(m.mediaKeyTimestamp);
            if (m.mimetype != null && $Object.hasOwnProperty.call(m, "mimetype"))
                w.uint32(50).string(m.mimetype);
            if (m.orientationType != null && $Object.hasOwnProperty.call(m, "orientationType"))
                w.uint32(56).int32(m.orientationType);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMediaMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMediaMetadata();
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
                        m.fileSha256 = r.stringVerify();
                        m._fileSha256 = "fileSha256";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.mediaKey = r.stringVerify();
                        m._mediaKey = "mediaKey";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.fileEncSha256 = r.stringVerify();
                        m._fileEncSha256 = "fileEncSha256";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.directPath = r.stringVerify();
                        m._directPath = "directPath";
                        continue;
                    }
                case 5: {
                        if (u !== 0)
                            break;
                        m.mediaKeyTimestamp = r.int64();
                        m._mediaKeyTimestamp = "mediaKeyTimestamp";
                        continue;
                    }
                case 6: {
                        if (u !== 2)
                            break;
                        m.mimetype = r.stringVerify();
                        m._mimetype = "mimetype";
                        continue;
                    }
                case 7: {
                        if (u !== 0)
                            break;
                        m.orientationType = r.int32();
                        m._orientationType = "orientationType";
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

        BotMediaMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMediaMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMediaMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMediaMetadata();
            if (d.fileSha256 != null) {
                m.fileSha256 = $String(d.fileSha256);
            }
            if (d.mediaKey != null) {
                m.mediaKey = $String(d.mediaKey);
            }
            if (d.fileEncSha256 != null) {
                m.fileEncSha256 = $String(d.fileEncSha256);
            }
            if (d.directPath != null) {
                m.directPath = $String(d.directPath);
            }
            if (d.mediaKeyTimestamp != null) {
                if ($util.Long)
                    m.mediaKeyTimestamp = $util.Long.fromValue(d.mediaKeyTimestamp, false);
                else if (typeof d.mediaKeyTimestamp === "string")
                    m.mediaKeyTimestamp = $parseInt(d.mediaKeyTimestamp, 10);
                else if (typeof d.mediaKeyTimestamp === "number")
                    m.mediaKeyTimestamp = d.mediaKeyTimestamp;
                else if (typeof d.mediaKeyTimestamp === "object")
                    m.mediaKeyTimestamp = new $util.LongBits(d.mediaKeyTimestamp.low >>> 0, d.mediaKeyTimestamp.high >>> 0).toNumber();
            }
            if (d.mimetype != null) {
                m.mimetype = $String(d.mimetype);
            }
            switch (d.orientationType) {
            case "CENTER":
            case 1:
                m.orientationType = 1;
                break;
            case "LEFT":
            case 2:
                m.orientationType = 2;
                break;
            case "RIGHT":
            case 3:
                m.orientationType = 3;
                break;
            default:
                if (typeof d.orientationType === "number" && (d.orientationType | 0) === d.orientationType)
                    m.orientationType = d.orientationType;
            }
            return m;
        };

        BotMediaMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.fileSha256 != null && $Object.hasOwnProperty.call(m, "fileSha256")) {
                d.fileSha256 = m.fileSha256;
            }
            if (m.mediaKey != null && $Object.hasOwnProperty.call(m, "mediaKey")) {
                d.mediaKey = m.mediaKey;
            }
            if (m.fileEncSha256 != null && $Object.hasOwnProperty.call(m, "fileEncSha256")) {
                d.fileEncSha256 = m.fileEncSha256;
            }
            if (m.directPath != null && $Object.hasOwnProperty.call(m, "directPath")) {
                d.directPath = m.directPath;
            }
            if (m.mediaKeyTimestamp != null && $Object.hasOwnProperty.call(m, "mediaKeyTimestamp")) {
                if (typeof $BigInt !== "undefined" && o.longs === $BigInt)
                    d.mediaKeyTimestamp = typeof m.mediaKeyTimestamp === "number" ? $BigInt(m.mediaKeyTimestamp) : $util.Long.fromBits(m.mediaKeyTimestamp.low >>> 0, m.mediaKeyTimestamp.high >>> 0, false).toBigInt();
                else if (typeof m.mediaKeyTimestamp === "number")
                    d.mediaKeyTimestamp = o.longs === $String ? $String(m.mediaKeyTimestamp) : m.mediaKeyTimestamp;
                else
                    d.mediaKeyTimestamp = o.longs === $String ? $util.Long.prototype.toString.call(m.mediaKeyTimestamp) : o.longs === $Number ? new $util.LongBits(m.mediaKeyTimestamp.low >>> 0, m.mediaKeyTimestamp.high >>> 0).toNumber() : m.mediaKeyTimestamp;
            }
            if (m.mimetype != null && $Object.hasOwnProperty.call(m, "mimetype")) {
                d.mimetype = m.mimetype;
            }
            if (m.orientationType != null && $Object.hasOwnProperty.call(m, "orientationType")) {
                d.orientationType = o.enums === $String ? $root.AICommon.BotMediaMetadata.OrientationType[m.orientationType] === $undefined ? m.orientationType : $root.AICommon.BotMediaMetadata.OrientationType[m.orientationType] : m.orientationType;
            }
            return d;
        };

        BotMediaMetadata.prototype.toJSON = function() {
            return BotMediaMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMediaMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMediaMetadata";
        };

        BotMediaMetadata.OrientationType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[1] = "CENTER"] = 1;
            values[valuesById[2] = "LEFT"] = 2;
            values[valuesById[3] = "RIGHT"] = 3;
            return values;
        })();

        return BotMediaMetadata;
    })();

    AICommon.BotSessionMetadata = (function() {

        const BotSessionMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSessionMetadata.prototype.sessionId = null;
        BotSessionMetadata.prototype.sessionSource = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSessionMetadata.prototype, "_sessionId", {
            get: $util.oneOfGetter($oneOfFields = ["sessionId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSessionMetadata.prototype, "_sessionSource", {
            get: $util.oneOfGetter($oneOfFields = ["sessionSource"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSessionMetadata.create = function(properties) {
            return new BotSessionMetadata(properties);
        };

        BotSessionMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId"))
                w.uint32(10).string(m.sessionId);
            if (m.sessionSource != null && $Object.hasOwnProperty.call(m, "sessionSource"))
                w.uint32(16).int32(m.sessionSource);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSessionMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotSessionMetadata();
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
                        m.sessionId = r.stringVerify();
                        m._sessionId = "sessionId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.sessionSource = r.int32();
                        m._sessionSource = "sessionSource";
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

        BotSessionMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotSessionMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotSessionMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotSessionMetadata();
            if (d.sessionId != null) {
                m.sessionId = $String(d.sessionId);
            }
            switch (d.sessionSource) {
            case "NONE":
            case 0:
                m.sessionSource = 0;
                break;
            case "NULL_STATE":
            case 1:
                m.sessionSource = 1;
                break;
            case "TYPEAHEAD":
            case 2:
                m.sessionSource = 2;
                break;
            case "USER_INPUT":
            case 3:
                m.sessionSource = 3;
                break;
            case "EMU_FLASH":
            case 4:
                m.sessionSource = 4;
                break;
            case "EMU_FLASH_FOLLOWUP":
            case 5:
                m.sessionSource = 5;
                break;
            case "VOICE":
            case 6:
                m.sessionSource = 6;
                break;
            case "AI_HOME_SESSION":
            case 7:
                m.sessionSource = 7;
                break;
            default:
                if (typeof d.sessionSource === "number" && (d.sessionSource | 0) === d.sessionSource)
                    m.sessionSource = d.sessionSource;
            }
            return m;
        };

        BotSessionMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.sessionId != null && $Object.hasOwnProperty.call(m, "sessionId")) {
                d.sessionId = m.sessionId;
            }
            if (m.sessionSource != null && $Object.hasOwnProperty.call(m, "sessionSource")) {
                d.sessionSource = o.enums === $String ? $root.AICommon.BotSessionSource[m.sessionSource] === $undefined ? m.sessionSource : $root.AICommon.BotSessionSource[m.sessionSource] : m.sessionSource;
            }
            return d;
        };

        BotSessionMetadata.prototype.toJSON = function() {
            return BotSessionMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSessionMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotSessionMetadata";
        };

        return BotSessionMetadata;
    })();

    AICommon.BotMetricsMetadata = (function() {

        const BotMetricsMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMetricsMetadata.prototype.destinationId = null;
        BotMetricsMetadata.prototype.destinationEntryPoint = null;
        BotMetricsMetadata.prototype.threadOrigin = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_destinationId", {
            get: $util.oneOfGetter($oneOfFields = ["destinationId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_destinationEntryPoint", {
            get: $util.oneOfGetter($oneOfFields = ["destinationEntryPoint"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMetricsMetadata.prototype, "_threadOrigin", {
            get: $util.oneOfGetter($oneOfFields = ["threadOrigin"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMetricsMetadata.create = function(properties) {
            return new BotMetricsMetadata(properties);
        };

        BotMetricsMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.destinationId != null && $Object.hasOwnProperty.call(m, "destinationId"))
                w.uint32(10).string(m.destinationId);
            if (m.destinationEntryPoint != null && $Object.hasOwnProperty.call(m, "destinationEntryPoint"))
                w.uint32(16).int32(m.destinationEntryPoint);
            if (m.threadOrigin != null && $Object.hasOwnProperty.call(m, "threadOrigin"))
                w.uint32(24).int32(m.threadOrigin);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMetricsMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMetricsMetadata();
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
                        m.destinationId = r.stringVerify();
                        m._destinationId = "destinationId";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.destinationEntryPoint = r.int32();
                        m._destinationEntryPoint = "destinationEntryPoint";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.threadOrigin = r.int32();
                        m._threadOrigin = "threadOrigin";
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

        BotMetricsMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMetricsMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMetricsMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMetricsMetadata();
            if (d.destinationId != null) {
                m.destinationId = $String(d.destinationId);
            }
            switch (d.destinationEntryPoint) {
            case "UNDEFINED_ENTRY_POINT":
            case 0:
                m.destinationEntryPoint = 0;
                break;
            case "FAVICON":
            case 1:
                m.destinationEntryPoint = 1;
                break;
            case "CHATLIST":
            case 2:
                m.destinationEntryPoint = 2;
                break;
            case "AISEARCH_NULL_STATE_PAPER_PLANE":
            case 3:
                m.destinationEntryPoint = 3;
                break;
            case "AISEARCH_NULL_STATE_SUGGESTION":
            case 4:
                m.destinationEntryPoint = 4;
                break;
            case "AISEARCH_TYPE_AHEAD_SUGGESTION":
            case 5:
                m.destinationEntryPoint = 5;
                break;
            case "AISEARCH_TYPE_AHEAD_PAPER_PLANE":
            case 6:
                m.destinationEntryPoint = 6;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST":
            case 7:
                m.destinationEntryPoint = 7;
                break;
            case "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES":
            case 8:
                m.destinationEntryPoint = 8;
                break;
            case "AIVOICE_SEARCH_BAR":
            case 9:
                m.destinationEntryPoint = 9;
                break;
            case "AIVOICE_FAVICON":
            case 10:
                m.destinationEntryPoint = 10;
                break;
            case "AISTUDIO":
            case 11:
                m.destinationEntryPoint = 11;
                break;
            case "DEEPLINK":
            case 12:
                m.destinationEntryPoint = 12;
                break;
            case "NOTIFICATION":
            case 13:
                m.destinationEntryPoint = 13;
                break;
            case "PROFILE_MESSAGE_BUTTON":
            case 14:
                m.destinationEntryPoint = 14;
                break;
            case "FORWARD":
            case 15:
                m.destinationEntryPoint = 15;
                break;
            case "APP_SHORTCUT":
            case 16:
                m.destinationEntryPoint = 16;
                break;
            case "FF_FAMILY":
            case 17:
                m.destinationEntryPoint = 17;
                break;
            case "AI_TAB":
            case 18:
                m.destinationEntryPoint = 18;
                break;
            case "AI_HOME":
            case 19:
                m.destinationEntryPoint = 19;
                break;
            case "AI_DEEPLINK_IMMERSIVE":
            case 20:
                m.destinationEntryPoint = 20;
                break;
            case "AI_DEEPLINK":
            case 21:
                m.destinationEntryPoint = 21;
                break;
            case "META_AI_CHAT_SHORTCUT_AI_STUDIO":
            case 22:
                m.destinationEntryPoint = 22;
                break;
            case "UGC_CHAT_SHORTCUT_AI_STUDIO":
            case 23:
                m.destinationEntryPoint = 23;
                break;
            case "NEW_CHAT_AI_STUDIO":
            case 24:
                m.destinationEntryPoint = 24;
                break;
            case "AIVOICE_FAVICON_CALL_HISTORY":
            case 25:
                m.destinationEntryPoint = 25;
                break;
            case "ASK_META_AI_CONTEXT_MENU":
            case 26:
                m.destinationEntryPoint = 26;
                break;
            case "ASK_META_AI_CONTEXT_MENU_1ON1":
            case 27:
                m.destinationEntryPoint = 27;
                break;
            case "ASK_META_AI_CONTEXT_MENU_GROUP":
            case 28:
                m.destinationEntryPoint = 28;
                break;
            case "INVOKE_META_AI_1ON1":
            case 29:
                m.destinationEntryPoint = 29;
                break;
            case "INVOKE_META_AI_GROUP":
            case 30:
                m.destinationEntryPoint = 30;
                break;
            case "META_AI_FORWARD":
            case 31:
                m.destinationEntryPoint = 31;
                break;
            case "NEW_CHAT_AI_CONTACT":
            case 32:
                m.destinationEntryPoint = 32;
                break;
            case "MESSAGE_QUICK_ACTION_1_ON_1_CHAT":
            case 33:
                m.destinationEntryPoint = 33;
                break;
            case "MESSAGE_QUICK_ACTION_GROUP_CHAT":
            case 34:
                m.destinationEntryPoint = 34;
                break;
            case "ATTACHMENT_TRAY_1_ON_1_CHAT":
            case 35:
                m.destinationEntryPoint = 35;
                break;
            case "ATTACHMENT_TRAY_GROUP_CHAT":
            case 36:
                m.destinationEntryPoint = 36;
                break;
            case "ASK_META_AI_MEDIA_VIEWER_1ON1":
            case 37:
                m.destinationEntryPoint = 37;
                break;
            case "ASK_META_AI_MEDIA_VIEWER_GROUP":
            case 38:
                m.destinationEntryPoint = 38;
                break;
            case "MEDIA_PICKER_1_ON_1_CHAT":
            case 39:
                m.destinationEntryPoint = 39;
                break;
            case "MEDIA_PICKER_GROUP_CHAT":
            case 40:
                m.destinationEntryPoint = 40;
                break;
            case "ASK_META_AI_NO_SEARCH_RESULTS":
            case 41:
                m.destinationEntryPoint = 41;
                break;
            case "META_AI_SETTINGS":
            case 45:
                m.destinationEntryPoint = 45;
                break;
            case "WEB_INTRO_PANEL":
            case 46:
                m.destinationEntryPoint = 46;
                break;
            case "WEB_NAVIGATION_BAR":
            case 47:
                m.destinationEntryPoint = 47;
                break;
            case "GROUP_MEMBER":
            case 54:
                m.destinationEntryPoint = 54;
                break;
            case "CHATLIST_SEARCH":
            case 55:
                m.destinationEntryPoint = 55;
                break;
            case "NEW_CHAT_LIST":
            case 56:
                m.destinationEntryPoint = 56;
                break;
            case "CONTACTS_TAB":
            case 57:
                m.destinationEntryPoint = 57;
                break;
            case "NEW_3P_AGENT_CREATION":
            case 58:
                m.destinationEntryPoint = 58;
                break;
            default:
                if (typeof d.destinationEntryPoint === "number" && (d.destinationEntryPoint | 0) === d.destinationEntryPoint)
                    m.destinationEntryPoint = d.destinationEntryPoint;
            }
            switch (d.threadOrigin) {
            case "AI_TAB_THREAD":
            case 1:
                m.threadOrigin = 1;
                break;
            case "AI_HOME_THREAD":
            case 2:
                m.threadOrigin = 2;
                break;
            case "AI_DEEPLINK_IMMERSIVE_THREAD":
            case 3:
                m.threadOrigin = 3;
                break;
            case "AI_DEEPLINK_THREAD":
            case 4:
                m.threadOrigin = 4;
                break;
            case "ASK_META_AI_CONTEXT_MENU_THREAD":
            case 5:
                m.threadOrigin = 5;
                break;
            default:
                if (typeof d.threadOrigin === "number" && (d.threadOrigin | 0) === d.threadOrigin)
                    m.threadOrigin = d.threadOrigin;
            }
            return m;
        };

        BotMetricsMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.destinationId != null && $Object.hasOwnProperty.call(m, "destinationId")) {
                d.destinationId = m.destinationId;
            }
            if (m.destinationEntryPoint != null && $Object.hasOwnProperty.call(m, "destinationEntryPoint")) {
                d.destinationEntryPoint = o.enums === $String ? $root.AICommon.BotMetricsEntryPoint[m.destinationEntryPoint] === $undefined ? m.destinationEntryPoint : $root.AICommon.BotMetricsEntryPoint[m.destinationEntryPoint] : m.destinationEntryPoint;
            }
            if (m.threadOrigin != null && $Object.hasOwnProperty.call(m, "threadOrigin")) {
                d.threadOrigin = o.enums === $String ? $root.AICommon.BotMetricsThreadEntryPoint[m.threadOrigin] === $undefined ? m.threadOrigin : $root.AICommon.BotMetricsThreadEntryPoint[m.threadOrigin] : m.threadOrigin;
            }
            return d;
        };

        BotMetricsMetadata.prototype.toJSON = function() {
            return BotMetricsMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMetricsMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMetricsMetadata";
        };

        return BotMetricsMetadata;
    })();

    AICommon.BotRenderingMetadata = (function() {

        const BotRenderingMetadata = function (p) {
            this.keywords = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotRenderingMetadata.prototype.keywords = $util.emptyArray;

        BotRenderingMetadata.create = function(properties) {
            return new BotRenderingMetadata(properties);
        };

        BotRenderingMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.keywords != null && m.keywords.length) {
                for (var i = 0; i < m.keywords.length; ++i)
                    $root.AICommon.BotRenderingMetadata.Keyword.encode(m.keywords[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotRenderingMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotRenderingMetadata();
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
                        if (!(m.keywords && m.keywords.length))
                            m.keywords = [];
                        m.keywords.push($root.AICommon.BotRenderingMetadata.Keyword.decode(r, r.uint32(), $undefined, q + 1));
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

        BotRenderingMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotRenderingMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotRenderingMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotRenderingMetadata();
            if (d.keywords) {
                if (!$Array.isArray(d.keywords))
                    throw $TypeError(".AICommon.BotRenderingMetadata.keywords: array expected");
                m.keywords = $Array(d.keywords.length);
                for (var i = 0; i < d.keywords.length; ++i) {
                    if (!$util.isObject(d.keywords[i]))
                        throw $TypeError(".AICommon.BotRenderingMetadata.keywords: object expected");
                    m.keywords[i] = $root.AICommon.BotRenderingMetadata.Keyword.fromObject(d.keywords[i], q + 1);
                }
            }
            return m;
        };

        BotRenderingMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.keywords = [];
            }
            if (m.keywords && m.keywords.length) {
                d.keywords = $Array(m.keywords.length);
                for (var j = 0; j < m.keywords.length; ++j) {
                    d.keywords[j] = $root.AICommon.BotRenderingMetadata.Keyword.toObject(m.keywords[j], o, q + 1);
                }
            }
            return d;
        };

        BotRenderingMetadata.prototype.toJSON = function() {
            return BotRenderingMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotRenderingMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotRenderingMetadata";
        };

        BotRenderingMetadata.Keyword = (function() {

            const Keyword = function (p) {
                this.associatedPrompts = [];
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            Keyword.prototype.value = null;
            Keyword.prototype.associatedPrompts = $util.emptyArray;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(Keyword.prototype, "_value", {
                get: $util.oneOfGetter($oneOfFields = ["value"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            Keyword.create = function(properties) {
                return new Keyword(properties);
            };

            Keyword.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.value != null && $Object.hasOwnProperty.call(m, "value"))
                    w.uint32(10).string(m.value);
                if (m.associatedPrompts != null && m.associatedPrompts.length) {
                    for (var i = 0; i < m.associatedPrompts.length; ++i)
                        w.uint32(18).string(m.associatedPrompts[i]);
                }
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            Keyword.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotRenderingMetadata.Keyword();
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
                            m.value = r.stringVerify();
                            m._value = "value";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            if (!(m.associatedPrompts && m.associatedPrompts.length))
                                m.associatedPrompts = [];
                            m.associatedPrompts.push(r.stringVerify());
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

            Keyword.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotRenderingMetadata.Keyword)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotRenderingMetadata.Keyword: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotRenderingMetadata.Keyword();
                if (d.value != null) {
                    m.value = $String(d.value);
                }
                if (d.associatedPrompts) {
                    if (!$Array.isArray(d.associatedPrompts))
                        throw $TypeError(".AICommon.BotRenderingMetadata.Keyword.associatedPrompts: array expected");
                    m.associatedPrompts = $Array(d.associatedPrompts.length);
                    for (var i = 0; i < d.associatedPrompts.length; ++i) {
                        m.associatedPrompts[i] = $String(d.associatedPrompts[i]);
                    }
                }
                return m;
            };

            Keyword.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (o.arrays || o.defaults) {
                    d.associatedPrompts = [];
                }
                if (m.value != null && $Object.hasOwnProperty.call(m, "value")) {
                    d.value = m.value;
                }
                if (m.associatedPrompts && m.associatedPrompts.length) {
                    d.associatedPrompts = $Array(m.associatedPrompts.length);
                    for (var j = 0; j < m.associatedPrompts.length; ++j) {
                        d.associatedPrompts[j] = m.associatedPrompts[j];
                    }
                }
                return d;
            };

            Keyword.prototype.toJSON = function() {
                return Keyword.toObject(this, $protobuf.util.toJSONOptions);
            };

            Keyword.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotRenderingMetadata.Keyword";
            };

            return Keyword;
        })();

        return BotRenderingMetadata;
    })();

    AICommon.BotPromotionMessageMetadata = (function() {

        const BotPromotionMessageMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromotionMessageMetadata.prototype.promotionType = null;
        BotPromotionMessageMetadata.prototype.buttonTitle = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromotionMessageMetadata.prototype, "_promotionType", {
            get: $util.oneOfGetter($oneOfFields = ["promotionType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromotionMessageMetadata.prototype, "_buttonTitle", {
            get: $util.oneOfGetter($oneOfFields = ["buttonTitle"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPromotionMessageMetadata.create = function(properties) {
            return new BotPromotionMessageMetadata(properties);
        };

        BotPromotionMessageMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.promotionType != null && $Object.hasOwnProperty.call(m, "promotionType"))
                w.uint32(8).int32(m.promotionType);
            if (m.buttonTitle != null && $Object.hasOwnProperty.call(m, "buttonTitle"))
                w.uint32(18).string(m.buttonTitle);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromotionMessageMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotPromotionMessageMetadata();
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
                        m.promotionType = r.int32();
                        m._promotionType = "promotionType";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.buttonTitle = r.stringVerify();
                        m._buttonTitle = "buttonTitle";
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

        BotPromotionMessageMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotPromotionMessageMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotPromotionMessageMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotPromotionMessageMetadata();
            switch (d.promotionType) {
            case "UNKNOWN_TYPE":
            case 0:
                m.promotionType = 0;
                break;
            case "C50":
            case 1:
                m.promotionType = 1;
                break;
            case "SURVEY_PLATFORM":
            case 2:
                m.promotionType = 2;
                break;
            default:
                if (typeof d.promotionType === "number" && (d.promotionType | 0) === d.promotionType)
                    m.promotionType = d.promotionType;
            }
            if (d.buttonTitle != null) {
                m.buttonTitle = $String(d.buttonTitle);
            }
            return m;
        };

        BotPromotionMessageMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.promotionType != null && $Object.hasOwnProperty.call(m, "promotionType")) {
                d.promotionType = o.enums === $String ? $root.AICommon.BotPromotionMessageMetadata.BotPromotionType[m.promotionType] === $undefined ? m.promotionType : $root.AICommon.BotPromotionMessageMetadata.BotPromotionType[m.promotionType] : m.promotionType;
            }
            if (m.buttonTitle != null && $Object.hasOwnProperty.call(m, "buttonTitle")) {
                d.buttonTitle = m.buttonTitle;
            }
            return d;
        };

        BotPromotionMessageMetadata.prototype.toJSON = function() {
            return BotPromotionMessageMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromotionMessageMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotPromotionMessageMetadata";
        };

        BotPromotionMessageMetadata.BotPromotionType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_TYPE"] = 0;
            values[valuesById[1] = "C50"] = 1;
            values[valuesById[2] = "SURVEY_PLATFORM"] = 2;
            return values;
        })();

        return BotPromotionMessageMetadata;
    })();

    AICommon.BotSignatureVerificationUseCaseProof = (function() {

        const BotSignatureVerificationUseCaseProof = function (p) {
            this.certificateChain = [];
            this.certificateChainSki = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSignatureVerificationUseCaseProof.prototype.version = null;
        BotSignatureVerificationUseCaseProof.prototype.useCase = null;
        BotSignatureVerificationUseCaseProof.prototype.signature = null;
        BotSignatureVerificationUseCaseProof.prototype.certificateChain = $util.emptyArray;
        BotSignatureVerificationUseCaseProof.prototype.certificateChainSki = $util.emptyArray;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_version", {
            get: $util.oneOfGetter($oneOfFields = ["version"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_useCase", {
            get: $util.oneOfGetter($oneOfFields = ["useCase"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSignatureVerificationUseCaseProof.prototype, "_signature", {
            get: $util.oneOfGetter($oneOfFields = ["signature"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSignatureVerificationUseCaseProof.create = function(properties) {
            return new BotSignatureVerificationUseCaseProof(properties);
        };

        BotSignatureVerificationUseCaseProof.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.version != null && $Object.hasOwnProperty.call(m, "version"))
                w.uint32(8).int32(m.version);
            if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase"))
                w.uint32(16).int32(m.useCase);
            if (m.signature != null && $Object.hasOwnProperty.call(m, "signature"))
                w.uint32(26).bytes(m.signature);
            if (m.certificateChain != null && m.certificateChain.length) {
                for (var i = 0; i < m.certificateChain.length; ++i)
                    w.uint32(34).bytes(m.certificateChain[i]);
            }
            if (m.certificateChainSki != null && m.certificateChainSki.length) {
                for (var i = 0; i < m.certificateChainSki.length; ++i)
                    $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.encode(m.certificateChainSki[i], w.uint32(42).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSignatureVerificationUseCaseProof.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotSignatureVerificationUseCaseProof();
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
                        m.version = r.int32();
                        m._version = "version";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.useCase = r.int32();
                        m._useCase = "useCase";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.signature = r.bytes();
                        m._signature = "signature";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        if (!(m.certificateChain && m.certificateChain.length))
                            m.certificateChain = [];
                        m.certificateChain.push(r.bytes());
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        if (!(m.certificateChainSki && m.certificateChainSki.length))
                            m.certificateChainSki = [];
                        m.certificateChainSki.push($root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.decode(r, r.uint32(), $undefined, q + 1));
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

        BotSignatureVerificationUseCaseProof.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotSignatureVerificationUseCaseProof)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotSignatureVerificationUseCaseProof: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotSignatureVerificationUseCaseProof();
            if (d.version != null) {
                m.version = d.version | 0;
            }
            switch (d.useCase) {
            case "UNSPECIFIED":
            case 0:
                m.useCase = 0;
                break;
            case "WA_BOT_MSG":
            case 1:
                m.useCase = 1;
                break;
            case "WA_TEE_BOT_MSG":
            case 2:
                m.useCase = 2;
                break;
            case "P2P_PILLS":
            case 3:
                m.useCase = 3;
                break;
            case "WA_WAFFLE":
            case 4:
                m.useCase = 4;
                break;
            case "WA_FEATURE_PKI":
            case 5:
                m.useCase = 5;
                break;
            default:
                if (typeof d.useCase === "number" && (d.useCase | 0) === d.useCase)
                    m.useCase = d.useCase;
            }
            if (d.signature != null) {
                if (typeof d.signature === "string")
                    $util.base64.decode(d.signature, m.signature = $util.newBuffer($util.base64.length(d.signature)), 0);
                else if (d.signature.length >= 0)
                    m.signature = d.signature;
            }
            if (d.certificateChain) {
                if (!$Array.isArray(d.certificateChain))
                    throw $TypeError(".AICommon.BotSignatureVerificationUseCaseProof.certificateChain: array expected");
                m.certificateChain = $Array(d.certificateChain.length);
                for (var i = 0; i < d.certificateChain.length; ++i) {
                    if (typeof d.certificateChain[i] === "string")
                        $util.base64.decode(d.certificateChain[i], m.certificateChain[i] = $util.newBuffer($util.base64.length(d.certificateChain[i])), 0);
                    else if (d.certificateChain[i].length >= 0)
                        m.certificateChain[i] = d.certificateChain[i];
                }
            }
            if (d.certificateChainSki) {
                if (!$Array.isArray(d.certificateChainSki))
                    throw $TypeError(".AICommon.BotSignatureVerificationUseCaseProof.certificateChainSki: array expected");
                m.certificateChainSki = $Array(d.certificateChainSki.length);
                for (var i = 0; i < d.certificateChainSki.length; ++i) {
                    if (!$util.isObject(d.certificateChainSki[i]))
                        throw $TypeError(".AICommon.BotSignatureVerificationUseCaseProof.certificateChainSki: object expected");
                    m.certificateChainSki[i] = $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.fromObject(d.certificateChainSki[i], q + 1);
                }
            }
            return m;
        };

        BotSignatureVerificationUseCaseProof.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.certificateChain = [];
                d.certificateChainSki = [];
            }
            if (m.version != null && $Object.hasOwnProperty.call(m, "version")) {
                d.version = m.version;
            }
            if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase")) {
                d.useCase = o.enums === $String ? $root.AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] === $undefined ? m.useCase : $root.AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] : m.useCase;
            }
            if (m.signature != null && $Object.hasOwnProperty.call(m, "signature")) {
                d.signature = o.bytes === $String ? $util.base64.encode(m.signature, 0, m.signature.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.signature) : m.signature;
            }
            if (m.certificateChain && m.certificateChain.length) {
                d.certificateChain = $Array(m.certificateChain.length);
                for (var j = 0; j < m.certificateChain.length; ++j) {
                    d.certificateChain[j] = o.bytes === $String ? $util.base64.encode(m.certificateChain[j], 0, m.certificateChain[j].length) : o.bytes === $Array ? $Array.prototype.slice.call(m.certificateChain[j]) : m.certificateChain[j];
                }
            }
            if (m.certificateChainSki && m.certificateChainSki.length) {
                d.certificateChainSki = $Array(m.certificateChainSki.length);
                for (var j = 0; j < m.certificateChainSki.length; ++j) {
                    d.certificateChainSki[j] = $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI.toObject(m.certificateChainSki[j], o, q + 1);
                }
            }
            return d;
        };

        BotSignatureVerificationUseCaseProof.prototype.toJSON = function() {
            return BotSignatureVerificationUseCaseProof.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSignatureVerificationUseCaseProof.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotSignatureVerificationUseCaseProof";
        };

        BotSignatureVerificationUseCaseProof.BotSignatureUseCase = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNSPECIFIED"] = 0;
            values[valuesById[1] = "WA_BOT_MSG"] = 1;
            values[valuesById[2] = "WA_TEE_BOT_MSG"] = 2;
            values[valuesById[3] = "P2P_PILLS"] = 3;
            values[valuesById[4] = "WA_WAFFLE"] = 4;
            values[valuesById[5] = "WA_FEATURE_PKI"] = 5;
            return values;
        })();

        BotSignatureVerificationUseCaseProof.CertificateSKI = (function() {

            const CertificateSKI = function (p) {
                if (p)
                    for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null && ks[i] !== "__proto__")
                            this[ks[i]] = p[ks[i]];
            };

            CertificateSKI.prototype.useCase = null;
            CertificateSKI.prototype.ski = null;

            let $oneOfFields;

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(CertificateSKI.prototype, "_useCase", {
                get: $util.oneOfGetter($oneOfFields = ["useCase"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            // Virtual OneOf for proto3 optional field
            $Object.defineProperty(CertificateSKI.prototype, "_ski", {
                get: $util.oneOfGetter($oneOfFields = ["ski"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            CertificateSKI.create = function(properties) {
                return new CertificateSKI(properties);
            };

            CertificateSKI.encode = function (m, w, q) {
                if (!w)
                    w = $Writer.create();
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase"))
                    w.uint32(8).int32(m.useCase);
                if (m.ski != null && $Object.hasOwnProperty.call(m, "ski"))
                    w.uint32(18).bytes(m.ski);
                if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                    for (var i = 0; i < m.$unknowns.length; ++i)
                        w.raw(m.$unknowns[i]);
                return w;
            };

            CertificateSKI.decode = function (r, l, z, q, g) {
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
                m = g || new $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI();
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
                            m.useCase = r.int32();
                            m._useCase = "useCase";
                            continue;
                        }
                    case 2: {
                            if (u !== 2)
                                break;
                            m.ski = r.bytes();
                            m._ski = "ski";
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

            CertificateSKI.fromObject = function (d, q) {
                if (d instanceof $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI)
                    return d;
                if (!$util.isObject(d))
                    throw $TypeError(".AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI: object expected");
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var m = new $root.AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI();
                switch (d.useCase) {
                case "UNSPECIFIED":
                case 0:
                    m.useCase = 0;
                    break;
                case "WA_BOT_MSG":
                case 1:
                    m.useCase = 1;
                    break;
                case "WA_TEE_BOT_MSG":
                case 2:
                    m.useCase = 2;
                    break;
                case "P2P_PILLS":
                case 3:
                    m.useCase = 3;
                    break;
                case "WA_WAFFLE":
                case 4:
                    m.useCase = 4;
                    break;
                case "WA_FEATURE_PKI":
                case 5:
                    m.useCase = 5;
                    break;
                default:
                    if (typeof d.useCase === "number" && (d.useCase | 0) === d.useCase)
                        m.useCase = d.useCase;
                }
                if (d.ski != null) {
                    if (typeof d.ski === "string")
                        $util.base64.decode(d.ski, m.ski = $util.newBuffer($util.base64.length(d.ski)), 0);
                    else if (d.ski.length >= 0)
                        m.ski = d.ski;
                }
                return m;
            };

            CertificateSKI.toObject = function (m, o, q) {
                if (!o)
                    o = {};
                if (q === $undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                var d = {};
                if (m.useCase != null && $Object.hasOwnProperty.call(m, "useCase")) {
                    d.useCase = o.enums === $String ? $root.AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] === $undefined ? m.useCase : $root.AICommon.BotSignatureVerificationUseCaseProof.BotSignatureUseCase[m.useCase] : m.useCase;
                }
                if (m.ski != null && $Object.hasOwnProperty.call(m, "ski")) {
                    d.ski = o.bytes === $String ? $util.base64.encode(m.ski, 0, m.ski.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.ski) : m.ski;
                }
                return d;
            };

            CertificateSKI.prototype.toJSON = function() {
                return CertificateSKI.toObject(this, $protobuf.util.toJSONOptions);
            };

            CertificateSKI.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/AICommon.BotSignatureVerificationUseCaseProof.CertificateSKI";
            };

            return CertificateSKI;
        })();

        return BotSignatureVerificationUseCaseProof;
    })();

    AICommon.BotSignatureVerificationMetadata = (function() {

        const BotSignatureVerificationMetadata = function (p) {
            this.proofs = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSignatureVerificationMetadata.prototype.proofs = $util.emptyArray;

        BotSignatureVerificationMetadata.create = function(properties) {
            return new BotSignatureVerificationMetadata(properties);
        };

        BotSignatureVerificationMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.proofs != null && m.proofs.length) {
                for (var i = 0; i < m.proofs.length; ++i)
                    $root.AICommon.BotSignatureVerificationUseCaseProof.encode(m.proofs[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSignatureVerificationMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotSignatureVerificationMetadata();
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
                        if (!(m.proofs && m.proofs.length))
                            m.proofs = [];
                        m.proofs.push($root.AICommon.BotSignatureVerificationUseCaseProof.decode(r, r.uint32(), $undefined, q + 1));
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

        BotSignatureVerificationMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotSignatureVerificationMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotSignatureVerificationMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotSignatureVerificationMetadata();
            if (d.proofs) {
                if (!$Array.isArray(d.proofs))
                    throw $TypeError(".AICommon.BotSignatureVerificationMetadata.proofs: array expected");
                m.proofs = $Array(d.proofs.length);
                for (var i = 0; i < d.proofs.length; ++i) {
                    if (!$util.isObject(d.proofs[i]))
                        throw $TypeError(".AICommon.BotSignatureVerificationMetadata.proofs: object expected");
                    m.proofs[i] = $root.AICommon.BotSignatureVerificationUseCaseProof.fromObject(d.proofs[i], q + 1);
                }
            }
            return m;
        };

        BotSignatureVerificationMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.proofs = [];
            }
            if (m.proofs && m.proofs.length) {
                d.proofs = $Array(m.proofs.length);
                for (var j = 0; j < m.proofs.length; ++j) {
                    d.proofs[j] = $root.AICommon.BotSignatureVerificationUseCaseProof.toObject(m.proofs[j], o, q + 1);
                }
            }
            return d;
        };

        BotSignatureVerificationMetadata.prototype.toJSON = function() {
            return BotSignatureVerificationMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSignatureVerificationMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotSignatureVerificationMetadata";
        };

        return BotSignatureVerificationMetadata;
    })();

    AICommon.BotMemoryFact = (function() {

        const BotMemoryFact = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemoryFact.prototype.fact = null;
        BotMemoryFact.prototype.factId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryFact.prototype, "_fact", {
            get: $util.oneOfGetter($oneOfFields = ["fact"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryFact.prototype, "_factId", {
            get: $util.oneOfGetter($oneOfFields = ["factId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMemoryFact.create = function(properties) {
            return new BotMemoryFact(properties);
        };

        BotMemoryFact.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.fact != null && $Object.hasOwnProperty.call(m, "fact"))
                w.uint32(10).string(m.fact);
            if (m.factId != null && $Object.hasOwnProperty.call(m, "factId"))
                w.uint32(18).string(m.factId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemoryFact.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMemoryFact();
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
                        m.fact = r.stringVerify();
                        m._fact = "fact";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.factId = r.stringVerify();
                        m._factId = "factId";
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

        BotMemoryFact.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMemoryFact)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMemoryFact: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMemoryFact();
            if (d.fact != null) {
                m.fact = $String(d.fact);
            }
            if (d.factId != null) {
                m.factId = $String(d.factId);
            }
            return m;
        };

        BotMemoryFact.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.fact != null && $Object.hasOwnProperty.call(m, "fact")) {
                d.fact = m.fact;
            }
            if (m.factId != null && $Object.hasOwnProperty.call(m, "factId")) {
                d.factId = m.factId;
            }
            return d;
        };

        BotMemoryFact.prototype.toJSON = function() {
            return BotMemoryFact.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemoryFact.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMemoryFact";
        };

        return BotMemoryFact;
    })();

    AICommon.BotMemoryMetadata = (function() {

        const BotMemoryMetadata = function (p) {
            this.addedFacts = [];
            this.removedFacts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotMemoryMetadata.prototype.addedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.removedFacts = $util.emptyArray;
        BotMemoryMetadata.prototype.disclaimer = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotMemoryMetadata.prototype, "_disclaimer", {
            get: $util.oneOfGetter($oneOfFields = ["disclaimer"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotMemoryMetadata.create = function(properties) {
            return new BotMemoryMetadata(properties);
        };

        BotMemoryMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.addedFacts != null && m.addedFacts.length) {
                for (var i = 0; i < m.addedFacts.length; ++i)
                    $root.AICommon.BotMemoryFact.encode(m.addedFacts[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.removedFacts != null && m.removedFacts.length) {
                for (var i = 0; i < m.removedFacts.length; ++i)
                    $root.AICommon.BotMemoryFact.encode(m.removedFacts[i], w.uint32(18).fork(), q + 1).ldelim();
            }
            if (m.disclaimer != null && $Object.hasOwnProperty.call(m, "disclaimer"))
                w.uint32(26).string(m.disclaimer);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotMemoryMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotMemoryMetadata();
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
                        if (!(m.addedFacts && m.addedFacts.length))
                            m.addedFacts = [];
                        m.addedFacts.push($root.AICommon.BotMemoryFact.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        if (!(m.removedFacts && m.removedFacts.length))
                            m.removedFacts = [];
                        m.removedFacts.push($root.AICommon.BotMemoryFact.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.disclaimer = r.stringVerify();
                        m._disclaimer = "disclaimer";
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

        BotMemoryMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotMemoryMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotMemoryMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotMemoryMetadata();
            if (d.addedFacts) {
                if (!$Array.isArray(d.addedFacts))
                    throw $TypeError(".AICommon.BotMemoryMetadata.addedFacts: array expected");
                m.addedFacts = $Array(d.addedFacts.length);
                for (var i = 0; i < d.addedFacts.length; ++i) {
                    if (!$util.isObject(d.addedFacts[i]))
                        throw $TypeError(".AICommon.BotMemoryMetadata.addedFacts: object expected");
                    m.addedFacts[i] = $root.AICommon.BotMemoryFact.fromObject(d.addedFacts[i], q + 1);
                }
            }
            if (d.removedFacts) {
                if (!$Array.isArray(d.removedFacts))
                    throw $TypeError(".AICommon.BotMemoryMetadata.removedFacts: array expected");
                m.removedFacts = $Array(d.removedFacts.length);
                for (var i = 0; i < d.removedFacts.length; ++i) {
                    if (!$util.isObject(d.removedFacts[i]))
                        throw $TypeError(".AICommon.BotMemoryMetadata.removedFacts: object expected");
                    m.removedFacts[i] = $root.AICommon.BotMemoryFact.fromObject(d.removedFacts[i], q + 1);
                }
            }
            if (d.disclaimer != null) {
                m.disclaimer = $String(d.disclaimer);
            }
            return m;
        };

        BotMemoryMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.addedFacts = [];
                d.removedFacts = [];
            }
            if (m.addedFacts && m.addedFacts.length) {
                d.addedFacts = $Array(m.addedFacts.length);
                for (var j = 0; j < m.addedFacts.length; ++j) {
                    d.addedFacts[j] = $root.AICommon.BotMemoryFact.toObject(m.addedFacts[j], o, q + 1);
                }
            }
            if (m.removedFacts && m.removedFacts.length) {
                d.removedFacts = $Array(m.removedFacts.length);
                for (var j = 0; j < m.removedFacts.length; ++j) {
                    d.removedFacts[j] = $root.AICommon.BotMemoryFact.toObject(m.removedFacts[j], o, q + 1);
                }
            }
            if (m.disclaimer != null && $Object.hasOwnProperty.call(m, "disclaimer")) {
                d.disclaimer = m.disclaimer;
            }
            return d;
        };

        BotMemoryMetadata.prototype.toJSON = function() {
            return BotMemoryMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotMemoryMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotMemoryMetadata";
        };

        return BotMemoryMetadata;
    })();

    AICommon.BotLinkedAccount = (function() {

        const BotLinkedAccount = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotLinkedAccount.prototype.type = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccount.prototype, "_type", {
            get: $util.oneOfGetter($oneOfFields = ["type"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotLinkedAccount.create = function(properties) {
            return new BotLinkedAccount(properties);
        };

        BotLinkedAccount.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.type != null && $Object.hasOwnProperty.call(m, "type"))
                w.uint32(8).int32(m.type);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotLinkedAccount.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotLinkedAccount();
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
                        m.type = r.int32();
                        m._type = "type";
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

        BotLinkedAccount.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotLinkedAccount)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotLinkedAccount: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotLinkedAccount();
            switch (d.type) {
            case "BOT_LINKED_ACCOUNT_TYPE_1P":
            case 0:
                m.type = 0;
                break;
            default:
                if (typeof d.type === "number" && (d.type | 0) === d.type)
                    m.type = d.type;
            }
            return m;
        };

        BotLinkedAccount.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.type != null && $Object.hasOwnProperty.call(m, "type")) {
                d.type = o.enums === $String ? $root.AICommon.BotLinkedAccount.BotLinkedAccountType[m.type] === $undefined ? m.type : $root.AICommon.BotLinkedAccount.BotLinkedAccountType[m.type] : m.type;
            }
            return d;
        };

        BotLinkedAccount.prototype.toJSON = function() {
            return BotLinkedAccount.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotLinkedAccount.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotLinkedAccount";
        };

        BotLinkedAccount.BotLinkedAccountType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "BOT_LINKED_ACCOUNT_TYPE_1P"] = 0;
            return values;
        })();

        return BotLinkedAccount;
    })();

    AICommon.BotLinkedAccountsMetadata = (function() {

        const BotLinkedAccountsMetadata = function (p) {
            this.accounts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotLinkedAccountsMetadata.prototype.accounts = $util.emptyArray;
        BotLinkedAccountsMetadata.prototype.acAuthTokens = null;
        BotLinkedAccountsMetadata.prototype.acErrorCode = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acAuthTokens", {
            get: $util.oneOfGetter($oneOfFields = ["acAuthTokens"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotLinkedAccountsMetadata.prototype, "_acErrorCode", {
            get: $util.oneOfGetter($oneOfFields = ["acErrorCode"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotLinkedAccountsMetadata.create = function(properties) {
            return new BotLinkedAccountsMetadata(properties);
        };

        BotLinkedAccountsMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.accounts != null && m.accounts.length) {
                for (var i = 0; i < m.accounts.length; ++i)
                    $root.AICommon.BotLinkedAccount.encode(m.accounts[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.acAuthTokens != null && $Object.hasOwnProperty.call(m, "acAuthTokens"))
                w.uint32(18).bytes(m.acAuthTokens);
            if (m.acErrorCode != null && $Object.hasOwnProperty.call(m, "acErrorCode"))
                w.uint32(24).int32(m.acErrorCode);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotLinkedAccountsMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotLinkedAccountsMetadata();
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
                        if (!(m.accounts && m.accounts.length))
                            m.accounts = [];
                        m.accounts.push($root.AICommon.BotLinkedAccount.decode(r, r.uint32(), $undefined, q + 1));
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.acAuthTokens = r.bytes();
                        m._acAuthTokens = "acAuthTokens";
                        continue;
                    }
                case 3: {
                        if (u !== 0)
                            break;
                        m.acErrorCode = r.int32();
                        m._acErrorCode = "acErrorCode";
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

        BotLinkedAccountsMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotLinkedAccountsMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotLinkedAccountsMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotLinkedAccountsMetadata();
            if (d.accounts) {
                if (!$Array.isArray(d.accounts))
                    throw $TypeError(".AICommon.BotLinkedAccountsMetadata.accounts: array expected");
                m.accounts = $Array(d.accounts.length);
                for (var i = 0; i < d.accounts.length; ++i) {
                    if (!$util.isObject(d.accounts[i]))
                        throw $TypeError(".AICommon.BotLinkedAccountsMetadata.accounts: object expected");
                    m.accounts[i] = $root.AICommon.BotLinkedAccount.fromObject(d.accounts[i], q + 1);
                }
            }
            if (d.acAuthTokens != null) {
                if (typeof d.acAuthTokens === "string")
                    $util.base64.decode(d.acAuthTokens, m.acAuthTokens = $util.newBuffer($util.base64.length(d.acAuthTokens)), 0);
                else if (d.acAuthTokens.length >= 0)
                    m.acAuthTokens = d.acAuthTokens;
            }
            if (d.acErrorCode != null) {
                m.acErrorCode = d.acErrorCode | 0;
            }
            return m;
        };

        BotLinkedAccountsMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.accounts = [];
            }
            if (m.accounts && m.accounts.length) {
                d.accounts = $Array(m.accounts.length);
                for (var j = 0; j < m.accounts.length; ++j) {
                    d.accounts[j] = $root.AICommon.BotLinkedAccount.toObject(m.accounts[j], o, q + 1);
                }
            }
            if (m.acAuthTokens != null && $Object.hasOwnProperty.call(m, "acAuthTokens")) {
                d.acAuthTokens = o.bytes === $String ? $util.base64.encode(m.acAuthTokens, 0, m.acAuthTokens.length) : o.bytes === $Array ? $Array.prototype.slice.call(m.acAuthTokens) : m.acAuthTokens;
            }
            if (m.acErrorCode != null && $Object.hasOwnProperty.call(m, "acErrorCode")) {
                d.acErrorCode = m.acErrorCode;
            }
            return d;
        };

        BotLinkedAccountsMetadata.prototype.toJSON = function() {
            return BotLinkedAccountsMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotLinkedAccountsMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotLinkedAccountsMetadata";
        };

        return BotLinkedAccountsMetadata;
    })();

    AICommon.BotPromptSuggestion = (function() {

        const BotPromptSuggestion = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromptSuggestion.prototype.prompt = null;
        BotPromptSuggestion.prototype.promptId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromptSuggestion.prototype, "_prompt", {
            get: $util.oneOfGetter($oneOfFields = ["prompt"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPromptSuggestion.prototype, "_promptId", {
            get: $util.oneOfGetter($oneOfFields = ["promptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPromptSuggestion.create = function(properties) {
            return new BotPromptSuggestion(properties);
        };

        BotPromptSuggestion.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.prompt != null && $Object.hasOwnProperty.call(m, "prompt"))
                w.uint32(10).string(m.prompt);
            if (m.promptId != null && $Object.hasOwnProperty.call(m, "promptId"))
                w.uint32(18).string(m.promptId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromptSuggestion.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotPromptSuggestion();
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
                        m.prompt = r.stringVerify();
                        m._prompt = "prompt";
                        continue;
                    }
                case 2: {
                        if (u !== 2)
                            break;
                        m.promptId = r.stringVerify();
                        m._promptId = "promptId";
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

        BotPromptSuggestion.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotPromptSuggestion)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotPromptSuggestion: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotPromptSuggestion();
            if (d.prompt != null) {
                m.prompt = $String(d.prompt);
            }
            if (d.promptId != null) {
                m.promptId = $String(d.promptId);
            }
            return m;
        };

        BotPromptSuggestion.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.prompt != null && $Object.hasOwnProperty.call(m, "prompt")) {
                d.prompt = m.prompt;
            }
            if (m.promptId != null && $Object.hasOwnProperty.call(m, "promptId")) {
                d.promptId = m.promptId;
            }
            return d;
        };

        BotPromptSuggestion.prototype.toJSON = function() {
            return BotPromptSuggestion.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromptSuggestion.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotPromptSuggestion";
        };

        return BotPromptSuggestion;
    })();

    AICommon.BotPromptSuggestions = (function() {

        const BotPromptSuggestions = function (p) {
            this.suggestions = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPromptSuggestions.prototype.suggestions = $util.emptyArray;

        BotPromptSuggestions.create = function(properties) {
            return new BotPromptSuggestions(properties);
        };

        BotPromptSuggestions.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.suggestions != null && m.suggestions.length) {
                for (var i = 0; i < m.suggestions.length; ++i)
                    $root.AICommon.BotPromptSuggestion.encode(m.suggestions[i], w.uint32(10).fork(), q + 1).ldelim();
            }
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPromptSuggestions.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotPromptSuggestions();
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
                        if (!(m.suggestions && m.suggestions.length))
                            m.suggestions = [];
                        m.suggestions.push($root.AICommon.BotPromptSuggestion.decode(r, r.uint32(), $undefined, q + 1));
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

        BotPromptSuggestions.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotPromptSuggestions)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotPromptSuggestions: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotPromptSuggestions();
            if (d.suggestions) {
                if (!$Array.isArray(d.suggestions))
                    throw $TypeError(".AICommon.BotPromptSuggestions.suggestions: array expected");
                m.suggestions = $Array(d.suggestions.length);
                for (var i = 0; i < d.suggestions.length; ++i) {
                    if (!$util.isObject(d.suggestions[i]))
                        throw $TypeError(".AICommon.BotPromptSuggestions.suggestions: object expected");
                    m.suggestions[i] = $root.AICommon.BotPromptSuggestion.fromObject(d.suggestions[i], q + 1);
                }
            }
            return m;
        };

        BotPromptSuggestions.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.suggestions = [];
            }
            if (m.suggestions && m.suggestions.length) {
                d.suggestions = $Array(m.suggestions.length);
                for (var j = 0; j < m.suggestions.length; ++j) {
                    d.suggestions[j] = $root.AICommon.BotPromptSuggestion.toObject(m.suggestions[j], o, q + 1);
                }
            }
            return d;
        };

        BotPromptSuggestions.prototype.toJSON = function() {
            return BotPromptSuggestions.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPromptSuggestions.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotPromptSuggestions";
        };

        return BotPromptSuggestions;
    })();

    AICommon.BotSuggestedPromptMetadata = (function() {

        const BotSuggestedPromptMetadata = function (p) {
            this.suggestedPrompts = [];
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotSuggestedPromptMetadata.prototype.suggestedPrompts = $util.emptyArray;
        BotSuggestedPromptMetadata.prototype.selectedPromptIndex = null;
        BotSuggestedPromptMetadata.prototype.promptSuggestions = null;
        BotSuggestedPromptMetadata.prototype.selectedPromptId = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptIndex", {
            get: $util.oneOfGetter($oneOfFields = ["selectedPromptIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_promptSuggestions", {
            get: $util.oneOfGetter($oneOfFields = ["promptSuggestions"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotSuggestedPromptMetadata.prototype, "_selectedPromptId", {
            get: $util.oneOfGetter($oneOfFields = ["selectedPromptId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotSuggestedPromptMetadata.create = function(properties) {
            return new BotSuggestedPromptMetadata(properties);
        };

        BotSuggestedPromptMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.suggestedPrompts != null && m.suggestedPrompts.length) {
                for (var i = 0; i < m.suggestedPrompts.length; ++i)
                    w.uint32(10).string(m.suggestedPrompts[i]);
            }
            if (m.selectedPromptIndex != null && $Object.hasOwnProperty.call(m, "selectedPromptIndex"))
                w.uint32(16).uint32(m.selectedPromptIndex);
            if (m.promptSuggestions != null && $Object.hasOwnProperty.call(m, "promptSuggestions"))
                $root.AICommon.BotPromptSuggestions.encode(m.promptSuggestions, w.uint32(26).fork(), q + 1).ldelim();
            if (m.selectedPromptId != null && $Object.hasOwnProperty.call(m, "selectedPromptId"))
                w.uint32(34).string(m.selectedPromptId);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotSuggestedPromptMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotSuggestedPromptMetadata();
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
                        if (!(m.suggestedPrompts && m.suggestedPrompts.length))
                            m.suggestedPrompts = [];
                        m.suggestedPrompts.push(r.stringVerify());
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.selectedPromptIndex = r.uint32();
                        m._selectedPromptIndex = "selectedPromptIndex";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.promptSuggestions = $root.AICommon.BotPromptSuggestions.decode(r, r.uint32(), $undefined, q + 1, m.promptSuggestions);
                        m._promptSuggestions = "promptSuggestions";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.selectedPromptId = r.stringVerify();
                        m._selectedPromptId = "selectedPromptId";
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

        BotSuggestedPromptMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotSuggestedPromptMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotSuggestedPromptMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotSuggestedPromptMetadata();
            if (d.suggestedPrompts) {
                if (!$Array.isArray(d.suggestedPrompts))
                    throw $TypeError(".AICommon.BotSuggestedPromptMetadata.suggestedPrompts: array expected");
                m.suggestedPrompts = $Array(d.suggestedPrompts.length);
                for (var i = 0; i < d.suggestedPrompts.length; ++i) {
                    m.suggestedPrompts[i] = $String(d.suggestedPrompts[i]);
                }
            }
            if (d.selectedPromptIndex != null) {
                m.selectedPromptIndex = d.selectedPromptIndex >>> 0;
            }
            if (d.promptSuggestions != null) {
                if (!$util.isObject(d.promptSuggestions))
                    throw $TypeError(".AICommon.BotSuggestedPromptMetadata.promptSuggestions: object expected");
                m.promptSuggestions = $root.AICommon.BotPromptSuggestions.fromObject(d.promptSuggestions, q + 1);
            }
            if (d.selectedPromptId != null) {
                m.selectedPromptId = $String(d.selectedPromptId);
            }
            return m;
        };

        BotSuggestedPromptMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (o.arrays || o.defaults) {
                d.suggestedPrompts = [];
            }
            if (m.suggestedPrompts && m.suggestedPrompts.length) {
                d.suggestedPrompts = $Array(m.suggestedPrompts.length);
                for (var j = 0; j < m.suggestedPrompts.length; ++j) {
                    d.suggestedPrompts[j] = m.suggestedPrompts[j];
                }
            }
            if (m.selectedPromptIndex != null && $Object.hasOwnProperty.call(m, "selectedPromptIndex")) {
                d.selectedPromptIndex = m.selectedPromptIndex;
            }
            if (m.promptSuggestions != null && $Object.hasOwnProperty.call(m, "promptSuggestions")) {
                d.promptSuggestions = $root.AICommon.BotPromptSuggestions.toObject(m.promptSuggestions, o, q + 1);
            }
            if (m.selectedPromptId != null && $Object.hasOwnProperty.call(m, "selectedPromptId")) {
                d.selectedPromptId = m.selectedPromptId;
            }
            return d;
        };

        BotSuggestedPromptMetadata.prototype.toJSON = function() {
            return BotSuggestedPromptMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotSuggestedPromptMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotSuggestedPromptMetadata";
        };

        return BotSuggestedPromptMetadata;
    })();

    AICommon.BotPluginMetadata = (function() {

        const BotPluginMetadata = function (p) {
            if (p)
                for (var ks = $Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null && ks[i] !== "__proto__")
                        this[ks[i]] = p[ks[i]];
        };

        BotPluginMetadata.prototype.provider = null;
        BotPluginMetadata.prototype.pluginType = null;
        BotPluginMetadata.prototype.thumbnailCdnUrl = null;
        BotPluginMetadata.prototype.profilePhotoCdnUrl = null;
        BotPluginMetadata.prototype.searchProviderUrl = null;
        BotPluginMetadata.prototype.referenceIndex = null;
        BotPluginMetadata.prototype.expectedLinksCount = null;
        BotPluginMetadata.prototype.searchQuery = null;
        BotPluginMetadata.prototype.parentPluginMessageKey = null;
        BotPluginMetadata.prototype.deprecatedField = null;
        BotPluginMetadata.prototype.parentPluginType = null;
        BotPluginMetadata.prototype.faviconCdnUrl = null;

        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_provider", {
            get: $util.oneOfGetter($oneOfFields = ["provider"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_pluginType", {
            get: $util.oneOfGetter($oneOfFields = ["pluginType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_thumbnailCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["thumbnailCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_profilePhotoCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["profilePhotoCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_searchProviderUrl", {
            get: $util.oneOfGetter($oneOfFields = ["searchProviderUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_referenceIndex", {
            get: $util.oneOfGetter($oneOfFields = ["referenceIndex"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_expectedLinksCount", {
            get: $util.oneOfGetter($oneOfFields = ["expectedLinksCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_searchQuery", {
            get: $util.oneOfGetter($oneOfFields = ["searchQuery"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginMessageKey", {
            get: $util.oneOfGetter($oneOfFields = ["parentPluginMessageKey"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_deprecatedField", {
            get: $util.oneOfGetter($oneOfFields = ["deprecatedField"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_parentPluginType", {
            get: $util.oneOfGetter($oneOfFields = ["parentPluginType"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(BotPluginMetadata.prototype, "_faviconCdnUrl", {
            get: $util.oneOfGetter($oneOfFields = ["faviconCdnUrl"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        BotPluginMetadata.create = function(properties) {
            return new BotPluginMetadata(properties);
        };

        BotPluginMetadata.encode = function (m, w, q) {
            if (!w)
                w = $Writer.create();
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (m.provider != null && $Object.hasOwnProperty.call(m, "provider"))
                w.uint32(8).int32(m.provider);
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType"))
                w.uint32(16).int32(m.pluginType);
            if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl"))
                w.uint32(26).string(m.thumbnailCdnUrl);
            if (m.profilePhotoCdnUrl != null && $Object.hasOwnProperty.call(m, "profilePhotoCdnUrl"))
                w.uint32(34).string(m.profilePhotoCdnUrl);
            if (m.searchProviderUrl != null && $Object.hasOwnProperty.call(m, "searchProviderUrl"))
                w.uint32(42).string(m.searchProviderUrl);
            if (m.referenceIndex != null && $Object.hasOwnProperty.call(m, "referenceIndex"))
                w.uint32(48).uint32(m.referenceIndex);
            if (m.expectedLinksCount != null && $Object.hasOwnProperty.call(m, "expectedLinksCount"))
                w.uint32(56).uint32(m.expectedLinksCount);
            if (m.searchQuery != null && $Object.hasOwnProperty.call(m, "searchQuery"))
                w.uint32(74).string(m.searchQuery);
            if (m.parentPluginMessageKey != null && $Object.hasOwnProperty.call(m, "parentPluginMessageKey"))
                $root.Protocol.MessageKey.encode(m.parentPluginMessageKey, w.uint32(82).fork(), q + 1).ldelim();
            if (m.deprecatedField != null && $Object.hasOwnProperty.call(m, "deprecatedField"))
                w.uint32(88).int32(m.deprecatedField);
            if (m.parentPluginType != null && $Object.hasOwnProperty.call(m, "parentPluginType"))
                w.uint32(96).int32(m.parentPluginType);
            if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl"))
                w.uint32(106).string(m.faviconCdnUrl);
            if (m.$unknowns != null && $Object.hasOwnProperty.call(m, "$unknowns"))
                for (var i = 0; i < m.$unknowns.length; ++i)
                    w.raw(m.$unknowns[i]);
            return w;
        };

        BotPluginMetadata.decode = function (r, l, z, q, g) {
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
            m = g || new $root.AICommon.BotPluginMetadata();
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
                        m.provider = r.int32();
                        m._provider = "provider";
                        continue;
                    }
                case 2: {
                        if (u !== 0)
                            break;
                        m.pluginType = r.int32();
                        m._pluginType = "pluginType";
                        continue;
                    }
                case 3: {
                        if (u !== 2)
                            break;
                        m.thumbnailCdnUrl = r.stringVerify();
                        m._thumbnailCdnUrl = "thumbnailCdnUrl";
                        continue;
                    }
                case 4: {
                        if (u !== 2)
                            break;
                        m.profilePhotoCdnUrl = r.stringVerify();
                        m._profilePhotoCdnUrl = "profilePhotoCdnUrl";
                        continue;
                    }
                case 5: {
                        if (u !== 2)
                            break;
                        m.searchProviderUrl = r.stringVerify();
                        m._searchProviderUrl = "searchProviderUrl";
                        continue;
                    }
                case 6: {
                        if (u !== 0)
                            break;
                        m.referenceIndex = r.uint32();
                        m._referenceIndex = "referenceIndex";
                        continue;
                    }
                case 7: {
                        if (u !== 0)
                            break;
                        m.expectedLinksCount = r.uint32();
                        m._expectedLinksCount = "expectedLinksCount";
                        continue;
                    }
                case 9: {
                        if (u !== 2)
                            break;
                        m.searchQuery = r.stringVerify();
                        m._searchQuery = "searchQuery";
                        continue;
                    }
                case 10: {
                        if (u !== 2)
                            break;
                        m.parentPluginMessageKey = $root.Protocol.MessageKey.decode(r, r.uint32(), $undefined, q + 1, m.parentPluginMessageKey);
                        m._parentPluginMessageKey = "parentPluginMessageKey";
                        continue;
                    }
                case 11: {
                        if (u !== 0)
                            break;
                        m.deprecatedField = r.int32();
                        m._deprecatedField = "deprecatedField";
                        continue;
                    }
                case 12: {
                        if (u !== 0)
                            break;
                        m.parentPluginType = r.int32();
                        m._parentPluginType = "parentPluginType";
                        continue;
                    }
                case 13: {
                        if (u !== 2)
                            break;
                        m.faviconCdnUrl = r.stringVerify();
                        m._faviconCdnUrl = "faviconCdnUrl";
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

        BotPluginMetadata.fromObject = function (d, q) {
            if (d instanceof $root.AICommon.BotPluginMetadata)
                return d;
            if (!$util.isObject(d))
                throw $TypeError(".AICommon.BotPluginMetadata: object expected");
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var m = new $root.AICommon.BotPluginMetadata();
            switch (d.provider) {
            case "UNKNOWN":
            case 0:
                m.provider = 0;
                break;
            case "BING":
            case 1:
                m.provider = 1;
                break;
            case "GOOGLE":
            case 2:
                m.provider = 2;
                break;
            case "SUPPORT":
            case 3:
                m.provider = 3;
                break;
            default:
                if (typeof d.provider === "number" && (d.provider | 0) === d.provider)
                    m.provider = d.provider;
            }
            switch (d.pluginType) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.pluginType = 0;
                break;
            case "REELS":
            case 1:
                m.pluginType = 1;
                break;
            case "SEARCH":
            case 2:
                m.pluginType = 2;
                break;
            default:
                if (typeof d.pluginType === "number" && (d.pluginType | 0) === d.pluginType)
                    m.pluginType = d.pluginType;
            }
            if (d.thumbnailCdnUrl != null) {
                m.thumbnailCdnUrl = $String(d.thumbnailCdnUrl);
            }
            if (d.profilePhotoCdnUrl != null) {
                m.profilePhotoCdnUrl = $String(d.profilePhotoCdnUrl);
            }
            if (d.searchProviderUrl != null) {
                m.searchProviderUrl = $String(d.searchProviderUrl);
            }
            if (d.referenceIndex != null) {
                m.referenceIndex = d.referenceIndex >>> 0;
            }
            if (d.expectedLinksCount != null) {
                m.expectedLinksCount = d.expectedLinksCount >>> 0;
            }
            if (d.searchQuery != null) {
                m.searchQuery = $String(d.searchQuery);
            }
            if (d.parentPluginMessageKey != null) {
                if (!$util.isObject(d.parentPluginMessageKey))
                    throw $TypeError(".AICommon.BotPluginMetadata.parentPluginMessageKey: object expected");
                m.parentPluginMessageKey = $root.Protocol.MessageKey.fromObject(d.parentPluginMessageKey, q + 1);
            }
            switch (d.deprecatedField) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.deprecatedField = 0;
                break;
            case "REELS":
            case 1:
                m.deprecatedField = 1;
                break;
            case "SEARCH":
            case 2:
                m.deprecatedField = 2;
                break;
            default:
                if (typeof d.deprecatedField === "number" && (d.deprecatedField | 0) === d.deprecatedField)
                    m.deprecatedField = d.deprecatedField;
            }
            switch (d.parentPluginType) {
            case "UNKNOWN_PLUGIN":
            case 0:
                m.parentPluginType = 0;
                break;
            case "REELS":
            case 1:
                m.parentPluginType = 1;
                break;
            case "SEARCH":
            case 2:
                m.parentPluginType = 2;
                break;
            default:
                if (typeof d.parentPluginType === "number" && (d.parentPluginType | 0) === d.parentPluginType)
                    m.parentPluginType = d.parentPluginType;
            }
            if (d.faviconCdnUrl != null) {
                m.faviconCdnUrl = $String(d.faviconCdnUrl);
            }
            return m;
        };

        BotPluginMetadata.toObject = function (m, o, q) {
            if (!o)
                o = {};
            if (q === $undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var d = {};
            if (m.provider != null && $Object.hasOwnProperty.call(m, "provider")) {
                d.provider = o.enums === $String ? $root.AICommon.BotPluginMetadata.SearchProvider[m.provider] === $undefined ? m.provider : $root.AICommon.BotPluginMetadata.SearchProvider[m.provider] : m.provider;
            }
            if (m.pluginType != null && $Object.hasOwnProperty.call(m, "pluginType")) {
                d.pluginType = o.enums === $String ? $root.AICommon.BotPluginMetadata.PluginType[m.pluginType] === $undefined ? m.pluginType : $root.AICommon.BotPluginMetadata.PluginType[m.pluginType] : m.pluginType;
            }
            if (m.thumbnailCdnUrl != null && $Object.hasOwnProperty.call(m, "thumbnailCdnUrl")) {
                d.thumbnailCdnUrl = m.thumbnailCdnUrl;
            }
            if (m.profilePhotoCdnUrl != null && $Object.hasOwnProperty.call(m, "profilePhotoCdnUrl")) {
                d.profilePhotoCdnUrl = m.profilePhotoCdnUrl;
            }
            if (m.searchProviderUrl != null && $Object.hasOwnProperty.call(m, "searchProviderUrl")) {
                d.searchProviderUrl = m.searchProviderUrl;
            }
            if (m.referenceIndex != null && $Object.hasOwnProperty.call(m, "referenceIndex")) {
                d.referenceIndex = m.referenceIndex;
            }
            if (m.expectedLinksCount != null && $Object.hasOwnProperty.call(m, "expectedLinksCount")) {
                d.expectedLinksCount = m.expectedLinksCount;
            }
            if (m.searchQuery != null && $Object.hasOwnProperty.call(m, "searchQuery")) {
                d.searchQuery = m.searchQuery;
            }
            if (m.parentPluginMessageKey != null && $Object.hasOwnProperty.call(m, "parentPluginMessageKey")) {
                d.parentPluginMessageKey = $root.Protocol.MessageKey.toObject(m.parentPluginMessageKey, o, q + 1);
            }
            if (m.deprecatedField != null && $Object.hasOwnProperty.call(m, "deprecatedField")) {
                d.deprecatedField = o.enums === $String ? $root.AICommon.BotPluginMetadata.PluginType[m.deprecatedField] === $undefined ? m.deprecatedField : $root.AICommon.BotPluginMetadata.PluginType[m.deprecatedField] : m.deprecatedField;
            }
            if (m.parentPluginType != null && $Object.hasOwnProperty.call(m, "parentPluginType")) {
                d.parentPluginType = o.enums === $String ? $root.AICommon.BotPluginMetadata.PluginType[m.parentPluginType] === $undefined ? m.parentPluginType : $root.AICommon.BotPluginMetadata.PluginType[m.parentPluginType] : m.parentPluginType;
            }
            if (m.faviconCdnUrl != null && $Object.hasOwnProperty.call(m, "faviconCdnUrl")) {
                d.faviconCdnUrl = m.faviconCdnUrl;
            }
            return d;
        };

        BotPluginMetadata.prototype.toJSON = function() {
            return BotPluginMetadata.toObject(this, $protobuf.util.toJSONOptions);
        };

        BotPluginMetadata.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/AICommon.BotPluginMetadata";
        };

        BotPluginMetadata.PluginType = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN_PLUGIN"] = 0;
            values[valuesById[1] = "REELS"] = 1;
            values[valuesById[2] = "SEARCH"] = 2;
            return values;
        })();

        BotPluginMetadata.SearchProvider = (function() {
            const valuesById = $Object.create(null), values = $Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "BING"] = 1;
            values[valuesById[2] = "GOOGLE"] = 2;
            values[valuesById[3] = "SUPPORT"] = 3;
            return values;
        })();

        return BotPluginMetadata;
    })();

    AICommon.SessionTransparencyType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_TYPE"] = 0;
        values[valuesById[1] = "NY_AI_SAFETY_DISCLAIMER"] = 1;
        return values;
    })();

    AICommon.AISubscriptionRequestType = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "UNSPECIFIED"] = 0;
        values[valuesById[1] = "THINK_HARD"] = 1;
        values[valuesById[2] = "IMAGE_GEN"] = 2;
        values[valuesById[3] = "VIDEO_GEN"] = 3;
        return values;
    })();

    AICommon.BotSessionSource = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "NULL_STATE"] = 1;
        values[valuesById[2] = "TYPEAHEAD"] = 2;
        values[valuesById[3] = "USER_INPUT"] = 3;
        values[valuesById[4] = "EMU_FLASH"] = 4;
        values[valuesById[5] = "EMU_FLASH_FOLLOWUP"] = 5;
        values[valuesById[6] = "VOICE"] = 6;
        values[valuesById[7] = "AI_HOME_SESSION"] = 7;
        return values;
    })();

    AICommon.BotMetricsThreadEntryPoint = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[1] = "AI_TAB_THREAD"] = 1;
        values[valuesById[2] = "AI_HOME_THREAD"] = 2;
        values[valuesById[3] = "AI_DEEPLINK_IMMERSIVE_THREAD"] = 3;
        values[valuesById[4] = "AI_DEEPLINK_THREAD"] = 4;
        values[valuesById[5] = "ASK_META_AI_CONTEXT_MENU_THREAD"] = 5;
        return values;
    })();

    AICommon.BotMetricsEntryPoint = (function() {
        const valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "UNDEFINED_ENTRY_POINT"] = 0;
        values[valuesById[1] = "FAVICON"] = 1;
        values[valuesById[2] = "CHATLIST"] = 2;
        values[valuesById[3] = "AISEARCH_NULL_STATE_PAPER_PLANE"] = 3;
        values[valuesById[4] = "AISEARCH_NULL_STATE_SUGGESTION"] = 4;
        values[valuesById[5] = "AISEARCH_TYPE_AHEAD_SUGGESTION"] = 5;
        values[valuesById[6] = "AISEARCH_TYPE_AHEAD_PAPER_PLANE"] = 6;
        values[valuesById[7] = "AISEARCH_TYPE_AHEAD_RESULT_CHATLIST"] = 7;
        values[valuesById[8] = "AISEARCH_TYPE_AHEAD_RESULT_MESSAGES"] = 8;
        values[valuesById[9] = "AIVOICE_SEARCH_BAR"] = 9;
        values[valuesById[10] = "AIVOICE_FAVICON"] = 10;
        values[valuesById[11] = "AISTUDIO"] = 11;
        values[valuesById[12] = "DEEPLINK"] = 12;
        values[valuesById[13] = "NOTIFICATION"] = 13;
        values[valuesById[14] = "PROFILE_MESSAGE_BUTTON"] = 14;
        values[valuesById[15] = "FORWARD"] = 15;
        values[valuesById[16] = "APP_SHORTCUT"] = 16;
        values[valuesById[17] = "FF_FAMILY"] = 17;
        values[valuesById[18] = "AI_TAB"] = 18;
        values[valuesById[19] = "AI_HOME"] = 19;
        values[valuesById[20] = "AI_DEEPLINK_IMMERSIVE"] = 20;
        values[valuesById[21] = "AI_DEEPLINK"] = 21;
        values[valuesById[22] = "META_AI_CHAT_SHORTCUT_AI_STUDIO"] = 22;
        values[valuesById[23] = "UGC_CHAT_SHORTCUT_AI_STUDIO"] = 23;
        values[valuesById[24] = "NEW_CHAT_AI_STUDIO"] = 24;
        values[valuesById[25] = "AIVOICE_FAVICON_CALL_HISTORY"] = 25;
        values[valuesById[26] = "ASK_META_AI_CONTEXT_MENU"] = 26;
        values[valuesById[27] = "ASK_META_AI_CONTEXT_MENU_1ON1"] = 27;
        values[valuesById[28] = "ASK_META_AI_CONTEXT_MENU_GROUP"] = 28;
        values[valuesById[29] = "INVOKE_META_AI_1ON1"] = 29;
        values[valuesById[30] = "INVOKE_META_AI_GROUP"] = 30;
        values[valuesById[31] = "META_AI_FORWARD"] = 31;
        values[valuesById[32] = "NEW_CHAT_AI_CONTACT"] = 32;
        values[valuesById[33] = "MESSAGE_QUICK_ACTION_1_ON_1_CHAT"] = 33;
        values[valuesById[34] = "MESSAGE_QUICK_ACTION_GROUP_CHAT"] = 34;
        values[valuesById[35] = "ATTACHMENT_TRAY_1_ON_1_CHAT"] = 35;
        values[valuesById[36] = "ATTACHMENT_TRAY_GROUP_CHAT"] = 36;
        values[valuesById[37] = "ASK_META_AI_MEDIA_VIEWER_1ON1"] = 37;
        values[valuesById[38] = "ASK_META_AI_MEDIA_VIEWER_GROUP"] = 38;
        values[valuesById[39] = "MEDIA_PICKER_1_ON_1_CHAT"] = 39;
        values[valuesById[40] = "MEDIA_PICKER_GROUP_CHAT"] = 40;
        values[valuesById[41] = "ASK_META_AI_NO_SEARCH_RESULTS"] = 41;
        values[valuesById[45] = "META_AI_SETTINGS"] = 45;
        values[valuesById[46] = "WEB_INTRO_PANEL"] = 46;
        values[valuesById[47] = "WEB_NAVIGATION_BAR"] = 47;
        values[valuesById[54] = "GROUP_MEMBER"] = 54;
        values[valuesById[55] = "CHATLIST_SEARCH"] = 55;
        values[valuesById[56] = "NEW_CHAT_LIST"] = 56;
        values[valuesById[57] = "CONTACTS_TAB"] = 57;
        values[valuesById[58] = "NEW_3P_AGENT_CREATION"] = 58;
        return values;
    })();

    return AICommon;
})();

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
