# Business, catalog and labels

Business accounts get product and label calls on top of the normal surface.

### Products

```ts
const { products } = await sock.getCatalog({ jid: businessJid })
await sock.productCreate({ name: 'Anya Pro', price: 900, currency: 'INR', … })
await sock.productUpdate(productId, { price: 1200 })
await sock.productDelete([productId])
```

Prices are in the smallest unit of the currency (`900` = ₹9.00 for INR, `900` = $9.00 for USD) — the same `offset`
convention `money()` from the payment extras uses.

### Profile and quick replies

```ts
await sock.updateProfileStatus('Back at 6')
await sock.updateProfileName('Support bot')
await sock.updateBusinessProfile({ address: '…', email: '…', description: '…' })

await sock.addOrEditQuickReply({ shortcut: '/hours', message: 'We are open 9–6 IST' })
const replies = await sock.getQuickReply()
```

### Group member labels

Member labels are the business tags shown next to a participant:

```ts
await sock.updateMemberLabel(jid, 'VIP')
await sock.updateMemberLabel(jid, '')   // clear
```

### Re-fetching expired media

Media URLs expire. Re-request instead of re-downloading from a saved URL:

```ts
await sock.updateMediaMessage({ key: msg.key, message: msg.message })
```
