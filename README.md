<p align="center">
  <img src="https://raw.githubusercontent.com/aurekai/aurekai/main/assets/aurekai-logo.svg" alt="Aurekai" width="520" />
</p>

# `aurekai-n8n` · v0.8.0-alpha.5

Official n8n community node package for Aurekai — 7 capability-native nodes + 8 workflow templates.

## Nodes

| Node | Capability family | Description |
|---|---|---|
| `Aurekai: Doctor` | runtime | Deep diagnostics |
| `Aurekai: Transcribe` | intake | Audio transcription |
| `Aurekai: Proof Bundle` | proof | Export proof bundle |
| `Aurekai: Invoice` | commerce | Generate client invoice |
| `Aurekai: Wire Report` | wire | Wire capture report |
| `Aurekai: Meter` | commerce | Record metering event |
| `Aurekai: Capabilities` | runtime | List all capability families |

## Workflow Templates

| Workflow | Description |
|---|---|
| Inbound Call to Invoice | Webhook → transcribe → brief → proof → invoice |
| Webhook to Proof Bundle | Any webhook → proof bundle export |
| Form Submission to Deliverable | Form → ingest → pack → distribute |
| New File to Packed Artifact | File trigger → ingest → proof |
| Outreach Reply to Project Update | Reply webhook → CMS update |
| API Key to Metered Usage | API usage event → meter → ledger |
| CMS Entry to Distribution | CMS webhook → pack → distribute |
| Wire Report to Routing Suggestion | Wire capture → report → reason |

## Host-native features used

- **Sub-workflows** — reusable `audio-to-brief`, `brief-to-invoice`, `invoice-to-outreach` sub-workflow calls
- **Wait/webhook resume** — human approval gates on proof bundles and invoice review
- **Error Workflows** — global error handler logs to AkaiSpace, enqueues retry in AkaiQueue
- **Expressions over AkaiProof fields** — proof-driven branching (e.g. `{{ $json.proof_uri !== '' }}`)
- **Community node package** — `n8n-nodes-aurekai` installable from npm

## Install

```bash
# In n8n settings → Community Nodes → Install
n8n-nodes-aurekai

# Or directly
npm install n8n-nodes-aurekai
```

## Layout

```
nodes/
  aurekai_nodes.ts          7 n8n node implementations
workflows/                  8 workflow JSON templates
package.json                n8n community package manifest
```


Aurekai integration surface for N8N.

Status: active
Type: workflow

## Core Template Set

- doctor-deep
- manifest-verify
- model-memory-pack
- sae-audit
- semantic-cache-bench
- proof-bundle-export
- release-gate

## Canonical References

- Platform: https://github.com/aurekai/aurekai
- Native runtime: https://github.com/aurekai/native-runtime
- Integration registry: https://github.com/aurekai/aurekai/blob/main/registry/integrations.json
- Ecosystem map: https://github.com/aurekai/aurekai/blob/main/ECOSYSTEM_NAMES.md
