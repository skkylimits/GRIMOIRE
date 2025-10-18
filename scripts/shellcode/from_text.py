text = "0xFC, 0x48, 0x83, 0xE4, 0xF0, 0xE8, 0xC0, 0x00, 0x00, 0x00, 0x41, 0x51, 0x41"
# verwijder '0x' en komma's, maak lijst van ints
clean = text.replace("0x", "").replace(",", " ").split()
bytes_list = [int(x, 16) for x in clean]

hex_str = ' '.join(f"{b:02X}" for b in bytes_list)
print(hex_str)
