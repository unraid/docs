#!/usr/bin/env python3
import re
import yaml
import sys

def load_glossary(glossary_file):
    """Load the glossary from YAML file."""
    with open(glossary_file, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def create_term_mappings(glossary):
    """Create mappings from term display names to glossary keys."""
    mappings = []
    for key, entry in glossary.items():
        if 'term' in entry:
            term = entry['term']
            if term.strip():  # Skip empty terms
                mappings.append((term, key))
    return mappings

def process_text(text, mappings):
    """Process text and replace terms with %%Term|term%% format."""
    # Sort terms by length (longest first) to avoid partial matches
    sorted_mappings = sorted(mappings, key=lambda x: len(x[0]), reverse=True)
    
    processed_text = text
    
    # Process each term
    for term, key in sorted_mappings:
        # Create a simple replacement pattern
        # Use word boundaries to avoid partial matches
        pattern = r'\b' + re.escape(term) + r'\b'
        
        # Replace with the %%Term|term%% format, but escape | in table cells
        replacement = f'%%{term}&#124;{key}%%'
        
        # Use case-insensitive replacement
        processed_text = re.sub(pattern, replacement, processed_text, flags=re.IGNORECASE)
    
    return processed_text

def main():
    glossary_file = "glossary.yaml"
    input_file = "docs/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration.md"
    
    print(f"Loading glossary from: {glossary_file}")
    
    # Load glossary
    try:
        glossary = load_glossary(glossary_file)
        print(f"Loaded {len(glossary)} glossary entries")
    except Exception as e:
        print(f"Error loading glossary: {e}")
        sys.exit(1)
    
    # Create term mappings
    mappings = create_term_mappings(glossary)
    print(f"Created {len(mappings)} term mappings")
    
    # Read input file
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()
        print(f"Read input file: {input_file}")
    except Exception as e:
        print(f"Error reading input file: {e}")
        sys.exit(1)
    
    # Process the text
    print("Processing text...")
    processed_text = process_text(text, mappings)
    
    # Write output
    output_file = input_file.replace('.md', '_processed_direct.md')
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(processed_text)
        print(f"Processed file saved as: {output_file}")
    except Exception as e:
        print(f"Error writing output file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 