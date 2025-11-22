# find_strings.py
import re
from pathlib import Path

data = Path("payload.bin").read_bytes()
min_len = 4

# ASCII
ascii_runs = [m for m in re.finditer(rb'[\x20-\x7E]{%d,}' % min_len, data)]
print("ASCII strings:")
for m in ascii_runs:
    print(hex(m.start()), m.group().decode('ascii', errors='ignore'))

# UTF-16LE
utf16 = data.decode('latin1')  # helper
utf16_runs = []
for i in range(0, len(data)-min_len*2):
    chunk = data[i:i+min_len*2]
    try:
        s = chunk.decode('utf-16le')
        if all(32 <= ord(c) < 127 for c in s):
            utf16_runs.append((i, s))
    except Exception:
        pass

print("\nUTF-16LE candidates:")
seen = set()
for off, s in utf16_runs:
    if s not in seen:
        print(hex(off), s)
        seen.add(s)
