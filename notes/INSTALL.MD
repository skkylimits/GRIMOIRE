# Grimoire

ADD:

- MCP server
	https://www.youtube.com/watch?v=_GxopZS8LwU
	https://www.youtube.com/watch?v=GuTcle5edjk&t=160s
- code mirror like boot.dev -> needs ui change
- i18n
- PowerShell
- AI POWERED OSINT - https://www.youtube.com/watch?v=JpWbytYrL2s
- AI jailbreaking - https://www.youtube.com/watch?v=44EJUYMSpzU

That way I own the data. Doesn't matter which model I like to choose.

future: https://www.arcanum-sec.com/


---

https://www.youtube.com/watch?v=K4ilFsm2GvA - firewalls
https://www.youtube.com/watch?v=JpWbytYrL2s - prompt bombing


-- review all defcon talks

cybercheff


sec gemini
secmeta


-- Goede vraag — en nice dat je dit fragment van **Jason Haddix** eruit pikt, want wat hij daar zegt is precies hoe veel offensive-security onderzoekers en bug-hunters hun AI-stack opbouwen.
Laten we het even in **gewoon Nederlands en concreet technisch** uit elkaar trekken.

---

## 🎙 Wat Jason bedoelt in dat stuk

> *“We tend to build our own stuff… they’re usually versions of open-source models that have been pre- or post-trained or jailbroken…”*

Kort vertaald:
👉 Hij gebruikt **niet** shady AI’s zoals “WormGPT” (die zogenaamd “geen regels” hebben).
👉 In plaats daarvan bouwt hij **zijn eigen lokale AI-tools** bovenop bestaande **open-source foundation models**.
👉 Die modellen **fine-tunen of jailbreaken** ze intern zodat ze bruikbaarder zijn voor security-werk (prompt-injection testing, pentest automation, reconnaissance, exploit analysis, etc.).

---

## 🧠 Dus… welke open-source modellen bedoelt hij?

Hij noemt ze niet bij naam, maar op basis van wat hij en z’n team (Bishop Fox, HTB-community, Bugcrowd-researchers, etc.) vaker gebruikt, gaat het meestal om deze categorieën:

| Model                                  | Oorsprong                               | Beschrijving                                                                                            | Typische toepassing bij hun werk                             |
| :------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------- |
| **LLaMA 2 / 3 (Meta)**                 | Meta AI                                 | Populaire foundation-models (7B–70B). Veel forks met “uncensored” tuning (Dolphin, Nous, Wizard, etc.). | Lokale chatbot / code-assistent met weinig restricties.      |
| **Mistral 7B / Mixtral 8x7B**          | Mistral AI (Frans open-source team)     | Zeer sterke, lichte MoE-architectuur. Wordt vaak getweakt als red-team-helper.                          | Snelle agenten voor scanning en automation.                  |
| **Falcon 40B / 180B**                  | TII UAE                                 | Volledig open, permissieve licentie.                                                                    | Research-model voor red-team prompt-tests en classification. |
| **Zephyr / OpenHermes / Dolphin 2.9**  | Community fine-tunes op LLaMA / Mistral | Instruct-tuned, vaak weinig “guardrails”.                                                               | Proof-of-concept AI-helpers voor exploit of recon tooling.   |
| **CodeLLaMA / StarCoder / SantaCoder** | Meta / Hugging Face                     | Code-georiënteerde LLM’s.                                                                               | Voor code-generatie, parser-scripts, exploit-templates.      |

➡️ Kortom: ze gebruiken **gewoon open Hugging Face-modellen** als basis, maar draaien ze **lokaal of op een private cloud** zodat er geen logging of filters tussen zitten.

---

## 🧩 Wat hij bedoelt met *“build our own stuff”*

Ze combineren die modellen met frameworks als:

* **LangChain** → orkestratie van meerdere modellen + tools (parsing, reconnaissance, exploit-simulation).
* **LlamaIndex** → om lokale knowledge bases (docs, recon data) te koppelen aan de LLM.
* **Local Inference Stacks** zoals:

  * `text-generation-webui`,
  * `Ollama`,
  * `vLLM`,
  * `LM Studio`,
  * of een zelfgehoste FastAPI-wrapper.

Daarbovenop maken ze kleine agent-scripts of CLI’s die:

* API-calls doen naar Burp, Shodan, Censys, etc.
* Automatisch kwetsbaarheden classificeren met behulp van LLM-output.
* Rapportage-templates of exploit-writeups genereren.

---

## 🚫 Waarom geen WormGPT of FraudGPT

Hij bedoelt met dat stukje ook:

> *“those models are usually not the frontier models that we need the juice from”*

➡️ WormGPT en soortgelijke “dark” varianten zijn meestal **oude open-source modellen** (LLaMA 2 7B of Falcon 7B) die iemand “uncensored” heeft gemaakt en een web-frontend heeft gegeven.
Ze zijn niet krachtig genoeg (“geen juice”) voor écht diep technisch onderzoek, en vaak instabiel of onveilig.
---

## 🔐 Conclusie

Jason en zijn team gebruiken dus géén obscure “hacker AIs”,
maar **zelfgebouwde pipelines** op basis van:

* **open-source LLM’s (LLaMA / Mistral / Falcon / Zephyr / Dolphin)**
* **LangChain / LlamaIndex** om die modellen als tools te laten samenwerken
* **Eigen fine-tuning** en prompt-engineering om filters te omzeilen op legitieme, onderzoeksgerichte manier.

---

Als je wilt, kan ik een **voorbeeld-setup** tonen van hoe zo’n pipeline eruitziet (bijv. `Ollama + LangChain + LLaMA3 + Recon agent`) — zodat je dat lokaal kunt draaien net als zij.
Wil je dat ik dat even uitschrijf?

https://executiveoffense.beehiiv.com/p/executive-offense-issue-10-start-hacking-llms


---
Natuurlijk — hier is dat fragment mooi geformatteerd in **duidelijke, gestructureerde Markdown-stijl**, klaar om in je Grimoire-notities te gebruiken.

---

# 💬 Transcript: Jason Haddix on Using **n8n** for Security Workflows

---

> **Jason Haddix**
> *(Timestamp: 58:08 – 1:00:14)*

---

### 🧠 Over n8n (uitgesproken als *N-A-N*)

> “I use n8n for a lot of non-security stuff, but I’m about to start using it for some **security-based workflows** as well.”

* **n8n** laat je AI-agents koppelen aan allerlei workflows.
* Ze gebruiken het al intern voor:

  * het posten naar socials (meerdere platformen tegelijk);
  * onderzoeks- en data-analyse;
  * e-mail-triage en andere businessprocessen.

> “I’ll give it a topic and it will go out and do analysis with a whole bunch of different AI calls — with different agents that are supposed to enrich it with different things.”

n8n werkt dus als een **workflow-hub** waarin je meerdere AI-calls kunt combineren, elk met een eigen taak of specialisatie.

---

### ☁️ Integratie met MCP’s en Cloud-SIEMs

> “Now that a lot of the MCPs have come out for the cloud SIEMs — and more people are connecting n8n through regular REST APIs — there will be a lot more people actioning **security workflows**.”

* Nieuwe **Model Context Protocol (MCP)**-integraties voor cloud-SIEMs maken het eenvoudiger om n8n direct te koppelen aan beveiligingssystemen.
* n8n heeft ondertussen **veel kant-en-klare modules**, zodat je zonder veel code snel security-flows kunt bouwen.

---

### 🔐 Gebruik in Vulnerability Management

> “The one I’m really excited to see — although it’s not sexy — is **vulnerability management**.”

Haddix beschrijft dat **vulnerability management pipelines** in grote organisaties vaak lastig te automatiseren zijn, omdat er veel kleine stappen en afhankelijkheden zijn:

1. Je ontvangt een bug (via bug bounty, pentest, of statische scan).
2. Je moet achterhalen wie de eigenaar van de applicatie is.
3. Zoek de juiste repository.
4. Maak een ticket aan om de bug te fixen.
5. Prioriteer en volg de status.
6. Stuur automatische herinneringen (na X dagen).
7. Sluit het ticket bij oplossing.
8. Heropen het bij regressie, en zorg dat het juiste team wordt getagd.

> “There’s a bunch of minutiae that goes on in the vulnerability-management world.”

---

### 🎓 Automating Security Workflows

> “I taught a class on automating security workflows — I didn’t even think it would be a big topic. I just had one image on how n8n could fit in, and we ended up talking about it for an hour and a half!”

Veel mensen bleken enthousiast over het idee om met **n8n volledige vulnerability-management-pipelines te automatiseren**.
Haddix noemt dit zijn volgende onderzoeksgebied.

---

### 🧩 Persoonlijke noot

> “I deployed n8n this week for the first time — and I had to stop myself, because I could spend weeks playing with all the workflows I can imagine. It’s a rabbit hole — but a super-powerful tool.”

---

**📌 Samenvatting**

* **n8n** is een *no-code / low-code automation platform* waarmee je AI-agents en security-systemen kunt koppelen.
* Dankzij nieuwe **MCP-integraties** kun je nu ook **vulnerability management**, **SIEM-automation** en **threat-intel-enrichment** via n8n laten verlopen.
* Het vormt een krachtig alternatief voor dure SOAR-platforms, maar blijft open-source en uitbreidbaar.

---

Wil je dat ik hier meteen een **praktisch n8n-voorbeeldflow** bij bouw (zoals “automatische ticket-aanmaak bij gevonden CVE” → “notificatie naar Slack/Teams”)?


BIJVOORBEELD OSINT WORKFLOW. LAAT N8N HET DOEN!

---

https://www.youtube.com/watch?v=-nQWos7H1LQ&t=2696s
tools.myosint.training
