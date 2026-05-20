import sys
with open('src/pages/Altsports.tsx', 'r') as f:
    lines = f.readlines()
with open('src/pages/Altsports.tsx', 'w') as f:
    for line in lines:
        if 'label: "Entry Fee"' in line:
            indent = line[:len(line) - len(line.lstrip())]
            f.write(indent + '{ icon: Zap, label: "Entry Fee", value: "N$100 cash will be converted into Bitcoin for you to pay in‑venue with the Primal App https://primal.net/downloads", color: "text-primary" },\n')
            f.write(indent + '{ icon: Zap, label: "Wallet Options", value: "Blink https://www.blink.sv/ or Aqua https://aqua.net/. We recommend downloading all.", color: "text-primary" },\n')
        else:
            f.write(line)
