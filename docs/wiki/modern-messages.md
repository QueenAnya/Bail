# Modern message API

The ported modern content types, each with its own builder. They are plain content keys, so they go through
`sock.sendMessage` like anything else.

| Builder | Sends |
|---|---|
| `makeQuestionMessage` | a question prompt with answers |
| `makeQuestionResponseMessage` | a response to a question |
| `makeQuestionReplyMessage` | a reply inside a question thread |
| `makePollAddOptionMessage` | adds an option to a running poll |
| `makeStatusMentionMessage` | mentions someone in a status |
| `makeStatusQuotedMessage` | quotes a status |
| `makeStatusStickerInteractionMessage` | sticker reaction on a status |
| `makeStatusNotificationMessage` | a status notification |
| `makeStatusAudienceMetadata` | custom audience (close friends) |
| `makeStatusAddYoursAssociation` | the "add yours" prompt |
| `makeGroupStatusReactionMessage` | group status reaction |
| `makeCommentMessage` | comment on a channel post |
| `makeEventInviteMessage` | event invite |
| `makeScheduledCallCreationMessage` / `makeScheduledCallEditMessage` | scheduled calls |
| `makeNewsletterAdminInviteMessage` | channel admin invite |
| `makeNewsletterFollowerInviteMessage` | channel follower invite |

```ts
import { makeQuestionMessage } from '@teamolduser/baileys'

await sock.sendMessage(jid, makeQuestionMessage({
	question: 'Which release should I ship?',
	options: ['v1', 'v2', 'neither']
}))
```

Each builder validates its own inputs and throws a named error rather than sending a malformed proto — a rejected
payload from the server gives you much less to work with.
