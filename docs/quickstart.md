# Quickstart — aurekai-n8n

Aurekai pipeline as an n8n workflow.

## Import Workflow

In n8n: + New Workflow → Import from File → select `workflows/aurekai-core-pipeline.json`.

## Nodes

1. **doctor-deep** — `akai doctor --deep --json`
2. **manifest-verify** — `akai verify --manifest artifact.json --json`
3. **release-gate** — `akai release gate --version 0.8.0-alpha.4 --json`

## Validate Locally

```bash
bash tests/validate-schemas.sh
bash tests/validate-scripts.sh
```
