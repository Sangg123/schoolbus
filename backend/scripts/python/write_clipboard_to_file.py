import os
import pyperclip

def main():
    content = pyperclip.paste()
    lines = content.strip().splitlines()

    if not lines or not lines[0].strip().startswith("// "):
        print("❌ First line must be a comment with the file path (e.g. // path/to/file.ts)")
        return

    # Extract file path and clean content
    file_path = lines[0].strip()[3:].strip()
    code_lines = lines[1:]  # Skip the first line

    # Ensure directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Write the code to the file
    with open(file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(code_lines).strip() + "\n")

    print(f"✅ Code written to: {file_path}")

if __name__ == "__main__":
    main()
