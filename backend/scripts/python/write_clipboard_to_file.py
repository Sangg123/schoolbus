import os
import sys
import pyperclip

def main():
    """
    Reads code content either from a file specified as a command-line argument 
    or from the clipboard. It then extracts the target file path from the first 
    comment line and writes the remaining code content to that path.
    """
    
    content = ""
    
    # 1. Determine the content source (Command-line argument or Clipboard)
    if len(sys.argv) > 1:
        # Argument provided: Treat the argument as the source file path
        source_file_path = sys.argv[1]
        try:
            with open(source_file_path, "r", encoding="utf-8") as f:
                content = f.read()
            print(f"📄 Reading content from source file: {source_file_path}")
        except FileNotFoundError:
            print(f"❌ Error: Source file not found at '{source_file_path}'")
            return
        except Exception as e:
            print(f"❌ Error reading file: {e}")
            return
    else:
        # No argument: Read from clipboard
        content = pyperclip.paste()
        print("📋 Reading content from clipboard...")

    # Ensure content is not empty after reading
    if not content.strip():
        print("❌ Error: No content found (clipboard is empty or source file is blank).")
        return

    # 2. Process content and extract target path
    lines = content.strip().splitlines()

    # Check for the required file path comment on the first line
    if not lines[0].strip().startswith("// "):
        print("❌ First line must be a comment with the file path (e.g. // path/to/file.ts)")
        return

    # Extract file path: skip the '// ' prefix and strip whitespace
    file_path = lines[0].strip()[3:].strip()
    code_lines = lines[1:]  # Content starts from the second line

    if not file_path:
        print("❌ Error: Extracted target file path is empty after parsing the comment.")
        return

    # 3. Write the code to the target file
    
    # Ensure directory exists. os.path.dirname returns '' if it's just a filename, 
    # so we use 'or '.' to handle that case gracefully.
    os.makedirs(os.path.dirname(file_path) or '.', exist_ok=True) 

    # Prepare final content: join lines, remove surrounding whitespace, and ensure newline at the end
    final_content = "\n".join(code_lines).strip()
    
    with open(file_path, "w", encoding="utf-8") as f:
        # Write the content, adding a final newline only if the content is not empty
        f.write(final_content + ("\n" if final_content else ""))

    print(f"✅ Code successfully written to: {file_path}")


if __name__ == "__main__":
    main()
