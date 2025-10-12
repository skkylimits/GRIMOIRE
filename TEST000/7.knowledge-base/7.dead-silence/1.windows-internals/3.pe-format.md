---
title: PE Format
description: PE Files Unpacked – Where Execution Begins.
---

::card-group
  ::card
  ---
  title: PE-bear
  icon: tabler:binary
  to: https://github.com/hasherezade/pe-bea
  target: _blank
  ---
 PE-bear is a multiplatform reversing tool for PE files. Its objective is to deliver fast and flexible “first view” for malware analysts, stable and capable to handle malformed PE files.
  ::
  ::card
  ---
  title: CFF-explorer
  icon: hugeicons:binary-code
  to: https://ntcore.com/explorer-suite/
  target: _blank
  ---
  CFF Explorer was designed to make PE editing as easy as possible, but without losing sight on the portable executable’s internal structure.

  ::
::

::caution
It's the **file format** used by Windows for running applications. Applies to `.exe`, `.dll`, `.sys`, etc.
::

* PE stands for **Portable Executable**.
* Organizes binary data in a structured way so the **Windows loader** can correctly **load, interpret, and execute** the program.


## 📜 DOS Header

**Purpose**:

* Located at the **very beginning** of the file.
* Exists for **backward compatibility** with **MS-DOS**.
* Still used by modern Windows systems for validation.

**Key Fields**:

| Field      | Description                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `e_magic`  | First 2 bytes of the file — typically `0x5A4D` ("MZ" in ASCII). Identifies the file as a DOS executable. |
| `e_lfanew` | Offset to the **PE Header** (lets the loader skip the DOS part and go straight to PE).                   |

**DOS Stub**:

* Right after the DOS Header.
* Legacy code that shows a message like:
  `"This program cannot be run in DOS mode."`


## 📦 PE Header (a.k.a. NT Headers)

::note
Starts at: Offset defined by `e_lfanew`.
::

**Structure:**

```
PE Header
├── Signature (4 bytes): "PE\0\0"
├── File Header (20 bytes)
└── Optional Header (variable size)
```


### 🔹 A. PE Signature

* 4 bytes: `0x00004550` → `"PE\0\0"`
* Confirms the file is a PE format.


### 🔹 B. File Header (IMAGE\_FILE\_HEADER)

| Field                  | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `Machine`              | Architecture: x86 (32-bit), x64 (64-bit), etc.    |
| `NumberOfSections`     | Total number of sections (like `.text`, `.data`). |
| `Characteristics`      | Flags: is it executable? is it a DLL?             |
| `SizeOfOptionalHeader` | How big the next section (Optional Header) is.    |


### 🔹 C. Optional Header (IMAGE\_OPTIONAL\_HEADER)

Despite the name, **this part is essential** for execution.

| Field                 | Description                                                                      |
| --------------------- | -------------------------------------------------------------------------------- |
| `Magic`               | Identifies target: `0x10B` = 32-bit, `0x20B` = 64-bit.                           |
| `AddressOfEntryPoint` | **RVA** where execution starts — like `main()`.                                  |
| `ImageBase`           | Preferred load address of the image in memory.                                   |
| `SectionAlignment`    | Alignment of sections in memory.                                                 |
| `FileAlignment`       | Alignment of sections in the file.                                               |
| `SizeOfImage`         | Total size of the image when loaded into memory.                                 |
| `Subsystem`           | Type of program: Console app, GUI app, etc.                                      |
| `DataDirectory`       | Array of directories pointing to resources like Import Table, Export Table, etc. |


## 🧭 Data Directory (Part of Optional Header)

* An **array of `IMAGE_DATA_DIRECTORY` structures**.
* Each entry gives the RVA and size of important tables.

| Index | Name                                                    | Purpose                                                              |
| ----- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| 0     | **Export Directory**                                    | Points to table listing functions/variables the file **exports**.    |
| 1     | **Import Directory**                                    | Points to functions/variables the file **imports** from other files. |
| ...   | Others (e.g., Resources, Relocations, TLS, Debug, etc.) |                                                                      |


## 📁 Section Headers

**Purpose**:

* Define how data is stored in the file and mapped in memory.
* Array of `IMAGE_SECTION_HEADER` structures, one per section.

**Key Fields**:

| Field             | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `Name`            | Name of the section (e.g., `.text`, `.data`).                   |
| `VirtualSize`     | Size in memory.                                                 |
| `SizeOfRawData`   | Size on disk (in file).                                         |
| `VirtualAddress`  | RVA where the section begins in memory.                         |
| `Characteristics` | Access rights & attributes: `R`, `W`, `X` (Read/Write/Execute). |


## 🧩 PE Sections

**Contains the Code and Data used to create the executable.**

| Section Name | Description                                                                | Access Rights |
| ------------ | -------------------------------------------------------------------------- | ------------- |
| `.text`      | Contains **machine code** to be executed.                                  | `R-X`         |
| `.rdata`     | Read-only **initialized data** (constants, strings, import/export tables). | `R--`         |
| `.data`      | Read/write **initialized variables** (global/static).                      | `RW-`         |
| `.bss`       | Uninitialized data (not stored in file, but space allocated in memory).    | `RW-`         |
| `.reloc`     | **Relocation table** — adjusts addresses if image is not loaded at base.   | `R--`         |
| `.rsrc`      | **Resources** like icons, images, dialogs, version info.                   | `R--`         |


## ➰ Full Execution Flow

1. **Windows loader** reads the file.
2. Validates **MZ (DOS Header)** and **PE\0\0 (PE Signature)**.
3. Parses **File Header** and **Optional Header**.
4. Uses **Data Directory** to locate import/export, relocations, etc.
5. Loads sections into memory as per **Section Headers**.
6. Transfers execution to the **AddressOfEntryPoint**.
