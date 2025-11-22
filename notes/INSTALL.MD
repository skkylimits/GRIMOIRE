# Grimoire - Project Planning & Research Notes

Dit document bevat toekomstige features, research links en technische notities voor het Grimoire project.

---

## 🚀 Geplande Features & Verbeteringen

### Website Features

- **MCP Server Integratie**
  - [Video: MCP Server Overview](https://www.youtube.com/watch?v=_GxopZS8LwU)
  - [Video: MCP Implementation](https://www.youtube.com/watch?v=GuTcle5edjk&t=160s)

- **UI Improvements**
  - Code Mirror implementatie (zoals boot.dev)
  - Vereist UI aanpassingen

- **Internationalisatie (i18n)**
  - Multi-taal ondersteuning toevoegen

- **Content Uitbreiding**
  - PowerShell module toevoegen
  - AI-powered OSINT sectie - [Video Tutorial](https://www.youtube.com/watch?v=JpWbytYrL2s)
  - AI Jailbreaking research - [Video](https://www.youtube.com/watch?v=44EJUYMSpzU)

### Data Ownership Strategy

*"That way I own the data. Doesn't matter which model I like to choose."*

Het doel is volledige controle over de kennisbank, onafhankelijk van AI model keuze.

### Toekomst Links

- [Arcanum Security Platform](https://www.arcanum-sec.com/)

---

## 📚 Research & Learning Resources

### Security Topics

**Firewalls**
- [Firewall Deep Dive](https://www.youtube.com/watch?v=K4ilFsm2GvA)

**Prompt Bombing & AI Security**
- [Prompt Bombing Techniques](https://www.youtube.com/watch?v=JpWbytYrL2s)

**Conference Talks**
- Review all DefCon talks (systematisch doorwerken)

### Tools te Exploreren

- **CyberChef** - Data transformation tool
- **sec gemini** - Security-focused Gemini variant
- **secmeta** - Security metadata tool

---

## 🤖 AI Stack voor Offensive Security

### Context: Jason Haddix's Aanpak

Gebaseerd op insights van **Jason Haddix** (Bishop Fox, bug bounty community):

> *"We tend to build our own stuff… they're usually versions of open-source models that have been pre- or post-trained or jailbroken…"*

### Kernprincipes

👉 **Geen gebruik** van shady AI's zoals "WormGPT"
👉 **Wel**: Eigen lokale AI-tools bovenop **open-source foundation models**
👉 **Fine-tuning**: Intern aangepast voor security-werk (prompt-injection testing, pentest automation, reconnaissance, exploit analysis)

---

### Open-Source Modellen voor Security Research

| Model | Oorsprong | Beschrijving | Toepassing |
|:------|:----------|:-------------|:-----------|
| **LLaMA 2 / 3** | Meta AI | Foundation models (7B–70B). Uncensored forks: Dolphin, Nous, Wizard | Lokale chatbot / code-assistent met weinig restricties |
| **Mistral 7B / Mixtral 8x7B** | Mistral AI | Sterke, lichte MoE-architectuur | Snelle agenten voor scanning en automation |
| **Falcon 40B / 180B** | TII UAE | Volledig open, permissieve licentie | Red-team prompt-tests en classification |
| **Zephyr / OpenHermes / Dolphin 2.9** | Community fine-tunes | Instruct-tuned, weinig guardrails | PoC AI-helpers voor exploit/recon tooling |
| **CodeLLaMA / StarCoder / SantaCoder** | Meta / Hugging Face | Code-georiënteerde LLM's | Code-generatie, parser-scripts, exploit-templates |

**Strategie**: Gebruik **open Hugging Face-modellen** als basis, draai ze **lokaal of op private cloud** (geen logging/filters).

---

### "Build Our Own Stuff" - Framework Stack

**Orkestratie & Integration**:
- **LangChain** → Meerdere modellen + tools orkestreren (parsing, reconnaissance, exploit-simulation)
- **LlamaIndex** → Lokale knowledge bases koppelen (docs, recon data)
- **CrewAI** → een framework waar meerdere AI-agents samenwerken als een team (‘crew’) met rollen, doelen en autonomie.

**Local Inference Stacks**:
- `text-generation-webui`
- `Ollama`
- `vLLM`
- `LM Studio`
- Zelfgehoste FastAPI-wrapper

**Agent Scripts & CLI's**:
- API-calls naar Burp, Shodan, Censys, etc.
- Automatische kwetsbaarheid classificatie via LLM-output
- Rapportage-templates en exploit-writeups genereren

---

### Waarom Geen WormGPT/FraudGPT?

> *"Those models are usually not the frontier models that we need the juice from"*

**Reden**: Deze "dark" varianten zijn meestal **oude open-source modellen** (LLaMA 2 7B, Falcon 7B) met "uncensored" label en web-frontend. Ze zijn:
- Niet krachtig genoeg voor diep technisch onderzoek
- Vaak instabiel of onveilig
- Geen "juice" voor serieus security research

---

### Conclusie: Zelfgebouwde AI Pipeline

Jason's team gebruikt **geen obscure "hacker AIs"**, maar **zelfgebouwde pipelines**:

✅ **Open-source LLM's** (LLaMA / Mistral / Falcon / Zephyr / Dolphin)
✅ **LangChain / LlamaIndex** voor model-orkestratie
✅ **Eigen fine-tuning** en prompt-engineering (legitiem, onderzoeksgericht)

**Next Step**: Voorbeeld-setup bouwen: `Ollama + LangChain + LLaMA3 + Recon agent`

**Resource**: [Executive Offense - Hacking LLMs](https://executiveoffense.beehiiv.com/p/executive-offense-issue-10-start-hacking-llms)

---

## 🔄 n8n voor Security Workflows

### Transcript: Jason Haddix on n8n

> **Jason Haddix** *(Timestamp: 58:08 – 1:00:14)*

### Over n8n (uitgesproken als *N-A-N*)

> "I use n8n for a lot of non-security stuff, but I'm about to start using it for some **security-based workflows** as well."

**n8n** = Workflow-hub voor AI-agents en automation

**Huidige gebruik**:
- Social media posting (multi-platform)
- Onderzoeks- en data-analyse
- E-mail-triage en businessprocessen

**Workflow Principe**:
> "I'll give it a topic and it will go out and do analysis with a whole bunch of different AI calls — with different agents that are supposed to enrich it with different things."

Meerdere AI-calls combineren, elk met eigen taak of specialisatie.

---

### Integratie met MCP's en Cloud-SIEMs

> "Now that a lot of the MCPs have come out for the cloud SIEMs — and more people are connecting n8n through regular REST APIs — there will be a lot more people actioning **security workflows**."

**Mogelijkheden**:
- **Model Context Protocol (MCP)**-integraties voor cloud-SIEMs
- Direct koppelen aan beveiligingssystemen
- Veel kant-en-klare modules (weinig code nodig)

---

### Vulnerability Management Automation

> "The one I'm really excited to see — although it's not sexy — is **vulnerability management**."

**Probleem**: Vulnerability management pipelines zijn complex met veel afhankelijkheden:

1. Bug ontvangen (bug bounty, pentest, statische scan)
2. Eigenaar applicatie achterhalen
3. Juiste repository vinden
4. Ticket aanmaken voor fix
5. Prioriteren en status volgen
6. Automatische herinneringen (na X dagen)
7. Ticket sluiten bij oplossing
8. Heropenen bij regressie + juiste team taggen

> "There's a bunch of minutiae that goes on in the vulnerability-management world."

---

### Security Workflow Automation - Use Cases

> "I taught a class on automating security workflows — I didn't even think it would be a big topic. I just had one image on how n8n could fit in, and we ended up talking about it for an hour and a half!"

**Interesse**: Volledige vulnerability-management-pipelines automatiseren met n8n

**Persoonlijke ervaring**:
> "I deployed n8n this week for the first time — and I had to stop myself, because I could spend weeks playing with all the workflows I can imagine. It's a rabbit hole — but a super-powerful tool."

---

### n8n Samenvatting

**Wat is het?**
- No-code / low-code automation platform
- Koppelt AI-agents en security-systemen

**Mogelijkheden**:
- Vulnerability management
- SIEM-automation
- Threat-intel-enrichment

**Voordeel**: Krachtig alternatief voor dure SOAR-platforms, maar open-source en uitbreidbaar

**Potential Implementation**: Praktisch n8n-voorbeeldflow bouwen:
- Automatische ticket-aanmaak bij gevonden CVE
- Notificatie naar Slack/Teams
- **OSINT WORKFLOW** - Laat n8n het doen!

---

## 🔍 OSINT Resources

**Video Tutorial**:
- [OSINT Automation](https://www.youtube.com/watch?v=-nQWos7H1LQ&t=2696s)

**Tools Platform**:
- [MyOSINT Training Tools](https://tools.myosint.training)

---

## 📋 Next Actions

- [ ] MCP server integratie onderzoeken en implementeren
- [ ] n8n opzetten voor vulnerability management workflow
- [ ] OSINT automation pipeline bouwen
- [ ] LLaMA/Mistral lokaal opzetten voor security research
- [ ] LangChain + LlamaIndex exploreren voor recon automation
- [ ] CyberChef integreren in workflow
- [ ] DefCon talks systematisch doorwerken

https://executiveoffense.beehiiv.com/p/executive-offense-issue-10-start-hacking-llms
