
## Hand-patched messages (Elaina 1.4.9)

Six messages that elaina-baileys 1.4.9 ships are not in upstream's `WAProto.proto`, so they are added by hand rather
than by regenerating:

| Message | Where |
| --- | --- |
| `StatusTemplate` | nested in `StatusAttribution`, field 9 `statusTemplate` |
| `PhoneNumberSharing` | nested in `DeviceCapabilities`, field 14 `phoneNumberSharing` |
| `IntegrationAttestation` | nested in `ClientPayload`, field 50 `integrationAttestation` |
| `MembershipFormKeyFingerprintVerification` | top level, `ProtocolMessage` field 40 |
| `GroupRootKeyRequest` | top level, `ProtocolMessage` field 39 |
| `GroupRootKey` | top level |

`index.js` and `index.d.ts` are patched to match, because this tree's codec is a patched protobufjs build (unknown-field
preservation, recursion limits, `$String`/`$Boolean` helpers). Regenerating with the stock `pbjs` rewrites the entire
file and loses those patches — that is the 11k-line diff. If you do regenerate, re-apply these six messages and the five
parent fields, then run `node --test test/proto-1.4.9.test.js`, which pins their wire shape.

### Fields ported from Elaina 1.4.9 (not carried by upstream)

| Message | Field | Tag |
| --- | --- | --- |
| `Account` | `pnLearnState` | 6 |
| `ClientPairingProps` | `isCompanionRegistrationFgsEnabled` | 8 |
| `Conversation` | `groupRootKeys` (repeated `GroupRootKey`) | 66 |
| `EventInviteMessage` | `status` | 13 |
| `MemberLabel` | `showAdminBadge` | 3 |
| `MsgOpaqueData` | `sharableEventInviteStatus` / `LocationName` / `CoverImageHandle` / `LastUpdatedTsUsec` | 65–68 |
| `ProtocolMessage` | `groupRootKeyShare` | 41 |
| `SettingsSyncAction` | `mediaAutoDownloadQuality` | 35 |
| `WebMessageInfo` | `groupHistoryLastCountedMessageTimestamp` | 85 |
| `ChatSolidColorWallpaper` | `doodleLightArgb` / `doodleDarkArgb` | 4, 5 |

### Three Elaina 1.4.9 items deliberately left out

- `ChatSolidColorWallpaper.backgroundLightArgb` (tag 1) and `backgroundDarkArgb` (tag 2) collide with `colorLight` and
  `colorDark`, which already hold those numbers. They are carried in `index.js` only: the decoder looks at the wire type
  (5 = the `fixed32` colour, 2 = the string colour) and fills the matching field, which is more than Elaina's own build
  manages — hers emits duplicate `case` labels and drops one of the two. A `.proto` cannot repeat a field number, so the
  numbers are documented in a comment there instead; re-add both by hand after any regeneration.
- `Message.vpcRequestMessage` (tag 139) is referenced by Elaina's `index.js` and `index.d.ts`, but
  `proto.Message.VpcRequestMessage` is never defined in her build — a dangling reference with no schema to copy. The
  field is nevertheless carried here: the type is generated with no declared fields and its `decode` keeps the payload
  verbatim in `$unknowns`, which `encode` writes back, so a decode/encode cycle is byte-identical. Fill in the real
  fields here if WhatsApp's schema ever becomes public.
