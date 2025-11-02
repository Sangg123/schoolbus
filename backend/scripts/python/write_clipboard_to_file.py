import os
import sys
import pyperclip
import re
from typing import List, Tuple

# Regex to identify a file block delimiter.
# It matches a line starting with '//' followed by a path that begins with 'src/'.
# The captured group (1) holds the target file path.
FILE_SPLIT_PATTERN = re.compile(r"^//\s*(src/[^\n]+)", re.MULTILINE)


def parse_content(content: str) -> List[Tuple[str, str]]:
    """
    Splits the large text block into (file_path, content) tuples
    based on the FILE_SPLIT_PATTERN.
    """
    # Use re.split to split the content by the pattern.
    # Because the pattern has a capturing group, the delimiters (file paths)
    # are included in the resulting list.
    blocks = FILE_SPLIT_PATTERN.split(content)

    extracted_files = []

    # The split result format is typically:
    # [Text before first match, Match 1 (Path 1), Content 1, Match 2 (Path 2), Content 2, ...]

    # We ignore the first element (index 0) as it's the text before the first file path.
    # We then iterate starting from index 1, taking steps of 2 (path, content).
    for i in range(1, len(blocks), 2):
        # blocks[i] is the captured path (e.g., 'src/components/App.jsx')
        file_path = blocks[i].strip()

        # blocks[i+1] is the content block following the path
        # Use .strip() to remove leading/trailing whitespace/newlines
        file_content = blocks[i + 1].strip()

        if file_path and file_content:
            extracted_files.append((file_path, file_content))

    return extracted_files


def write_files(extracted_files: List[Tuple[str, str]]):
    """
    Creates directories and writes the content for each extracted file block.
    """
    total_files = len(extracted_files)
    if total_files == 0:
        print("❌ No valid file blocks found matching the '// src/...' pattern.")
        return

    print(f"\n📝 Starting write operation for {total_files} file(s)...")

    for i, (file_path, file_content) in enumerate(extracted_files):
        try:
            # Ensure the directory exists
            os.makedirs(os.path.dirname(file_path) or ".", exist_ok=True)

            # Write the code to the file
            # Add a newline at the end for POSIX compatibility
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(file_content + "\n")

            print(f"  ✅ [{i+1}/{total_files}] Written: {file_path}")

        except Exception as e:
            print(f"  ❌ [{i+1}/{total_files}] Error writing file {file_path}: {e}")

    print("\n✨ All operations complete.")


def main():
    """
    Determines source (argument or clipboard), parses content, and writes files.
    """
    content = ""

    # 1. Determine the content source (Command-line argument or Clipboard)
    if len(sys.argv) > 1:
        # Argument provided: Read from the source file
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

    # Ensure content is not empty
    if not content.strip():
        print(
            "❌ Error: No content found (clipboard is empty or source file is blank)."
        )
        return

    # 2. Parse the content into file blocks
    extracted_files = parse_content(content)

    # 3. Write the extracted files
    write_files(extracted_files)


if __name__ == "__main__":
    main()
