<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the SCS FoodPlatform backend. A singleton PostHog client (`src/lib/posthog.js`) was created using `posthog-node` and wired into six controller files and the Express app. All PostHog credentials are read from environment variables. Users and creators are identified on login, registration, and Google OAuth. Eighteen events covering the full user lifecycle — registration, login, content watching, liking, saving, stack reading, following creators, earning badges, and profile updates — are now captured with contextual properties. A global Express error handler and per-route `captureException` calls provide error tracking. Graceful shutdown handlers flush pending events when the process exits.

| Event | Description | File |
|---|---|---|
| `user registered` | A new user registers with email and password | `src/controllers/auth.controller.js` |
| `user logged in` | A user logs in with email and password | `src/controllers/auth.controller.js` |
| `user logged out` | A user logs out (JWT decoded from cookie) | `src/controllers/auth.controller.js` |
| `creator registered` | A new food partner (creator) registers | `src/controllers/auth.controller.js` |
| `creator logged in` | A food partner logs in | `src/controllers/auth.controller.js` |
| `creator logged out` | A food partner logs out | `src/controllers/auth.controller.js` |
| `google oauth completed` | A user completes Google OAuth sign-in | `src/controllers/oauth.controller.js` |
| `reel created` | A creator uploads a new food reel | `src/controllers/reel.controller.js` |
| `reel liked` | A user likes a reel | `src/controllers/reel.controller.js` |
| `reel unliked` | A user removes their like from a reel | `src/controllers/reel.controller.js` |
| `reel saved` | A user bookmarks a reel | `src/controllers/reel.controller.js` |
| `reel unsaved` | A user removes a reel from bookmarks | `src/controllers/reel.controller.js` |
| `reel watched` | A user watches a reel | `src/controllers/reel.controller.js` |
| `stack created` | A creator publishes a new food insight stack | `src/controllers/stack.controller.js` |
| `stack read` | A user reads through a stack | `src/controllers/stack.controller.js` |
| `creator followed` | A user follows a food partner creator | `src/controllers/creator.controller.js` |
| `creator unfollowed` | A user unfollows a food partner creator | `src/controllers/creator.controller.js` |
| `badge completed` | A user earns a badge/achievement | `src/controllers/badge.controller.js` |
| `user profile updated` | A user updates their profile picture or bio | `src/controllers/user.controller.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/463515/dashboard/1692165)
- [New user registrations](https://us.posthog.com/project/463515/insights/Wmb4cldi)
- [Daily active users](https://us.posthog.com/project/463515/insights/ybC7n9MN)
- [Content engagement](https://us.posthog.com/project/463515/insights/WNrjiU8i)
- [User activation funnel](https://us.posthog.com/project/463515/insights/c2UwjPlf)
- [Creator growth](https://us.posthog.com/project/463515/insights/vMMAgfCn)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
