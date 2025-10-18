# strings_like.py
from pathlib import Path
import re
data = Path("byte.ico").read_bytes()
text = ''.join((chr(x) if 32 <= x < 127 else ' ') for x in data)
strings = [s for s in re.split(r'\s+', text) if len(s) >= 4]
for s in strings:
    print(s)
