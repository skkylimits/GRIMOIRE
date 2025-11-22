from pathlib import Path
data = Path("byte.ico").read_bytes()
hex_str = ' '.join(f"{b:02X}" for b in data)
print(hex_str)
