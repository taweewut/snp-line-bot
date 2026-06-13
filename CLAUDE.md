# SNP1 — LINE OA Village Common Fee Bot

## Project Overview
Google Apps Script project that powers a LINE Official Account for
หมู่บ้านเศรณีปาร์ค 1 (SNP1 Village). It handles:
- Auto-reply for monthly common-fee (ค่าส่วนกลาง) inquiries and payments
- Daily LINE broadcast to the juristic committee group summarizing
  member payments per day

The script is hosted in a Google Sheet (bound script) and receives a
webhook from the LINE OA. Data lives in the bound Google Sheet.

## Repo Location
The git repo and clasp project live in `snp-line-bot/`, NOT in this
parent folder. Always run git/clasp commands against that directory:
  cd snp-line-bot

## Sync & Deploy Workflow (clasp)
This project syncs to Apps Script with clasp. GitHub is the source of truth.
Standard cycle after editing code:
1. `clasp push`                          # upload local → Apps Script
2. Test by triggering the bot manually   # verify before deploying
3. `git add . && git commit -m "..."`    # save revision
4. `git push`                            # back up to GitHub
5. `clasp deploy -i <DEPLOYMENT_ID> -d "<short description>"`

## CRITICAL RULE — do not break the webhook
NEVER run a bare `clasp deploy` (no -i flag). Creating a NEW deployment
generates a NEW web app URL, which breaks the LINE OA webhook.
ALWAYS update the existing deployment with:
  clasp deploy -i <DEPLOYMENT_ID> -d "<description>"
Deployment ID (production / LINE webhook):
  AKfycbw2BOBeXfVcwcmAh6Uzfo6XMd9eWIyMWd3h9ICPNZlow1zmCgL8917ITDGxZl1hMk28WQ
(This is the versioned deployment. The other deployment ending in
 ...FjaN is the @HEAD deployment — do NOT point the webhook at it.)
Verify it matches the webhook URL in the LINE Developers console before
relying on it. Re-list anytime with `clasp deployments`.

## Before editing
If the online Apps Script editor may have been touched, run `clasp pull`
first to avoid overwriting remote changes. Prefer editing locally only.

## Files
- Code.js          — main bot logic (webhook handler, payment logic, broadcast)
- Backup.gs.js     — backup/legacy code
- index.html.html  — web app HTML
- appsscript.json  — Apps Script manifest
- .clasp.json      — clasp config (script ID); gitignored

## Conventions
- Flex Message templates and the data-filling logic should stay in
  separate functions: template structure vs. dynamic data (names,
  amounts, totals). Keeps git diffs clear (layout change vs. logic change).
- Validate Flex JSON in the LINE Flex Message Simulator before pushing.
- User-facing bot text is in Thai; keep tone consistent with existing messages.