---
Title: NVM
---

## 1. Update je package lijst (optioneel maar aanbevolen)

```bash
sudo apt update
```

## 2. Installeer benodigde dependencies

```bash
sudo apt install curl build-essential libssl-dev -y
```

## 3. Download en installeer nvm via het installatiescript

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

> Let op: check altijd de nieuwste versie op de [GitHub pagina](https://github.com/nvm-sh/nvm).

## 4. Activeer nvm in je huidige shell

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Of gewoon even herstart je terminal, of run:

```bash
source ~/.bashrc
```

## 5. Controleer of nvm goed is geïnstalleerd

```bash
nvm --version
```

## 6. Installeer een Node versie

```bash
nvm install --lts
```

## 7. Gebruik de geïnstalleerde Node versie

```bash
nvm use --lts
```

## 8. Controleer Node en npm versie

```bash
node -v
npm -v
```
