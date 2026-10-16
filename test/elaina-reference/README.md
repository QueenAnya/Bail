# Elaina VoIP test reference

`voip.reference.js` was inherited from the Elaina distribution. It asserts that every module in Elaina's VoIP folder avoids the separate-session `VoipClient` implementation. Anya's former standalone `VoipClient` source is now retained under ``Voip/standalone/``, so that blanket assertion is not valid for Anya. Do not run this reference file as an Anya test. Anya's active VoIP tests live under `src/__tests__/Voip/`.
