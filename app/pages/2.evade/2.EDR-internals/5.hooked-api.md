---
title: Hooked API
description: Your function’s not alone — the hook is already home.
---

## What is API Hooking?

**API hooking** is a technique used by security software (like EDR solutions) to **intercept and monitor function calls** inside programs. 

Think of it like putting a spy on important system functions so you can see when and how they are being used. By "hooking" these functions, the security tool can **inspect, modify, or block certain actions** before they actually happen, helping to detect suspicious or malicious behavior early.

## 1. Process Creation and Callback Mechanism

1. A **parent process** (e.g., with process ID 1234) creates a new process, such as a malware process.
2. This is done via the **Win32 API CreateProcess**, handled by kernel components like the native API `NtCreateUserProcess`.
3. During this call, execution transitions from **user mode to kernel mode** via a system call (`syscall`).
4. The Windows kernel then invokes all registered **process creation callbacks**, stored in the `PsProcessNotifyRoutine` array.
5. These callbacks are registered by different kernel drivers, including the driver used by the EDR solution.
6. When the EDR driver's callback is triggered, it collects telemetry on the new process, such as process ID, parent ID, image path, and command line arguments.

![architekture](/content/7.knowledge-base/7.dead-silence/2.EDR-internals/5.hooked-api/architekture.png)

## 2. DLL Injection and API Hooking

* After the new process is created, the EDR injects a **DLL** into the malware process.
* This DLL hooks critical APIs, allowing the EDR to monitor deeper activities.
* For example, it might inject code into `client64.dll` of a process like Notepad to control specific function calls.

## 3. Normal System Call Flow

* A typical Windows system call (e.g., `NtCreateThreadEx`) follows a standard pattern:

  * Instructions load the system service number (e.g., `mov ecx, 0xNN`).
  * A `syscall` instruction switches execution from user mode to kernel mode to perform the system service.

![clean-api](/content/7.knowledge-base/7.dead-silence/2.EDR-internals/5.hooked-api/clean-api.png)

## 4. Hooked System Call Flow

* When hooked, the normal system call pattern is altered.
* The function starts with a **jump instruction** to an external memory location called a **trampoline**.
* This trampoline belongs to the EDR and redirects execution to a custom hook function in kernel or user mode.
* The hook function inspects CPU registers and performs security checks, such as logging arguments and detecting suspicious behavior.
* After inspection, the hook jumps back to the original trampoline, skipping the hook instructions and resuming normal system call execution.

![hooked-api](/content/7.knowledge-base/7.dead-silence/2.EDR-internals/5.hooked-api/hooked-api.png)

![hooking-flow](/content/7.knowledge-base/7.dead-silence/2.EDR-internals/5.hooked-api/hooking-flow.png)

## 5. Purpose of Hooking

* By placing inline hooks, the EDR can **intercept and analyze system calls**.
* This allows early detection of suspicious behavior like launching malicious processes or unauthorized actions.
* It increases security by providing visibility into system behavior that would otherwise be invisible.

## Summary

EDR solutions use kernel callbacks and DLL injection to monitor process creation and API calls. By hooking important system functions, they can intercept system calls, analyze them, and detect threats before damage occurs.
