import sys
import os
import pyperclip

def write_clipboard_to_file(file_path):
    content = pyperclip.paste()
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Clipboard content written to: {file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python write_clipboard_to_file.py <file_path>")
    else:
        write_clipboard_to_file(sys.argv[1])
